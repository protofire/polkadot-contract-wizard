import { INetworkRepository } from '@/domain/repositories/INetworkRepository'
import { LocalStorageNetworkRepository } from '@/infrastructure/LocalStorageNetworkRepository'
import {
  ApiDeploymentRepository,
  IApiDeploymentRepository
} from '@/infrastructure/backendApi/ApiDeploymentRepository'
import React, { createContext, PropsWithChildren, useContext } from 'react'
import { BACKEND_API } from '../constants'
import {
  LocalStorageContractRepository,
  ICompiledContractRepository
} from '@/infrastructure/LocalStorageContractRepository'

interface DbContext {
  networkRepository: INetworkRepository
  deploymentsRepository: IApiDeploymentRepository
  compilationRepository: ICompiledContractRepository
}

const networkRepository = new LocalStorageNetworkRepository()
const deploymentsRepository = new ApiDeploymentRepository(BACKEND_API)
const compilationRepository = new LocalStorageContractRepository()

const DbContext = createContext<DbContext>({
  networkRepository,
  deploymentsRepository,
  compilationRepository
})

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DbContext.Provider
      value={{
        networkRepository,
        deploymentsRepository,
        compilationRepository
      }}
    >
      {children}
    </DbContext.Provider>
  )
}

export const useLocalDbContext = () => useContext(DbContext)
