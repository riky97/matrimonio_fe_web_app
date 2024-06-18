import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { getHouseBySearch } from "../../utils/Functions";
import { AutoComplete, Button, Input, Modal, SelectProps, Spin } from "antd";
import { useNavigate } from "react-router-dom";

interface IHomeProps { }

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
    <div>
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

      <AutoComplete
        style={{ width: "100%" }}
        options={partecipants.slice(0, 5)}
        onSelect={onSearchAutoComplete}
        size="large"
        filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      >
        <Input.Search size="large" placeholder="Nome Cognome" allowClear />
      </AutoComplete>
    </div>
  );
}

export default Home;
