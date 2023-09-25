import { INetworkRepository } from '@/domain/repositories/INetworkRepository'
import { LocalStorageNetworkRepository } from '@/infrastructure/LocalStorageNetworkRepository'
import {
  ApiDeploymentRepository,
  IApiDeploymentRepository
} from '@/infrastructure/backendApi/ApiDeploymentRepository'
import React, { createContext, PropsWithChildren, useContext } from 'react'
import { BACKEND_API } from '../constants'
import { MyDatabase } from '@/infrastructure/localDB'
import { UserContractsRepository } from '@/infrastructure/localDB/UserContractsRepository'
import { IUserContractsRepository } from '@/domain/repositories/IUserContractsRepository'
import {
  ApiCompileContractRepository,
  IApiCompileContractRepository
} from '@/infrastructure/backendApi/ApiCompileContractRepository'

interface DbContext {
  networkRepository: INetworkRepository
  deploymentsRepository: IApiDeploymentRepository
  userContractsRepository: IUserContractsRepository
  compileContractRepository: IApiCompileContractRepository
}

const networkRepository = new LocalStorageNetworkRepository()
const deploymentsRepository = new ApiDeploymentRepository(BACKEND_API)
const compileContractRepository = new ApiCompileContractRepository(BACKEND_API)
const userContractsRepository = new UserContractsRepository(new MyDatabase())

const DbContext = createContext<DbContext>({
  networkRepository,
  deploymentsRepository,
  userContractsRepository,
  compileContractRepository
})

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <DbContext.Provider
      value={{
        networkRepository,
        deploymentsRepository,
        userContractsRepository,
        compileContractRepository
      }}
    >
      {children}
    </DbContext.Provider>
  )
}

export const useLocalDbContext = () => useContext(DbContext)
