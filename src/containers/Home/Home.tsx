import React, { useEffect, useState } from "react";
import { getHouseBySearch, getHouseBySearchInFirebase } from "../../utils/Functions";
import { AutoComplete, Col, Flex, Image, Input, Modal, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import BG_HOME_02 from "../../resources/images/bg/bg_home_02-removebg-preview.png";

import "./Home.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import { dbRef } from "../../firebase";
import { child, get, getDatabase, ref } from "firebase/database";

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

  // function onSearch(value: string, _e: any, info: any): void {
  //   setSpinning(true);

  //   setTimeout(() => {
  //     const houseSearched = getHouseBySearch(value);
  //     try {
  //       console.log("houseSearched", houseSearched);
  //       if (!houseSearched) throw new Error("User not found!");
  //       navigate(`/about/${houseSearched.path}`, { state: { user: value } });
  //     } catch (error) {
  //       console.log("error", error);
  //       modalError();
  //     } finally {
  //       setSpinning(false);
  //     }
  //   }, 1000);
  // }

  // useEffect(() => {
  //   const fecthInitalData = async () => {
  //     try {
  //       const data = await get(child(dbRef, `/houseDescription`));
  //       console.log("data", data.val());
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fecthInitalData();
  // }, []);

  async function onSearchAutoComplete(value: string) {
    setSpinning(true);

    setTimeout(async () => {
      try {
        const houseFinded = await getHouseBySearchInFirebase(value);
        console.log("houseSearched", houseFinded);
        if (!houseFinded) throw new Error("User not found!");
        navigate(`/about/${houseFinded.path}`, { state: { houseFinded: houseFinded, user: value } });
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

        {/* <Flex justify="end" align="center" className="mb-20">
          <Button type="primary">Visualizza mappa</Button>
        </Flex> */}

        <Row style={{ marginTop: 20 }}>
          <Col xs={24} sm={24}>
            <AutoComplete
              style={{ width: "100%" }}
              options={partecipants.slice(0, 5)}
              onSelect={onSearchAutoComplete}
              size="large"
              filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              className="home_container_searchBar"
            >
              <Input.Search size="large" placeholder="Nome Cognome" disabled allowClear />
            </AutoComplete>
          </Col>
        </Row>

        <Row className="mt-100">
          <Col sm={24}>
            <Flex justify="center" align="center">
              <Image src={BG_HOME_02} preview={false} className="home_container_image" />
            </Flex>
          </Col>
        </Row>

        {/* <div className="home_container--image"></div> */}
      </div>

      <BottomNavbar />
    </>
  );
}

export default Home;
