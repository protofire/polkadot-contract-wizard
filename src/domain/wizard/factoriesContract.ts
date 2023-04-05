import { AnyControlsToken, WIZARD_CONFIG } from '@/constants/index'
import { TokenType } from '@/types'

export function factoryControlsToken(token: TokenType) {
  const currentToken = WIZARD_CONFIG.find(_token => _token.name === token)
  return {
    extensionFields: currentToken?.controls.find(
      options => options.sectionName === 'Extensions'
    ),
    constructorFields: currentToken?.controls.find(
      options => options.sectionName === 'Constructor'
    )
  }
}

// Return initial value of fields
export function factoryOptionTokenValues(
  tokenOptionsConfig: AnyControlsToken | undefined
) {
  if (tokenOptionsConfig === undefined) return []

  return Object.assign(
    {},
    ...tokenOptionsConfig.optionList.map(control => ({
      [control.name]: control.initState
    }))
  )
}
