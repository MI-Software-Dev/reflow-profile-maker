export const makeDBToObjParameter = <T extends { _id: string; _rev: string }>(
  data: T,
): Omit<T, "_id" | "_rev"> => {
  const { _id, _rev, ...target } = data;
  return target;
};
