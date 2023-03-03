import DefaultModal from '~/components/DefaultModal';
import GlobalNav from '~/navigators/GlobalNav';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox, StyleSheet } from 'react-native';
import { TransactionConfig } from 'web3-core';
import Web3 from 'web3';
import { modalState } from '~/recoil/atoms';
import { seatAbi, zkpVerifierAbi, sigVerifierAbi } from '@utils/abis';
import { useRecoilState } from 'recoil';

export const web3 = new Web3();
web3.setProvider(
  // @ts-ignore
  new web3.providers.HttpProvider(
    'https://polygon-mumbai.g.alchemy.com/v2/W-XkZND8K-Mm3uW09In9Atd66Dj2j2X6',
  ),
);
LogBox.ignoreLogs([
  "Warning: The provided value 'moz",
  "Warning: The provided value 'ms-stream",
  "Warning: The provided value 'moz-chunked-arraybuffer",
]);
export const seatCA = '0xA6f00218efb6c0Fe4C53d01b2195e09A1E1a8523';
export const zkpVerifierCA = '0xDA218c923bcA169169D4aD0576653a223a3A4E04';
export const sigVerifierCA = '0x563699d8798A654ec60A8F7720Fe8a0037ce69ae';

export const seatContract = new web3.eth.Contract(seatAbi, seatCA);
export const zkpVerifierContract = new web3.eth.Contract(
  zkpVerifierAbi,
  zkpVerifierCA,
);
export const sigVerifierContract = new web3.eth.Contract(
  sigVerifierAbi,
  sigVerifierCA,
);

export const privToAccount = (privateKey: string | null) => {
  if (!privateKey) {
    return;
  }
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  console.log('priv   :', privateKey);
  console.log('account:', account);
  return account;
};
export const getMATICBalance = async (
  address: string | undefined,
): Promise<string> => {
  if (!address) {
    return '';
  }
  let balance = await web3.eth.getBalance(address);
  balance = web3.utils.fromWei(balance, 'ether');
  console.log(`MATIC Balance: ${balance}`);
  console.log(`MATIC Balance: ${Number(balance).toFixed(3)}`);
  return Number(balance).toFixed(3);
  // await this.setState({ ETHBalance: Number(balance).toFixed(3) });
};
export const getSEATBalance = async (
  address: string | undefined,
): Promise<string> => {
  if (!address) {
    return '';
  }
  let tokenBalance = await seatContract.methods.balanceOf(address).call();
  tokenBalance = web3.utils.fromWei(tokenBalance, 'ether');
  console.log(`SEAT Balance: ${tokenBalance}`);
  console.log(`SEAT Balance: ${Number(tokenBalance).toFixed(3)}`);
  return Number(tokenBalance).toFixed(3);
};
export const sendTransfer = (
  txConfig: TransactionConfig,
  privKey: string | undefined,
) => {
  console.log('txConfig', txConfig);
  web3.eth.accounts.signTransaction(txConfig, privKey).then(signed => {
    console.log('signed.rawTransaction', signed.rawTransaction);
    if (signed.rawTransaction != null) {
      web3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .on('transactionHash', function (hash) {
          console.log('hash', hash);
        })
        .on('receipt', function (receipt) {
          console.log('receipt', receipt);
          console.log('txHash', receipt.transactionHash);
        })
        .on('error', console.error);
    }
  });
};

export const getSigData = async (privKey: string | undefined) => {
  const message =
    'Welcome to Serveway!/nClick to sign in and accept the Serveway Service./nThis request will not trigger a blockchain transaction or cost any gas fees.';
  const res = web3.eth.accounts.sign(message, privKey);
  const msgHash = res.messageHash;
  const v = web3.utils.hexToNumber(res.v);
  const r = res.r;
  const s = res.s;
  const signer = await sigVerifierContract.methods
    .verifyString(message, v, r, s)
    .call();
  const account = web3.eth.accounts.privateKeyToAccount(privKey);
  console.log('msgHash', res.messageHash);
  console.log('v', web3.utils.hexToNumber(res.v));
  console.log('r', res.r);
  console.log('s', res.s);
  console.log('account', account);
  console.log('signer', signer);
};

export const zkpVerify = async () => {
  /*const addr1 = '129394504787394156839024801174952106571260817630';
  const sig1 = '15318967113085362415445465826082254278308254046836';
  console.log(__dirname);
  const wasm = `${__dirname}src/zkp/tupleCheck.wasm`;
  const zkey = `${__dirname}src/zkp/tupleCheck_0001.zkey`;
  console.log('wasm', wasm);
  console.log('zkey', zkey);
  const {proof, publicSignals} = await snarkjs.groth16.fullProve({
    address: addr1,
    sig: sig1
  }, wasm, zkey);
  console.log('publicSignals', publicSignals);
  publicSignals[0] = '1';
    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    if (res === true) {
      console.log("Proof verified successfully");
    } else {
      console.log("Invalid proof");
    }
  */
  const a = [
    '0x20496181b75c9817188c52526c5f9df10116f1cdc780eb22565a28a0685c199b',
    '0x2ad140d078f68ed36e02a7f0be78b9f162d9268616fad7068f174f085d8c3129',
  ];
  const b = [
    [
      '0x1693cfbfce71f1a3e7893324e1ef0137771600c24f46a531413a53f4d9fa9980',
      '0x0807134f4176e89995efe1eb25426daa0dd5f69a0cc8c5088ab0ba1f14a7d748',
    ],
    [
      '0x0663e34d6279a01f0682df60460c49c2d1e9948cf85e446093345ee87e913e7c',
      '0x2dc15525146987caedbd6ce7e0a5349ec1de7686c6f25ff9f26c208e44aade39',
    ],
  ];
  const c = [
    '0x2106e20b185561cb00d2927b0245df9aa3c4fdb7faf142863906047cf6d89b59',
    '0x1ce5560c474e73feb1389519316d12cf465580fbf2dea486e242bf37476529af',
  ];
  const input = [
    '0x0000000000000000000000000000000000000000000000000000000000000001',
    '0x000000000000000000000000fd71c28bb8ade8970a6343cd255dff6899fda1ad',
  ];
  const isVerify = await zkpVerifierContract.methods
    .verifyProof(a, b, c, input)
    .call();
  console.log('isVerify', isVerify);
  return isVerify;
};
const App = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  return (
    <>
      <GlobalNav />
      {modalOpen && (
        <DefaultModal
          onPress={modalOpen.onPress}
          onPressText={modalOpen.onPressText}
          onCancelText={modalOpen.onCancelText}
          children={modalOpen.children}
          modalOpen={modalOpen.isOpen}
          style={modalOpen.style}
          setModalOpen={(isModalOpen: boolean) =>
            setModalOpen({ ...modalOpen, isOpen: isModalOpen })
          }
          isBackCancel={modalOpen.isBackCancel}
        />
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
