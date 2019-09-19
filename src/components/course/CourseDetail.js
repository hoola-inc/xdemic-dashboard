import React from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import { Layout, Table, Tag, Row, Col, Card, List, Typography } from 'antd';




class CourseDetil extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            anArray: []
        }
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header />
                </Layout>
            </Layout>
        );
    }
}

export default CourseDetil;