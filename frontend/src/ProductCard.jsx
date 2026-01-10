import "./shop.css";

function ProductCard({ image, title, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <div className="columnName">
        <h3>{title}</h3>
      </div>
      <div class="columnPrice">
        <h3>{price} zł</h3>
      </div>
    </div>
  );
}

export default ProductCard;
