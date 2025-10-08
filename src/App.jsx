import { Outlet } from 'react-router'
import './App.css'
import Navbar from './Components/Header/Navbar'
import Footer from './Components/Footer/Footer'

function App() {

  return (
    <>
    <div className="flex flex-col h-screen justify-between">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
    </>
  )
}

export default App
