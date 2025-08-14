export const api = {
  getRecentJobs: async () => {
    // simulate network
    await new Promise(r => setTimeout(r, 300))
    return [
      { id: '1', title: 'Atendente (turno da tarde)', location: 'Bairro Centro', urgency: 'Alta', distanceKm: 0.6, shop: 'Padaria Boa Pão' },
      { id: '2', title: 'Entregador por 1 dia', location: 'Bairro Jardim', urgency: 'Média', distanceKm: 1.8, shop: 'Mercado dos Amigos' },
      { id: '3', title: 'Caixa temporário', location: 'Bairro Centro', urgency: 'Alta', distanceKm: 0.4, shop: 'Loja Moda' },
      { id: '4', title: 'Repositor noturno', location: 'Bairro Cerqueira', urgency: 'Baixa', distanceKm: 0.8, shop: 'Supermercado Econômico' }
    ]
  }
}