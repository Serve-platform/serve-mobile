import DefaultModal from '~/components/DefaultModal';
import GlobalNav from '~/navigators/GlobalNav';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Web3 from 'web3';
import { modalState } from '~/recoil/atoms';
import { seatAbi } from '@utils/abis';
import { useRecoilState } from 'recoil';

const web3 = new Web3();
web3.setProvider(
  // @ts-ignore
  new web3.providers.HttpProvider(
    'https://polygon-mumbai.g.alchemy.com/v2/W-XkZND8K-Mm3uW09In9Atd66Dj2j2X6',
  ),
);
const seatCA = '0xA6f00218efb6c0Fe4C53d01b2195e09A1E1a8523';
const zkpVerifierCA = '0xDA218c923bcA169169D4aD0576653a223a3A4E04';
// @ts-ignore
const seatContract = new web3.eth.Contract(seatAbi, seatCA);

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
  console.log(`ETH Balance: ${balance}`);
  console.log(`ETH Balance: ${Number(balance).toFixed(3)}`);
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
