import React from 'react';
import logo from "../../assets/img/xDemic-logo-01.png";
import QrCode from 'react.qrcode.generator';
import { Col, Row } from 'antd';
import axios from 'axios';
import withUnmounted from '@ishawnwang/withunmounted'

class ShowQrcode extends React.Component {

    constructor(props) {
        super(props);
        this.getQRCodeValue();
        this.state = {
            qrcodeValue: ''
        }
    }

    hasUnmounted = false;

    // componentDidMount() {
    //     this.getQRCodeValue();
    // }

    getQRCodeValue = async () => {
        try {
            const response = await axios.get('https://xdemic-api.herokuapp.com/adminqrcode');
            this.setState({
                qrcodeValue: response.data
            });
            console.log(this.state.qrcodeValue);
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return (
            <div className="main__logo">
                <Row>
                    <Col span={20} offset={2}>
                        <img src={logo} />
                    </Col>
                    <Col span={6} offset={8}>
                        <QrCode value={this.state.qrcodeValue} size={300} background="#FFFFFF" foreground="#000000" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withUnmounted(ShowQrcode);