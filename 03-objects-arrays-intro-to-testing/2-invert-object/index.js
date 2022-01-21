/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!obj) return;

  const objEntries = Object.entries(obj);

  const newObj = Object.fromEntries(objEntries.map((arr) => arr.reverse()));

  return newObj;
}
