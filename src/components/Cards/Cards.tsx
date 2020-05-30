import React from 'react';
import style from './Cards.module.css';
import { Grid } from '@material-ui/core';
import { CardItem } from '../index';
import { CasesItem } from '../../types/types';
import { dateParser } from '../../utils/helpers';

/* TYPES */

type Props = {
    cases: CasesItem;
}

/* /TYPES */

const Cards: React.FC<Props> = ({cases}) => {
    return (
        <Grid container spacing={2} className={style.container}>
            <Grid item xs={4} zeroMinWidth>
                <CardItem count={cases.confirmed} date={dateParser(cases.lastUpdate)} color="blue">Confirmed cases</CardItem>
            </Grid>
            <Grid item xs={4} zeroMinWidth>
                <CardItem count={cases.recovered} date={dateParser(cases.lastUpdate)} color="green">Recovered cases</CardItem>
            </Grid>
            <Grid item xs={4} zeroMinWidth>
                <CardItem count={cases.deaths} date={dateParser(cases.lastUpdate)} color="red">Death cases</CardItem>
            </Grid>
        </Grid>
    );

};


export default Cards;