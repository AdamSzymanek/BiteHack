import ProductCard from "./ProductCard.jsx";
import "./shop.css";
import productImg from "./assets/product.png";

const products = [
  {
    id: 1,
    title: "Koszulka",
    price: 99,
    image: productImg,
  },
  {
    id: 2,
    title: "Bluza",
    price: 199,
    image: productImg,
  },
  {
    id: 3,
    title: "Buty",
    price: 349,
    image: productImg,
  },
  {
    id: 1,
    title: "Koszulka",
    price: 99,
    image: productImg,
  },
  {
    id: 2,
    title: "Bluza",
    price: 199,
    image: productImg,
  },
  {
    id: 3,
    title: "Buty",
    price: 349,
    image: productImg,
  },
  {
    id: 1,
    title: "Koszulka",
    price: 99,
    image: productImg,
  },
  {
    id: 2,
    title: "Bluza",
    price: 199,
    image: productImg,
  },
  {
    id: 3,
    title: "Buty",
    price: 349,
    image: productImg,
  },
  {
    id: 1,
    title: "Koszulka",
    price: 99,
    image: productImg,
  },
  {
    id: 2,
    title: "Bluza",
    price: 199,
    image: productImg,
  },
  {
    id: 3,
    title: "Buty",
    price: 349,
    image: productImg,
  },
];

function ProductGrid() {

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
