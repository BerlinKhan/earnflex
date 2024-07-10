import React from "react";
import { Modal, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ViewActivationCodeModal = ({ visible, activationCode, onClose }) => {
  return (
    <Modal
      title="Activation Code"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <p>{activationCode}</p>
    </Modal>
  );
};

export default ViewActivationCodeModal;
