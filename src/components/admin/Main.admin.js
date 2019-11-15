import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import AdminDescription from './AdminDescription';

class MainAdmin extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header />
                    <AdminDescription />
                </Layout>
            </Layout>
        );
    }
}

export default MainAdmin;