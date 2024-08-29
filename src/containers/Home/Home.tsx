import React, { useEffect, useState } from "react";
import { getAllPartecipants, getHouseBySearchInFirebase, getHouseDescription } from "../../utils/Functions";
import { AutoComplete, Card, Col, Input, Modal, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { AutoCompletePartecipantsModel, HouseDescriptionModel } from "../../utils/Models";
import Meta from "antd/es/card/Meta";
import { useWindowDimensions } from "../../hooks/Hooks";
import Snowflakes from "../../components/Snowflakes/Snowflakes";

interface IHomeProps {}

function Home(props: IHomeProps) {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [houseDescription, setHouseDescription] = useState<HouseDescriptionModel[]>([]);
    const [allPartecipants, setAllPartecipants] = useState<AutoCompletePartecipantsModel[]>([]);
    const { width } = useWindowDimensions();

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

    function getPaddingByWidth(): number {
        if (width >= 768 && width < 1200) {
            return 100;
        } else if (width >= 1200) {
            return 200;
        } else {
            return 20;
        }
    }
    function filterOption(inputValue: string, option: AutoCompletePartecipantsModel): boolean {
        return option!.value.toUpperCase().replace(/\s/g, "").indexOf(inputValue.replace(/\s/g, "").toUpperCase()) !== -1;
    }

    return (
        <>
            <Snowflakes />
            <div className="home_container">
                <Spin spinning={spinning} tip="Loading" size="large" fullscreen />

                <Row
                    style={{
                        padding: "20px 0",
                        paddingLeft: getPaddingByWidth(),
                        paddingRight: getPaddingByWidth(),
                        background: "#8199F4",
                        color: "white",
                        borderBottomRightRadius: 25,
                        borderBottomLeftRadius: 25,
                    }}
                >
                    <Col xs={24}>
                        <h2>Ciao &#128075;</h2>

                        <div style={{ marginTop: 10 }}>
                            <h4>
                                All'interno del sito potrai cercare il tavolo a cui appartieni, inserendo il tuo nome e cognome all'interno della
                                barra di ricerca.
                            </h4>
                            <h4>Oppure potrai scoprire cosa riservano le altre casate.</h4>
                            <br />
                            <h4>Buon Proseguimento ! &#127881;</h4>
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <AutoComplete
                                style={{ width: "100%" }}
                                options={allPartecipants}
                                onSelect={onSearchAutoComplete}
                                filterOption={filterOption}
                                className="home_container_searchBar"
                            >
                                <Input.Search size="large" placeholder="Nome Cognome" disabled allowClear />
                            </AutoComplete>
                        </div>
                    </Col>

                    {/* <Col  xs={24} sm={24} md={12}>
                        
                    </Col> */}
                </Row>

                <Row className="mt-20" style={{ padding: "20px 0", paddingLeft: getPaddingByWidth(), paddingRight: getPaddingByWidth() }}>
                    <Col xs={24} sm={24}>
                        <h2 className="text-align-center mb-20" style={{ textTransform: "uppercase" }}>
                            Scopri le casate
                        </h2>
                    </Col>

                    <Row gutter={10}>
                        {houseDescription.map((ele, index) => {
                            return (
                                <Col key={index} xs={12} sm={12} md={12} lg={8} className="mb-20 d-flex justify-content-center">
                                    <Card
                                        hoverable
                                        cover={<img style={{ minHeight: 120 }} alt="example" src={ele.image} onClick={() => navigateByCard(ele)} />}
                                    >
                                        <Meta title={ele.title} />
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Row>
            </div>
        </>
    );
}

export default Home;
