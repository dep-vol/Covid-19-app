import {CasesItem, CountryCases, CovidState, DailyData} from "../../types/types";
import {actionsTypes} from "../actions/actions";
import {act} from "react-dom/test-utils";

const initialState:CovidState = {
    cases:{
        confirmed:null,
        recovered:null,
        deaths:null,
        lastUpdate:''
    },
    daily: {
        confirmed:[],
        deaths:[],
        date:[]
    },
    country:{
        confirmed:null,
        recovered:null,
        deaths:null
    },
    countrySelect:false,
    countries:[],
    category:'global',
    isLoading:true
};


export const reducer = (state=initialState, action:actionsTypes):CovidState => {
    switch (action.type) {
        case "LOADING_START":{
            return {...state,isLoading:true}
        }
        case "LOADING_END":{
            return {...state, isLoading:false}
        }
        case "SET_CATEGORY":{
            return {...state,category:action.category}
        }
        case "SAVE_DATA":{
            switch(action.dataType) {
                case "cases":{
                    return {...state,cases:{...state.cases,...action.payload} as CasesItem}
                }
                case "daily":{
                    return {...state,daily:{...state.daily,...action.payload} as DailyData}
                }
                case "countries":{
                    return {...state,countries:[...state.countries,...action.payload]}
                }
                case "country":{
                    return {...state, country:{...state.country,...action.payload} as CountryCases}
                }
                //*SHOULD REFACTOR*/
                default: return state
            }

        }
        case "SELECT_COUNTRY":{
            return {...state, countrySelect:true}
        }
        case "SELECT_GLOBAL":{
            return {...state, countrySelect:false}
        }

        default: return state

    }
};