import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Layout, Row, Col } from "antd";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import AdminSteps from "./AdminSteps";

class MainAdmin extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Sidebar />
                <Layout>
                    <Header />
                    <Row>
                        <Col span={22} offset={1}>
                            <div style={{ margin: 30 }}>
                                <h1 style={{ textTransform: "capitalize" }}>
                                    {" "}
                                    Welcome {this.props.name}
                                </h1>
                                <p> Journey begins here </p>
                            </div>
                            <AdminSteps />
                        </Col>
                    </Row>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const localUserData = JSON.parse(localStorage.getItem("userData"));
    return {
        name: state.admin.userData.fullName || localUserData.fullName
    };
};

const mapActionToProps = dispatch =>
    bindActionCreators(
        {
            // fetchProducts: fetchProductsAction
        },
        dispatch
    );

export default connect(mapStateToProps, mapActionToProps)(MainAdmin);
