import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useApi } from 'useink'

import { MetadataState } from '@/domain'
import { MetadataManager } from '@/services/substrate/MetadataManager'
import { readerAsFileState } from '@/utils/fileReader'

type OnChange = Dispatch<SetStateAction<File | null>>
type OnRemove = () => void

interface Options {
  isWasmRequired?: boolean
}

interface Callbacks {
  onChange?: OnChange
  onRemove?: OnRemove
}

export interface UseMetadata {
  metadata: MetadataState
  onRemove: () => void
  metadataFile: File | undefined
  onChange: (_file: File) => void
}

const metadataManager = new MetadataManager()

export function useParseMetadataField(
  initialValue?: Record<string, unknown>,
  options: Options & Callbacks = {}
): UseMetadata {
  const [metadataFile, setMetadataFile] = useState<File | undefined>()
  const apiProvider = useApi()
  const apiPromise = useMemo(() => apiProvider?.api, [apiProvider?.api])
  const { isWasmRequired = false } = options
  const [metadata, setMetadata] = useState<MetadataState>(metadataManager.EMPTY)

  const onChange = useCallback(
    async (file: File) => {
      setMetadataFile(file)
      const fileState = await readerAsFileState(file)
      const newState = metadataManager.parseFile(
        fileState,
        isWasmRequired,
        apiPromise
      )

      setMetadata(newState)
    },
    [apiPromise, isWasmRequired]
  )

  const onRemove = useCallback(() => {
    setMetadataFile(undefined)
    setMetadata(metadataManager.EMPTY)
  }, [setMetadataFile])

  useEffect(() => {
    metadataFile && onChange(metadataFile)
  }, [metadataFile, onChange])

  return {
    metadata,
    metadataFile,
    onChange: setMetadataFile,
    onRemove
  }
}
