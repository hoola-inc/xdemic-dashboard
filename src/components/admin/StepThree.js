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
            collapsed: false
        };

        this.fileUploadD.onChange = this.csvShowImage.bind(this);
    }
    /// Tabel COlumns start
    columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: avatar => (
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

    // CSV Modal functions
    csvModal = () => {
        this.setState({ csvmodal: true, csvdragger: true });
    };

    // CSV FIle Dragger props
    fileUploadD = {
        name: "file",
        multiple: true,
        method: "post",
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

        onChange(info) {
            const { status } = info.file;
            if (status !== "uploading") {
                // console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`);
                console.log("info is: ", info);
                this.props.state.csvShowImage();
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

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
        return (
            <div>
                <Row gutter={24}>
                    <Col span={8}>
                        <Button type="primary" icon="upload" onClick={this.csvModal}>
                            Uplaod CSV
</Button>

                        <Modal visible={this.state.csvmodal}>
                            {/ First step in Modal start here /}
                            {this.state.csvdragger ? (
                                <Dragger visible={false} {...this.fileUploadD}>
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to upload
</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from
                                        uploading company data or other band files
</p>
                                </Dragger>
                            ) : null}
                            {/ First Step End here and Step Two Start /}
                            {this.state.csvdragresult ? (
                                <div>
                                    <Button>
                                        <Icon type="upload" /> Upload
</Button>
                                </div>
                            ) : null}
                        </Modal>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={22}>
                        <Form layout="inline">
                            <FormItem>
                                <Search placeholder="Search Name" />
                            </FormItem>
                            <FormItem>
                                <Search placeholder="Search Name" />
                            </FormItem>
                            <FormItem label="Creat Time">
                                <RangePicker onChange={onChange} />
                            </FormItem>
                            <FormItem>
                                <Button type="primary">Search</Button>
                            </FormItem>
                            <FormItem>
                                <Button type="default">Reset</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={2}>
                        {/* to do add ad stuent modal here*/}

                        <AddNewPerson />


                    </Col>
                </Row>
                <Row gutter={24}>
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
export default AddPersonToSchool;