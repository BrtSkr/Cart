import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Cart, Carts, ChartData } from "../interfaces/ICart";
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
    const [data, setData] = useState(props.data);
    const [products, setProducts] = useState(props.products)
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
        setData(props.data);
        setProducts(props.products);
        //console.log(products)
        //console.log(products.title)
        console.log(products.products)
        setChartData(prevState => ({
            ...prevState,
            labels: prevState.labels.concat(props.products.products.map((product: any) => product.title))
        }));
        console.log(chartData)
        // Cleanup function
        return () => {
            setData(null);
            setProducts(null);
            setChartData({
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
        };
    }, [props.data, props.products]);

    return (
        <>

            <Line data={chartData} />
        </>
    )
}

const Graph = (props: any) => {
    const [cart, setCart] = useState<Carts>({ carts: [] });
    const [products, setProducts] = useState<string[]>([]);
    const [prices, setPrices] = useState<number[]>([]);
    const [test, setTest] = useState([]);

    useEffect(() => {
        // Update cart state
        setCart(props.cartData);
        // cart.carts.forEach(el =>{
        //     console.log(el)
        // })


    }, [props.cartData]);
    let labels = [];

    return (
        <>

            {cart.carts.map((item, i) => (
                <>
                    {/* {console.log(item.products)} */}
                    <GraphData products={item} />

                    <div>{item.id}</div>
                    <ul>


                        {item.products.map(product => (
                            <li key={product.id}>

                                {product.title} - {product.price}$

                            </li>
                        ))}
                    </ul>
                </>
            ))}
        </>
    );
};

export default Graph;
