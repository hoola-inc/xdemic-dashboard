import React from "react";
import Sidebar from '../common/Sidebar';
import Header from "../common/Header";
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import { Card, Layout, PageHeader, Row, Typography, Col, Input, Spin } from 'antd';
import axios from 'axios';
import Swal from "sweetalert2";

const { Meta } = Card;
const { Paragraph } = Typography;
const { Search } = Input;


const Content = ({ children, extraContent }) => {
    return (
        <Row className="content" type="flex">
            <div className="main" style={{ flex: 1 }}>
                {children}
            </div>
            <div
                className="extra"
                style={{
                    marginLeft: 80,
                }}
            >
                {extraContent}
            </div>
        </Row>
    );
};


const routes = [
    {
        path: 'index',
        breadcrumbName: 'Home',
    },
    {
        path: 'first',
        breadcrumbName: 'List',
    },
    {
        path: 'second',
        breadcrumbName: 'Search List',
    },
    {
        path: 'third',
        breadcrumbName: 'Search List(Project)',
    }
];

// const content = (
//     <div className="content">
//         <Paragraph>
//             <small>
//                 Follow the steps to register student
//             </small>
//         </Paragraph>

//     </div>
// );

class CoursesCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let coursesArray = [];
        axios.get('https://xdemic-api.herokuapp.com/courses')
            .then(res => {
                if (res.data.status) {
                    res.data.data.forEach(element => {
                        coursesArray.push(
                            <Link to="/coursedetail">
                                <Card
                                    hoverable
                                    style={{ width: 400 }}
                                    cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                >
                                    <Meta title={element.name} description={element.courseCode} />
                                </Card>
                            </Link>
                        )
                        this.setState({
                            data: coursesArray
                        })
                    })
                } else {
                    Swal.fire('oho', 'no record found', 'info');
                }
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }


    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />

                <Layout>
                    <Header />

                    <PageHeader
                        style={{ marginTop: "50px" }}
                        title="Search List(Project)"
                        avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                        breadcrumb={{ routes }}
                    >
                        {/* <Content>
                            {content}
                        </Content> */}


                        <Row>
                            <Col span={8} offset={8}>
                                <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />

                            </Col>
                        </Row>

                    </PageHeader>

                    <div style={{ marginTop: 25 }}>
                        <Row gutter={16}>
                                {
                                    this.state.data.map(courses => <Col span={4} offset={1}> {courses} </Col>)
                                }
                        </Row>
                    </div>

                    <Footer />


                </Layout>
            </Layout>

        );
    }
}

export default CoursesCard;