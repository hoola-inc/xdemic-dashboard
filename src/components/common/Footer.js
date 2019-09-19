import React from "react";
import { Layout } from "antd";

const { Footer} = Layout;

class FooterBottom extends React.Component {
    render() {
        return(
            <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
        );
    }
}

export default FooterBottom;