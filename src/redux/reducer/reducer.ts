import { CovidState } from '../../types/types';
import {actionsTypes} from '../actions/actions';

const initialState: CovidState = {
    cases: {
        confirmed: null,
        recovered: null,
        deaths: null,
        lastUpdate: ''
    },
    daily: {
        confirmed: [],
        deaths: [],
        date: []
    },
    country: {
        confirmed: null,
        recovered: null,
        deaths: null
    },
    countrySelect: false,
    countries: [],
    category: 'global',
    isLoading: true,
    error: ''
};


export const reducer = (state = initialState, action: actionsTypes): CovidState => {
    switch (action.type) {
    case 'LOADING_START': {
        return { ...state, isLoading: true };
    }
    case 'LOADING_END': {
        return { ...state, isLoading: false };
    }
    case 'SET_CATEGORY': {
        return { ...state, category: action.category };
    }
    case 'SAVE_DATA': {
        switch (action.savedData.key) {
        case 'cases': {
            return { ...state, cases: { ...state.cases, ...action.savedData.payload }};
        }
        case 'daily': {
            return { ...state, daily: { ...state.daily, ...action.savedData.payload }};
        }
        case 'countries': {
            return { ...state, countries: [...state.countries, ...action.savedData.payload]};
        }
        case 'country': {
            return { ...state, country: { ...state.country, ...action.savedData.payload }};
        }
        default: return {...state, error: 'Incorrect saved data format'};
        }

    }
    case 'SELECT_COUNTRY': {
        return { ...state, countrySelect: true };
    }
    case 'SELECT_GLOBAL': {
        return { ...state, countrySelect: false, category: 'global' };
    }

    default: return state;

    }
};