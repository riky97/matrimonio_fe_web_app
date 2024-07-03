import { Avatar, Col, Image, List, Row } from "antd";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HouseDescriptionModel, ParticipantModel } from "../../utils/Models";

import "./About.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface IAboutProps { }

function About(props: IAboutProps) {
    const location = useLocation();
    const houseFindedRef = useRef<HouseDescriptionModel>(location.state.houseFinded);
    const userSearchedRef = useRef<string>(location.state.user);

    const containerImageRef = useRef<HTMLDivElement>(null);
    const containerDescriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // console.log('containerImageRef', containerImageRef.current.offsetHeight)
        // containerDescriptionRef.current.style.top = `${containerImageRef.current.offsetHeight - 20}px`;
    }, [])

    // function orderToTopUserSearched(partecipants:  ParticipantModel[]) :  ParticipantModel[]{

    // }

    return (
        <>
            <section className="about_container" >
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

                    <Col xs={24} sm={0} className="mt-50">
                        <h3 className="about_contaniner--title mb-10">Partecipanti</h3>

                        <List
                            itemLayout="horizontal"
                            dataSource={houseFindedRef.current.participants}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<div style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: "100%", background: "#186D1A", color: "#fff" }}>{index + 1}</div>}
                                        title={item.name + " " + item.surname}
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
