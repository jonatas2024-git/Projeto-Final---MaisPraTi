import React from 'react'
import { Box, Heading, Text, VStack, Avatar, Button } from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

export default function Perfil() {
  const { user, logout } = useAuth() || {}

  if (!user) {
    return (
      <Box maxW="600px" mx="auto" bg="white" p={6} borderWidth={1} borderRadius="md">
        <Heading size="md">Acesse sua conta</Heading>
        <Text mt={3}>Faça login para ver e gerenciar seu perfil.</Text>
      </Box>
    )
  }

  return (
    <Box maxW="700px" mx="auto" bg="white" p={6} borderWidth={1} borderRadius="md">
      <VStack align="start" spacing={4}>
        <Heading size="md">Perfil</Heading>
        <HStack spacing={4}>
          <Avatar name={user.name} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold">{user.name}</Text>
            <Text fontSize="sm" color="gray.600">{user.role === 'merchant' ? 'Comerciante' : 'Candidato'}</Text>
          </VStack>
        </HStack>

        <Button colorScheme="red" variant="outline" onClick={logout}>Sair</Button>
      </VStack>
    </Box>
  )
}