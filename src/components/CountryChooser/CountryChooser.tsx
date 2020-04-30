import React from 'react';
import { FormControl,  NativeSelect } from '@material-ui/core';

/* TYPES */

type Props = {
    countries: string[];
    category: string;
    fetch: (category: string) => void;
    onSelectGlobal: () => void;
}

/* /TYPES */

const CountryChooser: React.FC<Props> = ({ countries, category, fetch, onSelectGlobal }) => {

    const countryHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        (e.target.value === 'global') ? onSelectGlobal() : fetch(e.target.value);
    };

    const menuItems = countries.map((country, i) => (
        <option key={i} value={country}>{country}</option>
    ));

    return(
        <FormControl>
            <NativeSelect value={category} onChange={countryHandler}>
                <option value="global">Global</option>
                {menuItems}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryChooser;