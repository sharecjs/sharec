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
} = require('../format')

describe('utils > format', () => {
  const jsonFxt = fixtures('default/json/02-formatting')
  const yamlFxt = fixtures('default/yaml/01-formatting')

  describe('hasSpacesIndent', () => {
    it('determines spaces indent', () => {
      expect(hasSpacesIndent(jsonFxt.result)).toBe(true)
      expect(hasSpacesIndent(yamlFxt.result)).toBe(true)
      expect(hasSpacesIndent(jsonFxt.current)).toBe(false)
    })
  })

  describe('hasTabsIndent', () => {
    it('determines tabs', () => {
      expect(hasTabsIndent(jsonFxt.result)).toBe(false)
      expect(hasTabsIndent(yamlFxt.result)).toBe(false)
      expect(hasTabsIndent(jsonFxt.current)).toBe(true)
    })
  })

  describe('hasEOF', () => {
    it('determines line wrap at the and of the string', () => {
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
    it('replaces all spaces with tabs', () => {
      expect(indentWithTab(jsonFxt.result)).toMatchSnapshot()
    })

    it("doesn't affect string with tabs", () => {
      expect(indentWithTab(jsonFxt.current)).toMatchSnapshot()
    })
  })

  describe('indentWithSpace', () => {
    it('replaces all tabs with spaces', () => {
      expect(indentWithSpace(jsonFxt.current, 2)).toMatchSnapshot()
    })

    it('increases space indent', () => {
      expect(indentWithSpace(jsonFxt.result, 4)).toMatchSnapshot()
    })
  })

  describe('applyFormat', () => {
    it('applies format to given string', () => {
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
    })
  })

  describe('getFormatByFilename', () => {
    const jsFormat = { foo: 'bar' }
    const yamlFormat = { bar: 'baz' }

    it('formats by extname', () => {
      const formats = {
        '*.json': jsFormat,
        '*.yaml': yamlFormat,
      }

      expect(getFormatByFilename(formats, 'foo.json')).toBe(jsFormat)
      expect(getFormatByFilename(formats, 'foo.yaml')).toBe(yamlFormat)
    })

    it('formats by extnames sequence', () => {
      const formats = {
        '*.{json,yaml}': jsFormat,
      }

      expect(getFormatByFilename(formats, 'foo.json')).toBe(jsFormat)
      expect(getFormatByFilename(formats, 'foo.yaml')).toBe(jsFormat)
    })

    it('formats by filename', () => {
      const formats = {
        'foo.json': jsFormat,
        'bar.yaml': yamlFormat,
      }

      expect(getFormatByFilename(formats, 'foo.json')).toBe(jsFormat)
      expect(getFormatByFilename(formats, 'bar.yaml')).toBe(yamlFormat)
    })

    it('formats by filenames sequence', () => {
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
