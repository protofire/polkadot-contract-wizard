import { INetworkRepository } from '@/domain/repositories/INetworkRepository'
import { LocalStorageNetworkRepository } from '@/services/LocalStorageNetworkRepository'
import {
  ApiDeploymentRepository,
  IApiDeploymentRepository
} from '@/services/backendApi/ApiDeploymentRepository'
import React, { createContext, PropsWithChildren, useContext } from 'react'
import { BACKEND_API } from '../constants'
import { MyDatabase } from '@/services/localDB'
import { UserContractsRepository } from '@/services/localDB/UserContractsRepository'
import { IUserContractsRepository } from '@/domain/repositories/IUserContractsRepository'
import {
  ApiCompileContractRepository,
  IApiCompileContractRepository
} from '@/services/backendApi/ApiCompileContractRepository'

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
