import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Wallet from 'ethereumjs-wallet';

const SignUp = () => {
  const [privateKey, setPrivateKey] = useState<string>();
  const [address, setAddress] = useState<string>();

  const generateWallet = () => {
    const wallet = Wallet.generate();
    setPrivateKey('0x' + wallet.getPrivateKey().toString('hex'));
    setAddress('0x' + wallet.getAddress().toString('hex'));
  };
  return (
    <View>
      <Text onPress={generateWallet}>Generate Wallet</Text>
      {privateKey && (
        <View>
          <Text>Private Key: {privateKey}</Text>
          <Text>Address: {address}</Text>
        </View>
      )}
    </View>
  );
};

export default SignUp;
