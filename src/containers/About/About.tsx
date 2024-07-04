import { Avatar, Col, Image, List, Row } from "antd";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { HouseDescriptionModel, ParticipantModel } from "../../utils/Models";

import "./About.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { array_move, randomIntFromInterval } from "../../utils/Functions";

interface IAboutProps { }

function About(props: IAboutProps) {
    const location = useLocation();
    const houseFindedRef = useRef<HouseDescriptionModel>(location.state.houseFinded);
    const userSearchedRef = useRef<string>(location.state.user);

    const containerImageRef = useRef<HTMLDivElement>(null);
    const containerDescriptionRef = useRef<HTMLDivElement>(null);

    function moveSearchedUserToTopPosition(partecipants: ParticipantModel[]): ParticipantModel[] {
        if (userSearchedRef.current) {
            const indexFinded: number = partecipants.findIndex((x) => {
                const user = (x.name + x.surname).toLowerCase();
                const searchedUser = userSearchedRef.current.replace(/\s/g, "").toLowerCase();
                return user === searchedUser;
            });

            return array_move(partecipants, indexFinded, 0);
        }

        return partecipants;
    }

    function getRandomBgColorForPartecipants() {
        const bgColor: React.CSSProperties[] = [
            { backgroundColor: "rgba(45,86,160, 0.2)", color: "#2D56A0" },
            { backgroundColor: "rgba(24,109,26, 0.2)", color: "#186D1A" },
            { backgroundColor: "rgba(254,204,28, 0.2)", color: "#FECC1C" },
            { backgroundColor: "rgba(142,30,21, 0.2)", color: "#8E1E15" },
        ];

        return bgColor[randomIntFromInterval(0, bgColor.length - 1)];
    }

    return (
        <>
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
