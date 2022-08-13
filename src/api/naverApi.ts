import axios from "axios";

export const reverseGeo_= async(params:{coords:string}={coords:'126.978567,37.565051'})=>{
   const res = await axios.get('https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc',{headers:{'X-NCP-APIGW-API-KEY-ID':'t4hxgozl1l','X-NCP-APIGW-API-KEY':'x2Ti2Xo8rVALhZScsbF6iGMRBtbeqbUWVC4E3Nyw'},params:{...params,output:'json',orders:'addr'}})
   console.log("🚀 ~ file: naverApi.ts ~ line 5 ~ reverseGeo ~ res", res)
   return res.data
}  