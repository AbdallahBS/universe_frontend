import { createPortal } from "react-dom";

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;
  return createPortal(children, modalRoot);
};

export default ModalPortal;