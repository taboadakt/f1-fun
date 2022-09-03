import { GDriverInfoByYearQuery } from "./generated";

export type ArrayElement<ArrayType extends unknown[] | undefined> =
  ArrayType extends (infer ElementType)[] ? ElementType : never;

export type SeasonPilotsRanking = ArrayElement<
  GDriverInfoByYearQuery["seasonPilotsRanking"]
>;
export type Driver = SeasonPilotsRanking["driver"];
