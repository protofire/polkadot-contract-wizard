import { InputAdornment, Stack, Tooltip, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Big from 'big.js'

import {
  useFormInput,
  ControlledFormInput,
  useFormDependentInput
} from '@/hooks'
import { ConstructorTokenField } from '@/constants/index'
import { StyledTextField } from '@/components'
import { useMemoizeFields } from './useMemorizeFields'
import { ConstructorFieldName } from '@/constants/wizardData'
import {
  notEmpty,
  positiveNumber,
  positiveNumberOrZero,
  maxAllowed
} from '@/utils/inputValidation'
import { BIG_ZERO } from '@/constants/numbers'
import { FormEvent } from '@/domain/common/FormEvent'
import { initialSupplyPowDecimal } from './initialSupplyPowDecimal'

export const INITIAL_SUPPLY_DECIMAL_FIELD = 'initialSupplyPowDecimal'

type FormStateContract = {
  [K in ConstructorFieldName]: ControlledFormInput<
    K extends 'initialSupply' | 'decimal' ? number : string
  >
}

type ConstructorFieldNameExtended =
  | ConstructorFieldName
  | typeof INITIAL_SUPPLY_DECIMAL_FIELD

export type ConstructorTokenFieldProps = {
  [key in ConstructorFieldNameExtended]: string
}

const initialValues = {
  initialSupply: 100,
  name: 'My Token',
  symbol: 'MTK',
  decimal: 18
}

export function FormConstructorContract({
  fields,
  hasMetadata,
  handleSubmit
}: {
  fields: ConstructorTokenField[]
  hasMetadata: boolean
  handleSubmit: (event: FormEvent<ConstructorTokenFieldProps>) => void
}): JSX.Element {
  const mapStates: FormStateContract = {
    initialSupply: useFormInput(initialValues.initialSupply, [
      notEmpty,
      positiveNumber
    ]),
    name: useFormInput(initialValues.name, [notEmpty]),
    symbol: useFormInput(initialValues.symbol, [notEmpty]),
    decimal: useFormInput(initialValues.decimal, [
      notEmpty,
      positiveNumberOrZero,
      (value: number) => maxAllowed(value, 64)
    ])
  }
  const { mandatoryFields, metadataFields } = useMemoizeFields(
    fields,
    hasMetadata
  )
  const [initialSupplyField] = mandatoryFields
  const convertedInitialSupply = useFormDependentInput<Big, string | number>({
    initialValue: initialSupplyPowDecimal([
      mapStates.initialSupply.value,
      mapStates.decimal.value
    ]),
    validations: [
      (value: Big) => (value.lt(BIG_ZERO) ? 'Values not allowed' : undefined)
    ],
    dependencies: [mapStates.initialSupply.value, mapStates.decimal.value],
    onCallback: initialSupplyPowDecimal
  })

  const _handleSubmit = (event: FormEvent<ConstructorTokenFieldProps>) => {
    const errors =
      Object.keys(mapStates).some(
        key => mapStates[key as keyof FormStateContract].error
      ) || convertedInitialSupply.error

    if (errors) {
      event.preventDefault()
      return
    }

    handleSubmit(event)
  }

  return (
    <form id="deploy-form" onSubmit={_handleSubmit}>
      <Stack
        sx={{
          padding: '1rem',
          alignItems: 'center'
        }}
      >
        <Typography variant="h3" align="center">
          You need to fill the constructor parameters for the deployment.
        </Typography>
        <ArrowDownwardIcon fontSize="large" sx={{ margin: '1rem 0 0 0' }} />
      </Stack>

      <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {initialSupplyField && (
          <Stack
            sx={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: '0.7fr 0.3fr'
            }}
          >
            <StyledTextField
              required
              label={initialSupplyField.fieldName}
              type={initialSupplyField.type}
              name={initialSupplyField.fieldName}
              placeholder={initialSupplyField.placeholder}
              value={mapStates.initialSupply.value}
              onChange={mapStates.initialSupply.onChange}
              error={Boolean(mapStates.initialSupply.error)}
              helperText={
                mapStates.initialSupply.error
                  ? mapStates.initialSupply.error
                  : ''
              }
            />
            {hasMetadata &&
              mapStates.initialSupply.value &&
              mapStates.decimal.value && (
                <>
                  <StyledTextField
                    disabled
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <Tooltip
                          title={`This field represents the calculation of 'Initial Supply' multiplied by 10
                    to the power of 'decimals' (1e${mapStates.decimal.value}).`}
                          placement="top"
                        >
                          <InputAdornment position="start">
                            <InfoOutlinedIcon
                              color="primary"
                              fontSize="small"
                            />
                          </InputAdornment>
                        </Tooltip>
                      )
                    }}
                    label="Initial supply will be send"
                    name="formatedInitialSupplyPowDecimal"
                    value={convertedInitialSupply.value.toExponential()}
                    error={Boolean(convertedInitialSupply.error)}
                    helperText={
                      convertedInitialSupply.error
                        ? convertedInitialSupply.error
                        : ''
                    }
                  />
                  <input
                    hidden={true}
                    name={INITIAL_SUPPLY_DECIMAL_FIELD}
                    {...{
                      ...convertedInitialSupply,
                      value: convertedInitialSupply.value.toFixed()
                    }}
                  />
                </>
              )}
          </Stack>
        )}
        {metadataFields &&
          metadataFields.map(field => {
            const fieldState = mapStates[field.fieldName]
            const props = {
              ...fieldState,
              error: Boolean(fieldState.error),
              helperText: fieldState.error ? fieldState.error : ''
            }
            return (
              <StyledTextField
                required
                key={field.name}
                label={field.name}
                type={field.type}
                {...(field.type === 'number' ? { min: 0 } : null)}
                name={field.fieldName}
                placeholder={field.placeholder}
                InputLabelProps={{
                  shrink: true
                }}
                {...props}
              />
            )
          })}
      </Stack>
    </form>
  )
}
