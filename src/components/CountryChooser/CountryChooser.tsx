import React, {useCallback} from "react";
import { FormControl,  NativeSelect } from "@material-ui/core";

type Props = {
    countries: string[]
    category: string
    fetch:(category:string)=>void
    onSelectGlobal:()=>void
}



const CountryChooser:React.FC<Props> = ({countries, category, fetch, onSelectGlobal}) => {
    const countryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'global') {
            onSelectGlobal()
        }
        else {
            fetch(e.target.value)
        }
            }

    const menuItems = countries.map((country, i) => (
        <option key={i} value={country}>{country}</option>
    ));

    return(
        <FormControl>
            <NativeSelect value={category} onChange={(e) => countryHandler(e)}>
                <option value="global">Global</option>
                {menuItems}
            </NativeSelect>
        </FormControl>
    )
};

export default CountryChooser;