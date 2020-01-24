import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Layout, Row, Col } from "antd";
import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";

class Profile extends Component {
  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header />
          <Row>
            <Col span={22} offset={1}>
              <h1 style={{ textTransform: "capitalize" }}>
                Hi, {this.props.name}
              </h1>
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

export default connect(mapStateToProps, mapActionToProps)(Profile);
