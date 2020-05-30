import Axios from 'axios';
import { GetCasesDataType, GetDailyDataType, GetCountriesType, GetCountryCasesType, CasesItem, DailyData, CovidState, CountryCases } from '../types/types';

const instance = Axios.create({baseURL: 'https://covid19.mathdro.id'});



export const api = {
    getCasesData: async (): Promise<CasesItem> => {
        const response = await instance.get<GetCasesDataType>('/api');
        const {confirmed: {value: cValue}, recovered: {value: rValue}, deaths: {value: dValue}, lastUpdate} = response.data;
        return {confirmed: cValue, recovered: rValue, deaths: dValue, lastUpdate};
    },

    getDailyData: async (): Promise<DailyData> => {
        const response = await instance.get<GetDailyDataType>('/api/daily');
        const confirmed: number[] = [];
        const deaths: number[] = [];
        const date: string[] = [];
        response.data.forEach((el) => {
            confirmed.push(el.totalConfirmed);
            deaths.push(el.deaths.total);
            date.push(el.reportDate);
        });
        return {confirmed, deaths, date};
    },

    getCountries: async(): Promise<CovidState['countries']> => {
        const response = await instance.get<GetCountriesType>('/api/countries');
        return response.data.countries.map((el) => el.name);
    },

    getCountryCases: async (country: string): Promise<CountryCases> => {
        const response = await instance.get<GetCountryCasesType>(`/api/countries/${country}`);
        const {confirmed: {value: cValue}, recovered: {value: rValue}, deaths: {value: dValue}} = response.data;
        return {confirmed: cValue, recovered: rValue, deaths: dValue};
    }
};