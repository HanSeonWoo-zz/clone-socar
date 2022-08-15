export const SOCARZONE_DATA = [
  {
    id: 1,
    title: '홍익대학교 예문관 주차장',
    placeType: '지상',
    subTitle: '상수역 2번출구',
    imageUri: 'https://source.unsplash.com/random/1',
    coordinate: { latitude: 37.54798700000001, longitude: 126.9248078 },
  },
  {
    id: 2,
    title: '로하스타워',
    placeType: '지하',
    subTitle: '상수역 2번출구',
    imageUri: 'https://source.unsplash.com/random/2',
    coordinate: { latitude: 37.54852829999998, longitude: 126.92341520000002 },
  },
  {
    id: 3,
    title: '동거동락 쉐어하우스 32호점',
    placeType: '지상',
    subTitle: '동거동락 쉐어하우스 32호점',
    imageUri: 'https://source.unsplash.com/random/3',
    coordinate: { latitude: 37.548181899999996, longitude: 126.9240286 },
  },
  {
    id: 4,
    title: '상수크리원 기계식주차장',
    placeType: '기계식',
    subTitle: '역세권 청년주택 상수역',
    imageUri: 'https://source.unsplash.com/random/4',
    coordinate: { latitude: 37.545397499999986, longitude: 126.92533750000003 },
  },
];
export const CAR_DATA = [
  {
    id: 1,
    name: '쏘나타DN8 센슈어스',
    oil: '휘발유',
    imageUri:
      'https://w.namu.la/s/8ebc09787916315ddc213b7db4ab3ada866f9bfda49a2e669d804ae03278ac063b8eaea4cc5aa05eee5dd123c277121946b362d7f30803a55ac7ed32fe22fa028cbbb22f58f26511bdd9f6a049e604b2e4b2860a88dc5e573859cf4541185f8b89cf506b450858bf9e34eac829ccaffb',
    minPrice: 321,
    oilPrice1: 210,
    oilPrice2: 230,
    oilPrice3: 240,
    insureancePrice1: 2500,
    insureancePrice2: 3750,
    insureancePrice3: 4500,
  },
  {
    id: 2,
    name: 'QM6',
    oil: '휘발유',
    imageUri:
      'https://w.namu.la/s/e773f0ac71cc5dc7ad8de6b9a8f5d182f939553b29177aeec7e18065f3a51a4cd919d47f910ad43cbf1266b0e47bb39882bbb8d60a1d9c5e152c7642949c0c9db0615b950572a1debfede47b04438379823984b0c1e5aadbce789d0a2f6c9058841a03a56c017e8981573bb7e714345b',
    minPrice: 432,
    oilPrice1: 220,
    oilPrice2: 240,
    oilPrice3: 260,
    insureancePrice1: 3210,
    insureancePrice2: 3900,
    insureancePrice3: 4790,
  },
  {
    id: 3,
    name: '더뉴레이',
    oil: '휘발유',
    imageUri:
      'https://w.namu.la/s/6dfb6517ce56d950d2ef666cc7f319be0da47910a77a4f9961da65cde122af947e8afb6f531547025264839ec9f9d6793cbb0ffda83f3b4e563d3c471c8201a7acc961964bc1cdec42d4a3419c8819aaed6277b4d83f513b4d2764e0fa534484c8ffd9911e6f716c2098c3ca51fec6bb',
    minPrice: 123,
    oilPrice1: 180,
    oilPrice2: 200,
    oilPrice3: 220,
    insureancePrice1: 2800,
    insureancePrice2: 3000,
    insureancePrice3: 3450,
  },
];
export const SOCAR_DATA = [
  { id: 1, carId: 1, zoneId: 1 },
  { id: 2, carId: 2, zoneId: 1 },
  { id: 3, carId: 3, zoneId: 1 },
  { id: 4, carId: 1, zoneId: 2 },
  { id: 5, carId: 2, zoneId: 2 },
  { id: 6, carId: 1, zoneId: 3 },
  { id: 7, carId: 2, zoneId: 3 },
  { id: 8, carId: 3, zoneId: 3 },
];
export const RESERVATION_DATA = [{ id: 1, socarId: 1, time: '' }];

export const DEFAULT_PLACE = { latitude: 37.54585579999996, longitude: 126.92158830000007 };

export const DEFAULT_HISTORY_DATA = [{ id: 1, dateStart: '', dateEnd: '', zoneId: 1, socarId: 1, state: '예약완료' }];
