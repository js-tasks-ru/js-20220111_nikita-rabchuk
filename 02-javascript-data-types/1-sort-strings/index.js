/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const newArr = [...arr];

  const compareOptions = {
    caseFirst: "upper",
  };
  const localesOptions = ["ru-RU", "en-EN"];

  return newArr.sort((a, b) => {
    if (param === 'asc') {
      return a.localeCompare(b, localesOptions, compareOptions);
    } else if (param === 'desc') {
      return b.localeCompare(a, localesOptions, compareOptions);
    }
  })
}
