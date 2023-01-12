import React, { useState } from 'react'
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { useDispatch, useSelector } from "react-redux"
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
    HoverTooltip,
    ClickCallback,
    SingleValueTooltip,
    AlternatingFillAreaSeries,
    OHLCSeries,
    RenkoSeries,
    BarSeries,
    PointAndFigureSeries,
    lastVisibleItemBasedZoomAnchor,
    heikinAshi,
    Cursor


} from "react-financial-charts";
import { handleReplayValue } from '../REDUX/action';



const ChartStock = ({name , initialData , height , width , ratio})=>{

    const replay = useSelector((state) => state.replay)
    const dispatch = useDispatch()

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => new Date(d.time))

    const {data , xScale , xAccessor , displayXAccessor } = ScaleProvider(initialData)




    const margin = { left: 25, right: 55, top: 15, bottom: 32};




    const pricesDisplayFormat = format(".2f");
    const max = xAccessor(data[data.length-1])
    const min = xAccessor(data[Math.max(0 , data.length-100)])
    const xExtents = [min , max]




  const yExtents = (data) => {
    return [data.low, data.high];
  };


  const dateTimeFormat = "%a %d %b %Y %H:%M";
  const timeDisplayFormat = timeFormat(dateTimeFormat);




  // DATA


  const yEdgeIndicator = (data) => {
    return data.close
  };



  const [showGrid , setGrid] = useState(false)


  // REDUX TO FIND OUT WHICH TYPE OF CHART WANT
  const {chartType , colors , replayValue} = useSelector(state => state)

  const openCloseColor = (data) => {
    return data.close < data.open ? colors.closeFill : colors.openFill;
  };

  const openCloseWickColor = (data)=>{
    return data.close < data.open ? colors.closeWick : colors.openWick
  }

  const openCloseBorderColor = (data)=>{
    return data.close < data.open ? colors.closeBorder : colors.openBorder
  }



  //handle the hover tool tip
  const Content = (data)=>{
    const {currentItem} = data
    return {
      x : new Date(currentItem.time) ,
      y:[{
        label : 'Open',
        value : currentItem.open.toString(),
        // stroke:"#ED561B"
      },{
        label : 'Close',
        value : currentItem.close.toString(),
        // stroke:'#ED561B'
      },{
        label : 'Low',
        value : currentItem.low.toString()
      },{
        label : 'High',
        value : currentItem.high.toString()
      }
    ]
    }
  }


  var currItem;

  const singleValueToolTip = (_, data) => {
    currItem = data.currentItem
    return data.currentItem
  }
  const handle = ()=>{
    dispatch(handleReplayValue(currItem))


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
            // padding = { { left:0, right: 200} }
            zoomAnchor={lastVisibleItemBasedZoomAnchor}


        >




            {/*ChartS*/}
            <Chart id={1}  yExtents={yExtents} padding={15} >
            <XAxis showGridLines={showGrid} showTickLabel={true} showDomain={false}/>
            <YAxis showGridLines={showGrid}  showDomain={false} showTicks={false}/>


              {/* CANDLE STICK CHART */}
             {chartType === 'Candles' ? <CandlestickSeries
                                          fill={openCloseColor}

                                          wickStroke={colors.wickCheck ? openCloseWickColor : (d) => (d.close > d.open ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)")}
                                          stroke={colors.borderCheck ? openCloseBorderColor : (d) => (d.close > d.open ? "rgba(0,0,0,0)" : "rgba(0,0,0,0)")} /> : ''}


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
             {chartType === 'Kagi' ? <KagiSeries stroke={openCloseColor}/>:''}



             {/* BASE LINE CHART */}
             {chartType == 'Base Line' ? <AlternatingFillAreaSeries yAccessor={yEdgeIndicator} baseAt={100}/>  : '' }

             {/* OHLCSeries CHART */}
              {chartType == 'OHLC' ? <OHLCSeries yAccessor={(d) => ({ open: d.open, high: d.high, low: d.low, close: d.close })}
               stroke={openCloseColor}/> : ''}


              {/* Renko Series Chart */}
               {chartType == 'Renko' ? <RenkoSeries yAccessor={(d) => ({ open: d.open, high: d.high, low: d.low, close: d.close })}
                    stroke={{up: "#fff", down: "#fff"}}
                    fill = {{up: '#26a69a' , down: '#ef5350',partial: 'red'}}
                    /> : ''}

                {/* BAR SERIES */}
                { chartType == 'Bars' ? <BarSeries yAccessor={yEdgeIndicator}/>:''}



                {/* PointAndFigureSeries CHART */}
                { chartType == 'PointAndFigure' ? <PointAndFigureSeries xAccessor={xAccessor}/> : ''}


            {/* <VolumeProfileSeries /> */}


            {/* MOUS COORDINATES */}

              {!replay ?  <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}/>: ''}


              <MouseCoordinateX
              rectWidth={margin.right}
              displayFormat={timeDisplayFormat}


              />

            <ClickCallback onDoubleClick={handle}/>



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

            {/* <HoverTooltip
              tooltip={{content : Content}}
              yAccessor={yEdgeIndicator}


            /> */}

            <SingleValueTooltip


              yLabel={'Price'}
              yAccessor={yEdgeIndicator}
              displayValuesFor={singleValueToolTip}

              />







        </Chart>

            {/* CURSOR CHANGING */}
            {replay ?  <Cursor disableYCursor={true}/>:  <CrossHairCursor />}








        </ChartCanvas>


    </div>
  )

}


export const StockChart = withSize({ style: { height:'100%' } })(
    withDeviceRatio()(ChartStock)
  );