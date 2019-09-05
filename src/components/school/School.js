import React from 'react';
import { Layout, Table } from 'antd';
import Sidebar from '../common/Sidebar';
import SchoolRegisterModal from '../ant-modal/SchoolRegisterModal';

const { Header, Footer } = Layout;

const columns = [
    {
        title: 'School Name',
        dataIndex: 'course_name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'School Contact Code',
        dataIndex: 'course_code',
        key: 'address',
    },
    // {
    //     title: 'Course Tags',
    //     key: 'tags',
    //     dataIndex: 'course_tags',
    //     // render: tags => (
    //     //     <span>
    //     //         {tags.map(tag => {
    //     //             let color = tag.length > 5 ? 'geekblue' : 'green';
    //     //             if (tag === 'loser') {
    //     //                 color = 'pink';
    //     //             }
    //     //             return (
    //     //                 <Tag color={color} key={tag}>
    //     //                     {tag.toUpperCase()}
    //     //                 </Tag>
    //     //             );
    //     //         })}
    //     //     </span>
    //     // ),
    // },
    {
        title: 'Branded Url',
        key: 'url',
        dataIndex: 'course_url'
    },
];

const data = [
    {
        key: '1',
        course_name: 'asd',
        course_code: 'asd',
        course_tags: ['nice', 'developer'],
        course_description: 'asdasd',
        course_grading_schema: 'asdasd',
        course_issuer: 'asdasd',
        course_allignment: 'asdasdsa'
    }
];


class School extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <SchoolRegisterModal />
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                this.props.history.push({
                                    pathname: '/coursedetail',
                                    state: { detail: this.courseDataArray[rowIndex] }
                                })
                            }
                        };
                    }} myFunc={this.handleChildFunc}>
                    </Table>
                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
                </Layout>

            </Layout>
        );
    }
}

export default School;