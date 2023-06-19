import React, { useState } from "react";
import ReactDOM from "react-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query Getalldresses {
    getalldresses {
      id
      name
      type
      size
      location
      currdate
      is_deleted
      created_on
      updated_on
    }
  }
`;

function App() {
  const [cont, setCont] = useState("");
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  function clickit(e) {
    e.preventDefault();

    if (loading) setCont("Loading...");
    if (error) setCont(error.message);
    setCont(JSON.stringify(data));
  }

  return (
    <>
      <button onClick={(e) => clickit(e)}>click</button>
      <p>{JSON.stringify(cont)}</p>
    </>
  );
}

export default App;
