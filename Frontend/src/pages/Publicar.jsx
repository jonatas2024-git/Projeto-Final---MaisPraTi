import React, { useState } from 'react'
import { Box, Heading, Input, Textarea, Select, Button, VStack, HStack } from '@chakra-ui/react'

export default function Publicar() {
  const [form, setForm] = useState({ title: '', description: '', location: '', urgency: 'Média', duration: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Integrar com API para criar vaga
    alert('Vaga publicada (simulada) — ' + JSON.stringify(form))
  }

  return (
    <Box maxW="700px" mx="auto" bg="white" p={6} borderWidth={1} borderRadius="md">
      <Heading size="md" mb={4}>Publicar Vaga</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={3}>
          <Input name="title" placeholder="Título da vaga" value={form.title} onChange={handleChange} />
          <Textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
          <Input name="location" placeholder="Localização (bairro)" value={form.location} onChange={handleChange} />
          <HStack w="100%">
            <Select name="urgency" value={form.urgency} onChange={handleChange}>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </Select>
            <Input name="duration" placeholder="Duração (ex: 4h, 1 dia)" value={form.duration} onChange={handleChange} />
          </HStack>

          <Button type="submit" colorScheme="green" w="full">Publicar</Button>
        </VStack>
      </form>
    </Box>
  )
}