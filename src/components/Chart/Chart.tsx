import React from "react";
import {Line} from "react-chartjs-2";
import {DailyData} from "../../types/types";
import {Grid, Typography} from "@material-ui/core";
import { defaults } from 'react-chartjs-2';

defaults.global.defaultFontColor ='#FFF';

type Props = {
    dailyData:DailyData
}

const ChartLine:React.FC<Props> = ({dailyData}) => {
    const data = {
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


    return (
        <Grid container style={{padding:'20px'}}>
            <Grid item xs={12}>
                <Typography component='h2' variant='h3' align='center' style={{marginBottom:'20px'}}>
                    Global statistic on today:
                </Typography>
                <Line data={data} />
            </Grid>
        </Grid>

    )
};

export default ChartLine;