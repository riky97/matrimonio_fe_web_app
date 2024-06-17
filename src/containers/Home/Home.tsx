import { SearchProps } from "antd/es/input";
import Search from "antd/es/transfer/search";
import React from "react";

interface IHomeProps {}

function Home(props: IHomeProps) {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);

  return <div>{/* <Search placeholder="Nome Cognome" onSearch={onSearch} /> */}</div>;
}

export default Home;
