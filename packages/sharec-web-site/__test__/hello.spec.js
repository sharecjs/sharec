import { sayHello } from 'src/blocks/hello/index.js'

describe('sayHello', () => {
  it('should prints to console with given name', () => {
    jest.spyOn(console, 'log')

    sayHello('foo')

    expect(console.log).toBeCalledTimes(1)
    expect(console.log).toBeCalledWith('Hello foo!')
  })
})
