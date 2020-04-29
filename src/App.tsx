import React, {useEffect} from 'react';
import style from './App.module.css';
import {Header, Cards, Chart} from './components';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import { connect } from 'react-redux';
import {CasesItem, DailyData} from "./types/types";
import {RootState} from "./redux/store";
import {ThunkDispatch} from "redux-thunk";
import {actions, fetchCountryCases, fetchData} from "./redux/actions/actions";
import {Action} from "redux";
import Loader from "./components/Loader/Loader";
import CountryChooser from "./components/CountryChooser/CountryChooser";

type StateProps = {
    cases:CasesItem
    daily:DailyData
    countries:string[]
    category:string
    isLoading:boolean
    countrySelect:boolean
    country:{
        confirmed:number | null
        recovered:number | null
        deaths:number | null
    }
}
type DispatchProps = {
    fetchData:()=>void
    fetchCountryCases:(category:string)=>void
    onSelectGlobal:()=>void
}
type Props = StateProps & DispatchProps

const mapStateToProps = (state:RootState):StateProps => {
    return {
        cases:state.cases,
        isLoading:state.isLoading,
        daily:state.daily,
        countries:state.countries,
        category:state.category,
        countrySelect:state.countrySelect,
        country:state.country,
    }
};
const mapDispatchToProps = (dispatch:ThunkDispatch<RootState, unknown, Action>):DispatchProps => {
    return {
        fetchData: () => dispatch(fetchData()),
        fetchCountryCases: (category)=> dispatch(fetchCountryCases(category)),
        onSelectGlobal:()=>dispatch(actions.selectGlobal())
    }
};


const App:React.FC<Props> = ({cases, isLoading, fetchData,daily, countries, category,fetchCountryCases, countrySelect,country,onSelectGlobal}) => {

    const theme = createMuiTheme({palette:{type:"dark"}});

    useEffect(()=>{
        (async ()=> await fetchData())()
    },[fetchData]);

    if(isLoading) return <Loader/>;

    return (
        <ThemeProvider theme={theme}>
            <div className={style.container}>
                <Header/>
                <Cards cases={cases}/>
                <CountryChooser countries={countries} category={category} fetch={fetchCountryCases} onSelectGlobal={onSelectGlobal}/>
                <Chart dailyData={daily} country={category} countryData={country} countrySelect={countrySelect}/>
            </div>
        </ThemeProvider>
    );

};

export default connect(mapStateToProps,mapDispatchToProps)(App);
