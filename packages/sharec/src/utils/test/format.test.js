const { fixtures } = require('testUtils')
const {
  hasSpacesIndent,
  hasTabsIndent,
  hasEOF,
  indentWithTab,
  indentWithSpace,
  applyFormat,
  getFormatByFilename,
} = require('../format')

describe('utils > format', () => {
  const jsonFxt = fixtures('default/json/02-formatting')
  const yamlFxt = fixtures('default/yaml/01-formatting')

  describe('hasSpacesIndent', () => {
    it('should correctly determine spaces indent in string', () => {
      expect(hasSpacesIndent(jsonFxt.result)).toBe(true)
      expect(hasSpacesIndent(yamlFxt.result)).toBe(true)
      expect(hasSpacesIndent(jsonFxt.current)).toBe(false)
      expect(hasSpacesIndent(yamlFxt.current)).toBe(false)
    })
  })

  describe('hasTabsIndent', () => {
    it('should correctly determine tabs indent in string', () => {
      expect(hasTabsIndent(jsonFxt.result)).toBe(false)
      expect(hasTabsIndent(yamlFxt.result)).toBe(false)
      expect(hasTabsIndent(jsonFxt.current)).toBe(true)
      expect(hasTabsIndent(yamlFxt.current)).toBe(true)
    })
  })

  describe('hasEOF', () => {
    it('should correctly determine line wrap at the and of the all lines', () => {
      expect(hasEOF('foo\n\n')).toBe(true)
      expect(hasEOF('foo')).toBe(false)
    })
  })

  describe('indentWithTab', () => {
    it('should replace all spaces with tabs', () => {
      expect(indentWithTab(jsonFxt.result)).toWraplessEqual(jsonFxt.current, {
        eof: false,
      })
    })

    it('should not affect string with tabs', () => {
      expect(indentWithTab(jsonFxt.current)).toWraplessEqual(jsonFxt.current, {
        eof: false,
      })
    })
  })

  describe('indentWithSpace', () => {
    it('should replace all tabs with spaces', () => {
      expect(indentWithSpace(jsonFxt.current, 2)).toWraplessEqual(jsonFxt.result, {
        eof: false,
      })
    })

    it('should not affect string with spaces', () => {
      expect(indentWithSpace(jsonFxt.result, 2)).toWraplessEqual(jsonFxt.result, {
        eof: false,
      })
    })
  })

  describe('applyFormat', () => {
    it('should apply format to given string', () => {
      expect(
        applyFormat(jsonFxt.current, {
          indentType: 'space',
          indentSize: 2,
          eof: false,
        }),
      ).toWraplessEqual(jsonFxt.result, {
        eof: false,
      })
      expect(
        applyFormat(yamlFxt.current, {
          indentType: 'space',
          indentSize: 2,
          eof: false,
        }),
      ).toWraplessEqual(yamlFxt.result, {
        eof: false,
      })
      expect(
        applyFormat(jsonFxt.result, {
          indentType: 'tab',
          eof: false,
        }),
      ).toWraplessEqual(jsonFxt.current, {
        eof: false,
      })
      expect(
        applyFormat(yamlFxt.result, {
          indentType: 'tab',
          eof: false,
        }),
      ).toWraplessEqual(yamlFxt.current, {
        eof: false,
      })
      expect(
        applyFormat('foo', {
          eof: true,
        }),
      ).toWraplessEqual('foo\n', {
        eof: false,
      })
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
