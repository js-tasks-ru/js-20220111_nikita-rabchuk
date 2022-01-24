/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
// function createGetter(path) {
export function createGetter(path) {
  const closurePath = path.split(".");

  return function createGetter(obj) {
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

    return getNextValue(obj);
  };
}

const product = {
  category: {
    title: "asd",
  },
};

const getter = createGetter("category");

console.log(getter(product));
