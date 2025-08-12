import React, { useEffect, useState } from 'react'
import { Box, Heading, SimpleGrid, Select, Input, VStack } from '@chakra-ui/react'
import JobCard from '../components/JobCard'
import { api } from '../services/api'

export default function Vagas() {
  const [jobs, setJobs] = useState([])
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')

  useEffect(() => {
    api.getRecentJobs().then(setJobs)
  }, [])

  const filtered = jobs.filter(j => (filter === 'all' || j.urgency === filter) && (j.title.toLowerCase().includes(q.toLowerCase()) || j.shop.toLowerCase().includes(q.toLowerCase())))

  return (
    <VStack align="stretch" spacing={6}>
      <Box>
        <Heading size="lg">Listagem das Vagas</Heading>
      </Box>

      <Box display="flex" gap={3} flexWrap="wrap">
        <Input placeholder="Buscar" value={q} onChange={e => setQ(e.target.value)} />
        <Select value={filter} onChange={e => setFilter(e.target.value)} w={{ base: '100%', md: '200px' }}>
          <option value="all">Todas</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </Select>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {filtered.map(job => <JobCard key={job.id} job={job} />)}
      </SimpleGrid>
    </VStack>
  )
}