import React from 'react';
import { atom } from 'recoil';

interface ModalStateType {
  isOpen: boolean;
  children: JSX.Element;
  isBackdrop?: boolean;
  isCancelButton?: boolean;
}

export const modalState = atom<ModalStateType>({
  key: 'modalState',
  default: {
    isOpen: false,
    children: <></>,
    isBackdrop: true,
    isCancelButton: true,
  },
});
