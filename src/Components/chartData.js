import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { useSelector  , useDispatch} from "react-redux"
import {
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    XAxis,
    YAxis,
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
    ZoomButtons,
    withDeviceRatio,
    withSize,
    LabelAnnotation,
    ClickCallback,
    lastVisibleItemBasedZoomAnchor,
    heikinAshi,
    Cursor,
    renko,
    kagi,
    pointAndFigure,
    stochasticOscillator,

} from "react-financial-charts";
export function calculateData(initialData){
    const {chartType , colors} = useSelector(state => state)
    const calculateRenko = renko()

    const calculateKagi = kagi()

    const calculateHeikinAshi = heikinAshi()

    const pAndf = pointAndFigure()

    const SlowSTO = stochasticOscillator().options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 }).accessor(d => d.slowSTO)


    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => new Date(d.date))

    var {data , xScale , xAccessor , displayXAccessor } = ScaleProvider(SlowSTO(initialData))
    if(chartType == 'Renko'){
      var {data , xScale , xAccessor , displayXAccessor } = ScaleProvider(calculateRenko(initialData))
    }
    if(chartType == 'HeikinAshi'){
      var {data , xScale , xAccessor , displayXAccessor} = ScaleProvider(calculateHeikinAshi(initialData))
    }

    if(chartType == 'Kagi'){
      var {data , xScale , xAccessor , displayXAccessor } = ScaleProvider(calculateKagi(initialData))

    }
    if(chartType == 'PointAndFigure'){
      var {data , xScale , xAccessor , displayXAccessor } = ScaleProvider(pAndf(initialData))
    }





    const margin = { left: 25, right: 55, top: 15, bottom: 25};
    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length-1])
    const min = xAccessor(data[Math.max(0 , data.length-100)])


    const xExtents = [min , max]

    // SHOW THE PRICE AND TIME FORMAT ON CHART
    const dateTimeFormat = "%a %d %b %Y %H:%M";
    const timeDisplayFormat = timeFormat(dateTimeFormat);
    


  // DATA
    const yExtents = (data) => {
        return [data.low, data.high];
    };

    const yEdgeIndicator = (data) => {
        return data.close
    };

    // CANDLE COLOR
    const openCloseColor = (data) => {
        return data.close < data.open ? colors.closeFill : colors.openFill;
    };


    return {data , xScale , xAccessor , displayXAccessor, margin , openCloseColor , yEdgeIndicator , yExtents ,xExtents,timeDisplayFormat , dateTimeFormat ,pricesDisplayFormat}
}