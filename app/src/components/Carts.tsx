import { useEffect, useState, useCallback } from "react";
import { Carts } from "../interfaces/ICart";
import axios from "axios";
import "../scss/Carts.scss";
import { Link } from "react-router-dom";
const UserCarts = (props: any) => {
    const [userCarts, setUserCarts] = useState<Carts>({ carts: [] });
    const [userID, setUserID] = useState<number>(1);
    const [itemID, setItemID] = useState<number>(1);
    const [itemCount, setItemCount] = useState<number>(1);

    const deleteCart = useCallback(async (cartId: number) => {
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
    }, []);

    const addCart = useCallback(async () => {
        axios
            .post(
                "https://dummyjson.com/carts/add",
                {
                    userId: userID,
                    products: [
                        {
                            id: itemID,
                            quantity: itemCount,
                        },
                    ],
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                if (response.data) {
                    setUserCarts((prevState) => ({
                        ...prevState,
                        carts: [...prevState.carts, response.data],
                    }));
                }
                console.log(response.data);
            })
            .catch((error) => console.error(error));
    }, [userID, itemID, itemCount]);

    useEffect(() => {
        setUserCarts((prevState) => (prevState = props.userCarts));
    }, [props.userCarts]);

    return (
        <>
            <section className="panel">
                <div className="panel-add">
                    <input
                        type="number"
                        max={100}
                        onChange={(e) => {
                            if (parseInt(e.target.value) > 100) {
                                e.target.value = "100";
                            }
                            setUserID((prevState) => (prevState = parseInt(e.target.value)));
                        }}
                    />
                    <input
                        type="number"
                        onChange={(e) =>
                            setItemID((prevState) => (prevState = parseInt(e.target.value)))
                        }
                    />
                    <input
                        type="number"
                        onChange={(e) =>
                            setItemCount(
                                (prevState) => (prevState = parseInt(e.target.value))
                            )
                        }
                    />
                    <button onClick={() => addCart()}>Add cart</button>
                </div>
                <div className="panel-remove"></div>
            </section>
            <section className="container-carts">
                {userCarts.carts.map((userCart) => (
                    <div key={userCart.id} className="bar">
                        <p className="text">Cart: {userCart.id}</p>
                        <div className="buttons">
                            <button
                                className="delete-button"
                                onClick={() => deleteCart(userCart.id)}
                            >
                                Delete
                            </button>
                            <button>
                                <Link className="check-button" to={`cart/${userCart.id}`}>
                                    Check
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default UserCarts;
