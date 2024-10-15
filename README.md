# 🏪 Point of Sale System (POS)

Welcome to **Point of Sale System**, This project is a comprehensive solution for managing retail sales, inventory, and customer loyalty programs. Built with modern web technologies, it streamlines various aspects of running a retail business, from managing stock and sales to applying discount programs and generating insightful reports.

## ✨ Features

- **Sales Management**: Efficiently process sales, track transactions, and issue receipts.
- **Inventory Management**: Keep track of stock levels, add new products, and manage product categories.
- **Price Lists**: Create and manage price lists for special promotions or bulk purchases.
- **Loyalty Programs**: Implement customer loyalty programs, including discount coupons and "Buy X, Get Y" offers.
- **Reporting**: Generate reports to analyze sales data, inventory status, and customer behavior.

## 🛠️ Tech Stack

- **Frontend**: Angular, Tailwind CSS
- **Backend**: NestJS, TypeORM
- **Database**: PostgreSQL

## 🎯 Things I Learned

Working on this project has been an incredible learning experience. Some of the key areas I explored include:

- **Database Migrations**: Understanding how to manage database schema changes effectively using TypeORM.
- **Tree Entities**: Leveraging TypeORM's tree structures to implement nested categories, which allowed for efficient storage and retrieval of hierarchical data.
- **API Versioning**: Implementing versioning strategies to support backward compatibility.
- **Rate Limiting**: Protecting the API from overuse by limiting the number of requests per user.
- **Swagger Documentation**: Using Swagger to generate clear and interactive API documentation.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Angular CLI](https://angular.io/cli)

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/YassineBenAbdelaziz/point-of-sale-system.git
   cd point-of-sale-system
   ```

2. **Install Backend Dependencies (NestJS)**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies (Angular)**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   - Follow the `.env.example` file to set up your environment variables.
   - Make sure to configure the database settings and other necessary variables.

5. **Run the Application**

   - **Backend**:
     ```bash
     cd backend
     npm run start:dev
     ```
   - **Frontend**:
     ```bash
     cd ../frontend
     ng serve
     ```

## 📝 To-Do List

This project is still under development. Here are some features and enhancements that are planned for the future:

- [ ] Add Authentication and Authorization Guards for enhanced security.
- [ ] Begin Frontend Development for the admin dashboard and user interface.
- [ ] Integrate a Payment Service for handling transactions securely.
- [ ] Improve Error Handling and Logging Mechanisms.

---

Thank you for checking out the Point of Sale System project! 🙌
