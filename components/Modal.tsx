import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import XIcon from "../public/icons/XIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  ContentComponent: React.FC<any>;
  id?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  ContentComponent,
  id,
}) => {
  const ModalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ModalContentRef.current &&
        !ModalContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  /* eslint-disable no-use-before-define*/
  return (
    <ModalOverlay>
      <ModalContent ref={ModalContentRef}>
        <ModalHeader>
          <StyledButton onClick={onClose}>
            <XIcon />
          </StyledButton>
        </ModalHeader>
        <ContentComponent onClose={onClose} id={id} />
      </ModalContent>
    </ModalOverlay>
  );
};

/* STYLES */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  max-height: 80vh;
  overflow: auto;
  position: relative;
  border-radius: 5px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  background: white;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export default Modal;
