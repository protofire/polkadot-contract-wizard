export class ContractBuilder {
  #contract

  constructor() {
    this.#contract = new Contract()
  }

  setContractName(name: string) {
    this.#contract.contractName = name
  }

  setVersion(version: string) {
    this.#contract.version = version
  }

  setBrushName(brushName: string) {
    this.#contract.brushName = brushName
  }

  setStandardName(standardName: string) {
    this.#contract.standardName = standardName
  }

  addInkImport(inkImport: Import) {
    this.#contract.inkImports.push(inkImport)
  }

  addBrushImport(brushImport: Import) {
    this.#contract.brushImports.push(brushImport)
  }

  setImpl(impl: TraitImpl) {
    this.#contract.impl = impl
  }

  addAdditionalImpl(impl: TraitImpl) {
    this.#contract.additionalImpls.push(impl)
  }

  setStorage(storage: Storage) {
    this.#contract.storage = storage
  }

  addExtension(extension: Extension) {
    this.#contract.extensions.push(extension)
  }

  addConstructorArg(arg: string) {
    this.#contract.constructorArgs.push(arg)
  }

  addConstructorAction(action: string) {
    this.#contract.constructorActions.push(action)
  }

  getContract() {
    return this.#contract
  }
}

export class ExtensionBuilder {
  #extension

  constructor() {
    this.#extension = new Extension()
  }

  setName(name: string) {
    this.#extension.name = name
  }

  addInkImport(inkImport: Import) {
    this.#extension.inkImports.push(inkImport)
  }

  addBrushImport(brushImport: Import) {
    this.#extension.brushImports.push(brushImport)
  }

  setImpl(impl: TraitImpl) {
    this.#extension.impl = impl
  }

  setStorage(storage: Storage) {
    this.#extension.storage = storage
  }

  addConstructorArg(arg: string) {
    this.#extension.constructorArgs.push(arg)
  }

  addConstructorAction(action: string) {
    this.#extension.constructorActions.push(action)
  }

  addContractMethod(method: string) {
    this.#extension.contractMethods.push(method)
  }

  getExtension() {
    return this.#extension
  }
}

export class StorageBuilder {
  #storage

  constructor() {
    this.#storage = new Storage()
  }

