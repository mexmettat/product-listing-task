# 💍 Product Listing Case Study – Full Stack Project

This project is a **Full Stack Product Listing Application** developed for the Renart Full Stack Development Internship application process. It fulfills all requirements outlined in the case study brief including backend API, frontend interface, filtering, dynamic pricing, and responsive design.

## 🛠 Technologies Used

### Frontend
- Vanilla JavaScript (No framework)
- HTML5 / CSS3
- Fully Responsive Design
- Dynamic Carousel & Swipe Support
- Color Picker for product variants
- Real-time filtering and searching

### Backend
- Node.js
- Express.js
- Axios (for real-time gold price API)
- RESTful API with query filters
- JSON data source
- Deployed on Render

## 🌐 Live Links

- 🔗 **Live App:** https://product-listing-task-eight.vercel.app
- 🧠 **GitHub Repository:** https://github.com/mexmettat/product-listing-task
- 🌍 **API Endpoint (Render):** https://product-listing-task-kzem.onrender.com/products

## 📦 Features

### ✅ Backend API
- Serves products from `products.json`
- Calculates **dynamic price** using:
  Price = (popularityScore + 1) * weight * goldPrice
- Retrieves real-time gold price (USD/g) using Coingecko API (with fallback)
- Query filtering support:
  - ?minPrice=
  - ?maxPrice=
  - ?minScore=

### ✅ Frontend
- Product cards rendered from backend API
- Color picker: Yellow / Rose / White gold image switch
- Popularity shown as ⭐ rating (half stars supported)
- Carousel with arrow + swipe support
- Search by product name (client-side)
- Filtering by:
  - Minimum price
  - Maximum price
  - Minimum popularity score
- Fully responsive layout

## 📄 Case Study Requirements Fulfilled

- ✅ Mock REST API from JSON file
- ✅ Dynamic pricing with real-time gold rate
- ✅ Product UI with color/image switcher
- ✅ Popularity star rating out of 5
- ✅ Filtering by price & popularity
- ✅ Mobile + Desktop responsive UI
- ✅ Search by name
- ✅ Arrow and swipe-based carousel

## 👤 Developed By

**Mehmet Tat**  
- Linkedn: https://www.linkedin.com/in/mehmettat/ 
- GitHub: https://github.com/mexmettat

---

Thank you for the opportunity!  
Please feel free to reach out for any questions.
