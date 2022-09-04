import { gql } from "urql";

export const DRIVER_INFO_BY_YEAR = gql`
  query DriverInfoByYear($year: String!) {
    seasonPilotsRanking(year: $year) {
      points
      wins
      driver {
        id
        name
        nationality
        permanentNumber
        code
      }
      constructors {
        name
        id
      }
      position
    }
  }
`;

export const SEASONS_LIST = gql`
  query SeasonsList {
    seasonsList {
      year
    }
  }
`;
