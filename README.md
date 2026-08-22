# GearHub

GearHub is a web-based equipment rental application built as a Full Stack Web Development final project.

The application allows users to browse photography equipment, add items to a cart, create bookings, make payments using Midtrans, and manage their rental bookings. Administrators can manage the equipment and monitor booking data through the admin dashboard.

---

## 📌 Project Overview

GearHub is designed to simplify the equipment rental process.

Users can:

- Browse available equipment
- View equipment details
- Add equipment to a cart
- Select rental dates
- Create bookings
- Make payments using Midtrans
- View their booking history
- Cancel pending bookings

The system also provides role-based access for customers and administrators.

---

## 🎯 Problem Statement

Equipment rental processes are often handled manually, making it difficult for customers to check equipment availability, calculate rental periods, manage bookings, and complete payments.

GearHub aims to provide a centralized web application that makes the rental process easier and more organized.

The application helps solve problems such as:

- Difficulty browsing available rental equipment
- Manual booking processes
- Lack of centralized booking management
- Difficulty tracking rental status
- Manual payment confirmation
- Limited separation between customer and administrator access

---

## ✨ Features

### Customer Features

- User Registration
- User Login and Logout
- Authentication
- Browse Equipment
- View Equipment Details
- Add Equipment to Cart
- Select Pickup and Return Dates
- Checkout
- Create Booking
- Payment Integration with Midtrans
- View My Bookings
- View Booking Status
- Cancel Pending Booking

### Admin Features

- Admin Authentication
- Admin Dashboard
- Manage Equipment
- Manage Equipment Categories
- View Booking Data
- Role-Based Access

---

## 🔐 Authentication & Authorization

GearHub uses authentication to verify user identity and authorization to control access based on user roles.

There are two main roles:

### Customer

Customers can access:

- Dashboard
- Equipment
- Cart
- Checkout
- My Bookings
- Payment

### Admin

Administrators can access:

- Admin Dashboard
- Equipment Management
- Category Management
- Booking Management

Users are redirected to different dashboards based on their role after login.

---

## 💳 Payment Integration

GearHub integrates with **Midtrans Snap** for payment processing.

Payment flow:

1. User creates a booking.
2. The system creates a payment record.
3. Laravel generates a Midtrans Snap Token.
4. The Snap payment popup is displayed to the user.
5. The user completes the payment.
6. Midtrans sends a payment notification to the backend.
7. The system validates the Midtrans signature.
8. Payment status is updated.
9. The booking status is updated to `approved` when payment is successful.

During local development, **ngrok** can be used to expose the Laravel application for Midtrans payment notifications.

---

## 🛠 Technology Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- SweetAlert2

### Backend

- Laravel
- Laravel Sanctum
- PHP

### Database

- MySQL

### Payment Gateway

- Midtrans Snap

### Development Tools

- Git
- GitHub
- Postman
- XAMPP
- Composer
- npm
- ngrok

---

# 📂 Project Structure

This project consists of two main applications:

```text
GearHub
│
├── gearhub-web/          # React Frontend
│
└── gearhub-api/          # Laravel Backend
