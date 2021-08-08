export namespace ALREADY_INSTALLED {
  function message(): string
  const symbol: symbol
}
export namespace IS_DEPENDANT_OF_SHAREC {
  export function message_1(): string
  export { message_1 as message }
  const symbol_1: symbol
  export { symbol_1 as symbol }
}
export namespace IS_IGNORES_SHAREC {
  export function message_2(): string
  export { message_2 as message }
  const symbol_2: symbol
  export { symbol_2 as symbol }
}
export namespace CONFIGS_NOT_FOUND {
  export function message_3(path: any): string
  export { message_3 as message }
  const symbol_3: symbol
  export { symbol_3 as symbol }
}
