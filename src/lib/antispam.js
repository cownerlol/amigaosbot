const usedCommandRecently = new Set();

/**
 * Check is number filtered
 * @param  {String} from
 */
export const isFiltered = (from) => !!usedCommandRecently.has(from);

/**
 * Add number to filter
 * @param  {String} from
 */
export const addFilter = (from) => {
  usedCommandRecently.add(from);
  setTimeout(() => usedCommandRecently.delete(from), 3000);
};
