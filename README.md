# Dream Room - React Web Application

A warm, responsive React web application for browsing thoughtful home décor and cozy living essentials.

## 📋 Project Description

Dream Room is a frontend e-commerce website built with React. Users can:

- Browse home décor products and product details
- Search, filter, and sort products
- Add products to their wishlist
- Add products to the shopping cart and update quantities
- View cart totals and apply a demo promo code
- Use frontend-only login and signup forms
- Explore the Dream Room brand story
- Use the website on desktop and mobile devices

## 🚀 Live Demo

Visit the live application: [Dream Room](https://my-dreamroom.vercel.app/)

## 🛠️ Technologies Used

- **Frontend Framework**: React
- **Routing**: React Router DOM
- **Styling**: Custom CSS
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Storage**: Browser `localStorage`
- **Build Tool**: Vite

## 📁 Project Structure

```text
dream-room/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    └── components/
        ├── AboutUs.jsx
        ├── AboutUs.css
        ├── Footer.jsx
        ├── Footer.css
        ├── Home.jsx
        ├── Home.css
        ├── LoginSignup.jsx
        ├── LoginSignup.css
        ├── Navbar.jsx
        ├── Navbar.css
        ├── ProductDetails.jsx
        ├── ProductDetails.css
        ├── Shop.jsx
        ├── Shop.css
        ├── ShoppingCart.jsx
        ├── ShoppingCart.css
        ├── Wishlist.jsx
        └── Wishlist.css
```

Product and category data is kept in `src/App.jsx` and passed to the components using props.

## 🖼️ Images

Place the individual image files inside `public/images/` using these filenames:

```text
wood-nav.jpg
dream-room-logo.png
hero-bedroom.jpg
account-bedroom.jpg
about-bedroom.jpg
artisan-pottery.jpg
scented-soy-candle.jpg
rattan-table-lamp.jpg
rattan-table-lamp-detail.jpg
rattan-table-lamp-shade.jpg
linen-cushion-cover.jpg
potted-eucalyptus-plant.jpg
stoneware-bud-vase.jpg
woven-storage-basket.jpg
cotton-knit-throw.jpg
travertine-trinket-tray.jpg
```

The image assets are added separately. Make sure each filename matches the paths used in the code.

## 🚀 Installation

Install [Node.js](https://nodejs.org/) if it is not already installed.

Open the project folder in VS Code, open the terminal, and run:

```bash
npm install
```

## ▶️ Run the Application

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal in your browser.

## 🏗️ Build the Application

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🛒 Demo Functionality

- Cart and wishlist contents are saved in browser `localStorage`.
- Enter `HOME10` in the cart promo-code field to apply the demo discount.
- Login and signup forms validate input but do not authenticate users or save passwords.
- Checkout is a frontend demonstration and does not process payments.