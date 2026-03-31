# budget_tracker
# 💰 Budget Tracker Application

## 📌 Overview

The **Budget Tracker** is a full-stack web application designed to help users manage their personal finances by tracking income and expenses. It provides a simple and intuitive interface to monitor financial activity, calculate balances, and analyze spending habits.

This project demonstrates practical implementation of modern web development technologies including frontend, backend, and database integration.

---

## 🚀 Features

### ✅ Core Features

* Add income transactions (amount, source, date)
* Add expense transactions (amount, category, date)
* View all transactions in a structured list
* Delete transactions
* Automatic calculation of:

  * Total Income
  * Total Expenses
  * Remaining Balance

### 🌟 Advanced Features (Optional / Future Improvements)

* User authentication (Login/Register)
* Filter transactions by date or category
* Data visualization (charts and graphs)
* Monthly financial reports
* Responsive design for mobile and tablet devices

---

## 🏗️ Tech Stack

### Frontend

* React.js / Next.js
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 🧠 System Architecture

```
Client (React Frontend)
        ↓
API (Node.js + Express)
        ↓
Database (MongoDB)
```

The frontend communicates with the backend via REST APIs. The backend handles business logic and interacts with the database to store and retrieve transaction data.

---

## 🗄️ Database Schema

### Transaction Model

```json
{
  "type": "income" | "expense",
  "amount": Number,
  "category": String,
  "date": Date,
  "createdAt": Date
}
```

### (Optional) User Model

```json
{
  "name": String,
  "email": String,
  "password": String
}
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description                             |
| ------ | ----------------- | --------------------------------------- |
| POST   | /transactions     | Create a new transaction                |
| GET    | /transactions     | Get all transactions                    |
| DELETE | /transactions/:id | Delete a transaction                    |
| GET    | /summary          | Get total income, expenses, and balance |

---

## 🎨 UI Structure

* **Dashboard**

  * Displays balance, income, and expenses
* **Add Transaction Form**

  * Input for amount, type, category, and date
* **Transaction List**

  * Displays all transactions with delete option

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/budget-tracker.git
cd budget-tracker
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the backend folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

### 4. Run the Application

#### Start Backend

```bash
npm run dev
```

#### Start Frontend

```bash
npm start
```

---

## 🧮 Business Logic

* **Total Income** = Sum of all transactions where type = "income"
* **Total Expenses** = Sum of all transactions where type = "expense"
* **Balance** = Income − Expenses

---

## 🧪 Testing

You can test API endpoints using:

* Postman
* Thunder Client (VS Code extension)

---

## 📂 Folder Structure

```
budget-tracker/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.js
```

---

## 🔒 Best Practices

* Input validation for all API requests
* Proper error handling
* Use environment variables for sensitive data
* Follow clean code structure
* Separate concerns (routes, controllers, models)

---

## 📈 Future Improvements

* Add authentication & authorization
* Implement charts (e.g., Chart.js)
* Export reports (PDF/CSV)
* Add budgeting goals and alerts
* Deploy to cloud (Vercel, Render, MongoDB Atlas)



## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.



## 👨‍💻 Author

Developed by robertndayiragije

---

## 💡 Acknowledgements

* Open-source community
* Online learning resources
* Documentation from React, Node.js, and MongoDB
