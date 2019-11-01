require("../assets/favicon.ico");
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <div>Hello</div>
      <button onClick={() => console.log("client code is working!")}>
        Click Me
      </button>
    </React.Fragment>
  );
};

export default Home;
