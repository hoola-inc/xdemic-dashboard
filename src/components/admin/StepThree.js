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
  Avatar,
  Upload,
  Icon,
  message,
  Dropdown,
  Popconfirm,
  Select,
  Divider,
  Menu
} from "antd";
import Swal from "sweetalert2";
import FormItem from "antd/lib/form/FormItem";
import axios from "axios";
import AddNewPerson from "../ant-modal/AddNewPersonModal";

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;
// const { SubMenu } = Menu;
const { Option } = Select;

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

const PRIVILEGES = ["Super Admin", "Admin", "User", "Student", "Anonymous"];

// tabel data array ends
class AddPersonToSchool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csvmodal: false,
      csvdragger: false,
      csvdragresult: false,
      showmodal: false,
      collapsed: false,
      selectedValue: "",

      fileList: [],
      uploading: false,
      tableData: []
    };
  }

  componentDidMount() {
    axios
      .get("https://xdemic-api.herokuapp.com/persons")
      .then(res => {
        console.log(res);
        if (res.data.status) {
          this.setState({ loading: false });
          this.setState({
            uploading: false,
            tableData: res.data.data
          });
        } else {
          Swal.fire("Oho...", "Something went wrong!", "error");
          this.handleCancel();
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        console.log("An Error occured while sending Email ::: ", err.message);
        Swal.fire("Error", err.message, "error");
        // this.setState({ loading: false });
        // this.handle.onCancel();
      });
  }
  onChange = value => {
    console.log(`onChange selected ${value}`);
    this.setState({ selectedValue: value });
    console.log("onChange this.state is: ", this.state);
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = val => {
    console.log("search:", val);
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.set("csv", fileList[0]);

    this.setState({
      uploading: true
    });

    axios({
      method: "post",
      url: "https://xdemic-api.herokuapp.com/person/csv",
      data: formData
    })
      .then(response => {
        // Table Columns ENd data array start
        const data = [];
        // const tags = response.data.data[0].tags
        //handle success
        console.log(response);
        data.push(response.data.data);
        console.log("UPDATED RECORD::", data);
        message.success("file loaded successfully...");
        this.setState({
          uploading: false,
          showmodal: false,
          tableData: data,
          fileList: []
        });
      })
      .catch(response => {
        //handle error
        console.log(response);
        message.error("shit fuck");
        this.setState({
          uploading: false
        });
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
      dataIndex: "fullName",
      key: "name",
      render: text => <a>{text}</a>
    },
    {
      title: "DID",
      dataIndex: "did",
      key: "did"
    },
    {
      title: "Set Privileges",
      dataIndex: "setPrivileges",
      key: "setPrivileges",
      render: (text, record) => {
        console.log("render text is: ", text);
        console.log("render record is: ", record);
        return (
          <Select
            showSearch
            style={{ width: 120 }}
            placeholder="Select a Privilege"
            // optionFilterProp="children"
            // defaultValue={this.state.selectedValue}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSearch={this.onSearch}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {PRIVILEGES.map(val => (
              <Option value={val}>{val}</Option>
            ))}
          </Select>
        );
      }
    },
    {
      title: "DOB",
      dataIndex: "birthDate",
      key: "dob"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: "Phone",
      dataIndex: "mobile",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    // {
    // title: "Date",
    // dataIndex: "createdAt",
    // key: "createdAt"
    // },

    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: () => (
        <span>
          <Button type="primary" ghost onClick={this.sendInvite}>
            Send
          </Button>
        </span>
      )
    },
    {
      title: "CrateTime",
      dataIndex: `createdAt`,
      key: "createdAt"
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, record) => {
        console.log("render text is: ", text);
        console.log("render record is: ", record);
        return (
          <span>
            {/* <Icon type="upload" /> */}
            {/* <Icon type="check" /> */}
            <Icon
              type="check-circle"
              onClick={() => this.handleAccept(record)}
            />
            <Divider type="vertical" />
            <Icon
              type="minus-circle"
              onClick={() => this.handleReject(record)}
            />
            <Divider type="vertical" />
            <Icon type="edit" onClick={() => this.handleEdit(record)} />
            <Divider type="vertical" />
            <Icon
              type="close-circle"
              onClick={() => this.handleReject(record)}
            />
            <Divider type="vertical" />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record._id)}
            >
              {/* <a>Delete</a> */}
              <Icon type="delete" />
            </Popconfirm>
          </span>
        );
      }
    }
  ];

  handleDelete = key => {
    console.log("handleDelete is calling ", key);
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  handleAccept = key => {
    console.log("handleAccept is calling ", key);
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  handleEdit = key => {
    console.log("handleEdit is calling ", key);
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  handleReject = key => {
    console.log("handleReject is calling ", key);
    // const dataSource = [...this.state.dataSource];
    // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };
  handleCancel = () => {
    this.setState({ showmodal: false });
  };

  sendInvite = () => {
    const hide = message
      .loading("Action in progress..", 2, onclose)
      .then(afterClose => {
        message.success("invite sent!");
      });
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
    this.setState({ showmodal: true });
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
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
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
          <Col span={4} offset={20}>
            {/* to do add ad stuent modal here*/}
            <Form layout="inline">
              <Form.Item>
                <Button onClick={this.createModal}>
                  <Icon type="upload" /> Select File
                </Button>
                {/* <Upload {...props}>
                  <Button>
                  <Icon type="upload" /> Select File
                  </Button>
                  </Upload> */}
              </Form.Item>
              <Form.Item>
                <AddNewPerson name={"Person"} />
                {/* <Button
                type="primary"
                onClick={this.handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                >
                {uploading ? "Uploading" : "Start Upload"}
                </Button> */}
              </Form.Item>
              {/* <FormItem>
                <Search placeholder="Search Name" size="small" />
              </FormItem> */}
              {/* <FormItem>
                <Search placeholder="Search Name" />
              </FormItem> */}
              {/* <FormItem>
                <RangePicker onChange={onChange} />
              </FormItem> */}
              {/* <FormItem>
                <Button type="primary">Search</Button>
              </FormItem> */}
              {/* <FormItem>
                <Button type="default">Reset</Button>
                </FormItem> */}
            </Form>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 25 }}>
          <Table
            bordered
            align="center"
            rowSelection={rowSelection}
            columns={this.columns}
            dataSource={this.state.tableData}
          />
        </Row>
        <Modal
          title="Basic Modal"
          visible={this.state.showmodal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>
          ]}
        >
          <Dragger {...props}>
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
        </Modal>
      </div>
    );
  }
}
export default AddPersonToSchool;
