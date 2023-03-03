import React from 'react';
import { ViewStyle } from 'react-native';
import { atom } from 'recoil';

interface ModalStateType {
  isOpen: boolean;
  children?: JSX.Element;
  isBackdrop?: boolean;
  onPress: () => void;
  onPressText: string;
  onCancelText: string;
  isBackCancel?: boolean;
  style?: ViewStyle;
}

export const modalState = atom<ModalStateType>({
  key: 'modalState',
  default: {
    isOpen: false,
    children: <></>,
    isBackdrop: true,
    onPress: () => {},
    onPressText: '',
    onCancelText: '',
    isBackCancel: false,
  },
});

export const seatIdState = atom<number>({
  key: 'seatIdState',
  default: 0,
});
