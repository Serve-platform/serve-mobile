import DefaultModal from '~/components/DefaultModal';
import GlobalNav from '~/navigators/GlobalNav';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { modalState } from '~/recoil/atoms';
import { useRecoilState } from 'recoil';

const App = () => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  return (
    <>
      <NavigationContainer>
        <GlobalNav />
      </NavigationContainer>
      {modalOpen && (
        <DefaultModal
          children={modalOpen.children}
          modalOpen={modalOpen.isOpen}
          setModalOpen={(isModalOpen: boolean) =>
            setModalOpen({ ...modalOpen, isOpen: isModalOpen })
          }
        />
      )}
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
