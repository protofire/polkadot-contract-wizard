import { createContext, useContext } from 'react'

interface ApiVersionContextProps {
  version: string | null
}

const ApiVersionContext = createContext<ApiVersionContextProps>({
  version: null
})

export const useApiVersion = () => {
  return useContext(ApiVersionContext)
}

export default ApiVersionContext
