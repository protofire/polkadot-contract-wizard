import { FormControl, Stack } from '@mui/material'
import { useMemo } from 'react'

import { SetState } from '@/domain/common'
import { AbiParam, Registry } from '@/services/substrate/types'

import { getAbiParamLabel } from '@/components/FactoryInputArgument/FunctionSignatureName'
import { FactoryInputArgument } from '@/components/FactoryInputArgument'

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  args: AbiParam[]
  argValues: Record<string, unknown>
  registry: Registry
  setArgValues: SetState<Record<string, unknown>>
}

export function ArgumentsForm({
  args,
  argValues,
  registry,
  setArgValues
}: Props) {
  const components = useMemo(
    () =>
      args.map(arg => ({
        arg,
        Component: FactoryInputArgument.createComponent(registry, arg.type)
      })),
    [args, registry]
  )

  return (
    <Stack>
      {components.map(({ arg, Component }) => {
        const onChange = (value: unknown) => {
          setArgValues(prev => ({
            ...prev,
            [arg.name]: value
          }))
        }

        return (
          <FormControl sx={{ m: 1 }} key={arg.name}>
            <Component
              id={arg.name}
              nestingNumber={0}
              onChange={onChange}
              value={argValues[arg.name]}
              typeDef={arg.type}
              registry={registry}
              label={getAbiParamLabel({ abiParam: arg, registry })}
            />
          </FormControl>
        )
      })}
    </Stack>
  )
}
