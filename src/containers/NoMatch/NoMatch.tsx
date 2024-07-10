import { Button, Result } from "antd";
import React from "react";

interface INoMatchProps {}

function NoMatch(props: INoMatchProps) {
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => window.open("/", "_self")}>
                        Torna alla home
                    </Button>
                }
            />
        </div>
    );
}

export default NoMatch;
