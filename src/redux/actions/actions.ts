import { Action, Dispatch } from "redux";
import { SavedDataType, SavedPayload } from "../../types/types";
import { api } from "../../Api/Api";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

type inferValueTypes<T> = T extends {[key:string]:infer U} ? U : never;

export const actions={
    loading: () => ({type:"LOADING_START"} as const),
    endLoading:() => ({type:"LOADING_END"} as const),
    setCategory:(category:string) => ({type:"SET_CATEGORY", category} as const),
    selectCountry:() => ({type:"SELECT_COUNTRY"} as const),
    selectGlobal:() => ({type:"SELECT_GLOBAL"} as const),
    saveData:(payload:SavedPayload, dataType:SavedDataType) => ({type:"SAVE_DATA", payload,dataType} as const)
};


export type actionsTypes = ReturnType<inferValueTypes<typeof actions>>;

//THUNKS

export const fetchData = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch:Dispatch) => {
  dispatch(actions.loading());
  const casesData = await api.getCasesData();
  const dailyData = await api.getDailyData();
  const countries = await api.getCountries();
  dispatch(actions.saveData(casesData,"cases"));
  dispatch(actions.saveData(dailyData,"daily"));
  dispatch(actions.saveData(countries,"countries"))
  dispatch(actions.endLoading())
};

export const fetchCountryCases = (category:string): ThunkAction<void, RootState, unknown, Action<string>> => async(dispatch:Dispatch)=> {
    const countryCasesData = await api.getCountryCases(category)
    dispatch(actions.selectCountry());
    dispatch(actions.setCategory(category))
    dispatch(actions.saveData(countryCasesData,"country"))
}

