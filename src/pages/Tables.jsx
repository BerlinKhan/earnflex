import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Rate,
} from "antd";
import { MoreOutlined, ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face2 from "../assets/images/face-2.jpg";
import pencil from "../assets/images/pencil.svg";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdBadge,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const columns = [
  {
    title: "WORKER",
    dataIndex: "worker",
    key: "worker",
    width: "32%",
  },
  {
    title: "PROFILE COMPLETION",
    dataIndex: "profilecompletion",
    key: "profilecompletion",
  },
  {
    title: "RATING",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "ACTIVATION CODE",
    dataIndex: "activationcode",
    key: "activationcode",
  },
  {
    title: "TRANSPORT",
    key: "transport",
    dataIndex: "transport",
  },
  {
    title: "INDUSTRY",
    key: "industry",
    dataIndex: "industry",
  },
  {
    title: "ACTIONS",
    key: "actions",
    dataIndex: "actions",
  },
];

const data = [
  {
    key: "1",
    worker: (
      <>
        <Avatar.Group>
          <Avatar className="shape-avatar" shape="square" size={60} src={face2}></Avatar>
          <div className="avatar-info" style={{display: "flex", flexDirection: "column", gap: 5}}>
            <Title level={5}>Michael John</Title>
            <div style={{display: "flex", flexDirection: "row", gap:10, alignItems: "center"}}>
              <FontAwesomeIcon icon={faPhone} /> <p>michael@mail.com</p>
            </div>
            <div style={{display: "flex", flexDirection: "row",  gap:10,alignItems: "center"}}>
              <FontAwesomeIcon icon={faEnvelope} /> <p>123456677</p>
            </div>
            <div style={{display: "flex", flexDirection: "row", gap:10,alignItems: "center"}}>
              <FontAwesomeIcon icon={faIdBadge} /> <p>at1223</p>
            </div>
          </div>
        </Avatar.Group>
      </>
    ),
    profilecompletion: (
      <>
       <div className="ant-progress-project">
          <Progress percent={30}  type="circle" size="small" />
         </div>
      </>
    ),
    rating: (
      <>
         <Rate disabled defaultValue={2} />
      </>
    ),
    activationcode: (
      <>
       <Button type="primary" className="tag-primary">
          View
        </Button>
      </>
    ),
    transport: "Bus",
    industry: (
      <>
      <Avatar className="shape-avatar" shape="square" size={60} src={face2}></Avatar>
      </>
    ),
    actions: (
      <>
        <Button type="link" color="#FFFFFF"><MoreOutlined /></Button>
      </>
    ),
  },
];

function Tables() {
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  console.log("Data: ", data);
  // console.log("Project Data: ", dataproject);

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Authors Table"
            extra={
              <Radio.Group onChange={onChange} defaultValue="a">
                <Radio.Button value="a">All</Radio.Button>
                <Radio.Button value="b">ONLINE</Radio.Button>
              </Radio.Group>
            }
          >
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} pagination={false} className="ant-border-space" />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Tables;
