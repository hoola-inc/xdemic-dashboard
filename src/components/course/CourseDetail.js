import React from "react";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import {
  Layout,
  Table,
  Tag,
  Row,
  Col,
  Card,
  Input,
  Typography,
  //   Menu,
  Button,
  PageHeader,
  Modal,
  message,
  Select
} from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const { Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="http://www.alipay.com/"
//       >
//         1st menu item
//       </a>
//     </Menu.Item>
//     <Menu.Item>
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="http://www.taobao.com/"
//       >
//         2nd menu item
//       </a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
//         3rd menu item
//       </a>
//     </Menu.Item>
//   </Menu>
// );

// const DropdownMenu = () => {
//   return (
//     <Dropdown key="more" overlay={menu}>
//       <Button
//         style={{
//           border: "none",
//           padding: 0
//         }}
//       >
//         <Icon
//           type="ellipsis"
//           style={{
//             fontSize: 20,
//             verticalAlign: "top"
//           }}
//         />
//       </Button>
//     </Dropdown>
//   );
// };

const routes = [
  {
    path: "index",
    breadcrumbName: "Home"
  },
  {
    path: "first",
    breadcrumbName: "List"
  },
  {
    path: "second",
    breadcrumbName: "CardList"
  }
];

const IconLink = ({ src, text }) => (
  <a
    style={{
      marginRight: 16,
      display: "flex",
      alignItems: "center"
    }}
    href="#dfadf"
  >
    <img
      style={{
        marginRight: 8
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
      <small>Course 101, Course Credit 3</small>
    </Paragraph>
    <Paragraph>
      <small>Start Date - End Date</small>
    </Paragraph>
    <Row className="contentLink" type="flex">
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
        text="Site"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
        text="Https"
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
          marginLeft: 80
        }}
      >
        {extraContent}
      </div>
    </Row>
  );
};

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    creditUniteValue: 32,
    creditUniteValue: `London, Park Lane no. ${i}`
  });
}

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anArray: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible: false,
      studentsArray: [],
      courseId: this.props.location.state.data || "",
      courseArray: [
        {
          name: ""
        }
      ],
      enrollStudents: [],
      studentKey: ""
    };
    this.addStudent = this.addStudent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const courseId = this.props.location.state.data;
    this.setState({
      courseId: courseId
    });
    this.getenrolledStudents(courseId);
    this.getCourseById(courseId);
    this.getAllStudents();
  }

  enrollStudentColumn = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "phone",
      dataIndex: "phone"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Date of birth",
      dataIndex: "dob"
    },
    {
      title: "Grades",
      dataIndex: "grades",
      value: "2",
      render: () => {
        return (
          <Select
            defaultValue="A"
            style={{ width: 500 }}
            onChange={this.handleChange}
          >
            <Option value="asdf">A</Option>
            <Option value="ww">B</Option>
            <Option value="C">C</Option>
            <Option value="ad">D</Option>
            <Option value="zc">F</Option>
          </Select>
        );
      }
    }
  ];

  handleChange(value) {
    console.log(`selected ${value}`);

    if (value == "C") {
      console.log(this.state.courseId);
      axios
        .put(
          `https://xdemic-api.herokuapp.com/student/${this.state.courseId}`,
          {
            courseGrade: "C"
          }
        )
        .then(res => {
          if (res.data.status) {
            message.info("grade upated");
          } else {
            message.info("grade not updated");
          }
        })
        .catch(err => {
          message.error(err.message);
        });
    }
  }

  columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "phone",
      dataIndex: "phone"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Date of birth",
      dataIndex: "dob"
    },
    {
      title: "Grades",
      dataIndex: "grades"
    },
    {
      title: "Add Student To course",
      dataIndex: "addStudentToCourse",
      render: () => <a onClick={this.addStudent}>Add Student</a>
    }
  ];

  addStudent() {
    const studentId = this.state.studentsArray[0].key;
    axios
      .put(`https://xdemic-api.herokuapp.com/student/${studentId}`, {
        courseId: this.state.courseId
      })
      .then(res => {
        if (res.data.status) {
          this.handleCancel();
          this.getenrolledStudents(this.state.courseId);
          Swal.fire("Student", "enrolled successfully", "success");
        }
      })
      .catch(err => {
        Swal.fire("Error", err.message, "error");
      });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);

    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    // setTimeout(() => {
    //     this.setState({
    //         selectedRowKeys: [],
    //         loading: false,
    //     });
    // }, 1000);

    axios
      .post("https://xdemic-api.herokuapp.com/credentials", {
        vc: ["https://xdemic-api.herokuapp.com/httpcourse"]
      })
      .then(res => {
        if (res.data.status) {
          Swal.fire(
            "Sucessfully",
            "sent credentials on xdmic mobile app",
            "success"
          );
          this.setState({
            selectedRowKeys: [],
            loading: false
          });
        }
      })
      .catch(err => {
        Swal.fire("Error", err.message, "error");
      });
  };

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  getenrolledStudents(id) {
    axios
      .get(`https://xdemic-api.herokuapp.com/enrollstudents/${id}`)
      .then(res => {
        if (res.data.status) {
          this.setState({
            enrollStudents: res.data.data
          });
        } else {
          message.info("no student enroll");
        }
      })
      .catch(err => {
        Swal.fire("Error", "an error occured", "error");
      });
  }

  getCourseById(id) {
    axios
      .get(`https://xdemic-api.herokuapp.com/course/${id}`)
      .then(res => {
        console.log("here");
        if (res.data.status) {
          this.setState({
            courseArray: res.data.data
          });
          console.log(this.state.courseArray);
        } else {
          Swal.fire("oho", "no record found", "info");
        }
      })
      .catch(err => {
        Swal.fire("Error", err.message, "error");
      });
  }

  getAllStudents() {
    let data = [];
    axios
      .get("https://xdemic-api.herokuapp.com/student")
      .then(res => {
        console.log("here");
        if (res.data.status) {
          res.data.data.map((e, i) => {
            data.push({
              key: e._id,
              name: e.name,
              phone: e.phone,
              email: e.email,
              dob: e.dob
            });
          });
          this.setState({
            studentsArray: data,
            courseObj: this.props.location.state.data.courseObj
          });
        } else {
          Swal.fire("oho", "no record found", "info");
        }
      })
      .catch(err => {
        Swal.fire("Error", err.message, "error");
      });
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header />

          {/* Modal */}
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            closable={false}
            width={1500}
          >
            <Table
              columns={this.columns}
              dataSource={this.state.studentsArray}
              bordered={true}
            />
          </Modal>
          {/* End here */}

          <div style={{ marginTop: 25 }}>
            <PageHeader
              title={this.state.courseArray[0].name}
              subTitle="This is a subtitle"
              tags={<Tag color="blue">Running</Tag>}
              avatar={{
                src:
                  "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
              }}
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
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    enterButton
                  />
                </Col>
                <Col span={8}>
                  <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    enterButton
                  />
                </Col>
              </Row>
            </Card>
          </div>

          <div style={{ marginTop: 25 }}>
            <Card>
              <Row gutter={16}>
                <Col span={20} offset={2}>
                  <div style={{ marginBottom: 16 }}>
                    <Button
                      type="primary"
                      onClick={this.start}
                      disabled={!hasSelected}
                      loading={loading}
                    >
                      Send Course
                    </Button>

                    <Button
                      type="primary"
                      style={{ marginLeft: 5 }}
                      onClick={this.showModal}
                    >
                      Enroll Student
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                      {hasSelected
                        ? `Selected ${selectedRowKeys.length} items`
                        : ""}
                    </span>
                  </div>
                  <Table
                    rowSelection={rowSelection}
                    columns={this.enrollStudentColumn}
                    dataSource={this.state.enrollStudents}
                    bordered={true}
                  />
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
