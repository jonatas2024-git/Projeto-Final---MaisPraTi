import React, { useEffect, useState } from 'react'
import { Box, Heading, Input, SimpleGrid, VStack, Text, Button } from '@chakra-ui/react'
import { api } from '../services/api'
import JobCard from '../components/JobCard'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    let mounted = true
    api.getRecentJobs().then(data => { if (mounted) setJobs(data) })
    return () => { mounted = false }
  }, [])

  const filtered = jobs.filter(j => j.title.toLowerCase().includes(q.toLowerCase()) || j.shop.toLowerCase().includes(q.toLowerCase()))

  return (
    <VStack align="stretch" spacing={6}>
      <Box>
        <Heading size="lg">Vagas próximas de você</Heading>
        <Text color="gray.600">Encontre oportunidades rápidas e perto do seu bairro.</Text>
      </Box>

      <Box>
        <Input placeholder="Buscar vagas ou comércios" value={q} onChange={e => setQ(e.target.value)} />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {filtered.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </SimpleGrid>

      <Box textAlign="center">
        <Button variant="ghost">Ver mais vagas</Button>
      </Box>
    </VStack>
  )
}