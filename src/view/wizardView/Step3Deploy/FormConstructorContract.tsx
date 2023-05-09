import { InputAdornment, Stack, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import {
  useFormInput,
  ControlledFormInput,
  useFormDependentInput
} from '@/hooks'
import { ConstructorTokenField } from '@/constants/index'
import { StyledTextField } from '@/components'
import { useMemoizeFields } from './useMemorizeFields'
import { ConstructorFieldName } from '@/constants/wizardData'

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

function initialSupplyPowDecimal(inputs: number[]): number {
  const [supply, decimals] = inputs
  return Number(supply) * Math.pow(10, Number(decimals))
}

export function FormConstructorContract({
  fields,
  hasMetadata
}: {
  fields: ConstructorTokenField[]
  hasMetadata: boolean
}): JSX.Element {
  const mapStates: FormStateContract = {
    initialSupply: useFormInput(initialValues.initialSupply),
    name: useFormInput(initialValues.name),
    symbol: useFormInput(initialValues.symbol),
    decimal: useFormInput(initialValues.decimal)
  }
  const { mandatoryFields, metadataFields } = useMemoizeFields(
    fields,
    hasMetadata
  )
  const [initialSupplyField] = mandatoryFields
  const convertedInitialSupply = useFormDependentInput<number, number>({
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
                  value={convertedInitialSupply.value.toExponential()}
                />
                <input
                  hidden={true}
                  name={INITIAL_SUPPLY_DECIMAL_FIELD}
                  {...convertedInitialSupply}
                />
              </>
            )}
        </Stack>
      )}
      {metadataFields &&
        metadataFields.map(field => {
          const fieldState = mapStates[field.fieldName]
          return (
            <StyledTextField
              required
              key={field.name}
              label={field.name}
              type={field.type}
              name={field.fieldName}
              placeholder={field.placeholder}
              {...fieldState}
            />
          )
        })}
    </Stack>
  )
}
