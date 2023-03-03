import React from 'react';
import { ViewStyle } from 'react-native';
import { atom } from 'recoil';

interface ModalStateType {
  isOpen: boolean;
  children?: JSX.Element;
  isBackdrop?: boolean;
  onPress?: () => void;
  onPressText?: string;
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

export const seatIdState = atom<number | null>({
  key: 'seatIdState',
  default: null,
});

export const isWatchState = atom<boolean>({
  key: 'isWatchState',
  default: false,
});

interface BoardInfoStateType {
  trainUuid: string;
  doorNumber: string;
  trainLine: string;
  trainLocation: string;
}

export const boardInfoState = atom<BoardInfoStateType>({
  key: 'boardInfoState',
  default: {
    trainUuid: '1',
    doorNumber: '1st',
    trainLine: '구남규호선',
    trainLocation: '서울',
  },
});
