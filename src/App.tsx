import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import style from './App.module.css';
import { Header, Cards, Chart, CountryChooser, Loader } from './components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { RootState } from './redux/store';
import { actions, fetchCountryCases, fetchData } from './redux/actions/actions';





/* TYPES */

type StateProps = Omit<RootState, 'error'>;

type DispatchProps = {
    fetchingData: () => void;
    fetchingCountryCases: (category: string) => void;
    onSelectGlobal: () => void;
}
type Props = StateProps & DispatchProps

/* TYPES */

const mapStateToProps = (state: RootState): StateProps => {
    return {
        cases: state.cases,
        isLoading: state.isLoading,
        daily: state.daily,
        countries: state.countries,
        category: state.category,
        countrySelect: state.countrySelect,
        country: state.country,
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, Action>): DispatchProps => {
    return {
        fetchingData: () => dispatch(fetchData()),
        fetchingCountryCases: (category) => dispatch(fetchCountryCases(category)),
        onSelectGlobal: () => dispatch(actions.selectGlobal())
    };
};


const App: React.FC<Props> = ({
    cases, isLoading, fetchingData, daily, countries,
    category, fetchingCountryCases, countrySelect, country, onSelectGlobal}) => {

    const theme = createMuiTheme({palette: {type: 'dark'}});

    useEffect(() => {
        (async () => fetchingData())();
    }, [fetchData]);

    if (isLoading) return <Loader/>;

    return (
        <ThemeProvider theme={theme}>
            <div className={style.container}>
                <Header/>
                <Cards cases={cases}/>
                <CountryChooser
                    countries={countries}
                    category={category}
                    fetch={fetchingCountryCases}
                    onSelectGlobal={onSelectGlobal}
                />
                <Chart
                    dailyData={daily}
                    country={category}
                    countryData={country}
                    countrySelect={countrySelect}
                />
            </div>
        </ThemeProvider>
    );

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
