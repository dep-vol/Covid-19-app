export type CasesItem = {
    confirmed:number | null
    recovered:number | null
    deaths:number | null
    lastUpdate:string
}
export type DailyData = {
    confirmed:number[]
    deaths:number[]
    date:string[]
}
export type CountryCases = Omit<CasesItem, 'lastUpdate'>
export type SavedPayload = CasesItem | DailyData | string[] | CountryCases
export type SavedDataType = "cases"|"daily"|"countries"|"country"


/* API DATA TYPES *  

*[k in keyof CasesItem] - make new object type from exist object keys

*/
export type getCasesDataType = {[k in keyof CasesItem]:{value:number}}
export type getDailyDataType = Array<{
    totalConfirmed:number
    reportDate:string
    deaths:{total:number}
}>

//---------------------------

export type CovidState = {
    cases:CasesItem
    daily:DailyData
    countries:string[]
    category:string
    countrySelect:boolean
    country:{
        confirmed:number | null
        recovered:number | null
        deaths:number | null
    }
    isLoading:boolean
}