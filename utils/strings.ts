export const shorttenString = (str: string, length?: number = 30) => {
  if (str.length > length)
    return (
      str.substr(0, length / 2) +
      '...' +
      str.substring(str.length - length / 2, str.length)
    );
  return str;
};
