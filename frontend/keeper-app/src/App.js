import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { AddKeeper } from "./components/AddKeeper/AddKeeper";
import { ShowKeeper } from "./components/ShowKeeper/ShowKeeper";
import axios from "axios";

function App() {
  const [keeperList, setKeeperList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getAll")
      .then((res) => setKeeperList(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <Header />
      <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
      <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
    </div>
  );
}

export default App;
