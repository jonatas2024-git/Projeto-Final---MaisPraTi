import React from 'react'
import { Box, Heading, Text, Badge, HStack, Button } from '@chakra-ui/react'

export default function JobCard({ job }) {
  // Define a cor baseada na urgência
  let badgeColor
  switch (job.urgency.toLowerCase()) {
    case 'alta':
      badgeColor = 'red'
      break
    case 'média':
      badgeColor = 'yellow'
      break
    case 'baixa':
      badgeColor = 'green'
      break
    default:
      badgeColor = 'gray'
  }

  return (
    <Box borderWidth={1} borderRadius="md" p={4} bg="white">
      <HStack justify="space-between">
        <Box>
          <Heading size="sm">{job.title}</Heading>
          <Text fontSize="sm" color="gray.600">{job.shop} • {job.location}</Text>
        </Box>
        <Box textAlign="right">
          <Badge colorScheme={badgeColor}>{job.urgency}</Badge>
          <Text fontSize="sm">{job.distanceKm} km</Text>
        </Box>
      </HStack>

      <HStack mt={3} justify="flex-end">
        <Button size="sm" variant="outline">Detalhes</Button>
        <Button size="sm" colorScheme="blue">Candidatar</Button>
      </HStack>
    </Box>
  )
}
