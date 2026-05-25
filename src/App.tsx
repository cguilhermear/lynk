import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { CartDrawer } from './components/CartDrawer'
import { Navbar } from './components/Navbar'
import { FlowPreview } from './pages/FlowPreview'
import { Home } from './pages/Home'
import { Marketplace } from './pages/Marketplace'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/flow-preview" element={<FlowPreview />} />
      </Routes>
    </>
  )
}

export default App