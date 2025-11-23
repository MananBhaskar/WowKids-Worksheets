import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import WhatsAppButton from './WhatsAppButton.jsx'
const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton/>
    </>
  )
}

export default Layout