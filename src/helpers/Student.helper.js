import React from 'react';
import { Table, PageHeader, Col, Row, Input, Card, Button } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const { Search } = Input;

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
        breadcrumbName: 'Search Table',
    },
];

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




class StudentHelper extends React.Component {

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

            <div style={{ marginTop: 25 }}>
                <PageHeader title="Students" breadcrumb={{ routes }} subTitle="This is a subtitle" />

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
                                        Graduate
                                    </Button>

                                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading} style={{marginLeft: 5}}>
                                        Expell
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

            </div>
        )
    }
}

export default StudentHelper;