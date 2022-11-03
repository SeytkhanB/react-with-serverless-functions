export const Product = ({ image: { url }, price, name }) => {
  return (
    <article className="product">
      <img src={url} alt={name} />
      <div className="info">
        <h5>{name}</h5>
        <h5 className="price">${price}</h5>
      </div>
    </article>
  );
};
