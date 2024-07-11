// AddEmployeeModal.jsx

import React from "react";
import { Modal } from "antd";
import AddEmployeeForm from "./AddEmployeeForm";

const AddEmployeeModal = ({ visible, activationCode, onAdd, onCancel }) => {
  return (
    <Modal
      title="Add Employee"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <AddEmployeeForm
        activationCode={activationCode}
        onAdd={onAdd}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default AddEmployeeModal;
