import { Button, Col, Image, Row } from "antd";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { HouseDescriptionModel } from "../../utils/Models";

import "./About.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface IAboutProps { }

function About(props: IAboutProps) {
    const location = useLocation();
    const houseFindedRef = useRef<HouseDescriptionModel>(location.state.houseFinded);

    const containerImageRef = useRef<HTMLDivElement>(null);
    const containerDescriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // console.log('containerImageRef', containerImageRef.current.offsetHeight)
        // containerDescriptionRef.current.style.top = `${containerImageRef.current.offsetHeight - 20}px`;
    }, [])


    return (
        <>
            <section className="about_container" >
                <ArrowLeftOutlined style={{ paddingLeft: 20, paddingTop: 20, color: "#fff", fontSize: 20 }} onClick={() => window.open("/", "_self")} />
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
                </Row>
            </section>
            {/* <BottomNavbar /> */}
        </>
    );
}

export default About;
