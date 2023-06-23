import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./App.css";
import {
  DatePicker,
  Button,
  Form,
  Input,
  Table,
  Modal,
  Space,
  message,
  Popconfirm,
} from "antd";
import {
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function App() {
  // State
  const { Search } = Input;
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState(null);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState("");
  // useEffect
  useEffect(() => {
    fetchUsers(searchValue);
  }, [users, searchValue]);
  const fetchUsers = async (searchValue) => {
    try {
      const response = await axios.get(`http://localhost:4000/${searchValue}`);
      const usersWithKeys = response.data.map((user, index) => ({
        ...user,
        birth: moment(user.birth).format("YYYY-MM-DD"),
        key: index + 1,
      }));
      setUsers(usersWithKeys);
    } catch (error) {
      console.error(error);
    }
  };
  // Action
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("http://localhost:4000/addDone", e);
      setOpen(false);
      form.resetFields();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const openUpdate = (item) => {
    form.setFieldsValue({
      id: item._id,
      name: item.name,
      email: item.email,
      phone: item.phoneNumber,
      birth: moment(item.birth),
    });
    setUser(item);
    setOpen(!open);
  };
  const handleUpdate = async (e) => {
    // console.log(e.id);
    try {
      const response = await axios.put(`http://localhost:4000/update-user`, e);
      setOpen(false);
      form.resetFields();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (e) => {
    // console.log(e);
    try {
      const response = await axios.post(`http://localhost:4000/delete-user`, e);
      console.log(response.data);
      message.success("Delete suscced");
    } catch (error) {
      console.error(error);
    }
  };
  // Action Modal
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const showModal = () => {
    setUser("");
    setOpen(true);
  };
  // Render table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Date",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "Action",
      render: (item, record) => (
        <Space>
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          <Button
            style={{ color: "#54E346", borderColor: "#54E346" }}
            onClick={() => openUpdate(record)}
            icon={<EditOutlined />}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div>
        <div style={{ padding: 20 }}>
          <Space direction="horizontal">
            <Button
              onClick={showModal}
              type="primary"
              icon={<UserAddOutlined />}
            >
              ADD
            </Button>
            <Search
              placeholder="input search text"
              // onChange={(value) => {
              //   setSearchValue(value);
              //   console.log(value);
              // }}
              onSearch={(value) => {
                setSearchValue(value);
              }}
              style={{
                width: 200,
              }}
            />
          </Space>
        </div>
        {/* Form */}
        <Modal
          title={user !== "" ? "Update" : "Add"}
          open={open}
          style={{
            top: 20,
          }}
          onCancel={handleCancel}
          footer={[
            <Button
              key="back"
              onClick={handleCancel}
              style={{ display: "flex" }}
              type="primary"
              danger
            >
              Cancel
            </Button>,
          ]}
        >
          <Form
            onFinish={user !== "" ? handleUpdate : handleSubmit}
            form={form}
          >
            <Form.Item label="Id" name="id" hidden={true}></Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input name="name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input name="email" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input name="phone" />
            </Form.Item>
            <Form.Item label="Birth" name="birth" rules={[{ required: true }]}>
              <DatePicker format="YYYY-MM-DD" placement={"bottomLeft"} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
        {/*  */}
      </div>
      <div>
        <Table columns={columns} dataSource={users}></Table>
      </div>
    </div>
  );
}

export default App;
