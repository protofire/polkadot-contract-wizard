import { ContractConfig, TokenType } from '@types'
import {
  ExtensionBuilder,
  Import,
  Method,
  StorageBuilder,
  TraitImpl
} from './builders'
import { BRUSH_NAME, CONTRACT_NAME, VERSION } from '@constants'

export function getExtensions(data: ContractConfig, standardName: TokenType) {
  const extensions = []
  let usesStandardExtensions = false

  // Ownable extension
  if (data.security === 'ownable') {
    extensions.push(securityImports('ownable', standardName, data.security, []))
  }
  // AccessControl extension
  if (data.security === 'access_control') {
    extensions.push(
      securityImports('access_control', standardName, data.security, [])
    )
  }
  // AccessControlEnumerable extension
  if (data.security === 'access_control_enumerable') {
    const extension = new ExtensionBuilder()
    extension.addBrushImport(
      new Import(`${BRUSH_NAME}::contracts::access_control::only_role`)
    )
    extension.setImpl(new TraitImpl('AccessControl', CONTRACT_NAME, []))

    extensions.push(extension.getExtension())
    extensions.push(
      securityImports(
        'access_control_enumerable',
        standardName,
        data.security,
        []
      )
    )

    usesStandardExtensions = true
  }

  // Batch extension
  if (data.extensions.Batch === true) {
    extensions.push(generateExtension('Batch', standardName, data.security, []))

    usesStandardExtensions = true
  }
  // Burnable extension
  if (data.extensions.Burnable === true) {
    extensions.push(
      generateExtension('Burnable', standardName, data.security, [])
    )

    usesStandardExtensions = true
  }
  //   // Mintable extension
  //   if (
  //     output.currentControlsState.find(
  //       (x: { name: string }) => x.name === 'Mintable'
  //     )?.state
  //   ) {
  //     extensions.push(
  //       generateExtension(
  //         'Mintable',
  //         standardName,
  //         contractName,
  //         version,
  //         output.security,
  //         []
  //       )
  //     )

  //     usesStandardExtensions = true
  //   }
  //   // Enumerable extension psp34 > v1.5.0
  //   if (
  //     output.currentControlsState.find(
  //       (x: { name: string }) => x.name === 'Enumerable'
  //     )?.state
  //   ) {
  //     extensions.push(
  //       generateExtension(
  //         'Enumerable',
  //         standardName,
  //         contractName,
  //         version,
  //         output.security,
  //         []
  //       )
  //     )

  //     usesStandardExtensions = true
  //   }
  //   // Pausable extension
  //   if (
  //     output.currentControlsState.find(
  //       (x: { name: string }) => x.name === 'Pausable'
  //     )?.state
  //   ) {
  //     extensions.push(
  //       generateExtension(
  //         'Pausable',
  //         standardName,
  //         contractName,
  //         version,
  //         output.security,
  //         []
  //       )
  //     )

  //     usesStandardExtensions = true
  //   }
  //   // Metadata extension
  //   if (
  //     output.currentControlsState.find(
  //       (x: { name: string }) => x.name === 'Metadata'
  //     )?.state
  //   ) {
  //     extensions.push(
  //       generateExtension(
  //         'Metadata',
  //         standardName,
  //         contractName,
  //         version,
  //         output.security,
  //         []
  //       )
  //     )

  //     usesStandardExtensions = true
  //   }
  //   // Flashmint extension
  //   if (
  //     output.currentControlsState.find(
  //       (x: { name: string }) => x.name === 'FlashMint'
  //     )?.state
  //   ) {
  //     extensions.push(
  //       generateExtension(
  //         'FlashMint',
  //         standardName,
  //         contractName,
  //         version,
  //         output.security,
  //         []
  //       )
  //     )

  //     usesStandardExtensions = true
  //   }
  //   // Wrapper extension
  //   if (
  //     output.currentControlsState.find(
  //       (x: { name: string }) => x.name === 'Wrapper'
  //     )?.state
  //   ) {
  //     extensions.push(
  //       generateExtension(
  //         'Wrapper',
  //         standardName,
  //         contractName,
  //         version,
  //         output.security,
  //         []
  //       )
  //     )

  //     usesStandardExtensions = true
  //   }
  //   // Capped extension
  //   if (
  //     output.currentControlsState.find(
  //       (x: { name: string }) => x.name === 'Capped'
  //     )?.state
  //   ) {
  //     extensions.push(
  //       generateExtension(
  //         'Capped',
  //         standardName,
  //         contractName,
  //         version,
  //         output.security,
  //         []
  //       )
  //     )

  //     usesStandardExtensions = true
  //   }

  return { extensions, usesStandardExtensions }
}

