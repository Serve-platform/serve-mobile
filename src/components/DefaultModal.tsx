import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { backArrow, close } from '~/assets/icons';

import Button from '~/components/Button';
import Modal from 'react-native-modal';
import React from 'react';
import theme from '~/styles/color';

interface DefaultModalProps {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  children?: JSX.Element;
  onPress: () => void;
  onPressText: string;
  onCancelText: string;
  isBackCancel?: boolean;
  type?: 'normal';
}

const DefaultModal = ({
  modalOpen,
  setModalOpen,
  children,
  onPress,
  onPressText,
  onCancelText,
  isBackCancel,
  type = 'normal',
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
      <View style={styles.container}>
        {children}
        <Button
          onPress={onPress}
          type={'yellow'}
          style={{ width: '100%' }}
          title={onPressText}
        />
        <TouchableOpacity
          onPress={() => setModalOpen(false)}
          style={{
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={isBackCancel ? backArrow : close}
            style={{
              width: 16,
              height: 16,
              marginRight: 10,
              tintColor: theme.color.black,
              marginTop: 2,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              color: theme.color.black,
            }}>
            {onCancelText}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DefaultModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.white,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
