# 🍽️ Restaurant Management System

A full-stack restaurant management platform with **real-time order handling**, **table monitoring**, and **menu management**.
The system consists of **three applications**:

* **Admin Dashboard** – manage menu, tables, and analytics
* **Customer App** – place orders and interact with the restaurant system
* **Backend API** – handles business logic, database, and sockets

---

# 🎥 Project Walkthrough

Project walkthrough video:

https://drive.google.com/file/d/140hKD6jDO3aHgwtUuTOhIZFt4_FeRv1l/view?usp=sharing

> **Note:** Colors may look slightly different in the video due to a faulty laptop screen, but the implementation uses the **exact color codes provided in the Figma design**.

---

# 🌐 Live Applications

### Admin Dashboard

http://restaurant-two-vert.vercel.app/

### Customer Interface

https://restaurant-s7pd.vercel.app/

---

# ⚙️ Tech Stack

### Frontend

* React
* Chart.js
* CSS

### Backend

* Node.js
* Express.js
* Socket.io

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

---

# 🧩 System Architecture

Admin App (Vercel)
Customer App (Vercel)
⬇
Backend API (Render)
⬇
MongoDB Atlas

---

# 📦 Features

### Admin Dashboard

* View restaurant analytics
* Monitor order status
* Manage menu items
* Track table availability
* Real-time updates via sockets

### Customer App

* Browse menu
* Add items to cart
* Place orders
* View order confirmation

### Backend

* REST API architecture
* Real-time updates using **Socket.io**
* MongoDB database integration
* Modular Express routing

---

# 👨‍🍳 Seeding Chefs

Chef accounts are created through an API call.

### Endpoint

POST

```
/chefs/create
```

### Request Body

```json
{
  "name": "Tenzen"
}
```

Example using curl:

```
curl -X POST https://restaurant-backend-qe31.onrender.com/chefs/create \
-H "Content-Type: application/json" \
-d '{"name":"Tenzen"}'
```

After creating chefs, they will be available inside the system.

---

# 🖥️ Running Locally

Clone the repository:

```
git clone https://github.com/Anu-vibes/Restaurant.git
```

### Backend

```
cd backend
npm install
npm run dev
```

### Admin Dashboard

```
cd restaurant-admin
npm install
npm start
```

### Customer App

```
cd restaurant-user
npm install
npm start
```

---

# 📊 Folder Structure

```
Restaurant
│
├── backend
│
├── restaurant-admin
│
└── restaurant-user
```

---

# 🚀 Deployment

Backend hosted on **Render**.

Frontend applications hosted on **Vercel**.

MongoDB database hosted on **MongoDB Atlas**.

---

# 📌 Notes

* Real-time updates are powered by **Socket.io**.
* Charts and analytics are implemented using **Chart.js**.
* UI was implemented according to **Figma design specifications**.

---

# 👨‍💻 Author

Anurag Singh

