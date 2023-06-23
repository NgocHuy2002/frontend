import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { DatePicker, Button, Form, Input, Table, Modal, Space } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

function App() {
  // State
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState("");
  // useEffect
  useEffect(() => {
    fetchUsers();
  }, [users]);
  const handleEdit = (item) => {
    console.log(item);
    form.setFieldsValue({
      name: item.name,
      email: item.email,
      phone: item.phoneNumber,
    });
    setOpen(!open);
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000");
      const usersWithKeys = response.data.map((user, index) => ({
        ...user,
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // const handleUpdate = async (userId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:4000/getId/${userId}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // Action Modal
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  const showModal = () => {
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
          <Button onClick={() => console.log("Up to date")}>Delete</Button>
          <Button onClick={() => handleEdit(record)}>Update</Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div>
        <div style={{ padding: 20 }}>
          <Button onClick={showModal} type="primary" icon={<UserAddOutlined />}>
            ADD
          </Button>
        </div>
        <Modal
          title="Title"
          open={open}
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
          <Form onFinish={handleSubmit} form={form}>
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
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
      <div>
        <Table columns={columns} dataSource={users}></Table>
      </div>
    </div>
  );
}

export default App;
