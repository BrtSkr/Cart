import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Product, Cart, Carts } from "./interfaces/ICart";
import UserCarts from "./components/Carts";
import Graph from "./components/Graph";
import "./scss/App.scss";

const App: React.FC = () => {
  const [cart, setCart] = useState<Carts>({ carts: [] });

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await axios.get("https://dummyjson.com/carts");
      setCart({ carts: response.data.carts });
    };
    fetchCartData();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<UserCarts userCarts={cart} />} />
        <Route path="cart/:cartID" element={<Graph />} />
      </Routes>
    </div>
  );
};

export default App;
