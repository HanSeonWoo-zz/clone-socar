import axios from 'axios';

export const reverseGeo_ = async (params: { coords: string } = { coords: '126.978567,37.565051' }) => {
  const res = await axios.get('https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc', {
    headers: { 'X-NCP-APIGW-API-KEY-ID': 't4hxgozl1l', 'X-NCP-APIGW-API-KEY': 'x2Ti2Xo8rVALhZScsbF6iGMRBtbeqbUWVC4E3Nyw' },
    params: { ...params, output: 'json', orders: 'addr' },
  });
  return res.data;
};

export const geocode_ = async (params: { query: string } = { query: '이리카페' }) => {
  const res = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
    headers: { 'X-NCP-APIGW-API-KEY-ID': 't4hxgozl1l', 'X-NCP-APIGW-API-KEY': 'x2Ti2Xo8rVALhZScsbF6iGMRBtbeqbUWVC4E3Nyw' },
    params: { ...params },
  });
  return res.data;
};

export const naverSearch_ = async (params: { query: string } = { query: '이리카페' }) => {
  const res = await axios.get('https://openapi.naver.com/v1/search/local', {
    headers: { 'Content-Type': 'plain/text', 'X-Naver-Client-Id': '27UL1WD_hHgPdCXnFdcZ', 'X-Naver-Client-Secret': 'ADVIjlzV98' },
    params: { ...params, display: 10 },
  });
  return res.data;
};
