export const enum WalletConnectionEvents {
  walletConnectInit = 'walletConnectInit',
  changeAccountAddress = 'changeAccountAddress',
  networkChanged = 'networkChanged',
  updateContractList = 'updateContractList'
}

export const enum AppNotificationEvents {
  notificationUpdated = 'notificationUpdated'
}

export const enum SmartContractEvents {
  contractCompiled = 'contractCompiled',
  contractInstatiate = 'contractInstatiate'
}
