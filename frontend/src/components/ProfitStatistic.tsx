import {Statistic, StatisticProps} from "antd";
import * as React from "react";

export const ProfitStatistic: React.FC<StatisticProps> = (props) => {
    let valueStyle = {}
    if (props.value) {
        valueStyle = {color: props.value < 0 ? "#cf1322" : '#3f8600'}
    }
    return <Statistic valueStyle={valueStyle} {...props}/>
}