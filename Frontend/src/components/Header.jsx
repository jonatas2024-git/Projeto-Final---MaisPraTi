import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Flex, Box, HStack, Link, Button, IconButton, Text, Spacer } from '@chakra-ui/react'
import { FiBell, FiSearch } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user } = useAuth() || {}

  return (
    <Flex as="header" bg="white" borderBottomWidth={1} py={3} px={{ base: 4, md: 8 }} align="center">
      <Box>
        <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Text fontWeight="bold">Vagas.com</Text>
        </Link>
      </Box>

      <HStack spacing={4} ml={8} display={{ base: 'none', md: 'flex' }}>
        <Link as={RouterLink} to="/vagas">Vagas</Link>
        <Link as={RouterLink} to="/publicar">Publicar</Link>
      </HStack>

      <Spacer />

      <HStack spacing={3}>
        <IconButton aria-label="buscar" icon={<FiSearch />} />
        <IconButton aria-label="notificações" icon={<FiBell />} />
        {user ? (
          <Button as={RouterLink} to="/perfil" variant="ghost">{user.name}</Button>
        ) : (
          <Button as={RouterLink} to="/login" colorScheme="blue">Entrar</Button>
        )}
      </HStack>
    </Flex>
  )
}