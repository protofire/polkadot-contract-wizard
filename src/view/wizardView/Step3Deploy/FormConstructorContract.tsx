import { InputAdornment, Stack, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import BN from 'bn.js'

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
  positiveNumberOrZero
} from '@/utils/inputValidation'
import { sanitizeNumber } from '@/utils/sanitize'

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

function initialSupplyPowDecimal(inputs: number[]): BN {
  const [supply, decimals] = inputs
  const supplyBN = new BN(sanitizeNumber(supply))
  const decimalsBN = new BN(sanitizeNumber(decimals))
  const multiplier = new BN(10).pow(decimalsBN)
  return supplyBN.mul(multiplier)
}

export function FormConstructorContract({
  fields,
  hasMetadata
}: {
  fields: ConstructorTokenField[]
  hasMetadata: boolean
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
      positiveNumberOrZero
    ])
  }
  const { mandatoryFields, metadataFields } = useMemoizeFields(
    fields,
    hasMetadata
  )
  const [initialSupplyField] = mandatoryFields
  const convertedInitialSupply = useFormDependentInput<number, BN>({
    dependencies: [mapStates.initialSupply.value, mapStates.decimal.value],
    onCallback: inputs => initialSupplyPowDecimal(inputs)
  })

  return (
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
              mapStates.initialSupply.error ? mapStates.initialSupply.error : ''
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
                          <InfoOutlinedIcon color="primary" fontSize="small" />
                        </InputAdornment>
                      </Tooltip>
                    )
                  }}
                  label="Initial supply will be send"
                  name="formatedInitialSupplyPowDecimal"
                  value={Number(
                    convertedInitialSupply.value.toString()
                  ).toExponential()}
                />
                <input
                  hidden={true}
                  name={INITIAL_SUPPLY_DECIMAL_FIELD}
                  {...{
                    ...convertedInitialSupply,
                    value: convertedInitialSupply.value.toString()
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
  )
}
