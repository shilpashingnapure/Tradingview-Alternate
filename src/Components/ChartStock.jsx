import React, { useState } from 'react'
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { useDispatch, useSelector } from "react-redux"
import {
    discontinuousTimeScaleProvider,
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
    Cursor,
    renko,
    InteractiveYCoordinate,
    kagi,
    pointAndFigure
} from "react-financial-charts";
import { handleReplayValue } from '../REDUX/action';



const ChartStock = ({name , initialData , height , width , ratio})=>{

    // REDUX TO FIND OUT WHICH TYPE OF CHART WANT
    const {chartType , colors , replayValue , replay} = useSelector(state => state)

    const dispatch = useDispatch()
    const calculateRenko = renko()

    const calculateKagi = kagi()

    const calculateHeikinAshi = heikinAshi()

    const pAndf = pointAndFigure()

    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => new Date(d.date))

    var {data , xScale , xAccessor , displayXAccessor } = ScaleProvider(initialData)
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

    const base = data[Math.floor(data.length / 2)].close
    const xExtents = [min , max]

    // SHOW THE PRICE AND TIME FORMAT ON CHART
    const dateTimeFormat = "%a %d %b %Y %H:%M";
    const timeDisplayFormat = timeFormat(dateTimeFormat);
    const [showGrid , setGrid] = useState(false)


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



  // WICK COLOR
  const openCloseWickColor = (data)=>{
    return data.close < data.open ? colors.closeWick : colors.openWick
  }

  // BORDER COLOR
  const openCloseBorderColor = (data)=>{
    return data.close < data.open ? colors.closeBorder : colors.openBorder
  }

  // THIS VARIABLE USE FOR ACCESSING THE CURRUENT ITEM DATA FROM CHART
  var currItem;


  //HANDLE THE HOVER TOOLTIP
  const Content = (data)=>{
    const {currentItem} = data
    return {
      x : currentItem.date ,
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



  // SINGLE VALUE TOOL
  const singleValueToolTip = (_, data) => {
    currItem = data.currentItem
    return data.currentItem
  }

  // ON USER DOUBLE CLICK ADD CURRENT ITEM DATA TO REDUX
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

              {/* <VolumeProfileSeries /> */}


              {/* MOUSSE COORDINATES */}
              {/* WHEN REPLAY MODE IS ON ONLY SHOWS X COORDINATE */}
              {!replay ?  <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}/>: ''}
              <MouseCoordinateX
                rectWidth={margin.right}
                displayFormat={timeDisplayFormat}/>

              {/* FOR DOUBLECLICK */}
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


              <ZoomButtons fillOpacity={0}/>

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

            {/* CURSOR CHANGING (ON REPLAY MODE SHOW ONLY X CURSOR )*/}
            {replay && replayValue == 0 ?  <Cursor disableYCursor={true}/>:  <CrossHairCursor />}
          </ChartCanvas>
        </div>
  )

}


export const StockChart = withSize({ style: { height:'100%' } })(
    withDeviceRatio()(ChartStock)
  );