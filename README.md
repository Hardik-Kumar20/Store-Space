# Store-Space

## Overview
This application helps to find the places where we can keep our items and things for some days.

## Problem Statement
Many people face difficulties when shifting from one apartment or city to another, especially after their lease ends. During this transition period, they often need a safe and temporary place to store their belongings while searching for a new home. Traditional storage warehouses can be expensive, far away, and inconvenient for short-term use. At the same time, many individuals have unused spaces such as garages, spare rooms, basements, or empty storage areas that remain unutilized. There is a need for a platform that connects people who require temporary storage with those who have available space, providing an affordable, flexible, and community-driven storage solution.

## Features
Temporary Storage Booking – Users can book storage spaces for short-term or long-term needs during shifting or relocation.
Peer-to-Peer Space Sharing – People with unused rooms, garages, basements, or spare areas can list their spaces for rent.
Location-Based Search – Find nearby storage spaces based on city, area, or distance for convenience.
Secure Listings – Verified users and detailed space information ensure trust and safety.
Flexible Pricing – Hosts can set their own pricing, and users can choose options based on budget.
Easy Booking System – Simple process to view, select, and reserve storage spaces.
Availability Management – Hosts can manage dates, occupancy, and storage duration.
User Reviews & Ratings – Helps users choose reliable hosts based on previous experiences.
Dashboard for Hosts – Manage listings, bookings, earnings, and customer requests.
Dashboard for Renters – Track bookings, payment history, and storage details.

## Tech Stack
Frontend
React.js – For building the user interface

Backend
Node.js – Runtime environment for server-side development
Express.js – For building REST APIs and backend services

Database
MongoDB Atlas – For storing user data, listings, bookings, and transactions
Mongoose – ODM for MongoDB integration

Authentication & Security
JWT (JSON Web Tokens) – Secure user authentication
Passport.js – Authorization and authentication strategies
Bcrypt.js – Password hashing for security

Maps & Location Services
Geolocation API – For detecting nearby spaces

Cloud & Media Storage
Cloudinary – For storing images of listed spaces

Deployment
Vercel – Frontend deployment

Additional Tools
Git & GitHub – Version control and collaboration
Postman – API testing


## Installation & Setup

### Clone Repository

git clone https://github.com/yourusername/StoreSpace.git
cd StoreSpace

---

### Backend Setup

cd backend
npm install

Create .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start backend:

npm run dev

---

### Frontend Setup

Open new terminal:

cd frontend
npm install
npm run dev

---

### Open Browser

Visit:

http://localhost:5173


## Folder Structure

StoreSpace
├── artillery-test.yml
├── backend
│   ├── backindex.js
│   ├── cloudinary.js
│   ├── db.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   ├── authorize.js
│   │   └── upload.js
│   ├── package.json
│   ├── Routers
│   │   ├── adminRoute.js
│   │   ├── authRouter.js
│   │   ├── availability.js
│   │   ├── bookingRoute.js
│   │   ├── contact.js
│   │   ├── dashboard.js
│   │   ├── listing.js
│   │   ├── loginIndex.js
│   │   ├── logout.js
│   │   ├── mainPage.js
│   │   ├── signup.js
│   │   └── uploadImg.js
│   └── Schemas
│       ├── availabilitySchema.js
│       ├── bookingSchema.js
│       ├── listingSchema.js
│       ├── mainPageSchema.js
│       └── userSchema.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── dashboard
│   │   │   ├── listings
│   │   │   └── shared components
│   │   │
│   │   ├── pages
│   │   │   ├── Home
│   │   │   ├── Dashboard
│   │   │   ├── Login / Signup
│   │   │   ├── Booking
│   │   │   └── Listings
│   │   │
│   │   ├── assets
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── Dockerfile
└── README.md


## Screenshots
![Home Page](https://github.com/user-attachments/assets/f9aea4b9-ba6f-48e7-8121-313acc19f422)
![Dashboard](https://github.com/user-attachments/assets/c09732e2-d409-4e31-85df-977547e8ca60)


## Author
Hardik Kumar
