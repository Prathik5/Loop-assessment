import logo from "./logo.svg";
import "./App.css";
import Body from "./Components/Body";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <div className="p-2 m-2">
        <NavBar />
      </div>
      <div className="p-2 m-2">
        <Body />
      </div>
    </>
  );
}

export default App;