export function securityImports(
  extensionName: string,
  standardName: TokenType,
  security: string | undefined,
  additionalMethods: Method[]
) {
  switch (extensionName) {
    case 'ownable':
      const ownableExtension = new ExtensionBuilder()
      ownableExtension.setName('Ownable')
      ownableExtension.addBrushImport(
        new Import(`${BRUSH_NAME}::contracts::ownable::*`)
      )

      const ownableStorage = new StorageBuilder()
      ownableStorage.constructDefaultStorage('Ownable', VERSION)
      ownableExtension.setStorage(ownableStorage.getStorage())

      ownableExtension.setImpl(
        new TraitImpl(`Ownable`, CONTRACT_NAME, additionalMethods)
      )
      ownableExtension.addConstructorAction(
        '_instance._init_with_owner(_instance.env().caller());'
      )

      return ownableExtension.getExtension()
    case 'access_control':
      const accessControlExtension = new ExtensionBuilder()

      accessControlExtension.setName('AccessControl')
      accessControlExtension.addBrushImport(
        new Import(`${BRUSH_NAME}::contracts::access_control::*`)
      )

      const accessControlStorage = new StorageBuilder()
      accessControlStorage.constructDefaultStorage('AccessControl', VERSION)
      if (VERSION > 'v2.1.0')
        accessControlStorage.setType('access_control::Data')
      accessControlStorage.setName('access')
      accessControlExtension.setStorage(accessControlStorage.getStorage())

      accessControlExtension.setImpl(
        new TraitImpl(`AccessControl`, CONTRACT_NAME, additionalMethods)
      )
      accessControlExtension.addConstructorAction(
        '_instance._init_with_admin(_instance.env().caller());'
      )
      accessControlExtension.addConstructorAction(
        '_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");'
      )

      return accessControlExtension.getExtension()
    case 'access_control_enumerable':
      const accessControlEnumerableExtension = new ExtensionBuilder()
      accessControlEnumerableExtension.setName('AccessControlEnumerable')
      accessControlEnumerableExtension.addBrushImport(
        new Import(
          `${BRUSH_NAME}::contracts::access_control::extensions::enumerable::*`
        )
      )

      const accessControlEnumerableStorage = new StorageBuilder()

      if (VERSION < 'v2.2.0')
        accessControlEnumerableStorage.setDerive('AccessControlStorage')
      accessControlEnumerableStorage.setField(
        `\t#[${
          VERSION < 'v2.2.0' ? 'AccessControlStorageField' : 'storage_field'
        }]`
      )
      accessControlEnumerableStorage.setName('access')
      accessControlEnumerableStorage.setType(
        `${
          VERSION < 'v2.2.0'
            ? 'AccessControlData<EnumerableMembers>'
            : 'access_control::Data<Members>'
        }`
      )

      accessControlEnumerableExtension.setStorage(
        accessControlEnumerableStorage.getStorage()
      )

      accessControlEnumerableExtension.setImpl(
        new TraitImpl(
          `AccessControlEnumerable`,
          CONTRACT_NAME,
          additionalMethods
        )
      )
      accessControlEnumerableExtension.addConstructorAction(
        '_instance._init_with_admin(_instance.env().caller());'
      )
      accessControlEnumerableExtension.addConstructorAction(
        '_instance.grant_role(MANAGER, _instance.env().caller()).expect("Should grant MANAGER role");'
      )

      return accessControlEnumerableExtension.getExtension()
  }
}

