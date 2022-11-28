import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./Search";
import Details from "./Details";
import List from "./List";
import { AppContext } from "./context";
import { Routes, Route } from "react-router-dom";
function App() {
  const [items, setItems] = useState([]);
  const onSearch = async (e: any) => {
    const search = e.target.value;
    if (search !== "") {
      const results = await fetch(
        "http://hn.algolia.com/api/v1/search?query=" + search
      ).then((result) => result.json());
      setItems(results.hits);
    } else {
      setItems([]);
    }
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppContext.Provider value={{ items, onSearch }}>
            <Search></Search>
            <List></List>
          </AppContext.Provider>
        }
      ></Route>
      <Route path="/details/:id" element={<Details></Details>}></Route>
    </Routes>
  );
}

export default App;
