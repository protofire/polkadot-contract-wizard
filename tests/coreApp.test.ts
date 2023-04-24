describe('Environments variables', () => {
  const ALL_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...ALL_ENV, // Make a copy
      NODE_ENV: 'development'
    }
  })

  afterAll(() => {
    process.env = ALL_ENV // Restore old environment
  })

  test('That environment variables exist', () => {
    expect(process.env.NODE_ENV).toBe('development')
    expect(process.env.NEXT_PUBLIC_PROVIDER_SOCKET_PROD).toBe(
      'wss://rococo-contracts-rpc.polkadot.io'
    )
    expect(process.env.NEXT_PUBLIC_PROVIDER_SOCKET_DEV).toBe(
      'wss://rococo-contracts-rpc.polkadot.io'
    )
  })
})
