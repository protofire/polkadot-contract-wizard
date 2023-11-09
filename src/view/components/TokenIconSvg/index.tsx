import { tokenTypes } from '@/domain/TokenType'
import Image from 'next/image'

import { TITLE_MAP_TOKEN, TitleMapProps } from '@/constants/titleTokenType'
import { calculateNewDimensions } from '@/utils/images'
import { ContractType } from '@/domain/repositories/DeploymentRepository'

interface Props {
  label: ContractType
}

const MAX_SIZE = 25
type MapSmallIconSize = {
  [K in ContractType]: TitleMapProps['imgProps']
}

const mapSmallIconSize: MapSmallIconSize = {} as MapSmallIconSize

for (const psp of [...tokenTypes, 'custom']) {
  const {
    imgProps: { width, height }
  } = TITLE_MAP_TOKEN[psp as ContractType]
  const { newWidth, newHeight } = calculateNewDimensions({
    width,
    height,
    newSize: MAX_SIZE
  })
  mapSmallIconSize[psp as ContractType] = { width: newWidth, height: newHeight }
}

export function TokenIconSvg({ label }: Props) {
  if (!TITLE_MAP_TOKEN[label]) return null

  const { title, imgPath } = TITLE_MAP_TOKEN[label]
  const { width, height } = mapSmallIconSize[label]

  return <Image alt={title} src={imgPath} width={width} height={height} />
}
