import { TransactionStatus } from 'useink/dist/core'

export const hasAny = (
  tx: { status: TransactionStatus },
  ...statuses: TransactionStatus[]
): boolean => statuses.includes(tx.status)

export const shouldDisable = (tx: { status: TransactionStatus }): boolean =>
  hasAny(tx, 'DryRun', 'PendingSignature', 'Broadcast')
