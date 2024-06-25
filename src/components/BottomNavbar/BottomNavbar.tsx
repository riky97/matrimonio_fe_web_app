import React from "react";

import "./BottomNavbar.css";
import { Button, Flex } from "antd";
import { AimOutlined, HomeFilled } from "@ant-design/icons";

interface IBottomNavbarProps {}

function BottomNavbar(props: IBottomNavbarProps) {
  function backToHome() {
    window.open("/", "_self");
  }
  return (
    <div>
      <Flex justify="space-between" align="center" className="bottom_navbar_container">
        <HomeFilled style={{ fontSize: 32, cursor: "pointer" }} onClick={backToHome} />
        <p style={{ fontSize: 18 }}>Wedding is coming</p>
        <AimOutlined style={{ fontSize: 32 }} />
      </Flex>
    </div>
  );
}

export default BottomNavbar;
