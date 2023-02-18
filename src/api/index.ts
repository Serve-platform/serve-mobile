import axios from 'axios';
// import Config from "react-native-config";
export const BACKEND_URL =
  'http://ec2-3-35-25-21.ap-northeast-2.compute.amazonaws.com:3000/api/';

interface QrDataProp {
  address__: string;
  balance__: number;
  token__: string;
}

export const getQrSvg = async ({
  address__,
  balance__,
  token__,
}: QrDataProp) => {
  const res = await axios.get(
    BACKEND_URL + `users/createQr?address=${address__}&balance=${balance__}`,
    {
      headers: {
        Authorization: `Bearer ${token__}`,
      },
    },
  );
  if (res) {
    return res.data;
  }
};
