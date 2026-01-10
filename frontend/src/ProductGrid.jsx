import ProductCard from "./ProductCard.jsx";
import "./shop.css";
import productImg from "./assets/product.png";
import "./ProductGrid.css"
import Select from 'react-select'
import { useState, useMemo, useEffect } from "react";

// --- PEŁNA LISTA 100 PRODUKTÓW ---
const products = [
  // --- KOSZULKI ---
  { id: 1, title: "Koszulka", type: "koszulka", price: 79, image: productImg },
  { id: 2, title: "Koszulka", type: "koszulka", price: 89, image: productImg },
  { id: 3, title: "Koszulka", type: "koszulka", price: 99, image: productImg },
  { id: 4, title: "Koszulka", type: "koszulka", price: 109, image: productImg },
  { id: 5, title: "Koszulka", type: "koszulka", price: 59, image: productImg },
  { id: 6, title: "Koszulka", type: "koszulka", price: 69, image: productImg },
  { id: 7, title: "Koszulka", type: "koszulka", price: 119, image: productImg },
  { id: 8, title: "Koszulka", type: "koszulka", price: 129, image: productImg },
  { id: 9, title: "Koszulka", type: "koszulka", price: 49, image: productImg },
  { id: 10, title: "Koszulka", type: "koszulka", price: 99, image: productImg },
  { id: 11, title: "Koszulka", type: "koszulka", price: 85, image: productImg },
  { id: 12, title: "Koszulka", type: "koszulka", price: 95, image: productImg },
  { id: 13, title: "Koszulka", type: "koszulka", price: 75, image: productImg },
  { id: 14, title: "Koszulka", type: "koszulka", price: 105, image: productImg },
  { id: 15, title: "Koszulka", type: "koszulka", price: 65, image: productImg },
  { id: 16, title: "Koszulka", type: "koszulka", price: 115, image: productImg },
  { id: 17, title: "Koszulka", type: "koszulka", price: 55, image: productImg },
  { id: 18, title: "Koszulka", type: "koszulka", price: 125, image: productImg },
  { id: 19, title: "Koszulka", type: "koszulka", price: 99, image: productImg },
  { id: 20, title: "Koszulka", type: "koszulka", price: 89, image: productImg },

  // --- BLUZY ---
  { id: 21, title: "Bluza", type: "bluza", price: 199, image: productImg },
  { id: 22, title: "Bluza", type: "bluza", price: 219, image: productImg },
  { id: 23, title: "Bluza", type: "bluza", price: 179, image: productImg },
  { id: 24, title: "Bluza", type: "bluza", price: 249, image: productImg },
  { id: 25, title: "Bluza", type: "bluza", price: 159, image: productImg },
  { id: 26, title: "Bluza", type: "bluza", price: 299, image: productImg },
  { id: 27, title: "Bluza", type: "bluza", price: 189, image: productImg },
  { id: 28, title: "Bluza", type: "bluza", price: 229, image: productImg },
  { id: 29, title: "Bluza", type: "bluza", price: 169, image: productImg },
  { id: 30, title: "Bluza", type: "bluza", price: 259, image: productImg },
  { id: 31, title: "Bluza", type: "bluza", price: 199, image: productImg },
  { id: 32, title: "Bluza", type: "bluza", price: 209, image: productImg },
  { id: 33, title: "Bluza", type: "bluza", price: 239, image: productImg },
  { id: 34, title: "Bluza", type: "bluza", price: 149, image: productImg },
  { id: 35, title: "Bluza", type: "bluza", price: 269, image: productImg },
  { id: 36, title: "Bluza", type: "bluza", price: 195, image: productImg },
  { id: 37, title: "Bluza", type: "bluza", price: 215, image: productImg },
  { id: 38, title: "Bluza", type: "bluza", price: 185, image: productImg },
  { id: 39, title: "Bluza", type: "bluza", price: 279, image: productImg },
  { id: 40, title: "Bluza", type: "bluza", price: 199, image: productImg },

  // --- SPODNIE ---
  { id: 41, title: "Spodnie", type: "spodnie", price: 149, image: productImg },
  { id: 42, title: "Spodnie", type: "spodnie", price: 169, image: productImg },
  { id: 43, title: "Spodnie", type: "spodnie", price: 199, image: productImg },
  { id: 44, title: "Spodnie", type: "spodnie", price: 129, image: productImg },
  { id: 45, title: "Spodnie", type: "spodnie", price: 229, image: productImg },
  { id: 46, title: "Spodnie", type: "spodnie", price: 159, image: productImg },
  { id: 47, title: "Spodnie", type: "spodnie", price: 189, image: productImg },
  { id: 48, title: "Spodnie", type: "spodnie", price: 139, image: productImg },
  { id: 49, title: "Spodnie", type: "spodnie", price: 249, image: productImg },
  { id: 50, title: "Spodnie", type: "spodnie", price: 179, image: productImg },
  { id: 51, title: "Spodnie", type: "spodnie", price: 145, image: productImg },
  { id: 52, title: "Spodnie", type: "spodnie", price: 165, image: productImg },
  { id: 53, title: "Spodnie", type: "spodnie", price: 195, image: productImg },
  { id: 54, title: "Spodnie", type: "spodnie", price: 135, image: productImg },
  { id: 55, title: "Spodnie", type: "spodnie", price: 219, image: productImg },

  // --- BUTY ---
  { id: 56, title: "Buty", type: "buty", price: 349, image: productImg },
  { id: 57, title: "Buty", type: "buty", price: 399, image: productImg },
  { id: 58, title: "Buty", type: "buty", price: 299, image: productImg },
  { id: 59, title: "Buty", type: "buty", price: 449, image: productImg },
  { id: 60, title: "Buty", type: "buty", price: 329, image: productImg },
  { id: 61, title: "Buty", type: "buty", price: 499, image: productImg },
  { id: 62, title: "Buty", type: "buty", price: 279, image: productImg },
  { id: 63, title: "Buty", type: "buty", price: 369, image: productImg },
  { id: 64, title: "Buty", type: "buty", price: 429, image: productImg },
  { id: 65, title: "Buty", type: "buty", price: 319, image: productImg },
  { id: 66, title: "Buty", type: "buty", price: 549, image: productImg },
  { id: 67, title: "Buty", type: "buty", price: 389, image: productImg },
  { id: 68, title: "Buty", type: "buty", price: 289, image: productImg },
  { id: 69, title: "Buty", type: "buty", price: 419, image: productImg },
  { id: 70, title: "Buty", type: "buty", price: 359, image: productImg },

  // --- KURTKI ---
  { id: 71, title: "Kurtka", type: "kurtka", price: 499, image: productImg },
  { id: 72, title: "Kurtka", type: "kurtka", price: 599, image: productImg },
  { id: 73, title: "Kurtka", type: "kurtka", price: 399, image: productImg },
  { id: 74, title: "Kurtka", type: "kurtka", price: 699, image: productImg },
  { id: 75, title: "Kurtka", type: "kurtka", price: 459, image: productImg },
  { id: 76, title: "Kurtka", type: "kurtka", price: 549, image: productImg },
  { id: 77, title: "Kurtka", type: "kurtka", price: 799, image: productImg },
  { id: 78, title: "Kurtka", type: "kurtka", price: 429, image: productImg },
  { id: 79, title: "Kurtka", type: "kurtka", price: 649, image: productImg },
  { id: 80, title: "Kurtka", type: "kurtka", price: 499, image: productImg },

  // --- CZAPKI ---
  { id: 81, title: "Czapka", type: "akcesoria", price: 59, image: productImg },
  { id: 82, title: "Czapka", type: "akcesoria", price: 49, image: productImg },
  { id: 83, title: "Czapka", type: "akcesoria", price: 69, image: productImg },
  { id: 84, title: "Czapka", type: "akcesoria", price: 39, image: productImg },
  { id: 85, title: "Czapka", type: "akcesoria", price: 79, image: productImg },
  { id: 86, title: "Czapka", type: "akcesoria", price: 45, image: productImg },
  { id: 87, title: "Czapka", type: "akcesoria", price: 65, image: productImg },
  { id: 88, title: "Czapka", type: "akcesoria", price: 55, image: productImg },
  { id: 89, title: "Czapka", type: "akcesoria", price: 35, image: productImg },
  { id: 90, title: "Czapka", type: "akcesoria", price: 89, image: productImg },

  // --- PLECAKI ---
  { id: 91, title: "Plecak", type: "akcesoria", price: 129, image: productImg },
  { id: 92, title: "Plecak", type: "akcesoria", price: 159, image: productImg },
  { id: 93, title: "Plecak", type: "akcesoria", price: 199, image: productImg },
  { id: 94, title: "Plecak", type: "akcesoria", price: 99, image: productImg },
  { id: 95, title: "Plecak", type: "akcesoria", price: 179, image: productImg },
  { id: 96, title: "Plecak", type: "akcesoria", price: 149, image: productImg },
  { id: 97, title: "Plecak", type: "akcesoria", price: 229, image: productImg },
  { id: 98, title: "Plecak", type: "akcesoria", price: 119, image: productImg },
  { id: 99, title: "Plecak", type: "akcesoria", price: 189, image: productImg },
  { id: 100, title: "Plecak", type: "akcesoria", price: 139, image: productImg },
];

