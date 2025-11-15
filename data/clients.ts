export interface Client {
  id: string;
  name: string;
  logo?: string; // URL или путь к логотипу
}

// Список клиентов компании
// Можно добавлять логотипы, указав URL в поле logo
export const clients: Client[] = [
  { id: '1', name: 'Lamis' },
  { id: '2', name: 'Blesk' },
  { id: '3', name: 'Caizer' },
  { id: '4', name: 'Midea', logo: '/images/clients/midea-logo.png' },
  { id: '5', name: 'Grohe' },
  { id: '6', name: 'Hansgrohe' },
  { id: '7', name: 'Roca' },
  { id: '8', name: 'Geberit' },
];
