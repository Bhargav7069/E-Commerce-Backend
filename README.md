# 🛒 E-Commerce REST API (Node.js, Express, PostgreSQL)

A production-ready E-Commerce backend API featuring JWT authentication, Cloudinary image upload, product filters, shopping cart with persistent pricing, Swagger documentation, and automated testing.

---

## 🚀 Tech Stack
Node.js • Express • Mongo DB • Sequelize ORM • JWT • Multer • Cloudinary • express-validator • Swagger • Jest

---

## 📂 Project Setup

### 1️⃣ Clone Repository  
git clone https://github.com/Bhargav7069/E-Commerce-Backend.git  
cd E-Commerce-Backend

### 2️⃣ Install Dependencies  
npm install

### 3️⃣ Create `.env` File  
PORT=5000  
DATABASE_URL=postgres://username:password@localhost:5432/ecommerce  
JWT_SECRET=your_jwt_secret  
CLOUD_NAME=your_cloud_name  
CLOUD_API_KEY=your_api_key  
CLOUD_API_SECRET=your_api_secret

### 4️⃣ Connect Database (MongoDB)  
Ensure MongoDB is running locally or use MongoDB Atlas.

### 5️⃣ Start Server  
npm run dev  
➡ Server will run on: http://localhost:5000

---

## 🔐 Authentication
| Endpoint | Method | Description |
|---------|--------|-------------|
| /api/auth/signup | POST | Register new user |
| /api/auth/login | POST | Login with email & password |

Roles: **Admin** (full access) | **Customer** (shopping access)

---

## 📦 Product Management (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/products | Create product + Cloudinary upload |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |
| GET | /api/products | List all products |

Product Model: name, description, price, stock, categoryId, imageUrl

---

## 🏷 Category Management (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/categories | Create category |
| PUT | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |
| GET | /api/categories | List all categories |

---

## 🔍 Product Listing & Filters (Customer)
| Filter | Example |
|--------|---------|
| Price Range | /api/products?min=500&max=2000 |
| Category | /api/products?category=electronics |
| Search | /api/products?search=iphone |
| Pagination | /api/products?page=1&limit=10 |

---

## 🛒 Shopping Cart (Customer)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/cart | Add product to cart |
| GET | /api/cart | View cart |
| DELETE | /api/cart/:productId | Remove from cart |

🔐 **Persistent Pricing:** Price is locked at the moment of adding product to cart — later price changes do not affect placed orders.

---

## 📦 Order Management (Customer)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Place order |
| GET | /api/orders | View order history |


## 🔒 Security
- JWT authentication for protected routes  
- helmet & cors enabled  
- Environment variables using .env  
- express-validator for validation

---

## 📁 Folder Structure
src  
 ├─ controllers  
 ├─ routes  
 ├─ models  
 ├─ middleware  
 ├─ config  
 ├─ utils  
 
---


## 📄 License
MIT License

✨ If this project helped you, please ⭐ the repository!
