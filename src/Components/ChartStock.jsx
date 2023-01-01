import React, { useState } from 'react'
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
    elderRay,
    ema,
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    CurrentCoordinate,
    BarSeries,
    CandlestickSeries,
    ElderRaySeries,
    LineSeries,
    MovingAverageTooltip,
    OHLCTooltip,
    SingleValueTooltip,
    lastVisibleItemBasedZoomAnchor,
    XAxis,
    YAxis,
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
    ZoomButtons,
    withDeviceRatio,
    withSize,
    Cursor,
    BarAnnotation,
    Label,
    LabelAnnotation,




  } from "react-financial-charts";

const ChartStock = ({name , initialData , height , width , ratio})=>{

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => new Date(d.date))
    const margin = { left: 30, right: 70, top: 20, bottom: 20 };
    const {data , xScale , xAccessor , displayXAccessor , yAccessor } = ScaleProvider(initialData)
    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length-1])
    const min = xAccessor(data[Math.max(0 , data.length-100)])
    const xExtents = [min , max]


  const yExtents = (data) => {
    return [data.high, data.low];
  };
  const dateTimeFormat = "%d %b";
  const timeDisplayFormat = timeFormat(dateTimeFormat);

  const barChartExtents = (data) => {
    return data.volume;
  };

  const candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  const yEdgeIndicator = (data) => {
    return data.close;
  };

  const volumeColor = (data) => {
    return data.close > data.open
      ? "rgba(38, 166, 154, 0.3)"
      : "rgba(239, 83, 80, 0.3)";
  };

  const volumeSeries = (data) => {
    return data.volume;
  };

  const openCloseColor = (data) => {
    return data.close > data.open ? "#26a69a" : "#ef5350";
  };

  const [showGrid , setGrid] = useState(false)

  return (
    <div>
        <button onClick={()=> setGrid(!showGrid)}>show Grid</button>
        <ChartCanvas
            height={height}
            ratio={ratio}
            width={width}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName='Data'
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >



            {/*candle Chart*/}
            <Chart id={3}  yExtents={candleChartExtents}>
            <XAxis showGridLines={showGrid} showTickLabel={true} />
            <YAxis showGridLines={showGrid} tickFormat={pricesDisplayFormat} />
            <CandlestickSeries />
            <LineSeries
            connectNulls={true}
            defined={(d) => d !== undefined && !isNaN(d)}
            hoverStrokeWidth={4}
            hoverTolerance={6}
            highlightOnHover={true}
            strokeDasharray={"Solid"}
            strokeStyle={"#2196f3"}
            strokeWidth={1}
            yAccessor={yEdgeIndicator}/>



            <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={pricesDisplayFormat}
            />
            <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
            />
            <LabelAnnotation
            fillStyle={"#dcdcdc"}
            fontFamily={"-apple-system, system-ui, Roboto, 'Helvetica Neue', Ubuntu, sans-serif"}
            fontSize={64}
            fontWeight={"bold"}
            text={name}
            // selectCanvas={"(canvases: any) => canvases.bg"}
            // textAlign={"middle"}
            opacity= {.5}
            x={600}
            y={300}
            />


            <ZoomButtons />
            <OHLCTooltip
            origin={[9, 18]}
            fontSize={15}
            fontWeight={"bold"}
            />






        </Chart>




            <CrossHairCursor />




        </ChartCanvas>

    </div>
  )

}


export const StockChart = withSize({ style: { minHeight: 650 } })(
    withDeviceRatio()(ChartStock)
  );