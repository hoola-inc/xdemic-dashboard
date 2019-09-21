import React from 'react';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import { Layout, Table, Tag, Row, Col, Card, Input, Typography, Menu, Button, Dropdown, Icon, PageHeader } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const { Paragraph } = Typography;
const { Search } = Input;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
        </a>
        </Menu.Item>
    </Menu>
);

const DropdownMenu = () => {
    return (
        <Dropdown key="more" overlay={menu}>
            <Button
                style={{
                    border: 'none',
                    padding: 0,
                }}
            >
                <Icon
                    type="ellipsis"
                    style={{
                        fontSize: 20,
                        verticalAlign: 'top',
                    }}
                />
            </Button>
        </Dropdown>
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
        breadcrumbName: 'CardList',
    },
];

const IconLink = ({ src, text }) => (
    <a
        style={{
            marginRight: 16,
            display: 'flex',
            alignItems: 'center',
        }}
    >
        <img
            style={{
                marginRight: 8,
            }}
            src={src}
            alt="start"
        />
        {text}
    </a>
);

const content = (
    <div className="content">
        <Paragraph>
            <small>
                Course 101, Course Credit 3
            </small>
        </Paragraph>
        <Paragraph>
            <small>
                Start Date - End Date
            </small>
        </Paragraph>
        <Row className="contentLink" type="flex">
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                text="Site"
            />
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                text="HTTPS"
            />
            <IconLink
                src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                text="PDF Syllabus"
            />
        </Row>
    </div>
);

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

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'phone',
        dataIndex: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Date of birth',
        dataIndex: 'dob'
    }
];
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        creditUniteValue: 32,
        creditUniteValue: `London, Park Lane no. ${i}`,
    });
}


class CourseDetail extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            anArray: [],
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            studentsArray: []
        }
    }


    componentDidMount() {
        let data = [];
        axios.get('https://xdemic-api.herokuapp.com/student')
            .then(res => {
                console.log('here');
                if (res.data.status) {
                    res.data.data.map((e, i) => {
                        data.push({
                            key: i,
                            name: e.name,
                            phone: e.phone,
                            email: e.email,
                            dob: e.dob
                        })
                    })

                    this.setState({
                        studentsArray: data
                    })

                    console.log(this.state.studentsArray);
                } else {
                    Swal.fire('oho', 'no record found', 'info');
                }
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {

        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;


        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Header />

                    <div style={{ marginTop: 25 }}>
                        <PageHeader
                            title="Course Name"
                            subTitle="This is a subtitle"
                            tags={<Tag color="blue">Running</Tag>}
                            avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                            breadcrumb={{ routes }}
                        >
                            <Content
                                extraContent={
                                    <img
                                        src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
                                        alt="content"
                                    />
                                }
                            >
                                {content}
                            </Content>
                        </PageHeader>
                    </div>

                    <div style={{ marginTop: 25 }}>

                        <Card>

                            <Row gutter={16}>
                                <Col span={8} offset={4}>
                                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                                </Col>
                                <Col span={8}>
                                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                                </Col>
                            </Row>

                        </Card>

                    </div>

                    <div style={{ marginTop: 25 }}>
                        <Card>
                            <Row gutter={16}>
                                <Col span={20} offset={2}>
                                    <div style={{ marginBottom: 16 }}>
                                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                                            Send Course
                            </Button>
                                        <span style={{ marginLeft: 8 }}>
                                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                                        </span>
                                    </div>
                                    <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.studentsArray} bordered={true} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Layout>
            </Layout>
        );
    }
}

export default CourseDetail;