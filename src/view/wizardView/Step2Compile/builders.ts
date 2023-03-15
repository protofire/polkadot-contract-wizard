import { isGreaterVer, isSmallerVer } from '@utils'
import {
  formatLines,
  indentEach,
  Lines,
  spaceBetween
} from 'src/utils/formatString'

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

  addContractMethod(method: Method) {
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
    this.#storage.derive = isSmallerVer(version, 'v2.2.0')
      ? `${standard.toUpperCase()}${name}Storage`
      : null
    this.#storage.field = `#[${
      isSmallerVer(version, 'v2.2.0')
        ? `${standard.toUpperCase()}${name}StorageField`
        : 'storage_field'
    }]`
    this.#storage.name = name.toLowerCase()
    this.#storage.type = isSmallerVer(version, 'v2.2.0')
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

  collectInkImports(): string[] {
    if (
      this.inkImports.length === 0 &&
      (!this.extensions ||
        this.extensions.filter(e => e.inkImports && e.inkImports.length)
          .length === 0)
    )
      return []

    return [
      `// imports from ink!`,
      `${this.inkImports.map(i => i.toString())}`,
      `${this.extensions
        .filter(e => e.inkImports && e.inkImports.length)
        .map(e => `${e.collectInkImports()}`)}`
    ]
  }

  collectBrushImports(): string[] {
    return [
      `// imports from openbrush`,
      ...this.brushImports.map(i => i.toString()),
      ...this.extensions
        .filter(e => e.brushImports && e.brushImports.length)
        .map(e => [...indentEach(0, e.collectBrushImports(), 0)].join('\n'))
    ]
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

  collectStorageFields(): string[] {
    let lines: string[] = []
    if (this.storage) {
      lines = lines.concat(this.storage.toString())
    }

    this.extensions
      .filter(e => e.storage && e.storage instanceof Storage)
      .forEach(e => lines.push(...(e.storage as Storage).toString()))

    return lines
  }

  collectTraitImpls(): Lines[] {
    const lines: Lines[] = [
      `// Section contains default implementation without any modifications`
    ]

    if (this.impl) lines.push(...this.impl.toString())

    this.extensions
      .filter(e => e.impl instanceof TraitImpl)
      .forEach(e => lines.push(...(e.impl as TraitImpl).toString()))

    return lines
  }

  collectAdditionalImpls(): Lines[] {
    const lines: Lines[] = []

    if (this.additionalImpls.length) {
      this.additionalImpls.map(e => lines.push(...e.toString()))
    }

    return lines
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

  collectConstructorActions(): Lines[] {
    const lines: Lines[] = []

    this.constructorActions.forEach(a => lines.push(a))

    this.extensions
      .filter(e => e.constructorActions.length)
      .forEach(e => lines.push(...e.constructorActions))

    return lines
  }

  collectContractMethods(): Lines[] {
    const lines: Lines = []

    const extensionsWithContractMethods = this.extensions.filter(
      e => e.contractMethods?.length
    )

    if (extensionsWithContractMethods.length) {
      lines.push('')
      extensionsWithContractMethods.forEach(e =>
        e.contractMethods.forEach(m => lines.push(...m.toString()))
      )
    }

    return lines
  }

  printManager(): Lines[] {
    const lines: Lines[] = []

    const isAccessControl =
      this.extensions.find(
        e => e.name === 'AccessControl' || e.name === 'AccessControlEnumerable'
      ) !== undefined

    if (isAccessControl)
      lines.push(
        `const MANAGER: RoleType = ink${
          isSmallerVer(this.version, 'v3.0.0-beta') ? '_lang' : ''
        }::selector_id!("MANAGER");`
      )

    return lines
  }

  toString() {
    return formatLines(
      ...spaceBetween(
        [
          `#![cfg_attr(not(feature = "std"), no_std)]`,
          `#![feature(min_specialization)]`
        ],
        [
          `#[${this.brushName}::contract]`,
          `pub mod my_${this.standardName} {`,
          this.collectInkImports(),
          this.collectBrushImports()
        ],
        [
          spaceBetween(
            [
              `#[ink(storage)]`,
              `#[derive(Default${this.collectStorageDerives()})]`,
              `pub struct ${this.contractName} {`,
              this.collectStorageFields(),
              `}`
            ],
            this.printManager(),
            this.collectTraitImpls(),
            this.collectAdditionalImpls(),
            [
              `impl ${this.contractName} {`,
              [
                `#[ink(constructor)]`,
                `pub fn new(${this.collectConstructorArgs()}) -> Self {`,
                [
                  'let mut _instance = Self::default();',
                  ...this.collectConstructorActions(),
                  '_instance'
                ],
                `}`
              ],
              this.collectContractMethods(),
              `}` // Close Contract impl
            ]
          ),
          `}`
        ]
      )
    )
  }
  toStringDeprecated() {
    return `#![cfg_attr(not(feature = "std"), no_std)]
  #![feature(min_specialization)]

  #[${this.brushName}::contract]
  pub mod my_${this.standardName} {
      ${this.collectInkImports()}
      ${this.collectBrushImports()}
      #[ink(storage)]
      #[derive(Default${
        this.version === 'v1.3.0' || isGreaterVer(this.version, 'v2.3.0')
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
              isSmallerVer(this.version, 'v3.0.0-beta') ? '_lang' : ''
            }::selector_id!("MANAGER");`
          : ''
      }

      ${this.collectTraitImpls()}${this.collectAdditionalImpls()}

      impl ${this.contractName} {
          #[ink(constructor)]
          pub fn new(${this.collectConstructorArgs()}) -> Self {
              ${
                this.version === 'v1.3.0' ||
                isGreaterVer(this.version, 'v2.3.0')
                  ? 'let mut _instance = Self::default();'
                  : `ink${
                      isSmallerVer(this.version, 'v3.0.0-beta') ? '_lang' : ''
                    }::codegen::initialize_contract(|_instance: &mut Contract|{`
              }${this.collectConstructorActions()}${
      isGreaterVer(this.version, 'v1.3.0') &&
      isSmallerVer(this.version, 'v3.0.0-beta')
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
  contractMethods: Method[]
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

  collectInkImports(): string[] {
    return this.inkImports.map(i => i.toString())
  }

  collectBrushImports(): string[] {
    return this.brushImports.map(i => i.toString()) || []
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
  methods: Array<Method> = []

  constructor(traitName: string, structName: string, methods: Array<Method>) {
    this.traitName = traitName
    this.structName = structName
    this.methods = methods
  }

  toString(): Lines[] {
    const lines: Lines[] = [`impl ${this.traitName} for ${this.structName} {`]

    if (this.methods.length) {
      lines.push(...this.methods.map(m => m.toString()))
    }

    if (lines.length > 1) return [...lines, `}`]

    return [`${lines}}`]
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

  toString(): string[] {
    const rows = []
    if (this.field) rows.push(this.field)

    rows.push(`${this.name}: ${this.type},`)
    return rows
  }
}

export class Method {
  brushName = ''
  isPublic = false
  mutating = false
  derives: string[] | null = null
  name = ''
  args: string[] = []
  return_type: string | null = null
  body: string | null = ''

  constructor(
    brushName: string,
    isPublic: boolean,
    mutating: boolean,
    derives: string[] | null,
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

  toString(): Lines[] {
    const lines: Lines[] = []

    if (this.derives) lines.push(...this.derives)

    let argsString = ''
    if (this.args.length < 2) {
      argsString = `&${this.mutating ? 'mut ' : ''}self${
        this.args.length ? ', ' : ''
      }${this.args.map(a => a.toString()).join(', ')}`
    } else {
      argsString = `&${this.mutating ? 'mut ' : ''}self, ${this.args
        .map(a => a.toString())
        .join(', ')}`
    }
    const returnTypeString = this.return_type ? ` -> ${this.return_type}` : ''
    lines.push(
      `${this.isPublic ? 'pub ' : ''}fn ${
        this.name
      }(${argsString})${returnTypeString} {`
    )

    if (this.body) lines.push([this.body.toString()])

    lines.push('}')
    return lines
  }
}
