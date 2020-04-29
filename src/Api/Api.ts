import Axios from "axios";
import {CasesItem, DailyData} from "../../types/types";
const instance = Axios.create({baseURL:'https://covid19.mathdro.id'});

type resOfGetCountryCases = Omit<{[k in keyof CasesItem]:{value:number}},'lastUpdate'>

export const api = {
    getCasesData: async ():Promise<CasesItem> => {
        const response = await instance.get('/api');
        const {confirmed:{value:cValue},recovered:{value:rValue},deaths:{value:dValue},lastUpdate} = await response.data;
        return {confirmed:cValue,recovered:rValue,deaths:dValue,lastUpdate};
    },

    getDailyData: async ():Promise<DailyData> => {
        const response = await instance.get('/api/daily');
        const confirmed = [] as number[];
        const deaths= [] as number[];
        const date = [] as string[];
        response.data.forEach((el:{totalConfirmed:number,reportDate:string,deaths:{total:number}}) => {
            confirmed.push(el.totalConfirmed);
            deaths.push(el.deaths.total);
            date.push(el.reportDate)
        });
        return {confirmed,deaths,date}
    },

    getCountries: async():Promise<string[]> => {
        const response = await instance.get<{countries: {name:string}[]}>('/api/countries');
        return response.data.countries.map((el) => el.name);
    },


    getCountryCases: async (country:string) => {
        const response = await instance.get<resOfGetCountryCases>(`/api/countries/${country}`);
        const {confirmed:{value:cValue},recovered:{value:rValue},deaths:{value:dValue}} = response.data;
        return {confirmed:cValue,recovered:rValue,deaths:dValue}
    }
};