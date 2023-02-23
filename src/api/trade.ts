import axios from 'axios';

export const BACKEND_URL =
  'http://ec2-3-35-25-21.ap-northeast-2.compute.amazonaws.com:3000/api/';

export const getTradeUser = async (uuids: string[]) => {
  const res = await axios.post(BACKEND_URL + `trade/user`, {
    uuid: uuids,
  });
  if (res) {
    return res.data;
  }
};
