/* OTHER DATA TYPES *
---------------------
*/

export type CasesItem = {
    confirmed: number | null;
    recovered: number | null;
    deaths: number | null;
    lastUpdate: string;
}
export type DailyData = {
    confirmed: number[];
    deaths: number[];
    date: string[];
}
export type CountryCases = Omit<CasesItem, 'lastUpdate'>

export type SavedDataObj =
| {key: 'cases'; payload: CasesItem}
| {key: 'daily'; payload: DailyData}
| {key: 'countries'; payload: string[]}
| {key: 'country'; payload: CountryCases}

/* API DATA TYPES *

* [k in keyof CasesItem] - make new object type from exist object keys

* Omit<T,K> - new type from T whithout K

*/

export type GetCasesDataType = {[k in keyof CountryCases]: { value: number}} & {lastUpdate: string}

export type GetDailyDataType = {
    totalConfirmed: number;
    reportDate: string;
    deaths: {total: number};
}[]

export type GetCountriesType = {
    countries: {name: string}[];
}

export type GetCountryCasesType = Omit<{[k in keyof CasesItem]: {value: number}}, 'lastUpdate'>

// ---------------------------

/* STATE DATA TYPES *
------------------------------
*/

export type CovidState = {
    cases: CasesItem;
    daily: DailyData;
    countries: string[];
    category: string;
    countrySelect: boolean;
    country: {
        confirmed: number | null;
        recovered: number | null;
        deaths: number | null;
    };
    isLoading: boolean;
    error: string;
}