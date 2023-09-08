import { INetworkRepository } from '@/domain/repositories/INetworkRepository'
import { LocalStorageNetworkRepository } from '@/infrastructure/LocalStorageNetworkRepository'
import React, { createContext, PropsWithChildren, useContext } from 'react'

interface DbContext {
  networkRepository: INetworkRepository
}

const networkRepository = new LocalStorageNetworkRepository()

const DbContext = createContext<DbContext>({
  networkRepository
})

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DbContext.Provider
      value={{
        networkRepository
      }}
    >
      {children}
    </DbContext.Provider>
  )
}

export const useLocalDbContext = () => useContext(DbContext)
