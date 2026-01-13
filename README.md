# Full-Stack E-commerce Website with Admin Panel

## Project Overview
This project is a feature-rich full-stack e-commerce platform designed to provide a seamless online shopping experience for users. The platform includes an intuitive user interface for customers and a powerful admin panel for managing products, orders, and user accounts.

---

## Features

### User Features
- User-friendly interface for browsing and purchasing products.
- Secure user authentication and account management.
- Dynamic product search and filtering.
- Shopping cart and checkout functionality.
- Order tracking and history.

### Admin Panel Features
- Product management: Add, edit, delete, and view products.
- Order management: View and update order statuses.
- User management: Manage customer accounts.
- Dashboard with key metrics and analytics.

---

## Technologies Used

### Frontend
- **React.js**: For building the interactive user interface.
- **Redux**: State management for the application.
- **CSS/SCSS**: Styling the application.

### Backend
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.

### Admin Panel
- **React.js**: For the admin interface.
- **Material-UI**: UI component library for a professional design.

---

## Installation and Setup

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or cloud instance)
- npm or yarn

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Full-Stack-E-commerce-With-Admin-Panel.git
   cd Full-Stack-E-commerce-With-Admin-Panel
   ```

2. **Install dependencies for the backend**
   ```bash
   cd Backend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `Backend` folder and configure the following:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```

5. **Install dependencies for the frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

6. **Start the frontend development server**
   ```bash
   npm start
   ```

7. **Run the admin panel**
   ```bash
   cd ../Admin
   npm install
   npm start
   ```

Access the application:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- Admin Panel: [http://localhost:3001](http://localhost:3001)

---

## Folder Structure
```
Full-Stack-E-commerce-With-Admin-Panel/
|
├── Admin/         # Admin panel code
├── Backend/       # Server-side code and APIs
├── Frontend/      # Client-side code
├── .gitignore     # Git ignore file
├── README.md      # Project documentation
```

---

## License
This project is licensed under the [MIT License](LICENSE).



