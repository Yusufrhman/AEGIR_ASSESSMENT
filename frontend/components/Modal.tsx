import { motion } from "framer-motion";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  layoutId?: string;
}

export default function Modal({
  children,
  onClose,
  className,
  layoutId,
}: ModalProps) {
  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50  z-30"
      />
      <motion.dialog
        layoutId={layoutId}
        open
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        className={`backdrop fixed inset-0 flex items-center rounded-md max-w-[90%] z-40 shadow-lg ${className}`}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal") as HTMLElement
  );
}
