import { InputAdornment, Stack, Tooltip, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Big from 'big.js'

import { useFormInput, ControlledFormInput, ValidationFn } from '@/hooks'
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
import { useEffect } from 'react'
import { useForm } from '@/hooks/useForm'

export const INITIAL_SUPPLY_DECIMAL_FIELD = 'initialSupplyPowDecimal'

type FieldValues = {
  initialSupply: number
  name: string
  symbol: string
  decimal: number
  initialSupplyPowDecimal: string
}

type ConstructorFieldNameExtended =
  | ConstructorFieldName
  | typeof INITIAL_SUPPLY_DECIMAL_FIELD

export type ConstructorTokenFieldProps = {
  [K in ConstructorFieldNameExtended]: FieldValues[K]
}

const initialValues = {
  initialSupply: 100,
  name: 'My Token',
  symbol: 'MTK',
  decimal: 18
}

type ValidationMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in ConstructorFieldName]: Array<ValidationFn<any>>
}

const mapValidations: ValidationMap = {
  initialSupply: [notEmpty, positiveNumber],
  name: [notEmpty],
  symbol: [notEmpty],
  decimal: [
    notEmpty,
    positiveNumberOrZero,
    (value: number) => maxAllowed(value, 64)
  ]
}

export function FormConstructorContract({
  fields,
  hasMetadata,
  onSubmit
}: {
  fields: ConstructorTokenField[]
  hasMetadata: boolean
  onSubmit: (values: ConstructorTokenFieldProps) => void
}): JSX.Element {
  const { register, handleSubmit, errors, setValue, values } = useForm({
    initialSupply: initialValues.initialSupply,
    name: initialValues.name,
    symbol: initialValues.symbol,
    decimal: initialValues.decimal,
    initialSupplyPowDecimal: initialSupplyPowDecimal([
      initialValues.initialSupply,
      initialValues.decimal
    ])
      .toExponential()
      .toString()
  })
  const { mandatoryFields, metadataFields } = useMemoizeFields(
    fields,
    hasMetadata
  )
  const [initialSupplyField] = mandatoryFields

  useEffect(() => {
    const newConvertedValue = initialSupplyPowDecimal([
      values.initialSupply,
      values.decimal
    ])
      .toExponential()
      .toString()

    if (newConvertedValue !== values.initialSupplyPowDecimal) {
      setValue('initialSupplyPowDecimal', newConvertedValue)
    }
  }, [
    values.initialSupply,
    values.decimal,
    setValue,
    values.initialSupplyPowDecimal
  ])

  const _handleSubmit = (values: ConstructorTokenFieldProps) => {
    // onSubmit(values)
    console.log(values)
  }

  return (
    <form id="deploy-form" onSubmit={handleSubmit(_handleSubmit)}>
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
              {...register(initialSupplyField.fieldName, [
                notEmpty,
                positiveNumber
              ])}
              required
              label={initialSupplyField.fieldName}
              type={initialSupplyField.type}
              name={initialSupplyField.fieldName}
              placeholder={initialSupplyField.placeholder}
              error={Boolean(errors[initialSupplyField.fieldName])}
              helperText={
                Boolean(errors[initialSupplyField.fieldName])
                  ? errors[initialSupplyField.fieldName]
                  : ''
              }
            />
            {hasMetadata && values.initialSupply && values.decimal && (
              <>
                <StyledTextField
                  disabled
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <Tooltip
                        title={`This field represents the calculation of 'Initial Supply' multiplied by 10
                    to the power of 'decimals' (1e${values.decimal}).`}
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
                  value={values.initialSupplyPowDecimal}
                  error={Boolean(errors.initialSupplyPowDecimal)}
                  helperText={
                    Boolean(errors.initialSupplyPowDecimal)
                      ? errors.initialSupplyPowDecimal
                      : ''
                  }
                />
                {/* <input
                  hidden={true}
                  name={INITIAL_SUPPLY_DECIMAL_FIELD}
                  {...{
                    onChange: convertedInitialSupply.onChange,
                    value: convertedInitialSupply.value.toFixed()
                  }}
                /> */}
              </>
            )}
          </Stack>
        )}
        {metadataFields &&
          metadataFields.map(field => {
            return (
              <StyledTextField
                key={field.name}
                required
                label={field.name}
                type={field.type}
                {...(field.type === 'number' ? { min: 0 } : null)}
                name={field.fieldName}
                placeholder={field.placeholder}
                InputLabelProps={{
                  shrink: true
                }}
                {...register(field.fieldName, mapValidations[field.fieldName])}
                error={Boolean(errors[field.fieldName])}
                helperText={
                  Boolean(errors[field.fieldName])
                    ? errors[field.fieldName]
                    : ''
                }
              />
            )
          })}
      </Stack>
    </form>
  )
}
