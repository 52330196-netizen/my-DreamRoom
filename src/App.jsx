import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Wishlist from "./components/Wishlist.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import LoginSignup from "./components/LoginSignup.jsx";
import AboutUs from "./components/AboutUs.jsx";

const products = [
  {
    id: "scented-soy-candle",
    slug: "scented-soy-candle",
    name: "Scented Soy Candle",
    category: "Candles",
    material: "Soy wax",
    description:
      "A slow-burning soy candle with a soft, welcoming vanilla fragrance for the quieter moments of your day.",
    price: 24,
    detail: "Warm vanilla · 220 g",
    image: "/images/scented-soy-candle.jpg",
    images: [
      "/images/scented-soy-candle.jpg",
      "/images/scented-soy-candle.jpg",
      "/images/scented-soy-candle.jpg"
    ],
    rating: 4.8,
    reviews: 36,
    featured: true
  },
  {
    id: "rattan-table-lamp",
    slug: "rattan-table-lamp",
    name: "Rattan Table Lamp",
    category: "Lighting",
    material: "Natural rattan",
    description:
      "A little glow for your quiet corners. Handwoven rattan and a soft linen shade bring a warm, gentle light to bedsides and reading nooks.",
    price: 68,
    detail: "Natural rattan",
    image: "/images/rattan-table-lamp.jpg",
    images: [
      "/images/rattan-table-lamp.jpg",
      "/images/rattan-table-lamp-detail.jpg",
      "/images/rattan-table-lamp-shade.jpg"
    ],
    rating: 4.9,
    reviews: 28,
    featured: true
  },
  {
    id: "linen-cushion-cover",
    slug: "linen-cushion-cover",
    name: "Linen Cushion Cover",
    category: "Cushions & Throws",
    material: "Linen",
    description:
      "Relaxed, breathable linen in a soft oat shade. A thoughtful finishing touch for your favourite sofa or reading chair.",
    price: 32,
    detail: "Oat · 50 × 50 cm",
    image: "/images/linen-cushion-cover.jpg",
    images: ["/images/linen-cushion-cover.jpg"],
    rating: 4.7,
    reviews: 19,
    featured: true
  },
  {
    id: "potted-eucalyptus-plant",
    slug: "potted-eucalyptus-plant",
    name: "Potted Eucalyptus Plant",
    category: "Plants",
    material: "Ceramic & greenery",
    description:
      "A little greenery to bring a fresh, calm feeling to shelves, side tables, and sunny windowsills.",
    price: 18,
    detail: "Indoor plant",
    image: "/images/potted-eucalyptus-plant.jpg",
    images: ["/images/potted-eucalyptus-plant.jpg"],
    rating: 4.8,
    reviews: 22,
    featured: true
  },
  {
    id: "stoneware-bud-vase",
    slug: "stoneware-bud-vase",
    name: "Stoneware Bud Vase",
    category: "Accessories",
    material: "Stoneware",
    description:
      "A softly sculptural stoneware vase, made for a single stem or simply enjoyed on its own.",
    price: 36,
    detail: "Ivory glaze",
    image: "/images/stoneware-bud-vase.jpg",
    images: ["/images/stoneware-bud-vase.jpg"],
    rating: 4.6,
    reviews: 12
  },
  {
    id: "woven-storage-basket",
    slug: "woven-storage-basket",
    name: "Woven Storage Basket",
    category: "Accessories",
    material: "Natural seagrass",
    description:
      "Handwoven texture meets everyday usefulness in a basket for throws, books, or little bits and pieces.",
    price: 42,
    detail: "Natural seagrass",
    image: "/images/woven-storage-basket.jpg",
    images: ["/images/woven-storage-basket.jpg"],
    rating: 4.8,
    reviews: 17
  },
  {
    id: "cotton-knit-throw",
    slug: "cotton-knit-throw",
    name: "Cotton Knit Throw",
    category: "Cushions & Throws",
    material: "Cotton",
    description:
      "A softly textured cotton throw for slow mornings, cosy evenings, and everything in between.",
    price: 56,
    detail: "Warm oatmeal",
    image: "/images/cotton-knit-throw.jpg",
    images: ["/images/cotton-knit-throw.jpg"],
    rating: 4.9,
    reviews: 24
  },
  {
    id: "travertine-trinket-tray",
    slug: "travertine-trinket-tray",
    name: "Travertine Trinket Tray",
    category: "Accessories",
    material: "Natural stone",
    description:
      "A naturally varied stone tray to keep jewellery and everyday keepsakes close at hand.",
    price: 28,
    detail: "Natural stone",
    image: "/images/travertine-trinket-tray.jpg",
    images: ["/images/travertine-trinket-tray.jpg"],
    rating: 4.7,
    reviews: 15
  }
];

const categories = [
  "All Decor",
  "Candles",
  "Lighting",
  "Cushions & Throws",
  "Plants",
  "Accessories"
];

function readStorage(key, initialValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  } catch {
    return initialValue;
  }
}

function App() {
  const [cart, setCart] = useState(() => readStorage("dream-room-cart", []));
  const [wishlist, setWishlist] = useState(() =>
    readStorage("dream-room-wishlist", [])
  );

  useEffect(() => {
    localStorage.setItem("dream-room-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dream-room-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(productId, quantity = 1) {
    const amount = Math.max(1, Number(quantity) || 1);

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === productId);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [...currentCart, { id: productId, quantity: amount }];
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  function updateCartQuantity(productId, quantity) {
    const amount = Math.max(1, Number(quantity) || 1);

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: amount } : item
      )
    );
  }

  function toggleWishlist(productId) {
    setWishlist((currentWishlist) =>
      currentWishlist.includes(productId)
        ? currentWishlist.filter((id) => id !== productId)
        : [...currentWishlist, productId]
    );
  }

  return (
    <BrowserRouter>
      <Navbar cart={cart} wishlist={wishlist} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/shop"
          element={
            <Shop
              products={products}
              categories={categories}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/product/:slug"
          element={
            <ProductDetails
              products={products}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              products={products}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <ShoppingCart
              products={products}
              cart={cart}
              setCart={setCart}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          }
        />

        <Route path="/account" element={<LoginSignup />} />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="*"
          element={
            <Home
              products={products}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;