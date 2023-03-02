import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BACKEND_URL =
  'http://ec2-3-35-25-21.ap-northeast-2.compute.amazonaws.com:3000/api/';

export const USER = 'users';
export const TRADE = 'trade';
export const TRAIN = 'train';
export const SEAT = 'seat';

type stateType = 0 | 1 | 2 | 3; // 0(대기), 1(판매), 2(요청), 3(거래)

// ---------------------- USER ----------------------//
// 큐알생성
export const getQrSvg = async ({
  address,
  balance,
}: // token,
{
  address: string;
  balance: number;
  // token: string;
}) => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(
    `${BACKEND_URL}${USER}/createQr?address=${address}&balance=${balance}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (res) {
    return res.data;
  }
};

// 회원정보 전체 조회
export const getUsers = async () => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(`${BACKEND_URL}${USER}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res) {
    return res.data;
  }
};

// ---------------------- TRADE ----------------------//
// 내리는 사람 목록
export const getTradeUser = async (uuids: string[]) => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.post(
    `${BACKEND_URL}${TRADE}/user`,
    {
      uuid: uuids,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (res) {
    return res.data;
  }
};

// ---------------------- TRAIN ----------------------//
// 특정 열차 전체 좌석 상태 조회 (임시값 1로 고정)
export const getTrainSeatAll = async () => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(`${BACKEND_URL}${TRAIN}/1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res) {
    return res.data;
  }
};

// ---------------------- SEAT ----------------------//
// 특정 좌석 상태 조회
export const getSeatBySeatId = async (seatId: number) => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(`${BACKEND_URL}${SEAT}/${seatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res) {
    return res.data;
  }
};
// 특정 좌석 예약
export const patchSeatBySeatId = async (seatId: number, state: stateType) => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.patch(
    `${BACKEND_URL}${SEAT}/${seatId}`,
    {
      state: state,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (res) {
    return res.data;
  }
};
