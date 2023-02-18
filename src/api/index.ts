import axios from 'axios';
// import Config from "react-native-config";
export const BACKEND_URL =
  'http://ec2-3-35-25-21.ap-northeast-2.compute.amazonaws.com:3000/api/';

interface QrDataProp {
  address: string;
  balance: number;
  token: string;
}

export const getQrSvg = async ({
  address,
  balance,
  token,
}: QrDataProp) => {
  const res = await axios.get(
    BACKEND_URL + `users/createQr?address=${address}&balance=${balance}`,
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
