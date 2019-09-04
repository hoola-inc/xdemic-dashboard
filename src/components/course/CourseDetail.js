import React from 'react';
import Sidebar from '../common/Sidebar';
import { Layout, Table, Tag } from 'antd';
import CreateCourseInstanceModal from '../ant-modal/CreateCourseInstanceModal'

const { Header, Footer } = Layout;

const columns = [
    {
        title: 'Course Name',
        dataIndex: 'course_name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Course Code',
        dataIndex: 'course_code',
        key: 'address',
    },
    {
        title: 'Course Tags',
        key: 'course_tags',
        dataIndex: 'course_tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'pink';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        )
    },
    {
        title: 'Course Description',
        key: 'course',
        dataIndex: 'course_description'
    },
    {
        title: 'Course Grading Schema',
        key: 'course',
        dataIndex: 'course_grading_schema'
    },
    {
        title: 'Course Issuer',
        key: 'course',
        dataIndex: 'course_issuer'
    },
    {
        title: 'Course Allignment',
        key: 'course',
        dataIndex: 'course_allignment'
    },
    {
        title: 'Course Url',
        key: 'url',
        dataIndex: 'url',
        render: (text, record) => (
            <span>

                <a href='https://xdemic-badger-service.herokuapp.com/newcourse'> Course URL</a>
            </span>
        )
    }
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

class CourseDetil extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state.detail);
    }

    courseObj = {};

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <CreateCourseInstanceModal />
                    <Table columns={columns} dataSource={data} onRow={(record, rowIndex) => {
                        return {
                            onClick: event => { }
                        };
                    }}>
                    </Table>
                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
                </Layout>

            </Layout>
        );
    }
}

export default CourseDetil;