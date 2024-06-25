import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home";
import About from "./containers/About/About";
import NoMatch from "./containers/NoMatch/NoMatch";

// type ThemeData = {
//   borderRadius: number;
//   colorPrimary: string;
//   Button?: {
//     colorPrimary: string;
//     algorithm?: boolean;
//   };
//   Modal?: {
//     Button?: {
//       colorPrimary: string;
//       algorithm?: boolean;
//     };
//   };
// };

// const defaultData: ThemeData = {
//   borderRadius: 6,
//   colorPrimary: "#1677ff",
//   Button: {
//     colorPrimary: "#00B96B",
//   },
//   Modal: {
//     Button: {
//       colorPrimary: "#00B96B",
//     },
//   },
// };

function App() {
  // const [data, setData] = React.useState<ThemeData>(defaultData);
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="about/:tableName" element={<About />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
