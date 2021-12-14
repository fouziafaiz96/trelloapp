import { cardApiObject } from "../common/interfaces";

export function getCardObject<T>(
  data: T,
  isFetching = false
): cardApiObject<T> {
  return { data, isFetching };
}
