import React, { useState } from "react";
import "../../Styling/Cart.module.css"; // Import your CSS file for styling

function Cart() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product Name 1",
      price: 50,
      quantity: 1,
      image:
        "https://images.pexels.com/photos/51929/medications-cure-tablets-pharmacy-51929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Product Name 2",
      price: 40,
      quantity: 1,
      image:
        "https://images.pexels.com/photos/51929/medications-cure-tablets-pharmacy-51929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const getTotalPrice = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleProceedToBuy = () => {
    alert(`Proceeding to buy. Total amount: $${getTotalPrice()}`);
  };

  return (
    <div className="cart-container">
      {products.map((product) => (
        <div className="product-item" key={product.id}>
          <img
            src={`${product.image}`}
            alt={`Product ${product.id}`}
            style={{ height: 100 }}
          />
          <div className="product-details">
            <div className="product-name">{product.name}</div>
            <div className="product-price">${product.price}</div>
          </div>
          <input
            type="number"
            value={product.quantity}
            min={1}
            onChange={(e) =>
              updateQuantity(product.id, parseInt(e.target.value))
            }
          />
        </div>
      ))}
      <div className="total-price">Total: ${getTotalPrice()}</div>
      <button className="proceed-btn" onClick={handleProceedToBuy}>
        Proceed to Buy
      </button>
    </div>
  );
}

export default Cart;
