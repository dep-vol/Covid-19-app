import React from "react";
import {Bar, Line} from "react-chartjs-2";
import {CountryCases, DailyData} from "../../types/types";
import {Grid, Typography} from "@material-ui/core";
import { defaults } from 'react-chartjs-2';

defaults.global.defaultFontColor ='#FFF';

type Props = {
    dailyData:DailyData
    country:string
    countryData:CountryCases
    countrySelect:boolean
}

const Chart:React.FC<Props> = ({dailyData, country, countryData, countrySelect}) => {
    const lineData = {
        labels:dailyData.date,
        datasets:[
            {
                label:'Confirmed cases',
                borderCapStyle: 'butt',
                borderColor: '#3c0084',
                pointBorderColor: '#3c0084',
                backgroundColor: 'rgba(60,0,132,0.44)',
                data:dailyData.confirmed
            },
            {
                label:'Deaths cases',
                borderCapStyle: 'butt',
                borderColor: '#842445',
                pointBorderColor: '#842445',
                backgroundColor: 'rgba(132,36,69,0.58)',
                data:dailyData.deaths
            }
        ],

    };
    const barData={
        labels: ['confirmed', 'recovered', 'deaths'],
        datasets: [{
            label:'Count of people',
            backgroundColor:['rgba(60,0,132,0.44)','rgba(24,132,50,0.56)','rgba(132,36,69,0.58)'],
            data:[countryData.confirmed,countryData.recovered,countryData.deaths]
        }]
    }


    return (
        <Grid container style={{padding:'20px'}}>
            <Grid item xs={12}>
                <Typography component='h2' variant='h3' align='center' style={{marginBottom:'20px'}}>
                    {countrySelect ? country : "Global"} statistic on today:
                </Typography>
                {countrySelect ? <Bar data={barData}/> : <Line data={lineData}/>}
            </Grid>
        </Grid>

    )
};

export default Chart;