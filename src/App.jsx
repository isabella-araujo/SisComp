import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Fornecedores from './pages/Fornecedores'
import Produtos from './pages/Produtos'
import Cotacoes from './pages/Cotacoes'
import Contatos from './pages/Contatos'
import { useState } from 'react'
import Login from './pages/Login'
import LoginAdmin from './pages/LoginAdmin'
import NavBarAdmin from './components/NavBarAdmin'
import NavBar from './components/NavBar'
import RequisicaoCompra from './pages/RequisicaoCompra'
import CriarConta from './pages/CriarConta'
import { UserContext } from './assets/UserContext'
import NaoEncontrada from './pages/NaoEncontrada'
import Home from './pages/Home'
import ListaRequisicoes from './pages/ListaRequisicoes'
import MinhasRequisicoes from './pages/MinhasRequisicoes'

function App() {
  const [usuario, setUsuario] = useState({id: "", email: "", senha: ""});
  const [admin, setAdmin] = useState(false);

  return (
    <>
      <Router>
        { admin &&
          <div>
            <NavBarAdmin setAdmin={setAdmin}/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route index element={<Home />} /> 
              <Route path='/fornecedores' element={<Fornecedores />} />
              <Route path='/contatos' element={<Contatos />}/>
              <Route path='/produtos' element={<Produtos />}/>
              {/* <Route path='/cotacoes' element={<Cotacoes />}/> */}
              <Route path='/lista-requisicoes' element={<ListaRequisicoes />} />
              <Route path='*' element={<NaoEncontrada />}/>
            </Routes>
          </div>          
        }

        {usuario.id && !admin &&
          <div>
            <UserContext.Provider value={usuario}>
              <NavBar setUsuario={setUsuario}/>
              <Routes>
                <Route path='/requisicoes' element={<RequisicaoCompra />}/>
                <Route index element={<RequisicaoCompra />} />
                <Route path='/minhas-requisicoes' element={<MinhasRequisicoes />} /> 
                <Route path='*' element={<NaoEncontrada />}/>
              </Routes>
            </UserContext.Provider>
          </div>
        }

        {!usuario.id && !admin &&
          <Routes>
            <Route path='/criar-conta' element={<CriarConta />} />
            <Route path='/login' element={<Login setUsuario={setUsuario} />} />
            <Route index element={<Login setUsuario={setUsuario} />} /> 
            <Route path='/login-admin' element={<LoginAdmin setAdmin={setAdmin} />}/>
            <Route path='*' element={<NaoEncontrada />}/>
          </Routes>
        }
      </Router>
    </>
  )
}

export default App
