import ReactFormHOC from "./components/ReactForm";
import ReactTableHOC from "./components/ReactTable";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="container py-5">
      <ReactFormHOC />
      <SearchBar />
      <ReactTableHOC />
    </div>
  );
}

export default App;
