import { Col, Image, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { HouseDescriptionModel } from "../../utils/Models";
import { getHouseByPath } from "../../utils/Functions";

import "./About.css";
import BottomNavbar from "../../components/BottomNavbar/BottomNavbar";

interface IAboutProps { }

function About(props: IAboutProps) {
  const [houseDescription, setHouseDescription] = useState<HouseDescriptionModel>(new HouseDescriptionModel());
  const location = useLocation();

  const [houseFinded, setHouseFinded] = useState<HouseDescriptionModel>(location.state.houseFinded);

  const houseFindedRef = useRef<HouseDescriptionModel>(location.state.houseFinded);

  // useEffect(() => {
  //   console.log("location", location);
  //   const pathHouse = location.pathname.split("/")[2];
  //   console.log("pathHouse", pathHouse);
  //   setHouseDescription(getHouseByPath(pathHouse));
  // }, [location]);

  return (
    <>
      <section className="about_container" style={{ padding: "10px 10px" }}>
        {/* <Flex justify="start">
          <Button icon={<ArrowLeftOutlined />} type="text" size="large" className="go-back-button" onClick={backToHome}>
            Torna alla home
          </Button>
        </Flex> */}
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
