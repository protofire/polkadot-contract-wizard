import { FileState } from '@/domain/FileState'

export async function readerAsFileState(file: File): Promise<FileState> {
  return new Promise<FileState>((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsArrayBuffer(file)

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer
      const data = new Uint8Array(arrayBuffer)
      resolve({
        data,
        name: file.name,
        size: file.size
      })
    }

    reader.onerror = error => reject(error)
  })
}
