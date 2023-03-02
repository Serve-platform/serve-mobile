import React from 'react';
import { atom } from 'recoil';

interface ModalStateType {
  isOpen: boolean;
  children?: JSX.Element;
  isBackdrop?: boolean;
  onPress: () => void;
  onPressText: string;
  onCancelText: string;
  isBackCancel?: boolean;
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