  constructDefaultStorage(name: string, version: string, standard = '') {
    this.#storage.derive =
      version < 'v2.2.0' ? `${standard.toUpperCase()}${name}Storage` : null
    this.#storage.field = `\t#[${
      version < 'v2.2.0'
        ? `${standard.toUpperCase()}${name}StorageField`
        : 'storage_field'
    }]`
    this.#storage.name = name.toLowerCase()
    this.#storage.type =
      version < 'v2.2.0'
        ? `${standard.toUpperCase()}${name}Data`
        : `${name.toLowerCase()}::Data`
  }

  setDerive(derive: string) {
    this.#storage.derive = derive
  }

  setField(field: string) {
    this.#storage.field = field
  }

  setName(name: string) {
    this.#storage.name = name
  }

  setType(type: string) {
    this.#storage.type = type
  }

  getStorage() {
    return this.#storage
  }
}

export class Contract {
  contractName: string
  version: string
  brushName: string
  standardName: string
  inkImports: Array<Import>
  brushImports: Array<Import>
  impl: TraitImpl | undefined
  additionalImpls: Array<TraitImpl>
  storage: Storage | undefined
  extensions: Array<Extension>
  constructorArgs: Array<string>
  constructorActions: Array<string>

  constructor() {
    this.version = ''
    this.brushName = ''
    this.standardName = ''
    this.inkImports = []
    this.brushImports = []
    this.impl = undefined
    this.additionalImpls = []
    this.storage = undefined
    this.extensions = []
    this.constructorArgs = []
    this.constructorActions = []
    this.contractName = ''
  }

  collectInkImports() {
    if (
      this.inkImports.length === 0 &&
      (!this.extensions ||
        this.extensions.filter(e => e.inkImports && e.inkImports.length)
          .length === 0)
    )
      return ''

    return `// imports from ink!\n${this.inkImports
      .map(i => '\t' + i.toString())
      .join('\n')}${
      this.inkImports.length &&
      this.extensions &&
      this.extensions.filter(e => e.inkImports && e.inkImports.length).length
        ? '\n'
        : ''
    }${
      this.extensions
        ? this.extensions
            .filter(e => e.inkImports && e.inkImports.length)
            .map(e => `\t${e.collectInkImports()}`)
            .join('\n') + '\n'
        : ''
    }`
  }

  collectBrushImports() {
    return `// imports from openbrush\n${this.brushImports
      .map(i => '\t' + i.toString())
      .join('\n')}${
      this.brushImports.length &&
      this.extensions &&
      this.extensions.filter(e => e.brushImports && e.brushImports.length)
        .length
        ? '\n'
        : ''
    }${
      this.extensions
        ? this.extensions
            .filter(e => e.brushImports && e.brushImports.length)
            .map(e => `\t${e.collectBrushImports()}`)
            .join('\n') + '\n'
        : ''
    }`
  }

  collectStorageDerives() {
    return `${
      this.storage && this.storage.derive ? `, ${this.storage.derive}` : ''
    }${
      (
        this.storage &&
        this.storage.derive &&
        this.extensions &&
        this.extensions.filter(e => e.storage && e.storage?.derive)
      )?.length
        ? ', '
        : ''
    }${
      this.extensions
        ? this.extensions
            .filter(e => e.storage && e.storage?.derive)
            .map(e => e.storage?.derive)
            .join(', ')
        : ''
    }`
  }

  collectStorageFields() {
    return `${this.storage ? this.storage.toString() : ''}${
      this.storage &&
      this.extensions &&
      this.extensions.filter(e => e.storage).length
        ? '\n'
        : ''
    }${
      this.extensions
        ? this.extensions
            .filter(e => e.storage)
            .map(e => `${(e.storage as Storage).toString()}`)
            .join('\n')
        : ''
    }`
  }

  collectTraitImpls() {
    return `// Section contains default implementation without any modifications\n\t${
      this.impl ? this.impl.toString() : ''
    }${
      this.impl && this.extensions && this.extensions.filter(e => e.impl).length
        ? '\n'
        : ''
    }${
      this.extensions
        ? this.extensions
            .filter(e => e.impl)
            .map(e => `\t${(e.impl as TraitImpl).toString()}`)
            .join('\n')
        : ''
    }`
  }

  collectAdditionalImpls() {
    return `${
      this.additionalImpls.length
        ? `\n\n\t${this.additionalImpls.map(e => e.toString()).join('\n')}`
        : ''
    }`
  }

  collectConstructorArgs() {
    return `${this.constructorArgs.join(', ')}${
      this.constructorArgs?.length &&
      this.extensions.filter(e => e.constructorArgs?.length).length
        ? ', '
        : ''
    }${this.extensions
      .filter(e => e.constructorArgs?.length)
      .map(e => e.constructorArgs.join(', '))
      .join(', ')}`
  }

  collectConstructorActions() {
    return `${
      this.constructorActions?.length
        ? '\n\t\t\t' +
          (this.version === 'v1.3.0' || this.version > 'v2.3.0' ? '' : '\t') +
          this.constructorActions.join('\n\t\t\t\t')
        : ''
    }${
      this.extensions &&
      this.extensions.filter(e => e.constructorActions?.length).length
        ? `\n${this.extensions
            .filter(e => e.constructorActions?.length)
            .map(
              e =>
                `${e.constructorActions
                  .map(
                    a =>
                      `${
                        this.version === 'v1.3.0' || this.version > 'v2.3.0'
                          ? ''
                          : '\t'
                      }\t\t\t${a}`
                  )
                  .join('\n')}`
            )
            .join('\n')}`
        : ''
    }`
  }

  collectContractMethods() {
    return `${
      this.extensions &&
      this.extensions.filter(e => e.contractMethods?.length).length
        ? '\n\n'
        : ''
    }${
      this.extensions
        ? this.extensions
            .filter(e => e.contractMethods?.length)
            .map(
              e => `${e.contractMethods.map(m => m.toString()).join('\n\n')}`
            )
            .join('\n\n')
        : ''
    }`
  }

  toString() {
    return `#![cfg_attr(not(feature = "std"), no_std)]
  #![feature(min_specialization)]
          
  #[${this.brushName}::contract]
  pub mod my_${this.standardName} {
      ${this.collectInkImports()}
      ${this.collectBrushImports()}
      #[ink(storage)]
      #[derive(Default${
        this.version === 'v1.3.0' || this.version > 'v2.3.0'
          ? ''
          : ', SpreadAllocate'
      }${this.collectStorageDerives()})]
      pub struct ${this.contractName} {
      ${this.collectStorageFields()}
      }${
        this.extensions.find(
          e =>
            e.name === 'AccessControl' || e.name === 'AccessControlEnumerable'
        ) !== undefined
          ? `\n\n\tconst MANAGER: RoleType = ink${
              this.version < 'v3.0.0-beta' ? '_lang' : ''
            }::selector_id!("MANAGER");`
          : ''
      }
      
      ${this.collectTraitImpls()}${this.collectAdditionalImpls()}
       
      impl ${this.contractName} {
          #[ink(constructor)]
          pub fn new(${this.collectConstructorArgs()}) -> Self {
              ${
                this.version === 'v1.3.0' || this.version > 'v2.3.0'
                  ? 'let mut _instance = Self::default();'
                  : `ink${
                      this.version < 'v3.0.0-beta' ? '_lang' : ''
                    }::codegen::initialize_contract(|_instance: &mut Contract|{`
              }${this.collectConstructorActions()}${
      this.version > 'v1.3.0' && this.version < 'v3.0.0-beta'
        ? '\n\t\t\t})'
        : '\n\t\t\t_instance'
    }
          }${this.collectContractMethods()}
      }
  }`
  }
}

export class Extension {
  name: string
  inkImports: Import[]
  brushImports: Import[]
  storage: Storage | undefined
  impl: TraitImpl | undefined
  constructorArgs: string[]
  constructorActions: string[]
  contractMethods: string[]
  constructor() {
    this.name = ''
    this.inkImports = []
    this.brushImports = []
    this.storage = undefined
    this.impl = undefined
    this.constructorArgs = []
    this.constructorActions = []
    this.contractMethods = []
  }

  collectInkImports() {
    return `${this.inkImports.map(i => i.toString()).join('\n')}`
  }

  collectBrushImports() {
    return `${this.brushImports.map(i => i.toString()).join('\n')}`
  }
}

export class Import {
  path

  constructor(path: string) {
    this.path = path
  }

  toString() {
    return `use ${this.path};`
  }
}

export class TraitImpl {
  traitName = ''
  structName = ''
  methods = Array<Method>

  constructor(traitName: string, structName: string, methods: Array<Method>) {
    this.traitName = traitName
    this.structName = structName
    this.methods = methods
  }

  toString() {
    return `impl ${this.traitName} for ${this.structName} {${
      this.methods.length
        ? `\n${this.methods.map(m => m.toString()).join('\n')}\n\t`
        : ''
    }}`
  }
}

export class Storage {
  derive: string | null
  field: string
  name: string
  type: string
  constructor() {
    this.derive = ''
    this.field = ''
    this.name = ''
    this.type = ''
  }

  toString() {
    return `${this.field ? `\t${this.field}\n` : ''}\t\t${this.name}: ${
      this.type
    },`
  }
}

export class Method {
  brushName = ''
  isPublic = false
  mutating = false
  derives: string | null = null
  name = ''
  args: string[] = []
  return_type: string | null = null
  body: string | null = ''

  constructor(
    brushName: string,
    isPublic: boolean,
    mutating: boolean,
    derives: string | null,
    name: string,
    args: string[],
    return_type: string,
    body: string | null
  ) {
    this.brushName = brushName
    this.isPublic = isPublic
    this.mutating = mutating
    this.derives = derives
    this.name = name
    this.args = args
    this.return_type = return_type
    this.body = body
  }

  toString() {
    let result = ''

    result += `${this.derives ? `\t\t${this.derives}\n` : ''}`

    if (this.args.length < 2) {
      result += `\t\t${this.isPublic ? 'pub ' : ''}fn ${this.name}(&${
        this.mutating ? 'mut ' : ''
      }self${this.args.length ? ', ' : ''}${this.args
        .map(a => a.toString())
        .join(', ')})${this.return_type ? ` -> ${this.return_type}` : ''} {`
    } else {
      result += `\t\t${this.isPublic ? 'pub ' : ''}fn ${this.name}(
              &${this.mutating ? 'mut ' : ''}self,
              ${this.args.map(a => a.toString()).join(',\n\t\t\t')}
          )${this.return_type ? ` -> ${this.return_type}` : ''} {`
    }

    result += `${this.body ? `\n\t\t\t${this.body}\n\t\t}` : '}'}`

    return result
  }
}
