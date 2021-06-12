export = createJsonPipe
/**
 * Creates function with given handlers which accepts params in JSON format
 * and returns data in the same format
 * @param {...Function[]} handlers
 * @returns {Function}
 */
declare function createJsonPipe(...handlers: Function[][]): Function
