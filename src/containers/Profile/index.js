import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Layout, Row, Col } from 'antd';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';

class Profile extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Header />
          <Row>
            <Col span={22} offset={1}>
              <h1> Hi! Rizwan </h1>
            </Col>
          </Row>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.admin.userData || [{ name: "Rizwan" }]
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