export function generateExtension(
  extensionName: string,
  standardName: TokenType,
  security: string | undefined,
  additionalMethods: Method[]
) {
  switch (extensionName) {
    case 'Batch':
      const batchExtension = new ExtensionBuilder()
      batchExtension.setName('Batch')
      batchExtension.addBrushImport(
        new Import(
          `${BRUSH_NAME}::contracts::${standardName}::extensions::batch::*`
        )
      )
      batchExtension.setImpl(
        new TraitImpl(
          `${standardName.toUpperCase()}Batch`,
          CONTRACT_NAME,
          additionalMethods
        )
      )

      return batchExtension.getExtension()
    case 'Burnable':
      const burnableExtension = new ExtensionBuilder()
      burnableExtension.setName('Burnable')
      burnableExtension.addBrushImport(
        new Import(
          `${BRUSH_NAME}::contracts::${standardName}::extensions::burnable::*`
        )
      )

      if (security && security !== 'none') {
        const args = []
        args.push('account: AccountId')

        if (standardName === 'psp22') args.push('amount: Balance')
        if (standardName === 'psp37')
          args.push('ids_amounts: Vec<(Id, Balance)>')
        if (standardName === 'psp34') args.push('id: Id')

        additionalMethods.push(
          new Method(
            BRUSH_NAME,
            false,
            true,
            `#[ink(message)]\n\t\t#[${BRUSH_NAME}::modifiers(${
              security === 'ownable' ? 'only_owner' : 'only_role(MANAGER)'
            })]`,
            'burn',
            args,
            `Result<(), ${standardName.toUpperCase()}Error>`,
            `self._burn_from(account, ${
              standardName === 'psp22'
                ? 'amount'
                : standardName === 'psp34'
                ? 'id'
                : 'ids_amounts'
            })`
          )
        )
      }

      burnableExtension.setImpl(
        new TraitImpl(
          `${standardName.toUpperCase()}Burnable`,
          CONTRACT_NAME,
          additionalMethods
        )
      )

      return burnableExtension.getExtension()
    // case 'Mintable':
    //   const mintableExtension = new ExtensionBuilder()
    //   mintableExtension.setName('Mintable')
    //   mintableExtension.addBrushImport(
    //     new Import(
    //       `${BRUSH_NAME}::contracts::${standardName}::extensions::mintable::*`
    //     )
    //   )

    //   if (security && security !== 'none') {
    //     const args = []
    //     args.push('account: AccountId')

    //     if (standardName === 'psp22') args.push('amount: Balance')
    //     if (
    //       standardName === 'psp37' ||
    //       standardName === 'psp1155' ||
    //       standardName === 'psp35'
    //     )
    //       args.push('ids_amounts: Vec<(Id, Balance)>')
    //     if (standardName === 'psp34') args.push('id: Id')

    //     additionalMethods.push(
    //       new Method(
    //         BRUSH_NAME,
    //         false,
    //         true,
    //         `#[ink(message)]\n\t\t#[${BRUSH_NAME}::modifiers(${
    //           security === 'ownable' ? 'only_owner' : 'only_role(MANAGER)'
    //         })]`,
    //         'mint',
    //         args,
    //         `Result<(), ${standardName.toUpperCase()}Error>`,
    //         `self._mint${
    //           standardName !== 'psp22' ? '_to' : version < 'v2.3.0' ? '' : '_to'
    //         }(account, ${
    //           standardName === 'psp22'
    //             ? 'amount'
    //             : standardName === 'psp34'
    //             ? 'id'
    //             : 'ids_amounts'
    //         })`
    //       )
    //     )
    //   }

    //   mintableExtension.setImpl(
    //     new TraitImpl(
    //       `${standardName.toUpperCase()}Mintable`,
    //       contractName,
    //       additionalMethods
    //     )
    //   )

    //   if (standardName === 'psp34') {
    //     mintableExtension.addConstructorAction(
    //       '_instance._mint_to(_instance.env().caller(), Id::U8(1)).expect("Can mint");'
    //     )
    //   }

    //   return mintableExtension.getExtension()
    // case 'Enumerable':
    //   const enumerableExtension = new ExtensionBuilder()

    //   enumerableExtension.setName('Enumerable')
    //   enumerableExtension.addBrushImport(
    //     new Import(
    //       `${BRUSH_NAME}::contracts::${standardName}::extensions::enumerable::*`
    //     )
    //   )
    //   if (version < 'v2.1.0') {
    //     const enumerableStorage = new StorageBuilder()
    //     enumerableStorage.constructDefaultStorage(
    //       'Enumerable',
    //       version,
    //       standardName
    //     )
    //     enumerableExtension.setStorage(enumerableStorage.getStorage())
    //   }

    //   enumerableExtension.setImpl(
    //     new TraitImpl(
    //       `${standardName.toUpperCase()}Enumerable`,
    //       contractName,
    //       additionalMethods
    //     )
    //   )

    //   return enumerableExtension.getExtension()
    // case 'Pausable':
    //   const pausableExtension = new ExtensionBuilder()

    //   pausableExtension.setName('Pausable')
    //   pausableExtension.addBrushImport(
    //     new Import(`${BRUSH_NAME}::contracts::pausable::*`)
    //   )

    //   const pausableStorage = new StorageBuilder()
    //   pausableStorage.constructDefaultStorage('Pausable', version)
    //   pausableExtension.setStorage(pausableStorage.getStorage())

    //   pausableExtension.setImpl(
    //     new TraitImpl(`Pausable`, contractName, additionalMethods)
    //   )
    //   pausableExtension.addContractMethod(
    //     new Method(
    //       BRUSH_NAME,
    //       true,
    //       true,
    //       `#[ink(message)]${
    //         security
    //           ? `\n\t\t#[${BRUSH_NAME}::modifiers(${
    //               security === 'ownable' ? 'only_owner' : 'only_role(MANAGER)'
    //             })]`
    //           : ''
    //       }`,
    //       'change_state',
    //       [],
    //       `Result<(), ${standardName.toUpperCase()}Error>`,
    //       `if self.paused() {
    //             self._unpause()
    //         } else {
    //             self._pause()
    //         }`
    //     )
    //   )

    //   return pausableExtension.getExtension()
    // case 'Metadata':
    //   const metadataExtension = new ExtensionBuilder()

    //   metadataExtension.setName('Metadata')
    //   metadataExtension.addBrushImport(
    //     new Import(
    //       `${BRUSH_NAME}::contracts::${standardName}::extensions::metadata::*`
    //     )
    //   )

    //   const metadataStorage = new StorageBuilder()
    //   metadataStorage.constructDefaultStorage('Metadata', version, standardName)
    //   metadataExtension.setStorage(metadataStorage.getStorage())

    //   metadataExtension.setImpl(
    //     new TraitImpl(
    //       `${standardName.toUpperCase()}Metadata`,
    //       contractName,
    //       additionalMethods
    //     )
    //   )

    //   if (standardName === 'psp22') {
    //     metadataExtension.addConstructorArg('name: Option<String>')
    //     metadataExtension.addConstructorArg('symbol: Option<String>')
    //     metadataExtension.addConstructorArg('decimal: u8')

    //     metadataExtension.addConstructorAction(
    //       '_instance.metadata.name = name;'
    //     )
    //     metadataExtension.addConstructorAction(
    //       '_instance.metadata.symbol = symbol;'
    //     )
    //     metadataExtension.addConstructorAction(
    //       '_instance.metadata.decimals = decimal;'
    //     )
    //   }

    //   if (
    //     version < 'v2.1.0' &&
    //     (standardName === 'psp37' ||
    //       standardName === 'psp35' ||
    //       standardName === 'psp1155')
    //   ) {
    //     metadataExtension.addConstructorArg('uri: Option<String>')
    //     metadataExtension.addConstructorAction('_instance.metadata.uri = uri;')
    //   }

    //   if (standardName === 'psp34') {
    //     metadataExtension.addConstructorAction(
    //       'let collection_id = _instance.collection_id();'
    //     )
    //     metadataExtension.addConstructorAction(
    //       `_instance._set_attribute(collection_id.clone(), String::from("name")${
    //         version <= 'v2.2.0' ? '.into_bytes()' : ''
    //       }, String::from("MyPSP34")${
    //         version <= 'v2.2.0' ? '.into_bytes()' : ''
    //       });`
    //     )
    //     metadataExtension.addConstructorAction(
    //       `_instance._set_attribute(collection_id, String::from("symbol")${
    //         version <= 'v2.2.0' ? '.into_bytes()' : ''
    //       }, String::from("MPSP")${
    //         version <= 'v2.2.0' ? '.into_bytes()' : ''
    //       });`
    //     )
    //   }

    //   return metadataExtension.getExtension()
    // case 'FlashMint':
    //   const flashMintExtension = new ExtensionBuilder()

    //   flashMintExtension.setName('FlashMint')
    //   flashMintExtension.addBrushImport(
    //     new Import(
    //       `${BRUSH_NAME}::contracts::${standardName}::extensions::flashmint::*`
    //     )
    //   )
    //   flashMintExtension.setImpl(
    //     new TraitImpl(`FlashLender`, contractName, additionalMethods)
    //   )

    //   return flashMintExtension.getExtension()
    // case 'Wrapper':
    //   const wrapperExtension = new ExtensionBuilder()

    //   wrapperExtension.setName('Wrapper')
    //   wrapperExtension.addBrushImport(
    //     new Import(
    //       `${BRUSH_NAME}::contracts::${standardName}::extensions::wrapper::*`
    //     )
    //   )

    //   const wrapperStorage = new StorageBuilder()
    //   wrapperStorage.constructDefaultStorage('Wrapper', version, standardName)
    //   wrapperExtension.setStorage(wrapperStorage.getStorage())

    //   wrapperExtension.setImpl(
    //     new TraitImpl(
    //       `${standardName.toUpperCase()}Wrapper`,
    //       contractName,
    //       additionalMethods
    //     )
    //   )

    //   return wrapperExtension.getExtension()
    // case 'Capped':
    //   const cappedExtension = new ExtensionBuilder()

    //   const cappedStorage = new StorageBuilder()
    //   cappedStorage.setName('cap')
    //   cappedStorage.setType('Balance')

    //   cappedExtension.setStorage(cappedStorage.getStorage())

    //   cappedExtension.setName('Capped')
    //   cappedExtension.addContractMethod(
    //     new Method(
    //       BRUSH_NAME,
    //       true,
    //       false,
    //       `#[ink(message)]`,
    //       'cap',
    //       [],
    //       'Balance',
    //       `self.cap`
    //     )
    //   )
    //   cappedExtension.addContractMethod(
    //     new Method(
    //       BRUSH_NAME,
    //       false,
    //       true,
    //       null,
    //       '_init_cap',
    //       ['cap: Balance'],
    //       `Result<(), ${standardName.toUpperCase()}Error>`,
    //       `if cap <= 0 {
    //             return Err(PSP22Error::Custom(String::from("Cap must be above 0")))
    //         }
    //         self.cap = cap;
    //         Ok(())`
    //     )
    //   )

    //   return cappedExtension.getExtension()
  }
}
