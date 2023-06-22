import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { DatePicker, Button, Form, Input, Table, Modal, Space } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

function App() {
  // State
  const [open, setOpen] = useState(false);
  const [user, setUsers] = useState("");
  // useEffect
  useEffect(() => {
    fetchUsers();
  }, [user]);

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
  // Action Modal
  const handleCancel = () => {
    setOpen(false);
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
          <Button onClick={(e) => console.log("Up to date", record._id)}>
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
          <Form onFinish={handleSubmit}>
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
              <DatePicker />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
      <div>
        <Table columns={columns} dataSource={user}></Table>
      </div>
    </div>
  );
}

export default App;
