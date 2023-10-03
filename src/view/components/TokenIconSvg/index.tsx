import { TokenType, tokenTypes } from '@/domain/TokenType'
import Image from 'next/image'

import { TITLE_MAP_TOKEN, TitleMapProps } from '@/constants/titleTokenType'
import { calculateNewDimensions } from '@/utils/images'

interface Props {
  label: TokenType
}

const MAX_SIZE = 25
type MapSmallIconSize = {
  [K in TokenType]: TitleMapProps['imgProps']
}

const mapSmallIconSize: MapSmallIconSize = tokenTypes
  .map(psp => {
    const {
      imgProps: { width, height }
    } = TITLE_MAP_TOKEN[psp]
    const { newWidth, newHeight } = calculateNewDimensions({
      width,
      height,
      newSize: MAX_SIZE
    })

    return { [psp]: { width: newWidth, height: newHeight } } as MapSmallIconSize
  })
  .reduce((acc, item) => {
    return { ...acc, ...item }
  }, {} as MapSmallIconSize)

export function TokenIconSvg({ label }: Props) {
  if (!TITLE_MAP_TOKEN[label]) return null

  const { title, imgPath } = TITLE_MAP_TOKEN[label]
  const { width, height } = mapSmallIconSize[label]

  return <Image alt={title} src={imgPath} width={width} height={height} />
}
