import { Request, Response } from "express";
import Cart from "../models/Cart";
import Order from "../models/Order";
import Product from "../models/Product";

interface AuthRequest extends Request {
  user?: any;
}

// Add to Cart
export const addToCart = async (req: AuthRequest, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      // Update price to current product price (Snapshot pricing strategy)
      cart.items[itemIndex].priceAtTimeOfAdd = product.price;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        priceAtTimeOfAdd: product.price,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

// Place Order
export const placeOrder = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userId;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = cart.items.map((item) => {
      // Calculate total using the SNAPSHOT price saved in cart
      totalAmount += item.priceAtTimeOfAdd * item.quantity;
      return {
        product: item.product,
        quantity: item.quantity,
        price: item.priceAtTimeOfAdd,
      };
    });

    const order = new Order({
      user: userId,
      products: orderItems,
      totalAmount,
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

export const getOrderHistory = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userId;

  try {
    const orders = await Order.find({ user: userId })
      .populate("products.product", "name imageUrl")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const originalLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({ msg: "Item not found in cart" });
    }

    await cart.save();
    res.json(cart);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};
