import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <h1>Welcome to Try</h1>
      <h3>
        You want to start now? Click here:<button> <Link to="/All">START</Link></button>
      </h3>
    </>
  );
}

export default Welcome;
