export const partnersPasswords = {
  'Mega Events': {
    employee: {
      hasshPassword: btoa('megaemployee' + ':' + 'megaemployee123'),
    },
  },
  'Local Venues LLC': {
    employee: {
      hasshPassword: btoa('localemployee' + ':' + 'localemployee123'),
    },
  },
  'Concert Masters': {
    employee: {
      hasshPassword: btoa('concertemployee' + ':' + 'concertemployee123'),
    },
  },
  'Stadium Group': {
    employee: {
      hasshPassword: btoa('stadiumemployee' + ':' + 'stadiumemployee123'),
    },
  },
  'Theater Partners': {
    employee: {
      hasshPassword: btoa('theateremployee' + ':' + 'theateremployee123'),
    },
  },
  // Add more partners and their passwords here
} as const;

