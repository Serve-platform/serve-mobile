import { StyleSheet, Text, View } from 'react-native';

import Modal from 'react-native-modal';
import React from 'react';

interface DefaultModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  children: JSX.Element;
}

const DefaultModal = ({
  modalOpen,
  setModalOpen,
  children,
}: DefaultModalProps) => {
  return (
    <Modal
      isVisible={modalOpen}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={() => setModalOpen(false)}
      onBackButtonPress={() => setModalOpen(false)}>
      {children}
    </Modal>
  );
};

export default DefaultModal;

const styles = StyleSheet.create({});
