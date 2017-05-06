// Helper functions.

/**
 * removeUnencodableValues returns an object without unencodable empty items.
 *
 * @param {object} a - The object incoming
 * 
 * @return {object}
 */
const removeUnencodableValues = a =>
  Object.entries(a)
    .filter(([key, value]) => {
      if (value === null) return false;
      if (value.constructor === Object) return Object.keys(value).length !== 0;
      return !!value || ['number', 'string'].indexOf(typeof value) >= 0;
    })
    .reduce((accum, [key, value]) => {
      accum[key] = value;
      return accum;
    }, {});

/**
 * isObject tests if a variable is an object (and is not null).
 *
 * `typeof null === 'object'` evaluates to `true` in JavaScript
 * because of course it does.
 *
 * @param {mixed} a - The variable under test
 *
 * @return {bool}
 */
const isObject = a => typeof a === 'object' && a !== null;

/**
 * buildQuery converts an object to a query string.
 *
 * buildQuery recursively consumes an object and returns a query string.
 *
 * @param {object} components - The object to be encoded
 * @param {string} parentKey - (Optional) used mainly in nested structures, the parent key for our hash map.
 *
 * @return {string} - A query string.
 */
const buildQuery = (components, parentKey = null) =>
  Object.entries(removeUnencodableValues(components))
    .reduce((accum, [key, value]) => {
      if (['string', 'number'].indexOf(typeof key) < 0)
        throw new Error(`Invalid key passed to buildQuery: ${key}`);
      if (
        ['boolean', 'string', 'number', 'object', 'symbol'].indexOf(
          typeof value
        ) < 0
      )
        throw new Error(`Invalid value passed to buildQuery: ${value}`);
      key = parentKey
        ? `${parentKey}[${encodeURIComponent(key)}]`
        : encodeURIComponent(key);

      return isObject(value)
        ? `${accum}&${buildQuery(value, key)}`
        : `${accum}&${key}=${encodeURIComponent(value.replace(/[!'()*]/g, escape))}`;
    }, '')
    .replace(/^&/, '');

// Exports
export { buildQuery, removeUnencodableValues };
