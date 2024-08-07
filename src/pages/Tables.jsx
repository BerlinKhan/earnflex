import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Input,
  Button,
  Avatar,
  Typography,
  Progress,
  Rate,
  Modal,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdBadge,
  faPhone,
  faEye,
  faUserPlus,
  faUser,
  faShieldAlt,
  faSyringe,
  faBroom,
  faHardHat,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import AddEmployeeModal from "../components/AddEmployeeModal"; // Import your new modal component
import EditEmployeeModal from "../components/EditEmployeeModal"; // Import the edit modal component
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/hiring_test";

const Tables = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [viewActivationCode, setViewActivationCode] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    getActivationCode();
  }, []);

  const getActivationCode = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get_activation_code`);
      setActivationCode(response.data.activationCode);
      fetchData(response.data.activationCode);
    } catch (error) {
      console.error("Error getting activation code:", error);
    }
  };

  const fetchData = async (activationCode) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get_all_employee`, {
        activationCode,
      });

      const updatedData = response.data.map((item) => ({
        ...item,
        transport: Math.random() < 0.5 ? "Available" : "Not Available",
        industry: getRandomIndustry(),
        profilecompletion: getRandomProfileCompletion()
      }));

      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

 

  const getRandomIndustry = () => {
    const industries = [
      { name: "Security", icon: faShieldAlt },
      { name: "Cleaner", icon: faBroom },
      { name: "Construction", icon: faHardHat },
      { name: "Care", icon: faSyringe },
      { name: "Hospitality", icon: faUtensils },
    ];
    const randomIndex = Math.floor(Math.random() * industries.length);
    return industries[randomIndex];
  };
  const getRandomProfileCompletion = () => {
    const completion = [20,45, 50, 70, 85, 90 ,100];
    const random = Math.floor(Math.random() * completion.length);
    return completion[random];
  };

  const columns = [
    {
      title: "WORKER",
      dataIndex: "worker",
      key: "worker",
      width: "25%",
      render: (text, record) => (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={60}
            src={record.profilePicture || undefined}
            icon={!record.profilePicture && <FontAwesomeIcon icon={faUser} />}
          ></Avatar>
          <div
            className="avatar-info"
            style={{ display: "flex", flexDirection: "column", gap: 5 }}
          >
            <Title level={5}>{`${record.firstName} ${record.lastName}`}</Title>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faPhone} /> <p>{record.email}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} /> <p>{record.phoneNumber}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faIdBadge} /> <p>{record.employeeID}</p>
            </div>
          </div>
        </Avatar.Group>
      ),
    },
    {
      title: "PROFILE COMPLETION",
      dataIndex: "profilecompletion",
      key: "profilecompletion",
      sorter: (a, b) => a.profilecompletion - b.profilecompletion,
      render: (record) => (
        <Progress
          percent={record}
          type="circle"
          size="small"
        />
      ),
    },
    {
      title: "RATING",
      dataIndex: "rating",
      key: "rating",
      render: () => <Rate disabled defaultValue={getRandomRating()} />,
    },
    {
      title: "TRANSPORT",
      dataIndex: "transport",
      key: "transport",
      filters: [
        { text: "Available", value: "Available" },
        { text: "Not Available", value: "Not Available" },
      ],
      onFilter: (value, record) => record.transport.indexOf(value) === 0,
      render: (text) => (
        <span
          className={`badge ${
            text === "Available" ? "badge-green" : "badge-red"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "INDUSTRY",
      dataIndex: "industry",
      key: "industry",
      filters: [
        { text: "Security", value: "Security" },
        { text: "Cleaner", value: "Cleaner" },
        { text: "Construction", value: "Construction" },
        { text: "Care", value: "Care" },
        { text: "Hospitality", value: "Hospitality" },
      ],
      onFilter: (value, record) =>
        record.industry.name.toLowerCase().indexOf(value.toLowerCase()) === 0,
      render: (record) => (
        <div>
          {record && record.icon && <FontAwesomeIcon icon={record.icon} />}
          <span style={{ marginLeft: 10 }}>{record && record.name}</span>
        </div>
      ),
    },
    {
      title: "ACTIVATION CODE",
      key: "activationCode",
      render: (_, record) => (
        <Button
          type="link"
          icon={<FontAwesomeIcon icon={faEye} />}
          onClick={() => showViewModal(record)}
        >
          View
        </Button>
      ),
    },

    {
      title: "ACTIONS",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            type="link"
            onClick={() => showEditModal(record)}
            style={{ color: "#1890ff" }}
          >
            Edit
          </Button>{" "}
          <Button
            type="link"
            style={{ color: "#ff4d4f" }}
            onClick={() =>  deleteEmployee(record.Hiring_TestID)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
    const filteredData = data.filter((record) =>
      `${record.firstName} ${record.lastName}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleAddEmployee = () => {
    setIsAddModalVisible(true);
  };

  const showViewModal = async (record) => {
    setIsViewModalVisible(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/get_activation_code`);
      setViewActivationCode(response.data.activationCode);
    } catch (error) {
      console.error("Error getting activation code:", error);
    }
  };

  const showEditModal = (record) => {
    setEditingEmployee(record);
    setIsEditModalVisible(true);
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete_employee/${id}`);
      fetchData(activationCode); // Refresh data after deletion
      Modal.success({
        title: "Employee Deleted",
        content: "Employee has been successfully deleted!",
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      Modal.error({
        title: "Error",
        content: "Failed to delete employee. Please try again later.",
      });
    }
  };
  

  const handleModalClose = () => {
    setIsViewModalVisible(false);
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setEditingEmployee(null);
  };
  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Workers"
            extra={
              <div style={{ display: "flex", gap: "10px" }}>
                <Radio.Group defaultValue="a">
                  <Radio.Button value="a">List View</Radio.Button>
                  <Link to="/map">
                    <Radio.Button value="b">Map View</Radio.Button>
                  </Link>
                </Radio.Group>
                <Search
                  placeholder="Search Worker"
                  value={searchText}
                  onChange={handleSearch}
                  style={{ width: 250 }}
                />
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon={faUserPlus} />}
                  onClick={handleAddEmployee}
                >
                  Add Employee
                </Button>
              </div>
            }
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 5 }}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* View Activation Code Modal */}
      <Modal
        visible={isViewModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Card title="Activation Code">
          {viewActivationCode ? (
            <p>{viewActivationCode}</p>
          ) : (
            <p>Loading activation code...</p>
          )}
        </Card>
      </Modal>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        visible={isAddModalVisible}
        activationCode={activationCode}
        onAdd={() => {
          fetchData(activationCode);
          handleModalClose();
        }}
        onCancel={handleModalClose}
      />

      {/* Edit Employee Modal */}
      <EditEmployeeModal
        visible={isEditModalVisible}
        employee={editingEmployee} // Pass the employee data
        onEdit={() => {
          fetchData(activationCode);
          handleModalClose();
        }}
        onCancel={handleModalClose}
      />
    </div>
  );
};

export default Tables;
