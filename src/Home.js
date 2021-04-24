import React from "react";
import { Row } from "react-bootstrap"
class Home extends React.Component {

    render() {
        return (
            <>
                <Row style={{ display: "flex", justifyContent: "center", marginTop: "13%" }}>
                    <h2 style={{ color: "green" }}><b>ADD YOUR MEALS </b></h2>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <h2 style={{ color: "green" }}><b>AND</b> </h2>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                    <h2 style={{ color: "green" }}><b>GET YOUR DAILY NUTRI-STATS!</b></h2>
                </Row>
            </>
        )
    }
}
export default Home;