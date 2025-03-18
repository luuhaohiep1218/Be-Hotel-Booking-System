import React from "react";

const SuccessModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.modalTitle}>Đặt phòng thành công!</h2>
        <p>Nhân viên sẽ liên hệ lại với bạn sớm nhất có thể.</p>
        <button style={styles.closeBtn} onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.3s ease-in-out",
  },
  modalTitle: {
    color: "#27ae60",
    fontSize: "20px",
    marginBottom: "10px",
  },
  closeBtn: {
    background: "#27ae60",
    color: "white",
    border: "none",
    padding: "10px 20px",
    marginTop: "15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s",
  },
};

export default SuccessModal;
