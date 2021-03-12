// TODO: split me!
export interface ParsedCommand {
  readonly env: string[]
  readonly args: string[]
  readonly separator?: string
  get(key: string): string | string[]
}

export type SchemaParam<T> = Map<string, T>

export type SchemaParams<T> = {
  current?: T
  upcoming?: T
  cached?: T
  result?: T
}

export type SchemaCommandParam = SchemaParam<ParsedCommand[]>

export type SchemaCommandsParams = SchemaParams<ParsedCommand[]>

export type SchemaHashParam = SchemaParam<Map<string, any>>

export type SchemaHashParams = SchemaParams<Map<string, any>>

export type Schema = {
  $$ignore?: string[]
  $$default?: Function
  [x: string]: any
}
