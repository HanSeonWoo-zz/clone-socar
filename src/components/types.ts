export interface SocarZone {
  id: number;
  title: string;
  subTitle: string;
  imageUri: string;
  placeType: '지상' | '지하' | '기계식'; // 지상, 지하, 기계식 ...
  coordinate: { latitude: number; longitude: number };
}

/**
 * 차 종류에 대한 일반적인 정보
 */
export interface Car {
  id: number;
  name: string;
  oil: string; // 휘발유 , 경유, 전기
  imageUri: string;
  minPrice: number; // 분당 이용료
  oilPrice1: number; // 100km초과 km당 기름 값
  oilPrice2: number; // 30~100km km당 기름 값
  oilPrice3: number; // 30km 미만 km당 기름 값
  insureancePrice1: number; // 5만원 보장 보험
  insureancePrice2: number; // 30만원 보장 보험
  insureancePrice3: number; // 70만원 보장 보험
}

/**
 * 실제 공유 차량의 정보
 */
export interface Socar {
  id: number;
  carId: number;
  zoneId: number;
}

export interface History {
  id: number;
  dateStart: string;
  dateEnd: string;
  zoneId: number;
  socarId: number;
  state: '예약완료' | '예약취소' | '이용중' | '반납완료'; // 예약완료, 예약취소, 이용중, 반납완료
}
