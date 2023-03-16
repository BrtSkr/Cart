import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./scss/App.scss"
import axios from "axios";
import { Line } from "react-chartjs-2";
import Graph from "./components/Graph";
import UserCarts from "./components/Carts";
//Interfaces
import { Product, Cart, Carts } from "./interfaces/ICart";

const App = () => {

  const [cart, setCart] = useState<Carts>({ carts: [] });
  const [userCarts, setUserCarts] = useState();
  useEffect(() => {
    axios.get("https://dummyjson.com/carts").then((res) => {
      setCart(prevState => prevState = { carts: res.data.carts });
    });
  }, []);


  return (
    <div className="app">
      <UserCarts userCarts={cart}/>
      <Graph cartData={cart}/>
    </div>
  );
}

export default App;
