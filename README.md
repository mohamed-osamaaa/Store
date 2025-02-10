# 🛒 Store

A modern e-commerce platform built with **MongoDB, React, NestJS, Node.js, and TailwindCSS**. It features **Cloudinary integration**, **Zustand for state management**, **rate limiting**, and **robust error handling** on both client & server.

## 🚀 Features
- 🌟 **Tech Stack:** MongoDB + React + NestJS + Node.js + TailwindCSS
- 🚀 **Rate Limiting** for enhanced security
- 🎨 **Cloudinary Integration** for media storage
- 🔥 **Global State Management** using Zustand
- ✅ **Error Handling** on both client & server
- ⚡ **Optimized API Requests** using Axios
- 📦 **Vite for a fast development environment**
- 🎉 **React Hot Toast & SweetAlert for user-friendly notifications**

## 📂 Tech Stack
- **Frontend:** React, TailwindCSS, Zustand, Axios, React Router, Vite
- **Backend:** NestJS, MongoDB, Cloudinary

## 🛠 Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/mohamed-osamaaa/Store.git
cd Store
```

### 2️⃣ Setup Backend
Navigate to the `backend` directory and install dependencies:
```sh
cd Server
npm install
```

Create a `.env` file in the `backend` directory and add the following:
```
DB_URI=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run the backend server:
```sh
npm run start
```

### 3️⃣ Setup Frontend
Navigate to the `frontend` directory and install dependencies:
```sh
cd ../Client
npm install
```

Start the development server:
```sh
npm run dev
```

## 🎯 API Endpoints
| Method | Endpoint           | Description          |
|--------|-------------------|----------------------|
| GET    | /products         | Get all products    |
| GET    | /products/:id     | Get a single product |
| POST   | /products         | Create a new product |
| PUT    | /products/:id     | Update a product    |
| DELETE | /products/:id     | Delete a product    |


---
Made with ❤️ by [mohamed-osamaaa](https://github.com/mohamed-osamaaa) 🚀

