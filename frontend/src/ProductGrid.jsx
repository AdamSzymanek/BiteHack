import ProductCard from "./ProductCard.jsx";
import "./shop.css";
import productImg from "./assets/product.png";
import "./ProductGrid.css"
import Select from 'react-select'
import { useState, useMemo, useEffect } from "react";




const ProductGrid = ({ categorySlug, searchTerm }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/products/all', {
          headers: { 'accept': '*/*' }
        });

        if (!response.ok) throw new Error('Błąd podczas pobierania produktów');

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const options = useMemo(() => {
    const uniqueNames = [...new Set(products.map(p => p.name))];
    return uniqueNames.map(n => ({ value: n, label: n }));
  }, [products]);


  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;


  const onSort = (order) => {
    setSortOrder(order);
  };

  const handleTypeChange = (selected) => {
    setSelectedTypes(selected || []);
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTypes, categorySlug]);

  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTypes && selectedTypes.length > 0) {
      const allowedNames = selectedTypes.map(o => o.value);
      result = result.filter(p => allowedNames.includes(p.name));
    }

    if (categorySlug) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(categorySlug.toLowerCase()) ||
        p.categoryName?.toLowerCase().includes(categorySlug.toLowerCase())
      );
    }


    if (sortOrder === "asc") result.sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, selectedTypes, sortOrder, categorySlug, searchTerm]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  console.log(indexOfFirstItem)
  console.log(indexOfLastItem)
  const currentProducts = visibleProducts?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const totalPages = Math.ceil((visibleProducts?.length || 0) / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };


  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #ccc',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #000',
      },
      cursor: 'pointer'
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'black' : state.isFocused ? '#f0f0f0' : 'white',
      color: state.isSelected ? 'white' : 'black',
      cursor: 'pointer',
    }),
  };

  return (
    <div>

      <div className="filters-header">

        <div className="filter-group">
          <span>Filtruj: </span>
          <Select
            defaultValue={[]}
            isMulti
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleTypeChange}
            placeholder="Wybierz typ..."

            styles={customStyles}

            theme={(theme) => ({
              ...theme,
              borderRadius: 4,
              colors: {
                ...theme.colors,
                primary: 'black',
              },
            })}
          />

          <style>{`
                .basic-multi-select {
                    width: 300px;
                }
            `}</style>
        </div>

        <div className="filter-group">
          <span>Sortuj: </span>
          <button
            className={sortOrder === "asc" ? "sort-btn active" : "sort-btn"}
            onClick={() => onSort("asc")}
          >
            Cena rosnąco
          </button>

          <button
            className={sortOrder === "desc" ? "sort-btn active" : "sort-btn"}
            onClick={() => onSort("desc")}
          >
            Cena malejąco
          </button>
        </div>
      </div>


      <div className="product-grid">
        {currentProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>


      {visibleProducts.length === 0 && (
        <p style={{ textAlign: 'center', fontSize: '18px', margin: '40px' }}>
          Brak produktów spełniających kryteria.
        </p>
      )}


      {visibleProducts.length > itemsPerPage && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Poprzednia
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Następna &gt;
          </button>
        </div>
      )}

    </div>
  );
}

export default ProductGrid;