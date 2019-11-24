import React from 'react';
import Sidebar from '../common/Sidebar';
import { Layout } from 'antd';
import Header from '../common/Header';
import StudentHelper from '../../helpers/Student.helper';


class Student extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header />
                    <StudentHelper />
                </Layout>
            </Layout>
        );
    }
}

export default Student;