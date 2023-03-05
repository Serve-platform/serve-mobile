import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '~/styles/color';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfirmDealByPasswordProps } from '@navigators/GlobalNav';
import { remove } from '@assets/icons';
import { useMutation } from 'react-query';
import { patchSeatBySeatId, StateType } from '~/api';
import InfiniteTrain from '@components/InfiniteTrain';
import { useRecoilState } from 'recoil';
import { modalState } from '~/recoil/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { privToAccount, seatCA, seatContract, web3 } from '../../../App';
import { TransactionConfig } from 'web3-core';
import TextLoopTicker from '@components/TextLoopTicker';
import SeatSelector from '@components/SeatSelector';

const ConfirmDealByPassword = () => {
  const navigation = useNavigation<ConfirmDealByPasswordProps>();

  const { params } = useRoute();
  // @ts-ignore
  const seatId = JSON.parse(params?.seatId);
  // @ts-ignore
  const address = params?.address;
  // @ts-ignore
  const balance = params?.balance;

  const [index, setIndex] = useState(0);
  const [passwords, setPasswords] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const patchSeatBySeatIdMutation = useMutation(
    'patchSeatBySeatId',
    ({ seatId, state }: { seatId: number; state: StateType }) =>
      patchSeatBySeatId(seatId, state),
  );

  const push = (number: number) => {
    let password = [...passwords];
    // @ts-ignore
    password[index] = number;
    setPasswords(password);
    setIndex(index + 1);
  };

  const pop = () => {
    let password = [...passwords];
    password[index - 1] = null;
    setPasswords(password);
    setIndex(index - 1);
  };

  const sendSeatTransfer = async (to: string, tokenAmount: string) => {
    const pk = await AsyncStorage.getItem('PrivateKey');
    const account = privToAccount(pk);
    console.log('> account?.address : ', account?.address);

    const tokenAmountBal = web3.utils.toWei(tokenAmount, 'ether');
    const tmpTxConfig = {
      from: account?.address,
      to: to,
      value: tokenAmountBal,
    };

    const transferData = seatContract.methods
      .transfer(tmpTxConfig.to, tmpTxConfig.value)
      .encodeABI();
    seatContract.methods
      .transfer(tmpTxConfig.to, tmpTxConfig.value)
      .estimateGas({
        from: tmpTxConfig.from,
        to: seatCA,
      })
      .then((gasAmountProp: any) => {
        const tokenTxConfig = {
          from: account?.address,
          to: seatCA,
          value: '0x',
          chainId: 80001,
          gas: gasAmountProp,
          data: transferData,
        };
        console.log('tokenTxConfig', tokenTxConfig);
        sendTransfer(tokenTxConfig, account?.privateKey);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const sendTransfer = (
    txConfig: TransactionConfig,
    privKey: string | undefined,
  ) => {
    console.log('txConfig', txConfig);
    if (privKey != null) {
      web3.eth.accounts.signTransaction(txConfig, privKey).then(signed => {
        console.log('signed.rawTransaction', signed.rawTransaction);
        if (signed.rawTransaction != null) {
          web3.eth
            .sendSignedTransaction(signed.rawTransaction)
            .on('transactionHash', function (hash) {
              console.log('hash', hash);
            })
            .on('receipt', function (receipt) {
              // console.log('receipt', receipt);
              setModalOpen({
                isOpen: true,
                onPressText: 'go to store',
                onCancelText: 'close',
                onPress: () => {
                  // @ts-ignore
                  navigation.navigate('StoreStackNav');
                  setModalOpen({ ...modalOpen, isOpen: false });
                },
                children: (
                  <>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: theme.color.black,
                      }}>
                      {receipt.transactionHash}
                    </Text>
                  </>
                ),
              });
            })
            .on('error', console.error);
        }
      });
    }
  };

  useEffect(() => {
    if (passwords[5] != null) {
      patchSeatBySeatIdMutation.mutate({
        seatId: seatId,
        state: 0,
      });

      sendSeatTransfer(address, balance);

      setModalOpen({
        isOpen: true,
        onCancelText: 'cancel',
        children: (
          <>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: theme.color.black,
              }}>
              Transfer...
            </Text>
            <InfiniteTrain />
          </>
        ),
      });
    }
  }, [passwords]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>put password</Text>

        <View style={styles.markWrapper}>
          {passwords.map((password, i) => (
            <Text
              key={i}
              style={[
                styles.mark,
                password != null
                  ? {
                      backgroundColor: theme.color.white,
                    }
                  : {},
              ]}></Text>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 60,
          }}>
          <TouchableOpacity style={styles.button} onPress={() => push(1)}>
            <Text style={styles.number}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(2)}>
            <Text style={styles.number}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(3)}>
            <Text style={styles.number}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(4)}>
            <Text style={styles.number}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(5)}>
            <Text style={styles.number}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(6)}>
            <Text style={styles.number}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(7)}>
            <Text style={styles.number}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(8)}>
            <Text style={styles.number}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(9)}>
            <Text style={styles.number}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noBorderButton}>
            <Text style={styles.number}></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => push(0)}>
            <Text style={styles.number}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noBorderButton} onPress={() => pop()}>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={remove}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmDealByPassword;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  wrapper: {
    marginTop: 80,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: theme.color.white,
  },
  markWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    color: theme.color.white,
  },
  mark: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: theme.color.white,
    borderStyle: 'solid',
    borderRadius: 12,
    width: 24,
    height: 24,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.color.white,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.color.main,
    borderStyle: 'solid',
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBorderButton: {
    borderRadius: 37,
    width: 74,
    height: 74,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 26,
    color: theme.color.main,
    fontWeight: 'bold',
  },
});
