import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Cart, Carts, ChartData } from "../interfaces/ICart";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import '../scss/Graph.scss'
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register the category scale with Chart.js
Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GraphData = (props: any) => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                label: "Price",
                data: [1, 2, 3, 1],
                fill: false,
                backgroundColor: "rgb(255,99,132)",
                borderColor: "rgba(255,99,132,.8)",
            },
            {
                label: "Discounted Price",
                data: [],
                fill: false,
                backgroundColor: "rgb(54,162,235)",
                borderColor: "rgba(54,162,235,.8)",
            },
        ],
    });
    useEffect(() => {

        setChartData((prevState) => ({
            ...prevState,
            labels: prevState.labels.concat(
                props.products.products.map((product: any) => product.title)
            ),
            datasets: [
                {
                    ...prevState.datasets[0],
                    data: props.products.products.map((product: any) => product.price),
                },
                {
                    ...prevState.datasets[1],
                    data: props.products.products.map(
                        (product: any) => product.discountedPrice
                    ),
                },
            ],
        }));
     
        // Cleanup function
        return () => {
            setChartData({
                labels: [],
                datasets: [
                    {
                        label: "Price",
                        data: [],
                        fill: false,
                        backgroundColor: "rgb(255,99,132)",
                        borderColor: "rgba(255,99,132,.8)",
                    },
                    {
                        label: "Discounted Price",
                        data: [],
                        fill: false,
                        backgroundColor: "rgb(54,162,235)",
                        borderColor: "rgba(54,162,235,.8)",
                    },
                ],
            });
        };
    }, [props.products]);

    return (
        <>
            <Line data={chartData} />
        </>
    );
};

const Graph = (props: any) => {
    const {cartID} = useParams();
    const [cart, setCart] = useState<Cart>();

    useEffect(() => {
        axios.get(`https://dummyjson.com/carts/${cartID}`).then((res) => {
            console.log(res.data.products)
            setCart(prevState => prevState =  res.data );
          });
    }, [cartID]);

    return (
        <>
            <Link  to={'/'}>
                <button className="back-button">Go back</button>
            </Link>
            <div className="cart">
                {cart?.products?.map(item => (
                    <>
                    <div key={item.id} className="cart-items">
                        <p>Item: {item.title}</p>
                        <p>Price: {item.price}$</p>
                        <p>Discounted price: {item.discountedPrice}$</p>
                    </div>
                    </>
                ))}
                {cart === undefined ? <div>Cart is undefined/empty/data is different</div> : <GraphData products={cart}/>}
              
            </div>
        </>
    );
};

export default Graph;
