import { Outlet } from 'react-router'
import './App.css'
import Navbar from './Components/Header/Navbar'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </>
  )
}

export default App
