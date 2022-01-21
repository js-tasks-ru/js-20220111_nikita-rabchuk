/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const closurePath = path.split(".");

  return function createGetter(obj) {
    let recCounter = 0;

    const getNextValue = (prevValue, counter) => {
      const currentProp = closurePath[counter];
      const nextProp = closurePath[counter++];

      if (prevValue[nextProp]) {
        return getNextValue(prevValue[nextProp], counter++);
      } else {
        if (prevValue[currentProp]) {
          return prevValue[currentProp];
        }
        return prevValue;
      }

      // if (prevValue[currentProp]) {
      //   return prevValue[currentProp];
      // }

      // return prevValue;
    };

    return getNextValue(obj, recCounter);
  };
}

// const product = {
//   category: {
//     title: 'asd',
//   },
// };

// const getter = createGetter("category.title.name");

// console.log(getter(product));
