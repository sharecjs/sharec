const { EOL } = require('os')
const { fixtures } = require('testUtils')
const {
  hasSpacesIndent,
  hasTabsIndent,
  hasEOF,
  cutEOF,
  indentWithTab,
  indentWithSpace,
  applyFormat,
  getFormatByFilename,
} = require('./format')

describe('utils > format', () => {
  const jsonFxt = fixtures('default/json/02-formatting')
  const yamlFxt = fixtures('default/yaml/01-formatting')

  describe('hasSpacesIndent', () => {
    it('should correctly determine spaces indent in string', () => {
      expect(hasSpacesIndent(jsonFxt.result)).toBe(true)
      expect(hasSpacesIndent(yamlFxt.result)).toBe(true)
      expect(hasSpacesIndent(jsonFxt.current)).toBe(false)
    })
  })

  describe('hasTabsIndent', () => {
    it('should correctly determine tabs indent in string', () => {
      expect(hasTabsIndent(jsonFxt.result)).toBe(false)
      expect(hasTabsIndent(yamlFxt.result)).toBe(false)
      expect(hasTabsIndent(jsonFxt.current)).toBe(true)
    })
  })

  describe('hasEOF', () => {
    it('should correctly determine line wrap at the and of the all lines', () => {
      expect(hasEOF(`foo${EOL}${EOL}`)).toBe(true)
      expect(hasEOF('foo')).toBe(false)
    })
  })

  describe('cutEOF', () => {
    it('cuts off line wrap at the and of the given string', () => {
      expect(cutEOF(`foo${EOL}${EOL}`)).toBe(`foo${EOL}`)
      expect(cutEOF(`foo${EOL}`)).toBe('foo')
      expect(cutEOF('foo')).toBe('foo')
    })
  })

  describe('indentWithTab', () => {
    it('should replace all spaces with tabs', () => {
      expect(indentWithTab(jsonFxt.result)).toMatchSnapshot()
    })

    it('should not affect string with tabs', () => {
      expect(indentWithTab(jsonFxt.current)).toMatchSnapshot()
    })
  })

  describe('indentWithSpace', () => {
    it('should replace all tabs with spaces', () => {
      expect(indentWithSpace(jsonFxt.current, 2)).toMatchSnapshot()
    })

    it('should not affect string with spaces', () => {
      expect(indentWithSpace(jsonFxt.result, 2)).toMatchSnapshot()
    })
  })

  describe('applyFormat', () => {
    it('should apply format to given string', () => {
      expect(
        applyFormat({
          content: jsonFxt.current,
          rules: {
            indentType: 'space',
            indentSize: 2,
            eof: false,
          },
        }),
      ).toMatchSnapshot()
      expect(
        applyFormat({
          filename: 'foo.yaml',
          content: yamlFxt.current,
          rules: {
            indentType: 'space',
            indentSize: 2,
            eof: false,
          },
        }),
      ).toMatchSnapshot()
      expect(
        applyFormat({
          content: jsonFxt.result,
          rules: {
            indentType: 'tab',
            eof: false,
          },
        }),
      ).toMatchSnapshot()
      expect(
        applyFormat({
          filename: 'bar.yml',
          content: yamlFxt.result,
          rules: {
            indentType: 'tab',
            eof: false,
          },
        }),
      ).toMatchSnapshot()
      expect(
        applyFormat({
          content: 'foo',
          rules: {
            eof: true,
          },
        }),
      ).toMatchSnapshot()
    })
  })

  describe('getFormatByFilename', () => {
    const jsFormat = { foo: 'bar' }
    const yamlFormat = { bar: 'baz' }

    it('should return format by extname', () => {
      const formats = {
        '*.json': jsFormat,
        '*.yaml': yamlFormat,
      }

      expect(getFormatByFilename(formats, 'foo.json')).toBe(jsFormat)
      expect(getFormatByFilename(formats, 'foo.yaml')).toBe(yamlFormat)
    })

    it('should return format by extnames sequence', () => {
      const formats = {
        '*.{json,yaml}': jsFormat,
      }

      expect(getFormatByFilename(formats, 'foo.json')).toBe(jsFormat)
      expect(getFormatByFilename(formats, 'foo.yaml')).toBe(jsFormat)
    })

    it('should return format by filename', () => {
      const formats = {
        'foo.json': jsFormat,
        'bar.yaml': yamlFormat,
      }

      expect(getFormatByFilename(formats, 'foo.json')).toBe(jsFormat)
      expect(getFormatByFilename(formats, 'bar.yaml')).toBe(yamlFormat)
    })

    it('should return format by filenames sequence', () => {
      const formats = {
        '{foo.json,bar.yaml}': jsFormat,
        '{bar.json,baz.yaml}': yamlFormat,
      }

      expect(getFormatByFilename(formats, 'foo.json')).toBe(jsFormat)
      expect(getFormatByFilename(formats, 'bar.yaml')).toBe(jsFormat)
      expect(getFormatByFilename(formats, 'bar.json')).toBe(yamlFormat)
      expect(getFormatByFilename(formats, 'baz.yaml')).toBe(yamlFormat)
    })
  })
})
