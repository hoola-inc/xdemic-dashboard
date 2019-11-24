import React from 'react';
import { Table, PageHeader, Col, Row, Input, Card, Button, Form, Modal } from 'antd';
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
        title: 'DID',
        dataIndex: 'did',
    },
    {
        title: 'Name',
        dataIndex: 'fullName',
    },
    {
        title: 'phone',
        dataIndex: 'mobile',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Date of birth',
        dataIndex: 'birthDate'
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt'
    }
];




class StudentHelperClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anArray: [],
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            studentsArray: [],

            visible: false,
            loadingModal: false,
            iconLoading: false,
            email: '',
        }
    }
    componentDidMount() {
        let data = [];
        axios.get('https://xdemic-api.herokuapp.com/students')
            .then(res => {
                if (res.data.status) {
                    res.data.data.map((e, i) => {
                        data.push({
                            key: i,
                            fullName: e.fullName,
                            mobile: e.mobile,
                            email: e.email,
                            birthDate: e.birthDate,
                            did: e.did,
                            createdAt: e.createdAt,
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



    // todo change here...
    // Modal code


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    enterLoading = () => {
        this.setState({ loadingModal: true });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    };

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        this.enterLoading();
        // this.handleSubmit()
        this.sendCourse();
    }

    sendCourse = () => {
        axios.post('https://xdemic-api.herokuapp.com/email', this.state)
            .then(res => {
                if (res.data.status) {
                    this.setState({ loadingModal: false });
                    Swal.fire('Success', 'Email Sent', 'success');
                    this.handleCancel();
                }
                else {
                    Swal.fire('Oho...', 'Something went wrong!', 'error');
                    this.handleCancel();
                    this.setState({ loadingModal: false })
                }
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
                this.setState({ loadingModal: false });
                this.handle.onCancel();
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };


    // end here
    // todo end here ...


    render() {
        const { email } = this.state;
        const { getFieldDecorator } = this.props.form;
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

                                    <Row>
                                        <Col span={2}>
                                            <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                                                Graduate
</Button>
                                        </Col>
                                        <Col span={2}>
                                            <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading} style={{ marginLeft: 5 }}>
                                                Expell
</Button>

                                        </Col>
                                        <Col span={4} offset={16}>
                                            <div>
                                                <Button block size="small" onClick={this.showModal}>
                                                    Add New Student
</Button>
                                                <Modal
                                                    title="Enter Course Detail"
                                                    visible={this.state.visible}
                                                    onOk={this.handleOk}
                                                    onCancel={this.handleCancel}
                                                >
                                                    <Form onSubmit={this.submitHandler}>
                                                        <Form.Item label="Student Email">
                                                            {getFieldDecorator('email', {
                                                                rules: [{ required: true, message: 'Please input student email!' }],
                                                            })(
                                                                <Input
                                                                    placeholder="enter student email"
                                                                    allowClear
                                                                    name="email"
                                                                    value={email}
                                                                    onChange={this.changeHandler}
                                                                />
                                                            )}
                                                        </Form.Item>


                                                        <Button type="primary" loading={this.state.loadingModal} onClick={this.submitHandler} ghost >
                                                            Submit
</Button>

                                                    </Form>
                                                </Modal>
                                            </div>
                                        </Col>

                                    </Row>

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

const StudentHelper = Form.create()(StudentHelperClass);

export default StudentHelper;