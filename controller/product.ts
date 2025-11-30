import { Request, Response } from 'express';
import Product from '../models/Product';
import cloudinary from '../config/cloudinary';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    let imageUrl = "";

    if (!req.file) {
      return res.status(400).json({ msg: "Product image is required" });
    }

    const file = req.file as Express.Multer.File; 

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    }) as any;

    imageUrl = result.secure_url;

    const product = new Product({
      name,
      description,
      price,
      stock,
      category: categoryId,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

export const getProducts1 = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
    
    let query: any = {};


    if (category) query.category = category;
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
    });
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
    
    let query: any = {};
    if (category) query.category = category;

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit))
      .exec();

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: Number(page),
      totalProducts: count
    });
  } catch (err: any) {
    res.status(500).json({ msg: err.message });
  }
};