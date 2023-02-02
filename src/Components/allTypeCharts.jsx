import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
    CandlestickSeries,
    LineSeries,
    AreaSeries,
    KagiSeries,
    AlternatingFillAreaSeries,
    OHLCSeries,
    RenkoSeries,
    BarSeries,
    PointAndFigureSeries

} from "react-financial-charts";
export const AllTypeCharts = ({data})=>{
    const {chartType , colors} = useSelector(state => state)

    const base = data[Math.floor(data.length / 2)].close

    const yEdgeIndicator = (data) => {
        return data.close
      };

      // CANDLE COLOR
      const openCloseColor = (data) => {
        return data.close < data.open ? colors.closeFill : colors.openFill;
      };



      // WICK COLOR
      const openCloseWickColor = (data)=>{
        return data.close < data.open ? colors.closeWick : colors.openWick
      }

      // BORDER COLOR
      const openCloseBorderColor = (data)=>{
        return data.close < data.open ? colors.closeBorder : colors.openBorder
      }

    return <>
        {/* CANDLE STICK CHART */}
        {chartType === 'Candles' ? <CandlestickSeries
                fill={openCloseColor}
                wickStroke={colors.wickCheck ? openCloseWickColor : (d) => (d.close > d.open ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)")}
                stroke={colors.borderCheck ? openCloseBorderColor : (d) => (d.close > d.open ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)")} />
                : ''}




              {/* heikinAshi chart */}
              {chartType == 'HeikinAshi' ? <CandlestickSeries />:''}
              {/* LINE SERIES CHART */}
              {chartType === 'Line' ? <LineSeries
                connectNulls={false}
                defined={(d) => d !== undefined && !isNaN(d)}
                hoverStrokeWidth={4}
                hoverTolerance={6}
                highlightOnHover={true}
                strokeDasharray={"Solid"}
                strokeStyle={"#2196f3"}
                strokeWidth={1}
                yAccessor={yEdgeIndicator}/>
              : ''}

              {/* AREA CHART */}
              {chartType === 'Area' ? <AreaSeries yAccessor={yEdgeIndicator}/> : ''}

              {/* KAGI CHART */}
              {chartType === 'Kagi' ? <KagiSeries />:''}

              {/* BASE LINE CHART */}
              {chartType == 'Base Line' ? <AlternatingFillAreaSeries yAccessor={yEdgeIndicator}
                                            baseAt={base}
                                            fillStyle={openCloseColor}
                                          />  : '' }

              {/* OHLCSeries CHART */}
              {chartType == 'OHLC' ? <OHLCSeries
                yAccessor={(d) => ({ open: d.open, high: d.high, low: d.low, close: d.close })}
                stroke={openCloseColor}/> : ''}

              {/* Renko Series Chart */}
              {chartType == 'Renko' ? <RenkoSeries/> : ''}

              {/* BAR SERIES */}
              { chartType == 'Bars' ? <BarSeries yAccessor={yEdgeIndicator}
                fillStyle={openCloseColor}
              />:''}

              {/* PointAndFigureSeries CHART */}
              { chartType == 'PointAndFigure' ? <PointAndFigureSeries /> : ''}


    </>
}