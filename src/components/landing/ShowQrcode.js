import React from "react";
import logo from "../../assets/img/xDemic-logo-01.png";
import { Col, Row, message } from "antd";
import axios from "axios";
import withUnmounted from "@ishawnwang/withunmounted";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://xdemic-api.herokuapp.com";

class ShowQrcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcodeValue: null
    };
  }

  hasUnmounted = false;

  componentDidMount() {
    this.getQRCodeValue();
    // const history = useHistory();
    const socket = socketIOClient(ENDPOINT);
    socket.on("QRCodeSuccess", data => {
      console.log("on QRCodeSuccess data is: ", data);
      // if (data.status) {
      // route the app on "/admin" route
      this.props.history.push("/admin");
      // }
    });
  }

  getQRCodeValue = async () => {
    try {
      const response = await axios.get(
        "https://xdemic-api.herokuapp.com/adminqrcode"
      );
      this.setState({
        qrcodeValue: response.data
      });
      message.info("Scan QRCode to proceed");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="main__logo">
        <Row align="middle">
          <Col>
            <img src={logo} id="logo" />
          </Col>
          <Col>
            <div className="qr_code">
              <img src={this.state.qrcodeValue} width="400" height="400" />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withUnmounted(ShowQrcode);
