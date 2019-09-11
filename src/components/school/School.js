import React from 'react';
import { Layout, Table, Form, Row, Col, Input, Button, Icon } from 'antd';
import Sidebar from '../common/Sidebar';
import SchoolRegisterModal from '../ant-modal/SchoolRegisterModal';

const { Header, Footer } = Layout;


class School extends React.Component {

    state = {
        expand: false,
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <SchoolRegisterModal />

                    <h1>
                        School Component
                    </h1>

                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
                </Layout>

            </Layout>
        );
    }
}

export default School;