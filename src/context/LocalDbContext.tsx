import { INetworkRepository } from '@/domain/repositories/INetworkRepository'
import { LocalStorageNetworkRepository } from '@/services/LocalStorageNetworkRepository'
import {
  ApiDeploymentRepository,
  IApiDeploymentRepository
} from '@/services/backendApi/ApiDeploymentRepository'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { BACKEND_API } from '../constants'
import { MyDatabase } from '@/services/localDB'
import { UserContractsRepository } from '@/services/localDB/UserContractsRepository'
import { IUserContractsRepository } from '@/domain/repositories/IUserContractsRepository'
import {
  ApiCompileContractRepository,
  IApiCompileContractRepository
} from '@/services/backendApi/ApiCompileContractRepository'
import { apiVersionService } from '@/services/backendApi/ApiVersionService'

interface DbContext {
  networkRepository: INetworkRepository
  apiDeploymentsRepository: IApiDeploymentRepository
  userContractsRepository: IUserContractsRepository
  apiCompileContractRepository: IApiCompileContractRepository
  backendApiVersion: string
}

const apiDeploymentsRepository = new ApiDeploymentRepository(BACKEND_API)
const apiCompileContractRepository = new ApiCompileContractRepository(
  BACKEND_API
)
const networkRepository = new LocalStorageNetworkRepository()
const userContractsRepository = new UserContractsRepository(new MyDatabase())

const DbContext = createContext<DbContext>({
  networkRepository,
  apiDeploymentsRepository,
  userContractsRepository,
  apiCompileContractRepository,
  backendApiVersion: ''
})

export const LocalDbProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [backendApiVersion, setBackendApiVersion] = useState('')

  useEffect(() => {
    void apiVersionService
      .getApiVersion()
      .then(version => setBackendApiVersion(version))
  }, [])

  return (
    <DbContext.Provider
      value={{
        networkRepository,
        apiDeploymentsRepository,
        userContractsRepository,
        apiCompileContractRepository,
        backendApiVersion
      }}
    >
      {children}
    </DbContext.Provider>
  )
}

export const useLocalDbContext = () => useContext(DbContext)
