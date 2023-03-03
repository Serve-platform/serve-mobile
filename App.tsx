import DefaultModal from '~/components/DefaultModal';
import GlobalNav from '~/navigators/GlobalNav';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TransactionConfig } from 'web3-core';
import Web3 from 'web3';
import { modalState } from '~/recoil/atoms';
import { seatAbi } from '@utils/abis';
import { useRecoilState } from 'recoil';
const snarkjs = require("snarkjs");

export const web3 = new Web3();
web3.setProvider(
  // @ts-ignore
  new web3.providers.HttpProvider(
    'https://polygon-mumbai.g.alchemy.com/v2/W-XkZND8K-Mm3uW09In9Atd66Dj2j2X6',
  ),
);
export const seatCA = '0xA6f00218efb6c0Fe4C53d01b2195e09A1E1a8523';
const zkpVerifierCA = '0xDA218c923bcA169169D4aD0576653a223a3A4E04';
// @ts-ignore
export const seatContract = new web3.eth.Contract(seatAbi, seatCA);

/*const balanceOf = web3.eth.abi.encodeFunctionSignature({
  "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
  "name": "balanceOf",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
});
console.log('balanceOf', balanceOf);*/

// const aaa = web3.eth.abi.encodeFunctionCall({
//   "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
//   "name": "balanceOf",
//   "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
//   "stateMutability": "view",
//   "type": "function"
// })

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
export const sendTransfer = (txConfig: TransactionConfig, privKey: string | undefined) => {
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

export const zkpVerify = async () => {
  const addr1 = '129394504787394156839024801174952106571260817630';
  const sig1 = '15318967113085362415445465826082254278308254046836';
  console.log(__dirname);
  const wasm = `${__dirname}/src/zkp/tupleCheck.wasm`;
  const zkey = `${__dirname}/src/zkp/tupleCheck_0001.zkey`;
  // const b = fs.existsSync(wasm);
  // const c = fs.existsSync(zkey);
  // console.log('wasm', b);
  // console.log('zkey', c);
  const {proof, publicSignals} = await snarkjs.groth16.fullProve({
    address: addr1,
    sig: sig1
  }, wasm, zkey);
  console.log('publicSignals', publicSignals);
}
const App = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  return (
    <>
      <NavigationContainer>
        <GlobalNav />
      </NavigationContainer>
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
