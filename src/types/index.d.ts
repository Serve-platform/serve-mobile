export type UserProp = {
  uuid: string;
  id: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  nickName: string;
  lastLoginTime: string;
  switchLevel: string;
  image: string;
  walletId: string;
  walletImg: string;
  concesHist: string;
  transAcc: string;
  kakaoUUID: string;
  seats: SeatProp[];
};

export type SeatProp = {
  id: number;
  createdAt: string;
  updatedAt: string;
  seatNumber: string;
  state: number;
  uuid: string;
  trainUuid: number;
};
