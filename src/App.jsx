import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ArmaTuArreglo from "./pages/ArmaTuArreglo"
import Admin from "./pages/Admin"
import Contacto from "./pages/Contacto"

function App() {
  return (
    // BrowserRouter habilita el sistema de rutas en toda la app
    <BrowserRouter>
      <Navbar />
      {/* Routes decide qué página mostrar según la URL actual */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arma-tu-arreglo" element={<ArmaTuArreglo />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
