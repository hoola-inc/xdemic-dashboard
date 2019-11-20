import React from 'react';
import { Layout } from 'antd';
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
                    <h1>
                        Welcome
                    </h1>
                    <p>
                        Journey begins here 
                    </p>
                    <AdminSteps/>
                </Layout>
            </Layout>
        );
    }
}

export default MainAdmin;