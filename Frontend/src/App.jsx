import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Vagas from './pages/Vagas'
import Publicar from './pages/Publicar'
import Perfil from './pages/Perfil'

export default function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1" p={{ base: 4, md: 8 }} maxW="1200px" mx="auto" w="100%">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vagas" element={<Vagas />} />
          <Route path="/publicar" element={<Publicar />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}
