import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import "react-toastify/ReactToastify.css"
import './index.css'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './Context/useAuth'

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  )
}

export default App
