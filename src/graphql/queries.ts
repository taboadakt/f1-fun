import { gql } from "urql";

export const DRIVER_INFO_BY_YEAR = gql`
  query DriverInfoByYear($year: String!) {
    driversYear(year: $year) {
      id
      name
      nationality
      permanentNumber
      code
    }
    seasonPilotsRanking(year: $year) {
      points
      wins
      driver {
        id
      }
      constructors {
        name
      }
      position
    }
  }
`;
