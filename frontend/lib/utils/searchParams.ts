export const updateQueryParams = (
  setSearchParams: React.Dispatch<React.SetStateAction<string>>,
  key: string,
  value: string | null
): void => {
  setSearchParams((prev: string) => {
    const newParams = new URLSearchParams(prev);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    return newParams.toString(); // return updated query string
  });
};
