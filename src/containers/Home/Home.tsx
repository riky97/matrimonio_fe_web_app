import React, { useEffect, useState } from "react";
import { getAllPartecipants, getHouseBySearchInFirebase, getHouseDescription } from "../../utils/Functions";
import { AutoComplete, Col, Flex, Image, Input, Modal, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import BG_HOME_02 from "../../resources/images/bg/bg_home_02-removebg-preview.png";

import "./Home.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import { AutoCompletePartecipantsModel, HouseDescriptionModel } from "../../utils/Models";

interface IHomeProps {}

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

    return (
        <>
            <div className="home_container" style={{ padding: "10px 10px" }}>
                <Spin spinning={spinning} tip="Loading" size="large" fullscreen />

                <Row style={{ marginTop: 20 }}>
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
                </Row>

                <Row className="mt-100">
                    <Col sm={24}>
                        <Flex justify="center" align="center">
                            <Image src={BG_HOME_02} preview={false} className="home_container_image" />
                        </Flex>
                    </Col>
                </Row>
            </div>

            <BottomNavbar />
        </>
    );
}

export default Home;
