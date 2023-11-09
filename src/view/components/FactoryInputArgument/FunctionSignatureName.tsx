import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import { Grid, Typography } from '@mui/material'
import { AbiMessage, AbiParam } from '@polkadot/api-contract/types'
import { encodeTypeDef } from '@polkadot/types/create'

import { Registry, TypeDef } from '@/services/substrate/types'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  abiParam: { name?: string; type: TypeDef }
  registry: Registry
  value?: string
}

const MAX_PARAM_LENGTH = 20

function truncate(param: string): string {
  return param.length > MAX_PARAM_LENGTH
    ? `${param.substring(0, MAX_PARAM_LENGTH / 2)}…${param.substring(
        param.length - MAX_PARAM_LENGTH / 2
      )}`
    : param
}

export function ArgumentSignature({
  abiParam: { name, type },
  children,
  registry,
  value
}: Props) {
  return (
    <span>
      {name ? `${name}: ` : ''}
      <span>
        {value ? (
          <b>{truncate(value)}</b>
        ) : (
          type.typeName || encodeTypeDef(registry, type)
        )}
      </span>
      {children}
    </span>
  )
}

export function getAbiParamLabel({
  abiParam,
  registry
}: {
  abiParam: AbiParam
  registry: Registry
}) {
  return `${abiParam.name}: ${
    abiParam.type.typeName || encodeTypeDef(registry, abiParam.type)
  }`
}

export const FunctionSignatureName = ({
  abiMessage,
  registry,
  params = []
}: {
  abiMessage: AbiMessage
  registry: Registry
  params?: unknown[]
}): JSX.Element => {
  const { args } = abiMessage

  return (
    <Grid container alignItems="center" gap={1}>
      {abiMessage.isMutating ? <HistoryEduIcon /> : <AutoStoriesIcon />}

      <Grid item xs>
        <Typography variant="body2">{abiMessage.method}</Typography>

        {args.length > 0 && (
          <Typography variant="caption" component="p">
            (
            {args?.map((arg, index): React.ReactNode => {
              return (
                <ArgumentSignature
                  abiParam={arg}
                  key={`args-${index}`}
                  registry={registry}
                  value={params[index] ? (params[index] as string) : undefined}
                >
                  {index < args.length - 1 && ', '}
                </ArgumentSignature>
              )
            })}
            )
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}
