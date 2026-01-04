export const debounce = <T>(func: (...args: T[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  const debouncedFunc = (...args: T[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
  return debouncedFunc;
};
