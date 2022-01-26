/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const closurePath = path.split(".");
  let recCounter = 0;

  const getNextValue = (obj) => {
    const currentValue = obj[closurePath[recCounter]];
    const nextKey = closurePath[recCounter + 1];

    if (
      !currentValue ||
      (currentValue[nextKey] === undefined && nextKey !== undefined)
    ) {
      return;
    }

    if (currentValue[nextKey]) {
      recCounter++;
      return getNextValue(currentValue);
    }

    return currentValue;
  };

  return getNextValue;
}
