import React, { useState } from 'react'
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { useSelector } from "react-redux"
import {
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    CandlestickSeries,
    LineSeries,
    OHLCTooltip,
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
    AreaSeries,
    KagiSeries,
    financeDiscontinuousScale,
    HoverTooltip,
    ToolTipTSpanLabel,
    SingleTooltip,
    ToolTipText,


} from "react-financial-charts";



const ChartStock = ({name , initialData , height , width , ratio})=>{

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => new Date(d.date))

    const {data , xScale , xAccessor , displayXAccessor} = ScaleProvider(initialData)


    const margin = { left: 25, right: 55, top: 15, bottom: 65};




    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length-1])
    const min = xAccessor(data[Math.max(0 , data.length-100)])
    const xExtents = [min , max]




  const yExtents = (data) => {
    return [data.low, data.high];
  };


  const dateTimeFormat = "%d %b %Y %H:%M";
  const timeDisplayFormat = timeFormat(dateTimeFormat);




  // DATA


  const yEdgeIndicator = (data) => {
    return data.close;
  };



  const [showGrid , setGrid] = useState(false)


  // REDUX TO FIND OUT WHICH TYPE OF CHART WANT
  const {chartType , colors} = useSelector(state => state)

  const openCloseColor = (data) => {
    return data.close < data.open ? colors.closeFill : colors.openFill;
  };

  const openCloseWickColor = (data)=>{
    return data.close < data.open ? colors.closeWick : colors.openWick
  }

  const openCloseBorderColor = (data)=>{
    return data.close < data.open ? colors.closeBorder : colors.openBorder
  }




  return (
    <div>
        {/* <button onClick={()=> setGrid(!showGrid)}>show Grid</button>*/}
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


            // zoomAnchor={lastVisibleItemBasedZoomAnchor}


        >



            {/*ChartS*/}
            <Chart id={1}  yExtents={yExtents} >
            <XAxis showGridLines={showGrid} showTickLabel={true} showDomain={false}/>
            <YAxis showGridLines={showGrid}  showDomain={false} showTicks={false}/>


              {/* CANDLE STICK CHART */}
             {chartType === 'Candles' ? <CandlestickSeries fill={openCloseColor} wickStroke={colors.wickCheck ? openCloseWickColor : (d) => (d.close > d.open ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)")} stroke={openCloseBorderColor} /> : ''}


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
             {chartType === 'Kagi' ? <KagiSeries currentValueStroke={"#2196f3"}/>:''}


            {/* <VolumeProfileSeries /> */}


            {/* MOUS COORDINATES */}


              <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}/>

              <MouseCoordinateX
              rectWidth={margin.right}
              displayFormat={timeDisplayFormat}

              />


            {/* INDICATOR OF PRICE */}
            <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={colors.lastValueColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
            />


            {/* COMPANY NAME IN BACKGROUND LABEL  */}
            <LabelAnnotation
            fillStyle={"#dcdcdc"}
            fontFamily={"-apple-system, system-ui, Roboto, 'Helvetica Neue', Ubuntu, sans-serif"}
            fontSize={75}
            fontWeight={"bold"}
            text={name}
            opacity= {.1}
            x={650}
            y={300}
            />


            <ZoomButtons />

            {/* SHOWING DATA OPEN/CLOSE/HIGH/LOW  */}
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