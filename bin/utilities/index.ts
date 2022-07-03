export const hasKey = <T extends Record<string | number | symbol, unknown>>(
  key: string | number | symbol,
  obj: T
): key is keyof T => {
  return key in obj;
};
