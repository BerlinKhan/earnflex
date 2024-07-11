import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import axios from "axios";

const AddEmployeeForm = ({ activationCode, onAdd }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("/hiring_test/add_employee", {
        ...values,
        activationCode,
      });
      form.resetFields();
      onAdd(); // Refresh data after successful addition
      Modal.success({
        title: "Employee Added",
        content: "Employee has been successfully added!",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      Modal.error({
        title: "Error",
        content: "Failed to add employee. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please enter first name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter last name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ required: true, message: "Please enter phone number" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="latitude"
        label="Latitude"
        rules={[{ required: true, message: "Please enter latitude" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="longitude"
        label="Longitude"
        rules={[{ required: true, message: "Please enter longitude" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="employeeID"
        label="Employee ID"
        rules={[{ required: true, message: "Please enter employee ID" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: "Please enter city" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="country"
        label="Country"
        rules={[{ required: true, message: "Please enter country" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Employee
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEmployeeForm;
