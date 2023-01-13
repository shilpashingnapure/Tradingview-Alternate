import './App.css';
import React, { useState , useEffect , useRef}  from 'react';
import { StockChart } from './Components/ChartStock';
import { HorizontalNav } from './Components/HorizontalNav';
import { VerticalNav } from './Components/verticalNav';
import { VerticalNav2 } from './Components/verticalNav2';
import { BottomNav } from './Components/bottomNav';
import { handleData, handleReplayCheck, handleReplayValue } from './REDUX/action';
import { useDispatch, useSelector } from 'react-redux';
import { FunHandleReplay } from './Components/replayHandleFun';


function App() {

  const dispatch = useDispatch()
  const [initialData , set_data] = useState([])
  const [isLoading , setLoding] = useState(true)
  const [name , setName] = useState()
  const {searchValue , replay  , replayValue, backgroundColorType} = useSelector((state)=> state)
  const value = replayValue != 0 ? replayValue.idx.index : 0
  const [ nextValue = value , setnext] = useState()
  const [play , setplay] = useState(false)

  useEffect(()=>{
    //search functionlities for check if that file is present or not
    try{
      let a = require(`./02JAN/${searchValue}.txt`)
      getData(a)
    }catch(err){
      console.log(err)
    }
  },[searchValue])

  //fetching the data
  function getData(data){
    fetch(data).then((r)=> {
      let content = r.text()
      return content
    }).then((r)=>{
      // create how the structure want for Data
      let data = r.split(',').join('/s').split('\n')
      let name = data[0].split('/s')[0]
      setName(name)
      let full_data = []
      for(let i = 0 ; i < data.length ; i++){
        let txt = data[i]
        if(txt){
          let obj = {}
          let lst = txt.split('/s')
          let whole_date = lst[1]
          let time = lst[2]
          let year = whole_date.slice(0,4)
          let month = whole_date.slice(4,6)
          let date = whole_date.slice(6,8)
          let full_Date = `${year}-${month}-${date} ${time}`
          obj.time = (new Date(full_Date)).getTime()
          obj.open = parseFloat(lst[3])
          obj.low = parseFloat(lst[4])
          obj.high = parseFloat(lst[5])
          obj.close = parseFloat(lst[6])
          obj.volume = parseFloat(lst[7])
          obj.idx = i
          full_data.push(obj)
        }
      }
      set_data(full_data)
      dispatch(handleData(full_data))
      setLoding(false)
    })
  }

  // handle custom Time frame hook with help of function
  function handleTimeFrame(data){
    set_data(data)
  }

  // use this function for first time update the hook for change the UI
  function updateNextValue(value){
    setnext(value)
  }

  //on click next show next data(Candle)
  function replayNextButton(){
    setnext(prev =>{
      if(prev == undefined){
        updateNextValue(nextValue)
      }
      if (prev === initialData.length-1) {
        handlereset()
        return undefined
      } else {
        return prev + 1;
      }
    })
  }

  // use useref for getting Id of setintervel
  let id = useRef()

  //reset charts
  function handlereset(){
    // this is for rest replay variables from redux
    dispatch(handleReplayCheck(false))
    dispatch(handleReplayValue(0))
    // reset the next click candle hook
    setnext(undefined)
    // reset the play/pause hook
    setplay(false)
    clearInterval(id.current)
  }

  // handle play of charts
  function handlePlay(){
    setplay(true)
    id.current = setInterval(()=>{
      setnext(prev =>{
        if(prev == undefined){
          updateNextValue(nextValue)
        }
        if (prev === initialData.length-1) {
          handlePause()
          handlereset()
          return undefined
        } else {
          return prev + 1;
        }
      })
    },500)
  }

  // handle pause of candle in chart
  function handlePause(){
    clearInterval(id.current)
    setplay(false)
  }

  // user change Background handler
  const {solid , gradient , backgroundType} = backgroundColorType
  let stylegradientBackground = {background : `linear-gradient(${gradient.color1} , ${gradient.color2})`}
  let stylePlainBackground = {background : solid.color}

  // IF DATA IS NOT READY
  if(isLoading){
    return <div>loding....</div>
  }

  return (
      <div className="App">
        <HorizontalNav handleTimeFrame={handleTimeFrame} />
        <div className={replay ? `main_container containerHeight` : `main_container`}
            style={backgroundType == 'solid' ?  stylePlainBackground : stylegradientBackground}>

          <VerticalNav/>

          {/* MAIN CONTANET */}
          <div style={{flex:'1'}}>

            {/* CHART CANVAS */}
            <StockChart
              initialData={nextValue != 0 && replay ? initialData.slice(0, nextValue + 1) : initialData}
              name={name}/>

            {/* SHOW THIS WHEN CLICK ON REPLAY FOR HANDLE THE PLAY/PAUSE , NEXT CANDLE */}
            {replay ? <FunHandleReplay
                        replayNextButton={replayNextButton}
                        handlePlay={handlePlay}
                        handlereset={handlereset}
                        handlePause={handlePause}
                        play={play}/>
              : null}

            {/* BOTTOM NAVBAR */}
            <BottomNav />
          </div>
          <VerticalNav2 />
        </div>
      </div>
  );
}

export default App;
