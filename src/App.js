import React from "react";
import axios from "axios";
import "./App.css";
import { DatePicker, Button, Form, Input } from "antd";

function App() {
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("http://localhost:4000/addDone", e);
      console.log(response.data);
      // Handle success or perform additional actions
    } catch (error) {
      console.error(error);
      // Handle error or display error message
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onFinish={handleSubmit}
        style={{
          maxWidth: 600,
          borderWidth: 1,
          padding: 10,
          borderStyle: "solid",
        }}
      >
        <Form.Item label="Name" name="name">
          <Input name="name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input name="email" />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input name="phone" />
        </Form.Item>
        <Form.Item label="Birth" name="birth">
          <DatePicker />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
    // <div>
    //   <h1>Create User</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>Email address</label>
    //     <input type="text" name="email" onChange={handleChange} />
    //     <label>Password</label>
    //     <input type="text" name="name" onChange={handleChange} />
    //     <label>Phone</label>
    //     <input type="text" name="phone" onChange={handleChange} />
    //     <label>Birth</label>
    //     <input type="date" name="birth" onChange={handleChange} />
    //     <button type="submit" class="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
}

export default App;
