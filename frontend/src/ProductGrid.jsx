import ProductCard from "./ProductCard.jsx";
import "./shop.css";
import productImg from "./assets/product.png";
import "./ProductGrid.css"
import Select from 'react-select'

const products = [
  { id: 1, title: "Koszulka", price: 99, image: productImg },
  { id: 2, title: "Bluza", price: 199, image: productImg },
  { id: 3, title: "Buty", price: 349, image: productImg },
  { id: 4, title: "Koszulka", price: 99, image: productImg },
  { id: 5, title: "Bluza", price: 199, image: productImg },
  { id: 6, title: "Buty", price: 349, image: productImg },
  { id: 7, title: "Koszulka", price: 99, image: productImg },
  { id: 8, title: "Bluza", price: 199, image: productImg },
  { id: 9, title: "Buty", price: 349, image: productImg },
];


function ProductGrid() {
  console.log("Renderuje shop")
  // Trzeba sfetchować typy z bazki
  const options = [
    { value: 'chocolate', label: 'Koszulka' },
    { value: 'strawberry', label: 'Bluza' },
    { value: 'vanilla', label: 'Buty' }
  ]

  return (
    <div>
      
     <div className="filters-header">
        <div>
            <Select
              defaultValue={[options[2], options[3]]}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
            />
        </div>
        <div>
          <span>Sortuj: </span>
          <button onClick={() => onSort("asc")}>Cena rosnąco</button>
          <button onClick={() => onSort("desc")}>Cena malejąco</button>
        </div>
      </div>
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  </div>
  );
}

export default ProductGrid;
