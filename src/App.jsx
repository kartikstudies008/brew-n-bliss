import './App.css'
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'

import Front from './Pages/Front'
import MenuPage from './Pages/Menu'
import AboutPage from './Pages/About'
import AuthPage from './Pages/login'
import Cart from './Pages/cart'
import Table from './Pages/Table'
import ReviewSection from './components/comments/comments'

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <>
            <Front />
            <ReviewSection user={user} />
          </>
        } />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<AuthPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/table' element={<Table />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
