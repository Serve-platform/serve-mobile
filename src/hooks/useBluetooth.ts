import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {PERMISSIONS, requestMultiple} from "react-native-permissions";
import {NativeEventEmitter, NativeModules} from "react-native";
import { getUsers, getUserByUuid } from '~/api/user';
import {UserProp} from "~/types/users";

const useBluetooth = () => {
  const [bluetooth, setBluetooth] = useState();
  const [foundUuids, setFoundUuids] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

  const peripherals = new Map();

  useEffect(() => {
    // 권한
    const permission = async () => {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      ]);

      if (result['android.permission.BLUETOOTH_CONNECT']) {
        console.log('Module initialized');
      }
    };
    permission().then();

    // 블루투스 모듈
    const { CustomBluetooth } = NativeModules;
    setBluetooth(CustomBluetooth);

    // 이벤트 리스터
    const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);
    eventEmitter.addListener('foundUuid', (uuid) => {
      console.log("> data : ", uuid);
      peripherals.set(uuid.deviceAddress, uuid);
      // @ts-ignore
      setFoundUuids(Array.from(peripherals.values()));
      // @ts-ignore
      setFoundUsers(Array.from(peripherals.values()));
    });
    eventEmitter.addListener('error', (message) => console.log("> error : ", message));
    eventEmitter.addListener('log', (message) => console.log("> log : ", message));
  }, []);

  // useEffect(() => {
  //   console.log("> foundUuids : ", foundUuids)
  //   onGetUserByUuid();
  // }, [foundUuids])

  // 전체 사용자 목록
  const { mutate: getUsersMutate } = useMutation(
      async () => {
        const {data} = await getUsers();
        return data;
      },
      {
        onSuccess: (data) => {
          const uuids = data.map((item: UserProp) => item.uuid);
          onScanStart(uuids.join());
        },
        onError: () => {

        },
      }
  );
  const onGetUsersForScanStart = () => {
    getUsersMutate();
  };

  // // 받은 uuids로 사용자 정보 조회
  // const { mutate: getUserByUuidMutate } = useMutation(
  //     async (uuid: string) => {
  //       const {data} = await getUserByUuid(uuid);
  //       return data;
  //     },
  //     {
  //       onSuccess: (data) => {
  //         console.log(">>>> data : ", data)
  //         setFoundUsers(data);
  //       },
  //       onError: () => {
  //
  //       },
  //     }
  // );
  // const onGetUserByUuid = () => {
  //   foundUuids.map((uuid) => getUserByUuidMutate(uuid));
  // };

  // 자리 양도하기 위한 advertise start
  const onAdvertiseStart = () => {
    const token = "724ef650-20c9-439d-a6bd-ba0bfabd4558";
    // @ts-ignore
    bluetooth.onAdvertiseStart(token);
  };

  // 자리 양도하기 위한 advertise stop
  const onAdvertiseStop = () => {
    // @ts-ignore
    bluetooth.onAdvertiseStop();
  }

  // 자리 양도받기 위해 내릴 사람 찾기 start
  const onScanStart = (uuidsToString: string) => {
    // @ts-ignore
    bluetooth.onScanStart(uuidsToString);

    setTimeout(() => {
      onScanStop();
    }, 10000)
  }

  // 자리 양도받기 위해 내릴 사람 찾기 stop
  const onScanStop = () => {
    // @ts-ignore
    bluetooth.onScanStop();
  }


  return { foundUuids, setFoundUuids, foundUsers, onAdvertiseStart, onAdvertiseStop, onGetUsersForScanStart, onScanStop };
};

export default useBluetooth;
