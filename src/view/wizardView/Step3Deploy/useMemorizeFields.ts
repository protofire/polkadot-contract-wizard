import { useMemo } from 'react'
import { ConstructorTokenField } from '@/constants/index'
import {
  MandatoryFields,
  isMandatoryField
} from '@/domain/wizard/step3DeployForm.types'

export function useMemoizeFields(
  optionList: ConstructorTokenField[] | undefined,
  hasMetadata: boolean
): {
  mandatoryFields: MandatoryFields[]
  metadataFields: ConstructorTokenField[]
} {
  return useMemo(
    () => ({
      mandatoryFields:
        ((optionList &&
          optionList.filter(field =>
            isMandatoryField(field)
          )) as MandatoryFields[]) || [],
      metadataFields:
        (hasMetadata &&
          optionList &&
          optionList.filter(field => !field.mandatory)) ||
        []
    }),
    [optionList, hasMetadata]
  )
}
