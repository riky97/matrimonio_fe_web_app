import { Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MockDbHouseDescriptionModel } from "../../utils/Models";
import { getHouseByPath } from "../../utils/Functions";

import "./About.css";

interface IAboutProps {}

function About(props: IAboutProps) {
  const [houseDescription, setHouseDescription] = useState<MockDbHouseDescriptionModel>(new MockDbHouseDescriptionModel());
  const location = useLocation();

  useEffect(() => {
    console.log("location", location);
    const pathHouse = location.pathname.split("/")[2];
    console.log("pathHouse", pathHouse);
    setHouseDescription(getHouseByPath(pathHouse));
  }, []);

  return (
    <section className="about_container">
      <Row style={{ padding: "10px 10px" }}>
        <Col xs={0} sm={12}>
          <h1>{houseDescription.title}</h1>

          <p className="mt-50">{houseDescription.description}</p>
        </Col>

        <Col sm={12} className="d-flex justify-content-end">
          <Image src={houseDescription.image} preview={false} width={500} className="about_container_image" />
        </Col>

        <Col xs={24} sm={0} className="mt-50">
          <h1>{houseDescription.title}</h1>

          <p style={{ paddingTop: 20 }}>{houseDescription.description}</p>
        </Col>
      </Row>
    </section>
  );
}

export default About;
