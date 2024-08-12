import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Fornecedores from './pages/Fornecedores'
import Produtos from './pages/Produtos'
import Cotacoes from './pages/Cotacoes'
import Contatos from './pages/Contatos'
import { useState } from 'react'
import Login from './pages/Login'

function App() {
  const [logado, setLogado] = useState(false);

  return (
    <>
      <Router>
        { logado ? <Navbar logado={logado} setLogado={setLogado} /> : null }
        
        <Routes>
          <Route path="/" element={logado ? <Home /> : <Login setLogado={setLogado}/>} />
          <Route path='/fornecedores' element={<Fornecedores />} />
          <Route path='/contatos' element={<Contatos />}/>
          <Route path='/produtos' element={<Produtos />}/>
          <Route path='/cotacoes' element={<Cotacoes />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
