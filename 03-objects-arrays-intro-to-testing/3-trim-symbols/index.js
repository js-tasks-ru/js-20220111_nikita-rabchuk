/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === 0 || string === "") return "";
  if (size === undefined) return string;

  return [].reduce.call(string, (accumString, nextLetter) => {
    if (!accumString.endsWith(nextLetter.repeat(size))) {
      accumString += nextLetter;
    }

    return accumString;
  });
}
