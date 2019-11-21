import React from 'react';
import { Layout, Row, Col } from 'antd';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import AdminSteps from './AdminSteps';

class MainAdmin extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header />
                    <Row>
                        <Col span={22} offset={1}>

                            <div style={{margin: 30}}>
                                <h1> Welcome </h1>
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

export default MainAdmin;