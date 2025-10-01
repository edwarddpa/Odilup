import { useContext } from 'react'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './views/Home'
import About from './views/About'
import Projects from './views/Projects'
import Contact from './views/Contact'
import NotFound from './views/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import Cart from './views/Cart'
import LoginPage from './views/LoginPage'
import Tattoo from './views/Tattoo'
import RegisterPage from './views/RegisterPage'
import Profile from './views/Profile'
import { Toaster } from 'react-hot-toast'
import "cally"


function App() {

const {token} = useContext(UserContext)

  return (
    <>
      <ScrollToTop />
      <Toaster />
      <Nav />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tattoo/:parametro" element={<Tattoo />} />
          <Route path='/profile' element={token ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
