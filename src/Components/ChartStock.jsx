import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
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
    Cursor,

} from "react-financial-charts";
import { handleReplayValue, handleTool, handleUndoRedo } from '../REDUX/action';
import { AllTypeCharts } from './allTypeCharts';
import { Tooltips } from './ToolTips';
import { calculateData } from './chartData';
import { TrendLines  , drawsLine} from './TrendLine';



const ChartStock = ({name , initialData , height , width , ratio})=>{

  const [showGrid , setGrid] = useState(false)
  const {data , xScale , xAccessor , displayXAccessor, margin , openCloseColor , yEdgeIndicator , yExtents ,xExtents,timeDisplayFormat , dateTimeFormat ,pricesDisplayFormat} = calculateData(initialData)

  const {colors , replayValue , replay , tool , chartType,backgroundColorType} = useSelector(state => state)
  const dispatch = useDispatch()


  // ON USER DOUBLE CLICK ADD CURRENT ITEM DATA TO REDUX
  var currItem;
  // SINGLE VALUE TOOL
  const singleValueToolTip = (_, data) => {
    currItem = data.currentItem
    return data.currentItem
  }

  const handle = ()=>{
    dispatch(handleReplayValue(currItem))
  }

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [elements , setelements] = useState([])

  const [history , set_history] = useState([])
  const [index , setIndex] = useState(-1)

  const state = useSelector((state)=> state)

  function saveCanvas(){

    let check = history.filter((item) => item.id == index + 1)
    if(check.length == 0){
      set_history([...history , {id : index+1 , values : state}])
    }else{
      let Copyhistory = [...history]
    }
    console.log('present' , check)



    setIndex(prev => prev + 1)
  }

  function undo(){
    setIndex(prev => prev - 1)
    restore(index-1)
  }

  function redo(){
    setIndex(prev => prev + 1)

    restore(index)

  }



  useLayoutEffect(()=>{
    const canvas = canvasRef.current.canvasContainerRef.current.bgRef.current
    canvas.style.zIndex ='9999999'
    const context = canvas.getContext('2d')
    contextRef.current = context
    elements.forEach((element) => drawsLine(contextRef , element))

  })

  useEffect(()=>{
    saveCanvas()


  } , [state])


  function restore(index){
    let restore_canvas = history[index]
    dispatch(handleUndoRedo(restore_canvas.values))
  }


  return (
    <div>

        {/* <button onClick={undo} disabled={index <= 0 ? true:false}>undo</button> */}
        {/* <button onClick={redo} disabled={index >= history.length? true:false}>redo</button> */}
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
            ref={canvasRef}
            disablePan={true}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}

          >

            {/*ChartS*/}


            <Chart id={1}  yExtents={yExtents} padding={15} >
              <XAxis showGridLines={showGrid} showTickLabel={true} showDomain={false}/>
              <YAxis showGridLines={showGrid}  showDomain={false} showTicks={false} />

              {/* all types of charts */}
              <AllTypeCharts data={data}/>



              {/* MOUSSE COORDINATES */}
              {/* WHEN REPLAY MODE IS ON ONLY SHOWS X COORDINATE */}
              {!replay ?  <MouseCoordinateY
                rectWidth={margin.right}
                displayFormat={pricesDisplayFormat}/>: ''}
              <MouseCoordinateX
                rectWidth={margin.right}
                displayFormat={timeDisplayFormat}/>

              {/* FOR DOUBLECLICK */}
              <ClickCallback
              onDoubleClick={handle}
              />

              {/* Tools */}
              {tool == 'trendline' ? <TrendLines contextRef={contextRef} elements={elements} setelements={setelements}/>:''}




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


              <ZoomButtons fillOpacity={.5} />

              <Tooltips singleValueToolTip={singleValueToolTip} yEdgeIndicator={yEdgeIndicator}/>


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