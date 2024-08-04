import { Avatar, Col, Image, List, Row } from "antd";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { HouseDescriptionModel, ParticipantModel } from "../../utils/Models";

import "./About.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { array_move, randomIntFromInterval } from "../../utils/Functions";
import Snowflakes from "../../components/Snowflakes/Snowflakes";

import testStark from "../../resources/images/bg/SITO_Tyrell.jpg";

interface IAboutProps {}

function About(props: IAboutProps) {
    const location = useLocation();
    const houseFindedRef = useRef<HouseDescriptionModel>(location.state.houseFinded);
    const userSearchedRef = useRef<string>(location.state.user);

    const containerImageRef = useRef<HTMLDivElement>(null);
    const containerDescriptionRef = useRef<HTMLDivElement>(null);

    function moveSearchedUserToTopPosition(partecipants: ParticipantModel[]): ParticipantModel[] {
        if (userSearchedRef.current) {
            const indexFinded: number = partecipants.findIndex((x) => {
                const user = (x.name.replace(/\s/g, "") + x.surname.replace(/\s/g, "")).toLowerCase();
                const searchedUser = userSearchedRef.current.replace(/\s/g, "").toLowerCase();
                return user === searchedUser;
            });

            return array_move(partecipants, indexFinded, 0);
        }

        return partecipants;
    }

    function getRandomBgColorForPartecipants() {
        const bgColor: React.CSSProperties[] = [
            { backgroundColor: "rgb(247, 148, 30 , 0.2)", color: "#f7941e" },
            { backgroundColor: "rgba(241, 90, 41, 0.2)", color: "#f15a29" },
            { backgroundColor: "rgba(237, 28, 36, 0.2)", color: "#ed1c24" },
            { backgroundColor: "rgba(158, 31, 99, 0.2)", color: "#9e1f63" },
            { backgroundColor: "rgba(0, 104, 56, 0.2)", color: "#006838" },
            { backgroundColor: "rgba(215, 223, 35, 0.2)", color: "#d7df23" },
            { backgroundColor: "rgba(255, 242, 0, 0.2)", color: "#fff200" },
            { backgroundColor: "rgba(251, 176, 64, 0.2)", color: "#fbb040" },
            { backgroundColor: "rgba(147, 149, 152, 0.2)", color: "#939598" },
        ];

        const newBgColor = ["#fdf8e4"];

        return bgColor[randomIntFromInterval(0, bgColor.length - 1)];
    }

    return (
        <>
            <Snowflakes />
            <section className="about_container">
                <ArrowLeftOutlined className="back-icon" onClick={() => window.open("/", "_self")} />
                <Row ref={containerImageRef}>
                    <Col xs={24} sm={0}>
                        <Image src={houseFindedRef.current.image} preview={false} className="about_container_image" />
                    </Col>
                </Row>
                <Row ref={containerDescriptionRef} className="about_container_all">
                    <Col xs={24} sm={0}>
                        <h3 className="about_contaniner--title">{houseFindedRef.current.title}</h3>

                        <div className="about_contaniner--description">{houseFindedRef.current.description}</div>
                    </Col>

                    <Col xs={24} sm={0} style={{ marginTop: 30 }}>
                        <h3 className="about_contaniner--title mb-10 text-align-center">Partecipanti al tavolo</h3>

                        <List
                            itemLayout="horizontal"
                            dataSource={moveSearchedUserToTopPosition(houseFindedRef.current.participants)}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        style={{ alignItems: "center" }}
                                        avatar={
                                            <Avatar size="default" style={getRandomBgColorForPartecipants()}>
                                                {item.name.charAt(0)}
                                            </Avatar>
                                        }
                                        title={<b>{item.name + " " + item.surname}</b>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </section>
        </>
    );
}

export default About;
