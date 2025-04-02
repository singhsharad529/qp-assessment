# Grocery App API

## 📌 Overview

Technical Assessment Submission: Grocery Booking API

---

## ⚡ API Endpoints

### 🛠️ Grocery APIs (Requires Simple authentication , role:"admin" in body)

| Method   | Endpoint                       | Description                   |
| -------- | ------------------------------ | ----------------------------- |
| `GET`    | `/api/v1/groceries/`           | All Grocery Item (Public API) |
| `GET`    | `/api/v1/groceries/:groceryID` | Get a Grocery Item            |
| `POST`   | `/api/v1/groceries/`           | Add Grocery Item              |
| `DELETE` | `/api/v1/groceries/:groceryID` | Delete a Grocery Item         |
| `PUT`    | `/api/v1/groceries/:groceryID` | Update a grocery Item         |

### 🌐 Orders APIs (Accessible by Users)

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| `GET`  | `/api/v1/order/`        | Fetch all Orders         |
| `GET`  | `/api/v1/order/:userid` | Get Single Order Details |
| `POST` | `/api/v1/order/`        | Place a new Order        |

---

### 🌐 Database Used

Used MySQL Database

## 🛠️ Installation & Setup

### 🔹 Without Docker

#### 1️⃣ Clone the Repository

```sh
 git clone https://github.com/singhsharad529/qp-assessment.git
 cd qp-assessment
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
MYSQL_PASS=Sharad123
MYSQL_DB=questionpro
MYSQL_PORT=3306
```

#### 4️⃣ Start the Application

##### Terminal 1 (Compile Typescript)

```sh
 npm run watch
```

##### Terminal 2 (Run application in Developement Mode)

```sh
 npm run dev
```

---

### 🔹 With Docker

#### 1️⃣ Build and Start Containers

```sh
docker-compose up --build -d
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
- **Authentication**: Basci Middleware
- **Containerization**: Docker, Docker Compose
