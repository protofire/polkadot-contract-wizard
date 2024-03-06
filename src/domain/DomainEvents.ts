export const enum WalletConnectionEvents {
  walletConnectInit = 'walletConnectInit',
  changeAccountAddress = 'changeAccountAddress',
  networkChanged = 'networkChanged',
  customChainNameChanged = 'customChainNameChanged'
}

export const enum UserContractEvents {
  userContractUpdated = 'userContractUpdated'
}

export const enum AppNotificationEvents {
  notificationUpdated = 'notificationUpdated'
}

export const enum SmartContractEvents {
  contractCompiled = 'contractCompiled',
  contractInstatiate = 'contractInstatiate'
}
