import { useCallback, useEffect, useRef } from 'react'

import { OptionalFieldWrapper } from '@/components/OptionalFieldWrapper'
import { useNetworkAccountsContext } from '@/context/NetworkAccountsContext'
import { ArgumentComponentProps } from '@/domain/common/substrateInputTypes'
import { OrFalsy } from '@/domain/common/utilityTsTypes'
import { useToggle } from '@/hooks/useToggle'
import { getInitValue } from '@/services/substrate/getInitValue'
import { Registry, TypeDef } from '@/services/substrate/types'

interface Props extends ArgumentComponentProps<unknown> {
  components: React.ComponentType<ArgumentComponentProps<unknown>>[]
  registry: Registry
  typeDef: TypeDef
}

export function OptionArgument({
  components,
  onChange: _onChange,
  nestingNumber,
  registry,
  typeDef,
  value = null,
  id,
  label
}: Props) {
  const {
    state: { accounts }
  } = useNetworkAccountsContext()
  const [isToggled, toggle] = useToggle(value !== null)
  const isSuppliedRef = useRef(isToggled)
  const [Component] = components

  const onChange = useCallback(
    (value: OrFalsy<unknown>): void => {
      if (!isToggled) {
        _onChange(null)

        return
      }

      _onChange(value)
    },
    [_onChange, isToggled]
  )

  useEffect(() => {
    if (isToggled && !isSuppliedRef.current && value === null && accounts) {
      onChange(getInitValue(registry, accounts, typeDef.sub as TypeDef))
      isSuppliedRef.current = true
    } else if (!isToggled && isSuppliedRef.current && value !== null) {
      onChange(null)
      isSuppliedRef.current = false
    }
  }, [accounts, registry, onChange, value, isToggled, typeDef.sub])

  return (
    <OptionalFieldWrapper label={label} isToggled={isToggled} toggle={toggle}>
      <Component
        id={id}
        nestingNumber={nestingNumber + 1}
        onChange={onChange}
        registry={registry}
        typeDef={typeDef.sub as TypeDef}
        value={value}
        label={label}
      />
    </OptionalFieldWrapper>
  )
}
