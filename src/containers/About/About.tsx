import { Button, Col, Flex, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MockDbHouseDescriptionModel } from "../../utils/Models";
import { getHouseByPath } from "../../utils/Functions";

import "./About.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface IAboutProps { }

function About(props: IAboutProps) {
  const [houseDescription, setHouseDescription] = useState<MockDbHouseDescriptionModel>(new MockDbHouseDescriptionModel());
  const location = useLocation();

  useEffect(() => {
    console.log("location", location);
    const pathHouse = location.pathname.split("/")[2];
    console.log("pathHouse", pathHouse);
    setHouseDescription(getHouseByPath(pathHouse));
  }, []);

  function backToHome() {
    window.open("/", "_self");
  }

  return (
    <section className="about_container" style={{ padding: "10px 10px" }}>
      <Flex justify="start">
        <Button icon={<ArrowLeftOutlined />} type="text" size="large" className="mat__back-button" onClick={backToHome}>
          Torna alla home
        </Button>
      </Flex>
      <Row className="mt-20">
        <Col xs={0} sm={12}>
          <h1>{houseDescription.title}</h1>

          <p className="mt-50">{houseDescription.description}</p>
        </Col>

        <Col sm={12} className="d-flex justify-content-end">
          <Image src={houseDescription.image} preview={false} width={500} className="about_container_image" />
        </Col>

        <Col xs={24} sm={0} className="mt-50">
          <h1 className="text-align-center">{houseDescription.title}</h1>

          <p className="pt-20">{houseDescription.description}</p>
        </Col>
      </Row>
    </section>
  );
}

export default About;
