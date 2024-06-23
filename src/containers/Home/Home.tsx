import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { getHouseBySearch } from "../../utils/Functions";
import { AutoComplete, Button, Image, Input, Modal, SelectProps, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import BG_HOME_02 from "../../resources/images/bg/bg_home_02-removebg-preview.png";

import "./Home.css";

interface IHomeProps {}

function Home(props: IHomeProps) {
  const [spinning, setSpinning] = useState<boolean>(false);

  const navigate = useNavigate();

  const modalError = () => {
    Modal.error({
      title: `Spiacente`,
      content: "Non siamo riusciti a trovarti! \n Prova a controllare se Nome e Cognome sono scritti correttamente. Grazie",
    });
  };

  function onSearch(value: string, _e: any, info: any): void {
    setSpinning(true);

    setTimeout(() => {
      const houseSearched = getHouseBySearch(value);
      try {
        console.log("houseSearched", houseSearched);
        if (!houseSearched) throw new Error("User not found!");
        navigate(`/about/${houseSearched.path}`, { state: { user: value } });
      } catch (error) {
        console.log("error", error);
        modalError();
      } finally {
        setSpinning(false);
      }
    }, 1000);
  }

  function onSearchAutoComplete(value: string): void {
    setSpinning(true);

    setTimeout(() => {
      const houseSearched = getHouseBySearch(value);
      try {
        console.log("houseSearched", houseSearched);
        if (!houseSearched) throw new Error("User not found!");
        navigate(`/about/${houseSearched.path}`, { state: { user: value } });
      } catch (error) {
        console.log("error", error);
        modalError();
      } finally {
        setSpinning(false);
      }
    }, 1000);
  }

  const partecipants = [
    {
      value: "Riccardo Ingrasciotta",
    },
    {
      value: "Mirko Pasotti",
    },
    {
      value: "Francesca Ingrasciotta",
    },
  ];

  return (
    <>
      <div className="home_container" style={{ padding: "10px 10px" }}>
        <Spin spinning={spinning} tip="Loading" size="large" fullscreen />
        {/* <Search placeholder="Nome Cognome" size="large" onSearch={onSearch} allowClear /> */}

        {/* <AutoComplete
        style={{ width: "100%" }}
        options={partecipants.slice(0, 5)}
        onSelect={onSearchAutoComplete}
        onSearch={handleSearch}
        size="large"
        // onSelect={onSearchAutoComplete}
        filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      >
        <Input.Search size="large" placeholder="Nome Cognome" allowClear />
      </AutoComplete> */}

        {/* <div className="d-flex align-items-center justify-content-between mb-20 ">
          <h1 className="text-align-center">M & F </h1>

          <Button type="primary">Visualizza mappa</Button>
        </div> */}

        <div className="d-flex align-items-center justify-content-end mb-20 ">
          <Button type="primary">Visualizza mappa</Button>
        </div>

        <AutoComplete
          style={{ width: "100%" }}
          options={partecipants.slice(0, 5)}
          onSelect={onSearchAutoComplete}
          size="large"
          filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        >
          <Input.Search size="large" placeholder="Nome Cognome" disabled allowClear />
        </AutoComplete>

        <Image src={BG_HOME_02} preview={false} className="home_container_image" />

        {/* <div className="home_container--image"></div> */}
      </div>
    </>
  );
}

export default Home;
