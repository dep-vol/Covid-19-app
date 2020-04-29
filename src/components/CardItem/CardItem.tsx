import React from "react";
import style from "./CardItem.module.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from "react-countup";

type OwnProps = {
    count:number | null
    date:string
    color:string
}

type Props = OwnProps

const CardItem:React.FC<Props> = ({count,date,color,children}) => {
    const cardStyle = [style[color]];
    return (
        <Card className={cardStyle.join(' ')}>
            <CardContent>
                <Typography
                    className={style.header}
                    component="h2"
                    variant="h5"
                    align="center"
                    color="textPrimary"
                >
                    {children}
                </Typography>
                <Typography
                    component="p"
                    color="textSecondary"
                    gutterBottom={true}
                >
                    Count:
                    <span className={style.count}>
                        <CountUp start={0} end={count===null ? 0 : count} separator=","/>
                    </span>
                </Typography>
                <Typography
                    component="p"
                    color="textSecondary"
                    gutterBottom={true}
                >
                    Last update: {date}
                </Typography>
            </CardContent>
        </Card>
    )
};

export default CardItem;