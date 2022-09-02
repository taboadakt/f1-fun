import "./App.css";
import { Provider } from "urql";
import { client } from "./graphql/client";
import DriverTableByYear from "./components/DriversByYearTable";

function App() {
  return (
    <div className="App">
      <Provider value={client}>
        <DriverTableByYear />
      </Provider>
    </div>
  );
}

export default App;
