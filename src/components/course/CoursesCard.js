import React from "react";
import Sidebar from '../common/Sidebar';
import Header from "../common/Header";
import Footer from '../common/Footer';
import { Link } from 'react-router-dom';
import { Card, Layout, PageHeader, Row, Typography, Col, Input } from 'antd';

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
                            <Col span={5} offset={2}>
                                <Link to="/coursedetail">
                                    <Card
                                        hoverable
                                        style={{ width: 400 }}
                                        cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                    >
                                        <Meta title="Networking" description="Learn with us" />
                                    </Card>
                                </Link>
                            </Col>
                            <Col span={5}>
                                <Card
                                    hoverable
                                    style={{ width: 400 }}
                                    cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                >
                                    <Meta title="Networking" description="Learn with us" />
                                </Card>
                            </Col>
                            <Col span={5}>
                                <Card
                                    hoverable
                                    style={{ width: 400 }}
                                    cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                >
                                    <Meta title="Networking" description="Learn with us" />
                                </Card>
                            </Col>
                            <Col span={5}>
                                <Card
                                    hoverable
                                    style={{ width: 400 }}
                                    cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                >
                                    <Meta title="Networking" description="Learn with us" />
                                </Card>
                            </Col>

                        </Row>
                    </div>

                    <div style={{ marginTop: 25 }}>
                        <Row gutter={16}>
                            <Col span={5} offset={2}>
                                <Card
                                    hoverable
                                    style={{ width: 400 }}
                                    cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                >
                                    <Meta title="Networking" description="Learn with us" />
                                </Card>
                            </Col>
                            <Col span={5}>
                                <Card
                                    hoverable
                                    style={{ width: 400 }}
                                    cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                >
                                    <Meta title="Networking" description="Learn with us" />
                                </Card>
                            </Col>
                            <Col span={5}>
                                <Card
                                    hoverable
                                    style={{ width: 400 }}
                                    cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                >
                                    <Meta title="Networking" description="Learn with us" />
                                </Card>
                            </Col>
                            <Col span={5}>
                                <Card
                                    hoverable
                                    style={{ width: 400 }}
                                    cover={<img alt="example" src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201902/studies_education_learning_2.jpeg?wOM8J.O9eo2h744k51I38HwkiykDIiMh" />}
                                >
                                    <Meta title="Networking" description="Learn with us" />
                                </Card>
                            </Col>

                        </Row>
                    </div>

                    <Footer />


                </Layout>
            </Layout>

        );
    }
}

export default CoursesCard;