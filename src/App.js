import './App.css';
import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
function App() {
 
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const url = "http://localhost:3000/products";
  const {data: items, httpConfig, loading, error} = useFetch(url);
  // resgatar dados
  // useEffect (() => {
  //   async function fetchData() {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   }
  //   fetchData();
  // }, []);


  const deleteProduct =  (id) => {
    httpConfig(null, 'DELETE', id);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const product = { name, price };
    httpConfig(product, 'POST');
    setName("");
    setPrice("");
  };
  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      { !loading && 
        (<ul>
          {items &&
            items.map((product) => (
            <li key={product.id}>
              {product.name} - R$: {product.price} | <button onClick={() => deleteProduct(product.id)}>Deletar</button>
            </li>  
            ))
          }
        </ul>)
      }
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>Nome: <input type='text' value={name} name='name' onChange={(e) => setName(e.target.value)}/></label>
          <label>Preço: <input type='text' value={price} name='price' onChange={(e) => setPrice(e.target.value)}/></label>
          <input type='submit' value='Adicionar'/>
        </form>
      </div>
    </div>
  );
}

export default App;
