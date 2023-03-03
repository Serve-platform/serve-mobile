import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getMATICBalance,
  getSEATBalance,
  privToAccount,
  getSigData,
  zkpVerify,
} from '../../App';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '~/components/Button';
import { StoreProps } from '@navigators/stackNav/StoreStackNav';
import WalletImage from '@assets/images/wallet.png';
import theme from '@styles/color';
import { useFocusEffect } from '@react-navigation/native';
import Wallet from 'ethereumjs-wallet';

// export const sendMaticTransfer = async (to: string, amount: string) => {
//   const pk = await AsyncStorage.getItem('PrivateKey');
//   const account = privToAccount(pk);
//   const amountBal = web3.utils.toWei(amount, 'ether');
//   const gasAmount = await web3.eth.estimateGas({
//     from: account?.address,
//     to: to,
//     value: amountBal,
//   });
//   const txConfig = {
//     from: account?.address,
//     to: to,
//     value: amountBal,
//     chainId: 80001,
//     gas: gasAmount,
//   };
//   console.log('txConfig', txConfig);
//   sendTransfer(txConfig, account?.privateKey);
// }
// export const sendSeatTransfer = async (to: string, tokenAmount: string) => {
//   const pk = await AsyncStorage.getItem('PrivateKey');
//   const account = privToAccount(pk);
//
//   const tokenAmountBal = web3.utils.toWei(tokenAmount, 'ether');
//   const tmpTxConfig = {
//     from: account?.address,
//     to: to,
//     value: tokenAmountBal,
//   };
//
//   const transferData = seatContract.methods
//     .transfer(tmpTxConfig.to, tmpTxConfig.value)
//     .encodeABI();
//   seatContract.methods
//     .transfer(tmpTxConfig.to, tmpTxConfig.value)
//     .estimateGas({
//       from: tmpTxConfig.from,
//       to: seatCA,
//     })
//     .then((gasAmountProp: any) => {
//       const tokenTxConfig = {
//         from: account?.address,
//         to: seatCA,
//         value: '0x',
//         chainId: 80001,
//         gas: gasAmountProp,
//         data: transferData,
//       };
//       console.log('tokenTxConfig', tokenTxConfig);
//       sendTransfer(tokenTxConfig, account?.privateKey);
//     })
//     .catch((error: any) => {
//       console.log(error);
//     });
// }

const Store = ({}: StoreProps) => {
  const [privateKey, setPrivateKey] = useState('');
  const [matic, setMatic] = useState('0');
  const [balance, setBalance] = useState('0');

  const getPrivateKey = async () => {
    const pk = (await AsyncStorage.getItem('PrivateKey')) || null;
    setPrivateKey(pk ? pk : '');
    const account = privToAccount(pk);

    const bal = await getMATICBalance(account?.address);
    const seatBal = await getSEATBalance(account?.address);
    setMatic(bal);
    setBalance(seatBal);

    const isVerify = await zkpVerify();
    await getSigData(account?.privateKey);
  };

  const generateWallet = async () => {
    const wallet = Wallet.generate();
    const privateKey = '0x' + wallet.getPrivateKey().toString('hex');
    setPrivateKey(privateKey);
    await AsyncStorage.setItem('PrivateKey', privateKey);
    await AsyncStorage.setItem(
      'Address',
      '0x' + wallet.getAddress().toString('hex'),
    );

    const account = privToAccount(privateKey);
    const bal = await getMATICBalance(account?.address);
    const seatBal = await getSEATBalance(account?.address);
    setMatic(bal);
    setBalance(seatBal);
  };

  useFocusEffect(
    React.useCallback(() => {
      getPrivateKey().then();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={WalletImage}
            style={styles.image}
          />
        </View>
        <View style={styles.wallet}>
          <Button title={`내 지갑 정보`} type={`white`} />
        </View>
        <View style={styles.balance}>
          <Text style={styles.label}>잔액</Text>
          <View>
            <Text style={styles.coins}>{balance}</Text>
            <View style={styles.highlight} />
          </View>
          <Text style={styles.seat}>MATIC</Text>
        </View>

        <View style={[styles.balance, { marginTop: 0, marginLeft: 70 }]}>
          <View>
            <Text style={styles.coins}>{matic}</Text>
            <View style={styles.highlight} />
          </View>
          <Text style={styles.seat}>SEAT</Text>
        </View>
      </View>

      {privateKey ? (
        <>
          <Button
            title={`전환하기`}
            type={`yellow`}
            style={{
              marginTop: 20,
            }}
          />
          <Button
            title={`지갑등록`}
            type={`white`}
            style={{
              marginTop: 10,
            }}
          />
        </>
      ) : (
        <Button
          title={`지갑생성`}
          type={`white`}
          style={{
            marginTop: 10,
          }}
          onPress={generateWallet}
        />
      )}
    </View>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  wrapper: {
    marginTop: 120,
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
  imageContainer: {
    position: 'absolute',
    top: -110,
    width: 200,
    height: 200,
    backgroundColor: theme.color.black,
    borderColor: theme.color.main,
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 15,
    color: theme.color.black,
  },
  image: {
    position: 'absolute',
    top: 30,
    left: 52,
    width: 94,
    height: 114,
  },
  wallet: {
    position: 'absolute',
    top: -150,
    width: 200,
    marginTop: 200,
  },
  balance: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: theme.color.black,
    marginRight: 50,
  },
  coins: {
    fontSize: 40,
    color: theme.color.black,
    fontWeight: 'bold',
    position: 'relative',
    zIndex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  highlight: {
    width: '100%',
    height: 13,
    backgroundColor: theme.color.main,
    position: 'absolute',
    bottom: 8,
  },
  seat: {
    fontSize: 18,
    color: theme.color.black,
    marginLeft: 16,
  },
});
