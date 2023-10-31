import { NextApiRequest, NextApiResponse } from 'next'
import { UserContractDetails } from '@/domain' // Asegúrate de importar el tipo correcto si es necesario
import { fetchContractByUUID } from '@/services/backendApi/find/fetchContractByUUID'

export async function fetchContract(
  req: NextApiRequest,
  res: NextApiResponse<UserContractDetails | { error: string }>
) {
  const { uuid } = req.query

  if (typeof uuid !== 'string') {
    res.status(400).json({ error: 'UUID must be a string' })
    return
  }

  try {
    const contract = await fetchContractByUUID(uuid)
    if (contract) {
      res.status(200).json(contract)
    } else {
      res.status(404).json({ error: 'Contract not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contract' })
  }
}
