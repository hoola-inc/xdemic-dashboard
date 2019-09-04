import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Layout, Table, Tag } from 'antd';
import Swal from 'sweetalert2';
import Sidebar from '../common/Sidebar';
import CreateCourseModal from '../ant-modal/CreateCourseModal';

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
        key: 'tags',
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
        // ),
    },
    {
        title: 'Course Url',
        key: 'url',
        dataIndex: 'course_url'
    },
];

class Course extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            courseArray: []
        }
    }

    courseDataArray = [];

    componentDidMount() {
        this.getAllCourses();
    }

    getAllCourses = () => {
        let newArray = [];
        axios.get('https://xdemic-badger-service.herokuapp.com/course')
            .then(res => {
                this.courseDataArray = res.data.data;
                res.data.data.map(e => {
                    newArray.push({
                        key: e._id,
                        course_name: e.course_name,
                        course_code: e.course_code,
                        course_tags: e.course_tags
                    })
                });
                if (res.data.status) {
                    this.setState({
                        courseArray: newArray
                    });
                    console.log(this.state.courseArray);
                    
                }
                else {
                    console.log('else');
                    Swal.fire('Oho...', 'Something went wrong!', 'error');
                }
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            });
    }

    handleChildFunc = () => {
        return '5d64f9e2223623390250c8e1';
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <CreateCourseModal />
                    <Table  columns={columns} dataSource={this.state.courseArray} pagination={{ pageSize: 50 }} onRow={(record, rowIndex) => {
                        return {
                            onClick: event => { this.props.history.push({
                                pathname: '/coursedetail',
                                state: { detail: this.courseDataArray[rowIndex]}
                            }) }
                        };
                    }} myFunc={this.handleChildFunc}>
                    </Table>
                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Course;