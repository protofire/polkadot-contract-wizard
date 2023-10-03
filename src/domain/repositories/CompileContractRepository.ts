export interface ICompileContractRepository<RawFormat, Formated> {
  create: (compileContract: RawFormat) => Promise<Formated>
  search: (codeId: string) => Promise<Formated>
}
