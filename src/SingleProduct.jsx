import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Loading } from "./components/Loading";

const url = `/api/products`;

export const SingleProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setPorduct] = useState(null);
  const { productID } = useParams();

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${url}?id=${productID}`);
      setPorduct(data.fields);
    } catch (err) {
      throw new Error("Couldn't fetch a single product!");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const { name, image, desc, price } = product;
  return (
    <section className="section section-center">
      <Link className="link" to="/">
        Back Home
      </Link>
      <div>
        <div className="title">
          <h2>{name}</h2>
          <div className="title-underline"></div>
        </div>
        <article className="single-product">
          <img className="single-product-img" src={image[0].url} alt={name} />
          <div>
            <h5>{name}</h5>
            <h5 className="price">${price}</h5>
            <p>{desc}</p>
          </div>
        </article>
      </div>
    </section>
  );
};
