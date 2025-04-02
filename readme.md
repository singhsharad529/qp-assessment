# Grocery App API

## 📌 Overview

This is a Grocery Store Management application that allows users to browse and purchase groceries, while administrators can manage products, orders, and users.

## 🌍 Live URL

You can access the live application at:

**[Your App URL Here](#)**

---

## ⚡ API Endpoints

### 🛠️ Admin APIs (Requires Authentication)

| Method   | Endpoint                  | Description            |
| -------- | ------------------------- | ---------------------- |
| `POST`   | `/api/admin/login`        | Admin login            |
| `POST`   | `/api/admin/products`     | Add a new product      |
| `PUT`    | `/api/admin/products/:id` | Update product details |
| `DELETE` | `/api/admin/products/:id` | Remove a product       |
| `GET`    | `/api/admin/orders`       | View all orders        |
| `PUT`    | `/api/admin/orders/:id`   | Update order status    |

### 🌐 Public APIs (Accessible by Users)

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| `GET`  | `/api/products`       | Fetch all products  |
| `GET`  | `/api/products/:id`   | Get product details |
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login`    | User login          |
| `POST` | `/api/orders`         | Place a new order   |
| `GET`  | `/api/orders/:id`     | View order details  |

---

## 🛠️ Installation & Setup

### 🔹 Without Docker

#### 1️⃣ Clone the Repository

```sh
 git clone https://github.com/your-repo/grocery-app.git
 cd grocery-app
```

#### 2️⃣ Install Dependencies

```sh
 npm install
```

#### 3️⃣ Configure Environment Variables

Create a `.env` file and set the following:

```
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASS=yourpassword
MYSQL_DB=grocery
```

#### 4️⃣ Start the Application

```sh
 npm run dev
```

---

### 🔹 With Docker

#### 1️⃣ Build and Start Containers

```sh
docker-compose up --build
```

#### 2️⃣ Access the Application

- **API**: `http://localhost:5000`
- **MySQL**: Runs inside the Docker container (`grocery-mysql`)

#### 3️⃣ Stop Containers

```sh
docker-compose down
```

---

## 🛠 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT
- **Containerization**: Docker, Docker Compose

For any issues, feel free to create a GitHub issue!

🚀 **Happy Coding!** 🎉
