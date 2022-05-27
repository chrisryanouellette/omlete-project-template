export const keyInObj = <T>(
  key: string | number | symbol,
  obj: T
): key is keyof typeof obj => {
  return key in obj;
};
