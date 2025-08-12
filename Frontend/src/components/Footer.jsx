import React from 'react'
import { Box, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" mt={8} py={6} bg="gray.50">
      <Box maxW="1200px" mx="auto" px={4}>
        <Text fontSize="sm" color="gray.600">© {new Date().getFullYear()} Vagas.com — Conectando sua vizinhança ao trabalho.</Text>
      </Box>
    </Box>
  )
}