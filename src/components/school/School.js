import React from 'react';
import { Layout, Table, Form, Row, Col, Input, Button, Icon } from 'antd';
import Sidebar from '../common/Sidebar';
import SchoolRegisterModal from '../ant-modal/SchoolRegisterModal';

const { Header, Footer } = Layout;

const dataSource = [
    {
        key: '1',
        name: 'Yo',
        age: 'Bakers Street London',
        address: 'hamza@gmail.com',
    },
    {
        key: '2',
        name: 'Man',
        age: 'Bakers Street London',
        address: 'khan@gmail.com',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Email',
        dataIndex: 'address',
        key: 'address',
    },
];

class School extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        expand: false
    };

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar {...this.props} />

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <SchoolRegisterModal {...this.props} />

                    <Table dataSource={dataSource} columns={columns} />;

                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
                </Layout>

            </Layout>
        );
    }
}

export default School;