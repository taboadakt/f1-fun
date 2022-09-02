import { useQuery } from "urql";
import { DRIVER_INFO_BY_YEAR } from "../graphql/queries";

const DriverTableByYear = () => {
  // const table = useReactTable(options)
  const [{ data: driverData, fetching, error }] = useQuery({
    query: DRIVER_INFO_BY_YEAR,
    variables: { year: "2007" },
  });

  return <div></div>;
};

export default DriverTableByYear;
