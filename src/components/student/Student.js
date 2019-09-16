import React from 'react';
import Sidebar from '../common/Sidebar';
import { Layout, Table, Form, Row, Col, Input, Button, Icon } from 'antd';
import  AddNewStudent  from '../ant-modal/AddNewStudentModal';

const { Header, Footer } = Layout;

const dataSource = [
    {
        key: '1',
        name: 'Yo',
        dob: '1 jan 1990',
        phone: '0345 5555555',
        email: 'hamza@gmail.com'
    }
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Date of birth',
        dataIndex: 'dob',
        key: 'age',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: '',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: ''
    }
];


class Student extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <AddNewStudent />
                    <Table dataSource={dataSource} columns={columns} pagination={false} />;

                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Student;