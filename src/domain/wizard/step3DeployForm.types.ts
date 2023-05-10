import {
  ConstructorFieldName,
  ConstructorTokenField
} from '@/constants/wizardData'

export type ContractConstructorDataForm = Array<
  [ConstructorFieldName, string | number]
>

export type MandatoryFields = Omit<
  ConstructorTokenField,
  'fieldname' | 'mandatory'
> & {
  fieldName: Extract<ConstructorFieldName, 'initialSupply'>
  mandatory: true
}

export function isMandatoryField(
  field: ConstructorTokenField
): field is MandatoryFields {
  if (!field) return false

  return field.fieldName === 'initialSupply' && field.mandatory === true
}
