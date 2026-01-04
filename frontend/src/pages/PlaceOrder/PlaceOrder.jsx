import { useContext, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // street: "",
    address: "",
    city: "",
    // district: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 0,     /* delivery charge at the end 0 */
    };

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });

      if (response.data.success) {
        alert("Order Placed Successfully! (Cash on Delivery)");
        navigate("/myorders");  // Redirect to orders page
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" />
        {/* <textarea className="address-textarea" required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" /> */}
        <textarea className="address-textarea" required name="address" onChange={onChangeHandler} value={data.address} type="text" placeholder="Address" />
        <div className="multi-fields">
          <textarea className="address-textarea" required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          {/* <textarea className="address-textarea" required name="district" onChange={onChangeHandler} value={data.district} type="text" placeholder='District' /> */}
        </div>
        <div className="multi-fields">
          {/* <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' /> */}
          {/* <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' /> */}
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} TK</p>
            </div>
            <hr className="hr" />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 0} TK</p>    {/* delivery charge at the 3rd end 0 */}
            </div>
            <hr className="hr" />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 0} TK</b>   {/* delivery charge at the end 0 */}
            </div>
                      <button type="submit">PLACE ORDER</button>
          </div>
          {/* <button type="submit">PLACE ORDER</button> */}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

