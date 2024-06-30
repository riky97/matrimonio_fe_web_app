import { Col, Image, Row } from "antd";
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { HouseDescriptionModel } from "../../utils/Models";

import "./About.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

interface IAboutProps {}

function About(props: IAboutProps) {
    const location = useLocation();
    const houseFindedRef = useRef<HouseDescriptionModel>(location.state.houseFinded);

    return (
        <>
            <section className="about_container" style={{ padding: "10px 10px" }}>
                <Row className="mt-20">
                    <Col xs={0} sm={12}>
                        <h1>{houseFindedRef.current.title}</h1>

                        <p className="mt-50">{houseFindedRef.current.description}</p>
                    </Col>

                    <Col sm={12} className="d-flex justify-content-end">
                        <Image src={houseFindedRef.current.image} preview={false} width={500} className="about_container_image" />
                    </Col>

                    <Col xs={24} sm={0} className="mt-50">
                        <h1 className="text-align-center">{houseFindedRef.current.title}</h1>

                        <p className="pt-20 about_contaniner--description">{houseFindedRef.current.description}</p>
                    </Col>
                </Row>
            </section>
            <BottomNavbar />
        </>
    );
}

export default About;
