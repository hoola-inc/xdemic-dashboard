import React, { Component } from "react";
import {
    Row,
    Button,
    Col,
    Modal,
    Form,
    Input,
    DatePicker,
    Table,
    Tag,
    Avatar,
    Upload,
    Icon,
    message,
    Menu
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import AddNewPerson from '../ant-modal/AddNewPersonModal';
import withUnmounted from '@ishawnwang/withunmounted';
import axios from 'axios';

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;
const { SubMenu } = Menu;

//Upload props end here
function onChange(date, dateString) {
    console.log(date, dateString);
}
// rowSelection Table start
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
    },
    getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
    })
};

// Table Columns ENd data array start
const data = [
    {
        key: "1",
        avatar: "../drawables/image1.png",
        name: "Rizwan Zaheer",
        did: "0xf77cb6f2de64c9a9e3663b3443d532cf071eb154",
        dob: "21",
        gender: "Other",
        phone: "0300",
        email: "rizwan@hoola.tech",
        tags: ["pending"],
        createtime: "11/22/2019"
    },
    {
        key: "2",
        avatar: "../drawables/image1.png",
        name: "Ameer Hamza",
        did: "0xf77cb6f2de64c9a9e3663b3443d532cf071eb154",
        dob: "30",
        gender: "Male",
        phone: "0345",
        email: "hamza@hoola.tech",
        tags: ["rejected"],
        createtime: "15/22/2019"
    },
    {
        key: "3",
        avatar: "../drawables/image1.png",
        name: "Husnain Baloch",
        did: "0xf77cb6f2de64c9a9e3663b3443d532cf071eb154",
        dob: "32",
        gender: "Female",
        phone: "0336",
        email: "husnain@hoola.tech",
        tags: ["sent"],
        createtime: "01/22/2019"
    },
    {
        key: "4",
        avatar: "../drawables/image1.png",
        name: "Muhammad Adeel",
        did: "0xf77cb6f2de64c9a9e3663b3443d532cf071eb154",
        dob: "33",
        gender: "Male",
        phone: "0344",
        email: "adeel@hoola.tech",
        tags: ["accepted"],
        createtime: "21/05/2019"
    }
];



// tabel data array ends
class AddPersonToSchool extends Component {
    constructor(props) {
        super(props);

        this.state = {
            csvmodal: false,
            csvdragger: false,
            csvdragresult: false,
            createModal: false,
            collapsed: false,

            fileList: [],
            uploading: false,
        };

    }

    hasUnmounted = false;

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        formData.set('csv', fileList[0]);

        this.setState({
            uploading: true,
        });

        axios({
            method: 'post',
            url: 'http://localhost:8300/person/csv',
            data: formData
        })
            .then((response) => {
                //handle success
                console.log(response.data.data);
                this.setState({
                    uploading: false
                })
            })
            .catch((response) => {
                //handle error
                console.log(response);
                message.error('shit fuck');
                this.setState({
                    uploading: false
                })
            });

    };

    /// Tabel COlumns start
    columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: () => (
                <span>
                    <Avatar />
                </span>
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: text => <a>{text}</a>
        },
        {
            title: "DID",
            dataIndex: "did",
            key: "did"
        },
        {
            title: "DOB",
            dataIndex: "dob",
            key: "dob"
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender"
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },

        {
            title: "Status",
            key: "tags",
            dataIndex: "tags",
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        // if (tag === "pending") {
                        // color = "volcano";
                        // }
                        switch (tag) {
                            case "pending":
                                color = "yellow";
                                break;
                            case "rejected":
                                color = "red";
                                break;
                            case "accepted":
                                color = "green";
                                break;
                            case "sent":
                                color = "geekblue";
                                break;
                            default:
                                color = "geekblue";
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
            title: "CrateTime",
            dataIndex: "createtime",
            key: "createtime"
        },
        {
            title: "Operation",
            key: "operation",
            render: (text, record) => (
                <span>
                    <Icon type="upload" />
                </span>
            )
        }
    ];




    // CSV Modal functions end here
    csvShowImage = () => {
        console.log("this is working");
        this.setState({
            csvdragger: false,
            csvdragresult: true
        });
    };
    // Create Button Modal

    createModal = () => {
        this.setState({ createModal: true });
    };

    render() {

        const { uploading, fileList } = this.state;

        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                {/* <Row gutter={24}>
                    <Col span={8}>
                        <div>
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Select File
                                </Button>
                            </Upload>
                            <Button
                                type="primary"
                                onClick={this.handleUpload}
                                disabled={fileList.length === 0}
                                loading={uploading}
                                style={{ marginTop: 16 }}
                            >
                                {uploading ? 'Uploading' : 'Start Upload'}
                            </Button>
                        </div>
                    </Col>
                </Row> */}
                <Row gutter={24} style={{ marginTop: 25 }}>
                    <Col span={22}>
                        <Form layout="inline">
                            <Form.Item>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> Select File
                                </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={this.handleUpload}
                                    disabled={fileList.length === 0}
                                    loading={uploading}
                                >
                                    {uploading ? 'Uploading' : 'Start Upload'}
                                </Button>
                            </Form.Item>
                            <FormItem>
                                <Search placeholder="Search Name" size="small" />
                            </FormItem>
                            <FormItem>
                                <Search placeholder="Search Name" />
                            </FormItem>
                            <FormItem>
                                <RangePicker onChange={onChange} />
                            </FormItem>
                            <FormItem>
                                <Button type="primary">Search</Button>
                            </FormItem>
                            {/* <FormItem>
                                <Button type="default">Reset</Button>
                            </FormItem> */}
                        </Form>
                    </Col>
                    <Col span={2}>
                        {/* to do add ad stuent modal here*/}

                        <AddNewPerson />


                    </Col>
                </Row>
                <Row gutter={24} style={{ marginTop: 25 }}>
                    <Table
                        bordered
                        align="center"
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={data}
                    />
                </Row>
            </div>
        );
    }
}
export default withUnmounted(AddPersonToSchool);