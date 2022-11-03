import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./Product";

const url = `https://serverless-functions-api-v1.netlify.app/api/2-basic-api`;
export const Basic = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios(url);
      setProducts(data);
    } catch (error) {
      throw new Error("Couldn't fetch the products!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="section section-center">
      <div className="title">
        <h2>Basic Setup</h2>
        <div className="title-underline"></div>
      </div>
      <div className="products">
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
};
