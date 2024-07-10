import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";

const EditEmployeeModal = ({ visible, onCancel, onOk, employee }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        // Add other fields as needed
      });
    }
  }, [employee]);

  const handleOk = () => {
    // Implement your form submission logic here
    // Assuming form values are collected and passed to onOk function
    onOk(employee.id, formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      title="Edit Employee"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="edit" type="primary" onClick={handleOk}>
          Edit
        </Button>,
      ]}
    >
      {/* Your form components go here */}
      <p>Edit Employee Form</p>
    </Modal>
  );
};

export default EditEmployeeModal;

