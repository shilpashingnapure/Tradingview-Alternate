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
    AreaSeries,
    KagiSeries,
    VolumeProfileSeries,





  } from "react-financial-charts";

const ChartStock = ({name , initialData , height , width , ratio})=>{

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => new Date(d.date))
    const margin = { left: 25, right: 120, top: 15, bottom: 22 };
    const {data , xScale , xAccessor , displayXAccessor  } = ScaleProvider(initialData)
    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length-1])
    const min = xAccessor(data[Math.max(0 , data.length-100)])
    const xExtents = [min , max]


  const yExtents = (data) => {
    return [data.low, data.high];
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

  // const volumeColor = (data) => {
  //   return data.close < data.open
  //     ? "rgba(38, 166, 154, 0.3)"
  //     : "rgba(239, 83, 80, 0.3)";
  // };

  const volumeSeries = (data) => {
    return data.volume;
  };

  const openCloseColor = (data) => {
    return data.close < data.open ? "#26a69a" : "#ef5350";
  };

  const [showGrid , setGrid] = useState(false)
  const [chartType , setType] = useState('candle')



  return (
    <div>
        {/* <button onClick={()=> setGrid(!showGrid)}>show Grid</button>
        <select onChange={(e)=> setType(e.target.value)}>
            <option value='candle'>Candle</option>
            <option value='line'>Line</option>
            <option value='area'>area</option>
        </select> */}
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
            <Chart id={3}  yExtents={yExtents}>
            <XAxis showGridLines={showGrid} showTickLabel={true} />
            <YAxis showGridLines={showGrid}  />



            <CandlestickSeries />

            {/*
            <LineSeries
                connectNulls={false}
                defined={(d) => d !== undefined && !isNaN(d)}
                hoverStrokeWidth={4}
                hoverTolerance={6}
                highlightOnHover={true}
                strokeDasharray={"Solid"}
                strokeStyle={"#2196f3"}
                strokeWidth={1}
                yAccessor={yEdgeIndicator}/>
            }
            <AreaSeries yAccessor={yEdgeIndicator}/>
            <KagiSeries currentValueStroke={"#2196f3"}/> */}
            {/* <VolumeProfileSeries /> */}

            <MouseCoordinateY
              rectWidth={45}
              displayFormat={pricesDisplayFormat}/>

            <MouseCoordinateX
            rectWidth={45}
            displayFormat={timeDisplayFormat}

            />

            <EdgeIndicator
            itemType="last"
            rectWidth={45}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
            />
            <LabelAnnotation
            fillStyle={"#dcdcdc"}
            fontFamily={"-apple-system, system-ui, Roboto, 'Helvetica Neue', Ubuntu, sans-serif"}
            fontSize={75}
            fontWeight={"bold"}
            text={name}
            // selectCanvas={"(canvases: any) => canvases.bg"}
            // textAlign={"middle"}
            opacity= {.1}
            x={650}
            y={300}
            />


            <ZoomButtons />
            <OHLCTooltip
            origin={[400, 10]}
            fontSize={13}
            fontWeight={600}


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