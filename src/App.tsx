import "./App.css";
import { Provider } from "urql";
import { client } from "./graphql/client";
import DriverTableByYear from "./components/DriversByYearTable";
import SeasonDropdown from "./components/SeasonDropdown";
import { useState } from "react";

function App(): JSX.Element {
  const [year, setYear] = useState<string>();
  return (
    <div className="App">
      <Provider value={client}>
        <SeasonDropdown setYear={setYear} year={year} />
        <DriverTableByYear year={year} />
      </Provider>
    </div>
  );
}

export default App;
