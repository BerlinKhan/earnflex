import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import axios from "axios";

const EditEmployeeModal = ({ visible, employee, onEdit, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Ensure the form is filled with the employee's current data
  form.setFieldsValue(employee);

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      const { Hiring_TestID, ...rest } = employee; // Get the employee ID
      await axios.put(
        `/hiring_test/update_employee/${Hiring_TestID}`,
        {
          ...values,
          activationCode: employee.activationCode, // Include the activation code if required
        }
      );
      form.resetFields();
      onEdit(); // Refresh data after successful edit
      Modal.success({
        title: "Employee Edited",
        content: "Employee has been successfully edited!",
      });
    } catch (error) {
      console.error("Error editing employee:", error);
      Modal.error({
        title: "Error",
        content: "Failed to edit employee. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Employee"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleEdit} layout="vertical">
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
          rules={[{ required: false, message: "Please enter latitude" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="longitude"
          label="Longitude"
          rules={[{ required: false, message: "Please enter longitude" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="employeeID"
          label="Employee ID"
          rules={[{ required: false, message: "Please enter employee ID" }]}
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
          rules={[{ required: false, message: "Please enter country" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEmployeeModal;
