import React from 'react';
import { RecoilRoot } from 'recoil';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import axios from 'axios';
import App from './App';
import { NavigationContainer } from '@react-navigation/native';

const AppHoc = () => {
  // * react query 글로벌 에러 핸들링 세팅
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => {
        if (axios.isAxiosError(error) && error.response) {
          console.log(JSON.stringify(error.response.data));
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: error => {
        if (axios.isAxiosError(error) && error.response) {
          console.log(JSON.stringify(error.response.data));
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default AppHoc;
