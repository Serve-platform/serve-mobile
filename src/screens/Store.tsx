import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StoreProps } from '@navigators/stackNav/StoreStackNav';
import theme from '@styles/color';
import Button from '~/components/Button';
import { BigNumber, ethers } from 'ethers';
import { seatAbi } from '~/utils/abis';
import { decode, encode } from 'base-64';
import { TransactionResponse } from '@ethersproject/providers';

const Store = ({}: StoreProps) => {
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }
  const address = '0xfD71c28bb8aDe8970a6343cd255dff6899fDA1aD';
  const address2 = '0x16aA40118337FEC44e7E78C63B51DE5198E8F0dE';
  const maticAmount = '0.001';
  const seatAmount = '1';
  const account2Priv = ''; // fill
  const mumbaiNodeUrl =
    'https://polygon-mumbai.g.alchemy.com/v2/W-XkZND8K-Mm3uW09In9Atd66Dj2j2X6';
  const provider = new ethers.providers.JsonRpcProvider(mumbaiNodeUrl);

  const seatIface = new ethers.utils.Interface(seatAbi);

  const seatToken = '0x6516DF10bE522ea3B31D1FFB47B101b748160aB7';
  const seatContract = new ethers.Contract(seatToken, seatIface, provider);

  const getWallet = async (privateKey: string) => {
    return new ethers.Wallet(privateKey);
  };

  const getMatic = async (address: string): Promise<string> => {
    const maticBN = await provider.getBalance(address);
    return ethers.utils.formatUnits(maticBN, 'ether');
  };

  const getSeat = async (address: string): Promise<string> => {
    const seatBal = await seatContract.balanceOf(address);
    return ethers.utils.formatUnits(seatBal.toString(), 18);
  };

  const sendMatic = async (
    from: any,
    fromPriv: any,
    to: any,
    amount: string,
  ) => {
    const maticBN = ethers.utils.parseEther(amount);
    const data = '0x';
    return await sendMinimalLondonTx(
      provider,
      from,
      to,
      fromPriv,
      maticBN,
      data,
    );
  };

  const sendToken = async (
    from: any,
    fromPriv: any,
    to: any,
    amount: string,
  ) => {
    const amountBN = ethers.utils.parseUnits(amount, 18);
    const data = seatIface.encodeFunctionData('transfer', [to, amountBN]);
    const maticBN = BigNumber.from(0);
    return await sendMinimalLondonTx(
      provider,
      from,
      seatContract.address,
      fromPriv,
      maticBN,
      data,
    );
  };

  async function sendMinimalLondonTx(
    provider: ethers.providers.JsonRpcProvider,
    from: any,
    to: any,
    priv: any,
    valueBN: any,
    data: any,
  ) {
    const estimatedGas = await provider.estimateGas({
      from,
      to,
      value: valueBN.toString(),
      data,
    });
    const price = await provider.getFeeData();
    const addTip50gwei = ethers.utils.parseUnits('50', 'gwei');
    const addedPrice = BigNumber.from(price.maxPriorityFeePerGas).add(
      addTip50gwei,
    );
    const fields = {
      type: 2,
      gas: estimatedGas,
      maxPriorityFeePerGas: addedPrice.toString(),
      from,
      to,
      value: valueBN.toString(),
      data,
    };
    return await sendTx(provider, from, priv, fields);
  }

  async function sendTx(
    provider: ethers.providers.JsonRpcProvider,
    from: any,
    priv: any,
    fields = {},
  ): Promise<TransactionResponse> {
    const signedTx = await signTx(provider, from, priv, fields);
    const res = await provider.sendTransaction(signedTx);
    return res;
  }

  async function signTx(
    provider: ethers.providers.JsonRpcProvider,
    from: any,
    wallet: ethers.Wallet,
    fields = {},
  ): Promise<string> {
    const nonce = await provider.getTransactionCount(from, 'latest');
    console.log(`nonce: ${nonce}`);
    const transaction = {
      nonce: nonce,
      ...fields,
    };
    const signedTx = await wallet.signTransaction(transaction);
    return signedTx;
  }

  const [matic, setMatic] = useState<string>();
  const [seat, setSeat] = useState<string>();
  const [matic2, setMatic2] = useState<string>();
  const [seat2, setSeat2] = useState<string>();
  useEffect(() => {
    getMatic(address).then(res => setMatic(res));
    getSeat(address).then(res => setSeat(res));
    getMatic(address2).then(res => setMatic2(res));
    getSeat(address2).then(res => setSeat2(res));
  });
  const maticTransfer = async (from: string, to: string, amount: string) => {
    sendMatic(from, account2Priv, to, amount).then(res =>
      console.log('txHash:' + res),
    );
  };
  const tokenTransfer = async (from: string, to: string, amount: string) => {
    sendToken(from, account2Priv, to, amount).then(res =>
      console.log('txHash:' + res),
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.image}></View>
          <View style={styles.wallet}>
            <Button title={`내 지갑 정보`} type={`white`} />
          </View>
          <Text style={styles.balance}>
            잔액 <Text style={styles.coins}>47205</Text> Seat
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.coin_info}>address: {address}</Text>
          <Text style={styles.coin_info}>{matic} MATIC</Text>
          <Text style={styles.coin_info}>{seat} SEAT</Text>
          <Text>---</Text>
          <Text>
            address2: {address2}
            {matic2} MATIC
            {seat2} SEAT
            {address2} ------{'>'} {address} : {seatAmount} SEAT
          </Text>
          <TouchableOpacity
            onPress={() => {
              tokenTransfer(address2, address, seatAmount);
            }}>
            <Text>token transfer</Text>
          </TouchableOpacity>

          <Text>
            ------{'>'} {address} : {maticAmount} MATIC
          </Text>
          <TouchableOpacity
            onPress={() => {
              maticTransfer(address2, address, maticAmount);
            }}></TouchableOpacity>
        </View>

        <Button title={`전환하기`} type={`yellow`} style={styles.button} />
      </View>
    </ScrollView>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  wrapper: {
    marginTop: 140,
    backgroundColor: theme.color.white,
    borderColor: theme.color.main,
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.color.black,
    height: 240,
  },
  image: {
    position: 'absolute',
    top: -110,
    left: 80,
    width: 200,
    height: 200,
    backgroundColor: theme.color.black,
    borderColor: theme.color.main,
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.color.black,
  },
  wallet: {
    position: 'absolute',
    backgroundColor: theme.color.white,
    top: -150,
    left: 80,
    width: 200,
    marginTop: 200,
  },
  balance: {
    fontSize: 14,
    marginTop: 150,
    color: theme.color.black,
  },
  coins: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 40,
    color: theme.color.black,
    fontWeight: 'bold',
  },
  coin_info: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 10,
    color: theme.color.black,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 40,
  },
});
