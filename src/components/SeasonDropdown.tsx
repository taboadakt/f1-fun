import { SEASONS_LIST } from "../graphql/requests/queries";
import { useQuery } from "urql";
import { GSeasonsListQuery } from "../graphql/types/generated";
import { useEffect, useState } from "react";

const SeasonDropdown = ({
  year,
  setYear,
}: {
  year?: string;
  setYear: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [sortedYears, setSortedYears] = useState<string[]>();
  const [{ data, fetching, error }] = useQuery<GSeasonsListQuery>({
    query: SEASONS_LIST,
  });

  useEffect(() => {
    if (data) {
      const years = data.seasonsList.map((season) => season.year);
      years.sort((a: string, b: string) => parseInt(b, 10) - parseInt(a, 10));
      setSortedYears(years);
      setYear(years[0]);
    }
  }, [data]);

  if (fetching) return <div>Loading...</div>;
  if (error || !sortedYears) return <div>Error</div>;

  return (
    <div>
      <span className="seasonsList">Select Season</span>
      <button
        className="seasonsList"
        onClick={() => {
          if (year) setYear(`${parseInt(year, 10) - 1}`);
        }}
      >{`<`}</button>
      <select
        className="seasonsList"
        name="seasonsList"
        id="seasonsList"
        value={year}
        onChange={(event) => {
          setYear(event.target.value);
        }}
      >
        {sortedYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button
        className="seasonsList"
        onClick={() => {
          if (year) setYear(`${parseInt(year, 10) + 1}`);
        }}
      >{`>`}</button>
    </div>
  );
};

export default SeasonDropdown;
