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
