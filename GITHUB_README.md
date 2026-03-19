# 📚 Bookstore Management System

A full-stack web application for managing an online bookstore with user authentication, book catalog management, shopping cart functionality, and admin order tracking.

---

## 🌟 Features

### 👤 User Features
- 🔐 **User Registration & Login** - Secure JWT authentication
- 📖 **Browse Books** - View complete book catalog
- 🛒 **Shopping Cart** - Add/remove books and manage quantities
- 💳 **Place Orders** - Complete order checkout process
- 📱 **Responsive Design** - Works on all devices

### 🛡️ Admin Features
- 📊 **Admin Dashboard** - Manage books and orders
- 📚 **Book Management** - Create, update, delete books
- 📋 **Order Tracking** - Monitor all customer orders
- 👥 **User Management** - Manage user accounts
- 🔒 **Admin Protection** - Secure admin-only routes

---

## 🛠️ Tech Stack

### Frontend
```
React 18.2.0           - UI Framework
React Router v7.13.0   - Client-side routing
Axios 1.13.4          - HTTP client
Bootstrap 5.3.8        - CSS Framework
React Toastify 11.0.5  - Notifications
```

### Backend
```
Node.js                - Runtime environment
Express.js 4.19.2      - Web framework
MongoDB 8.3.4          - Database
Mongoose              - ODM
JWT 9.0.2             - Authentication
bcryptjs 2.4.3        - Password hashing
CORS 2.8.5            - Cross-origin support
```

---

## 📁 Project Structure

```
bookstore-management-system/
│
├── backend/
│   └── src/
│       ├── config/
│       │   └── db.js                    (MongoDB connection)
│       ├── controllers/
│       │   ├── authController.js        (Login & Register)
│       │   ├── bookController.js        (Book CRUD)
│       │   └── orderController.js       (Order management)
│       ├── middleware/
│       │   ├── authMiddleware.js        (JWT verification)
│       │   └── adminMiddleware.js       (Role check)
│       ├── models/
│       │   ├── User.js                  (User schema)
│       │   ├── Book.js                  (Book schema)
│       │   └── Order.js                 (Order schema)
│       ├── routes/
│       │   ├── authRoutes.js            (/login, /register)
│       │   ├── bookRoutes.js            (/api/books)
│       │   └── orderRoutes.js           (/api/orders)
│       └── server.js                    (Main entry point)
│
└── frontend/
    └── src/
        ├── components/
        │   ├── ProtectedRoute.js        (Auth guard)
        │   └── AdminRoute.js            (Admin guard)
        ├── context/
        │   └── CartContext.js           (State management)
        ├── pages/
        │   ├── Login.js                 (Auth page)
        │   ├── Books.js                 (Catalog)
        │   ├── Cart.js                  (Shopping cart)
        │   ├── Dashboard.js             (Admin panel)
        │   └── AdminOrders.js           (Order management)
        ├── services/
        │   └── api.js                   (API client)
        ├── styles/
        │   └── theme.css                (Custom styles)
        ├── App.js                       (Main component)
        └── index.js                     (Entry point)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v14 or higher
- **MongoDB** (Local or MongoDB Atlas)
- **npm** or **yarn**

### Installation

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/yashpatil7017/bookstore-management-sys.git
cd bookstore-management-system
```

#### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
MONGO_URI=mongodb://localhost:27017/bookstore
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

**Start Backend:**
```bash
npm start
```
Backend runs on `http://localhost:5000`

#### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Start Frontend:**
```bash
npm start
```
Frontend runs on `http://localhost:3000`

---

## 📚 API Endpoints

### Authentication (`/api`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | User login |

### Books (`/api/books`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all books | ❌ |
| GET | `/:id` | Get book by ID | ❌ |
| POST | `/` | Add new book | ✅ Admin |
| PUT | `/:id` | Update book | ✅ Admin |
| DELETE | `/:id` | Delete book | ✅ Admin |

### Orders (`/api/orders`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all orders | ✅ Admin |
| GET | `/:id` | Get order by ID | ✅ User |
| POST | `/` | Create order | ✅ User |
| PUT | `/:id` | Update order | ✅ Admin |

---

## 🔐 Authentication & Security

- **JWT Tokens** - Secure token-based authentication
- **Password Hashing** - bcryptjs for password encryption
- **Protected Routes** - Frontend & backend route protection
- **Admin Verification** - Role-based access control
- **CORS Enabled** - Cross-origin request handling

### Token Storage
```javascript
// Credentials stored in localStorage/sessionStorage
localStorage.setItem("token", jwtToken);
localStorage.setItem("role", userRole);
```

---

## 📊 Database Schemas

### User Schema
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (default: "user")
}
```

### Book Schema
```javascript
{
  title: String,
  author: String,
  price: Number,
  category: String,
  stock: Number,
  timestamps: true
}
```

### Order Schema
```javascript
{
  userId: ObjectId,
  items: Array,
  totalPrice: Number,
  status: String,
  timestamps: true
}
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Build for Production
```bash
cd frontend
npm run build
```
Creates optimized build in `build/` folder.

---

## 🚢 Deployment

### Frontend Deployment (Vercel / Netlify)
```bash
# Build the project
cd frontend
npm run build

# Deploy the 'build' folder to Vercel or Netlify
```

### Backend Deployment (Heroku / Railway)
```bash
# Set environment variables on platform
# Deploy from GitHub

# Or manually push to Heroku
heroku create your-app-name
git push heroku main
```

---

## 📸 Screenshots

### User Interface
- 🏠 Home Page - Browse books
- 🛒 Cart Page - Manage shopping cart
- 📝 Login Page - User authentication
- 📦 Order Checkout - Complete purchase

### Admin Interface
- 📊 Dashboard - Manage books
- 📋 Orders - Track customer orders
- ⚙️ Settings - Admin controls

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see LICENSE file for details.

---

## 👨‍💻 Author

**Yash Patil**
- GitHub: [@yashpatil7017](https://github.com/yashpatil7017)
- Email: [your-email@example.com]

---

## 🎯 Future Enhancements

- [ ] 💳 Payment Gateway Integration (Stripe/PayPal)
- [ ] 📧 Email Notifications
- [ ] 🔍 Advanced Search & Filters
- [ ] ⭐ User Reviews & Ratings
- [ ] 💕 Wishlist Feature
- [ ] 🔔 Real-time Notifications
- [ ] 📱 Mobile App (React Native)
- [ ] 📊 Analytics Dashboard
- [ ] 🎟️ Coupon/Discount System

---

## 🆘 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
→ Ensure MongoDB is running: mongod
```

### CORS Errors
```
→ Check CORS configuration in server.js
→ Verify frontend URL matches backend CORS settings
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm start
```

---

## 📞 Support

- 📌 Issues: [GitHub Issues](https://github.com/yashpatil7017/bookstore-management-sys/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yashpatil7017/bookstore-management-sys/discussions)

---

## 📄 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Introduction](https://jwt.io)

---

**Made with ❤️ by Yash Patil**

⭐ If you found this helpful, please give a star!
