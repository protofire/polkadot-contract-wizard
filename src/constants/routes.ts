export const ROUTES = {
  HOME: '/',
  WIZARD: '/wizard',
  CONTRACTS: '/contracts',
  CUSTOM: '/custom-contract',
  CONTRACTDETAIL: '/contract-detail',
  DOCUMENTATION:
    process.env.NEXT_PUBLIC_DOCUMENTATION_URL ||
    'https://contractwizard-docs.vercel.app/',
  TELEGRAM: 'https://t.me/+u5M4K7vKfbQxZjMx',
  GITHUB: 'https://github.com/protofire/polkadot-contract-wizard"'
} as const
