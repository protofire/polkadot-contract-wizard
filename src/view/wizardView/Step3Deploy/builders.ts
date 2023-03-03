export class ContractBuilder {
  #contract

  constructor() {
    this.#contract = new Contract()
  }

  setContractName(name) {
    this.#contract.contractName = name
  }

  setVersion(version) {
    this.#contract.version = version
  }

  setBrushName(brushName) {
    this.#contract.brushName = brushName
  }

  setStandardName(standardName) {
    this.#contract.standardName = standardName
  }

  addInkImport(inkImport) {
    this.#contract.inkImports.push(inkImport)
  }

  addBrushImport(brushImport) {
    this.#contract.brushImports.push(brushImport)
  }

  setImpl(impl) {
    this.#contract.impl = impl
  }

  addAdditionalImpl(impl) {
    this.#contract.additionalImpls.push(impl)
  }

  setStorage(storage) {
    this.#contract.storage = storage
  }

  addExtension(extension) {
    this.#contract.extensions.push(extension)
  }

  addConstructorArg(arg) {
    this.#contract.constructorArgs.push(arg)
  }

  addConstructorAction(action) {
    this.#contract.constructorActions.push(action)
  }

  getContract() {
    return this.#contract
  }
}

export class ExtensionBuilder {
  #extension = null

  constructor() {
    this.#extension = new Extension()
  }

  setName(name) {
    this.#extension.name = name
  }

  addInkImport(inkImport) {
    this.#extension.inkImports.push(inkImport)
  }

  addBrushImport(brushImport) {
    this.#extension.brushImports.push(brushImport)
  }

  setImpl(impl) {
    this.#extension.impl = impl
  }

  addAdditionalImpl(impl) {
    this.#extension.additionalImpls.push(impl)
  }

  setStorage(storage) {
    this.#extension.storage = storage
  }

  addConstructorArg(arg) {
    this.#extension.constructorArgs.push(arg)
  }

  addConstructorAction(action) {
    this.#extension.constructorActions.push(action)
  }

  addContractMethod(method) {
    this.#extension.contractMethods.push(method)
  }

  getExtension() {
    return this.#extension
  }
}

export class StorageBuilder {
  #storage = null

  constructor() {
    this.#storage = new Storage()
  }

  constructDefaultStorage(name, version, standard = '') {
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

  setDerive(derive) {
    this.#storage.derive = derive
  }

  setField(field) {
    this.#storage.field = field
  }

  setName(name) {
    this.#storage.name = name
  }

  setType(type) {
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
  inkImports: []
  brushImports: []
  impl: []
  additionalImpls: any
  storage: any
  extensions: any
  constructorArgs: any
  constructorActions: any

  constructor() {
    this.version = ''
    this.brushName = ''
    this.standardName = ''
    this.inkImports = []
    this.brushImports = []
    this.impl = null
    this.additionalImpls = []
    this.storage = null
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
            .map(e => `${e.storage.toString()}`)
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
            .map(e => `\t${e.impl.toString()}`)
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
  inkImports: never[]
  brushImports: never[]
  storage: null
  impl: null
  constructorArgs: never[]
  constructorActions: never[]
  contractMethods: never[]
  constructor() {
    this.name = ''
    this.inkImports = []
    this.brushImports = []
    this.storage = null
    this.impl = null
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
  path = null

  constructor(path) {
    this.path = path
  }

  toString() {
    return `use ${this.path};`
  }
}

export class TraitImpl {
  traitName = ''
  structName = ''
  methods = []

  constructor(traitName, structName, methods) {
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
  derive: string
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
  derives = null
  name = ''
  args = []
  return_type = null
  body = ''

  constructor(
    brushName,
    isPublic,
    mutating,
    derives,
    name,
    args,
    return_type,
    body
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
