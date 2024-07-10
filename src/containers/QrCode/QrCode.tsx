import { QRCode } from "antd";
import React from "react";

import BG_HOME_02 from "../../resources/images/bg/bg_home_02-removebg-preview.png";

type Props = {};

function QrCodeContainer({}: Props) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <QRCode size={400} errorLevel="H" value="https://matrimonio-fe-web-app.web.app/" icon={BG_HOME_02} />
        </div>
    );
}

export default QrCodeContainer;
