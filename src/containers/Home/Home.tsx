import React, { useEffect, useState } from "react";
import { getAllPartecipants, getHouseBySearchInFirebase, getHouseDescription, randomIntFromInterval } from "../../utils/Functions";
import { AutoComplete, Card, Col, Flex, Image, Input, Modal, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import BG_HOME_02 from "../../resources/images/bg/bg_home_02-removebg-preview.png";

import "./Home.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import { AutoCompletePartecipantsModel, HouseDescriptionModel } from "../../utils/Models";
import Meta from "antd/es/card/Meta";

interface IHomeProps { }

function Home(props: IHomeProps) {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [houseDescription, setHouseDescription] = useState<HouseDescriptionModel[]>([]);
    const [allPartecipants, setAllPartecipants] = useState<AutoCompletePartecipantsModel[]>([]);

    const navigate = useNavigate();

    const modalError = () => {
        Modal.error({
            title: `Spiacente`,
            content: "Non siamo riusciti a trovarti! \n Prova a controllare se Nome e Cognome sono scritti correttamente. Grazie",
        });
    };

    useEffect(() => {
        const fecthInitalData = async () => {
            try {
                const data = await getHouseDescription();
                setHouseDescription(data);

                const partecipants = getAllPartecipants(data);
                setAllPartecipants(partecipants);
            } catch (error) {
                console.log("error", error);
            }
        };

        fecthInitalData();
    }, []);

    function onSearchAutoComplete(value: string) {
        setSpinning(true);

        setTimeout(() => {
            try {
                const houseFinded = getHouseBySearchInFirebase(value, houseDescription);
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

    function navigateByCard(ele: HouseDescriptionModel) {
        setSpinning(true);

        setTimeout(() => {
            navigate(`/about/${ele.path}`, { state: { houseFinded: ele } });
        }, 1000);
    }

    // function getBg (){
    //     const t = ["#f7941e", "#f15a29", "#ed1c24", "#9e1f63", "#006838", "#d7df23", "#fff200", "#fbb040", "#939598"];
    //     return t[randomIntFromInterval(0, t.length -1)]
    // }

    return (
        <>
            <div className="home_container">
                <Spin spinning={spinning} tip="Loading" size="large" fullscreen />

                <Row style={{ padding: "20px 20px", background: "#8199F4", color: "white", borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }}>
                    <Col>
                        <h2>Ciao &#128075;</h2>

                        <div style={{ marginTop: 10 }}>
                            <h3>Benvenuto/a al matrimonio di Mirko e Fra &#128146;</h3>
                            <br />
                            <h4>All'interno del sito potrai cercare il tavolo a cui appartieni, inserendo il tuo nome e cognome all'interno della barra di ricerca.</h4>
                            <h4>Oppure potrai scoprire cosa riservano le altre casate.</h4>
                            <br />
                            <h4>Buon Proseguimento ! &#127881;</h4>
                        </div>
                    </Col>

                    <Col style={{ marginTop: 20 }} xs={24} sm={24}>
                        <AutoComplete
                            style={{ width: "100%" }}
                            options={allPartecipants.slice(0, 5)}
                            onSelect={onSearchAutoComplete}
                            size="large"
                            filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            className="home_container_searchBar"
                        >
                            <Input.Search size="large" placeholder="Nome Cognome" disabled allowClear />
                        </AutoComplete>
                    </Col>
                </Row>

                {/* <Row style={{ marginTop: 20 }}>
                    <Col xs={24} sm={24}>
                        <AutoComplete
                            style={{ width: "100%" }}
                            options={allPartecipants.slice(0, 5)}
                            onSelect={onSearchAutoComplete}
                            size="large"
                            filterOption={(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            className="home_container_searchBar"
                        >
                            <Input.Search size="large" placeholder="Nome Cognome" disabled allowClear />
                        </AutoComplete>
                    </Col>
                </Row> */}

                <Row className="mt-20" style={{ padding: "20px 20px" }}>
                    <Col xs={24} sm={24}>
                        <h2 className="text-align-center mb-20" style={{ textTransform: "uppercase" }}>
                            Scopri le casate
                        </h2>
                    </Col>

                    {houseDescription.map((ele) => {
                        return (
                            <Col xs={12} sm={12} className="mb-20 d-flex justify-content-center">
                                <Card hoverable style={{ width: 180 }} cover={<img style={{ height: 120 }} alt="example" src={ele.image} onClick={() => navigateByCard(ele)} />}>
                                    <Meta title={ele.title} />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {/* <Row className="mt-100">
                    <Col sm={24}>
                        <Flex justify="center" align="center">
                            <Image src={BG_HOME_02} preview={false} className="home_container_image" />
                        </Flex>
                    </Col>
                </Row> */}
            </div>

            {/* <BottomNavbar /> */}
        </>
    );
}

export default Home;
