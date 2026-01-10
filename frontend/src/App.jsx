import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductGrid from './ProductGrid';

function App() {
  const [count, setCount] = useState(0)
  console.log("Jestew w app")

  return (
    <div>
      <ProductGrid />
    </div>
  )
}

export default App
