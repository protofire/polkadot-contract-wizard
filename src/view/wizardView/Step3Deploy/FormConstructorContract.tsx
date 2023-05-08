import { InputAdornment, Stack, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

import { useFormInput, ControlledFormInput } from '@/hooks'
import { ConstructorTokenField } from '@/constants/index'
import { StyledTextField } from '@/components'
import { useMemoizeFields } from './useMemorizeFields'
import { ConstructorFieldName } from '@/constants/wizardData'

type FormStateContract<T> = {
  [K in ConstructorFieldName]: ControlledFormInput<
    K extends 'initialSupply' | 'decimal' ? number : string
  >
}

const initialValues = {
  initialSupply: 100,
  name: 'My Token',
  symbol: 'MTK',
  decimal: 18
}

function initialSupplyPowDecimal(supply: number, decimals: number) {
  return Number(supply) * Math.pow(10, Number(decimals))
}

export function FormConstructorContract({
  fields,
  hasMetadata
}: {
  fields: ConstructorTokenField[]
  hasMetadata: boolean
}): JSX.Element {
  const mapStates: FormStateContract<number | string> = {
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
  const convertedInitialSupply = useFormInput<number>(
    initialSupplyPowDecimal(initialValues.initialSupply, initialValues.decimal)
  )

  return (
    <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {initialSupplyField && (
        <Stack direction={hasMetadata ? 'row' : 'column'}>
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
              <StyledTextField
                required
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
                        <InfoIcon />
                      </InputAdornment>
                    </Tooltip>
                  )
                }}
                label="Initial supply will be send"
                type={initialSupplyField.type}
                name={initialSupplyField.fieldName}
                {...convertedInitialSupply}
              />
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
