import { SimpleSpread } from '@/domain/common/utilityTsTypes'
import { Registry, TypeDef } from '@/services/substrate/types'

export interface ValidFormField<T> {
  value: T
  onChange: (_: T) => void
}

export type ArgumentComponentProps<T, C = HTMLDivElement> = SimpleSpread<
  React.HTMLAttributes<C>,
  ValidFormField<T>
> & {
  nestingNumber: number
  registry: Registry
  typeDef: TypeDef
  label: string
}
