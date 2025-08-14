import React, { useState } from 'react'
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Validação básica: campos não vazios
    if (!username.trim() || !password.trim()) {
      setError('Por favor, preencha usuário e senha.')
      return
    }
    setError('')

    // TODO: chamar API de login aqui (fetch/axios)

    // Por enquanto só redireciona para "área do usuário"
    navigate('/perfil')
  }

  return (
    <Box maxW="sm" mx="auto" mt="20" p="6" borderWidth="1px" borderRadius="md" boxShadow="md">
      <Heading mb="6" textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Usuário</FormLabel>
            <Input
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && (
            <Text color="red.500" fontWeight="bold" w="full" textAlign="center">
              {error}
            </Text>
          )}
          <Button type="submit" colorScheme="teal" w="full">
            Entrar
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