function ProductGrid({ categorySlug }) {
  
  // 1. Opcje selecta
  const options = useMemo(() => {
    const uniqueTitles = [...new Set(products.map(p => p.title))];
    return uniqueTitles.map(t => ({ value: t, label: t }));
  }, []);

  // 2. Stany
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  
  // PAGINACJA: Stan obecnej strony
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // 3. Obsługa zdarzeń
  const onSort = (order) => {
    setSortOrder(order);
  };

  const handleTypeChange = (selected) => {
    setSelectedTypes(selected || []);
  };

  // EFEKT: Jeśli zmienią się filtry, wróć do strony 1
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTypes, categorySlug]);

  // 4. LOGIKA
  const visibleProducts = useMemo(() => {
    let result = [...products];

    // A. Filtr kategorii z URL
    if (categorySlug) {
        result = result.filter(p => 
            p.title.toLowerCase().includes(categorySlug.toLowerCase()) || 
            p.type.toLowerCase().includes(categorySlug.toLowerCase())
        );
    }

    // B. Filtr z Selecta
    if (selectedTypes.length > 0) {
      const allowedTitles = selectedTypes.map(o => o.value);
      result = result.filter(p => allowedTitles.includes(p.title));
    }

    // C. Sortowanie
    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedTypes, sortOrder, categorySlug]);

  // 5. PAGINACJA
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = visibleProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(visibleProducts.length / itemsPerPage);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); 
  };

  // --- STYLE DLA SELECTA ---
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
        zIndex: 100, // Żeby menu było nad produktami
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
      
      {/* NAGŁÓWEK Z FILTRAMI */}
      <div className="filters-header">
        
        {/* ZMIANA: Dodano klasę filter-group (zamiast samego diva), żeby CSS nie psuł selecta */}
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
              // Dodajemy ładne style
              styles={customStyles} 
              // To naprawia szerokość
              theme={(theme) => ({
                ...theme,
                borderRadius: 4,
                colors: {
                  ...theme.colors,
                  primary: 'black',
                },
              })}
            />
            {/* Mały CSS inline dla kontenera selecta, żeby miał stałą szerokość */}
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

      {/* SIATKA PRODUKTÓW */}
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

      {/* BRAK WYNIKÓW */}
      {visibleProducts.length === 0 && (
          <p style={{textAlign: 'center', fontSize: '18px', margin: '40px'}}>
              Brak produktów spełniających kryteria.
          </p>
      )}

      {/* PAGINACJA */}
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