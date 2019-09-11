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
        // render: tags => (
        //     <span>
        //         {tags.map(tag => {
        //             let color = tag.length > 5 ? 'geekblue' : 'green';
        //             if (tag === 'loser') {
        //                 color = 'pink';
        //             }
        //             return (
        //                 <Tag color={color} key={tag}>
        //                     {tag.toUpperCase()}
        //                 </Tag>
        //             );
        //         })}
        //     </span>
        // )
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



class CourseDetil extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            anArray: []
        }
    }

    componentDidMount() {
        this.tableData();
    }

    tableData = () => {
        let courseDetailData = [];
        courseDetailData.push({
            key: 1,
            course_name: this.props.location.state.detail.course_name,
            course_code: this.props.location.state.detail.course_code,
            course_tags: this.props.location.state.detail.course_tags,
            course_description: this.props.location.state.detail.course_description,
            course_grading_schema: this.props.location.state.detail.course_grading_schema,
            course_issuer: this.props.location.state.detail.course_issuer,
            course_allignment: this.props.location.state.detail.course_allignment
        });
        this.setState({
            anArray: courseDetailData
        })
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <CreateCourseInstanceModal />
                    <Table columns={columns} dataSource={this.state.anArray} onRow={(record, rowIndex) => {
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