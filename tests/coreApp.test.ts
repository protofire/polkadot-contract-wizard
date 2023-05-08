const ASTAR_RPC = 'wss://rpc.astar.network'
describe('Environments variables', () => {
  const ALL_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...ALL_ENV, // Make a copy
      NODE_ENV: 'development',
      NEXT_PUBLIC_PROVIDER_DEFAULT_SOCKET: ASTAR_RPC
    }
  })

  afterAll(() => {
    process.env = ALL_ENV // Restore old environment
  })

  test('That environment variables exist', () => {
    expect(process.env.NODE_ENV).toBe('development')
  })

  test('That rpc variables is setted', () => {
    expect(process.env.NEXT_PUBLIC_PROVIDER_DEFAULT_SOCKET).toBe(ASTAR_RPC)
  })
})
