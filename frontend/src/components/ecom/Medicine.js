import React from "react";
import styles from "../../Styling/MedicineHome.module.css";
import { useNavigate } from "react-router-dom";

const ProductList = [
  {
    id: 1,
    name: "Pain Relief Tablet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "$10",
    stock: 50,
    image:
      "https://images.pexels.com/photos/51929/medications-cure-tablets-pharmacy-51929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Cold & Cough Syrup",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "$15",
    stock: 30,
    image:
      "https://images.pexels.com/photos/5858861/pexels-photo-5858861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "First Aid Kit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: "$30",
    stock: 20,
    image:
      "https://images.pexels.com/photos/5125690/pexels-photo-5125690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Product = ({ product }) => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className={styles.productCard}>
      <img
        className={styles.productImage}
        src={product.image}
        alt={product.name}
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.productPrice}>Price: {product.price}</p>
        <p className={styles.productStock}>Stock: {product.stock}</p>
        <button
          className={styles.addToCart}
          onClick={() => {
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <div className={styles.productGrid}>
      {ProductList.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

const Medicines = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Medicine Shop</h1>
      <ProductGrid />
    </div>
  );
};

export default Medicines;
