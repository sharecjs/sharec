export enum IndentType {
  Space = 'space',
  Tab = 'tab',
}

export type FormattingRules = {
  indentType?: IndentType
  indentSize?: number
  eof?: boolean
}

export type MappedFormattingRules = {
  [x: string]: FormattingRules
}
