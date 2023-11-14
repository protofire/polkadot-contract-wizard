import { LoadingButton, LoadingButtonProps } from '@/view/components'
import styled from '@emotion/styled'

export const ButtonCall = styled(LoadingButton)<LoadingButtonProps>(() => ({
  fontSize: '1rem',
  height: '2.5rem',
  borderRadius: '1.5rem',
  textTransform: 'none',
  border: 'none'
}))
