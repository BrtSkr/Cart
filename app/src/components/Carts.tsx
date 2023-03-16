import { useEffect, useState } from "react";
import { Carts } from "../interfaces/ICart";
import axios from "axios";
import "../scss/App.scss";

const UserCarts = (props: any) => {
    const [userCarts, setUserCarts] = useState<Carts>({ carts: [] });
    const deleteCart = async (cartId: number) => {
        try {
            const response = await axios.delete(
                `https://dummyjson.com/carts/${cartId}`
            );
            if (response.data.isDeleted) {
                // Update state to remove deleted item
                setUserCarts((prevState) => ({
                    ...prevState,
                    carts: prevState.carts.filter((item) => item.id !== cartId),
                }));
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addCart = async (cartId: number) => {
        try {
            const response = await axios.delete(
                `https://dummyjson.com/carts/${cartId}`
            );
            if (response.data.isDeleted) {
                // Update state to remove deleted item
                setUserCarts((prevState) => ({
                    ...prevState,
                    carts: prevState.carts.filter((item) => item.id !== cartId),
                }));
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setUserCarts((prevState) => (prevState = props.userCarts));
    }, [props.userCarts]);
    
    return (
        <>
        <section className="panel">
        <div className="panel-add">
            <input type="text" />
            <input type="text" />
        </div>
        <div className="panel-remove">
        
        </div>
        </section>
            <section className="container-carts">
                {userCarts.carts.map((userCart) => (
                    <>
                        {console.log(userCart)}
                        <div className="container--carts-cart">
                            Cart {userCart.id}
                            <button onClick={() => deleteCart(userCart.id)}>Delete</button>
                        </div>
                    </>
                ))}
            </section>
        </>
    );
};

export default UserCarts;
