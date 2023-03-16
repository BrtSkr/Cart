import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Graph from "./components/Graph";

//Interfaces
import { Product, Cart, Carts } from "./interfaces/ICart";

function App() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState<Carts>({ carts: [] });

  useEffect(() => {
    axios.get("https://dummyjson.com/carts").then((res) => {
      setCart(prevState => prevState = { carts: res.data.carts });
    });
  }, []);


  return (
    <div className="App">
      <Graph cartData={cart}/>
      {/* {cart.carts ? (
        
        cart.carts.map((item, i) => (
          
          <>

            <div>{item.id}</div>
            <ul>
              {item.products.map(product => (
                <li key={product.id}>
                  {product.title} - {product.price}$
                  {product.discountedPrice}$
                  {product.discountPercentage}%
                </li>
              ))}
            </ul>
          </>
        ))
      ) : (
        <div>Loading...</div>
      )} */}

      {/* {cart.carts.map((item, i) => (
  <>
    <div>{item.id}</div>
    <ul>
      {item.products.map(product => (
        <li key={product.id}>
          {product.title} - {product.price}
        </li>
      ))}
    </ul>
  </>
))} */}
    </div>
  );
}

export default App;
