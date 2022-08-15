import AsyncStorage from '@react-native-async-storage/async-storage';
import numeral from 'numeral';

/**
 *
 * @param timeout milli Seconds
 * @returns
 */
export const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// https://react-native-async-storage.github.io/async-storage/docs/install
export const storeString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('storeString Success', key);
  } catch (e) {
    console.log('storeString failed', key);
  }
};

export const storeObject = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log('storeObject Success', key);
  } catch (e) {
    console.log('storeObject failed', key);
  }
};

export const getString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log('getString Success', key);
    if (value !== null) {
      // value previously stored
      return value;
    }
    return null;
  } catch (e) {
    console.log('getString Failed', key);
    // error reading value
  }
};

export const getObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log('getObject Success', key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getObject Failed', key);
    // error reading value
  }
};

// AsyncStorage set 함수 모듈
export const removeItemInStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('remove Item Success : ', key);
  } catch (error) {
    console.log('remove Item Error');
  }
};

export const SOCAR_DATE_FORMAT = 'M/D (dd) HH:mm';
export const getDefaultStart = () => {
  const temp = new Date();
  const res = (Math.ceil(temp.getMinutes() / 10) + 1) * 10;
  temp.setMinutes(res);
  return temp;
};
export const getDefaultEnd = () => {
  const temp = getDefaultStart();
  const res = temp.getHours();
  temp.setHours(res + 4);
  return temp;
};

export const formatNumber = (num: number) => numeral(num).format('0,0');
