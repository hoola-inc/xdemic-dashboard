import React from 'react';
import { Layout, Table, Form, Row, Col, Input, Button, Icon, Modal, Select } from 'antd';
import Sidebar from '../common/Sidebar';
import SchoolRegisterModal from '../ant-modal/SchoolRegisterModal';
import axios from 'axios';
import Swal from 'sweetalert2';


const { Header, Footer } = Layout;
const { Option } = Select;



const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Subject Webpage',
        dataIndex: 'subjectWebpage',
        key: 'subjectWebpage'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Offers',
        dataIndex: 'offers',
        key: 'offers'
    },
    {
        title: 'Agent SectorType',
        dataIndex: 'agentSectorType',
        key: 'agentSectorType'
    },
    {
        title: 'Agent Type',
        dataIndex: 'agentType',
        key: 'agentType'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'DID',
        dataIndex: 'did',
        key: 'did'
    },
    {
        title: 'Telephone',
        dataIndex: 'telephone',
        key: 'telephone'
    }
];

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

class School extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            schoolArray: [],
            visible: false,
            loading: false,
            iconLoading: false,
            name: '',
            subjectWebpage: '',
            address: '',
            offers: '',
            agentSectorType: '',
            agentType: '',
            email: '',
            did: '',
            telephone: ''
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.getSchools();
    }
    getSchools = () => {
        let newArray = [];
        axios.get('https://xdemic-api.herokuapp.com/schools')
            .then(res => {

                if (res.data.status) {

                    this.courseDataArray = res.data.data;
                    res.data.data.map(e => {
                        newArray.push({
                            name: e.name,
                            subjectWebpage: e.subjectWebpage,
                            address: e.address,
                            offers: e.offers,
                            agentSectorType: e.agentSectorType,
                            agentType: e.agentType,
                            email: e.email,
                            did: e.did,
                            telephone: e.telephone
                        })
                    });
                    // setting state
                    this.setState({
                        schoolArray: newArray
                    });

                }
                else {
                    console.log('else');
                    Swal.fire('Oho...', 'No Record Found', 'info');
                }
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            });
    }


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
        this.setState({ loading: true });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    };

    onChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            agentType: value
        })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();
        this.enterLoading();
        this.sendSchool();
    }

    sendSchool = () => {
        axios.post('https://xdemic-api.herokuapp.com/school', this.state)
            .then(res => {
                console.log(res);
                if (res.data.status) {
                    this.setState({ loading: false });
                    this.handleCancel();
                    this.setState({
                        schoolArray: [...this.state.schoolArray, res.data.data]
                    })

                    Swal.fire('School', 'created', 'success');
                }
                else {
                    this.setState({ loading: false });
                    this.handleCancel();
                    Swal.fire('Oho...', 'Duplicate School Name!', 'info');
                }
            })
            .catch(err => {
                this.setState({ loading: false });
                this.handleCancel();
                Swal.fire('Error', err.message, 'error');
            });
    }

    render() {
        const { name, subjectWebpage, address, offers, agentSectorType, email, telephone } = this.state;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar {...this.props} />

                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />



                    <div>
                        <Button type="primary" style={{ float: "right" }} onClick={this.showModal}>
                            New School
        </Button>
                        <Modal
                            title="Enter Course Detail"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Form onSubmit={this.submitHandler}>
                                <Form.Item label="School Name">
                                    <Input
                                        placeholder="enter school name"
                                        allowClear
                                        name="name"
                                        value={name}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Item>

                                <Form.Item label="School Subject Webpage">
                                    <Input
                                        placeholder="enter school webpage"
                                        allowClear
                                        name="subjectWebpage"
                                        value={subjectWebpage}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="School Address">
                                    <Input
                                        placeholder="enter school address"
                                        allowClear
                                        name="address"
                                        value={address}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Item>

                                <Form.Item label="School Offers">
                                    <Input
                                        placeholder="enter school offers"
                                        allowClear
                                        name="offers"
                                        value={offers}
                                        onChange={this.changeHandler}
                                    />
                                </Form.Item>

                                <Form.Item label="School Agent Sector Type">
                                    <Input
                                        placeholder="enter school agent sector type"
                                        allowClear
                                        name="agentSectorType"
                                        value={agentSectorType}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="School Agent Type">
                                    {/* <Input
                                        placeholder="enter school agent type"
                                        allowClear
                                        name="agentType"
                                        value={agentType}
                                        onChange={this.changeHandler} /> */}

                                    <Select
                                        showSearch
                                        style={{ width: 470 }}
                                        placeholder="Select school agent type"
                                        optionFilterProp="children"
                                        onChange={this.onChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="High School">High School</Option>
                                        <Option value="Middle School">Middle School</Option>
                                        <Option value="University">University</Option>
                                    </Select>


                                </Form.Item>

                                <Form.Item label="School Email">
                                    <Input
                                        placeholder="enter school email"
                                        allowClear
                                        name="email"
                                        value={email}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Form.Item label="School Telephone">
                                    <Input
                                        placeholder="enter school telephone"
                                        allowClear
                                        name="telephone"
                                        value={telephone}
                                        onChange={this.changeHandler} />
                                </Form.Item>

                                <Button type="primary" loading={this.state.loading} onClick={this.submitHandler} ghost >
                                    Submit
                    </Button>

                            </Form>
                        </Modal>
                    </div>




                    <Table dataSource={this.state.schoolArray} columns={columns} pagination={{ pageSize: 15 }} />

                    <Footer style={{ textAlign: 'center' }}>Hoola Tech ©2019</Footer>
                </Layout>

            </Layout>
        );
    }
}

export default School;