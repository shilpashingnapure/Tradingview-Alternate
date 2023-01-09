import './App.css';
import React, { useState , useEffect , useRef}  from 'react';
import { StockChart } from './Components/ChartStock';
import { HorizontalNav } from './Components/HorizontalNav';
import { VerticalNav } from './Components/verticalNav';
import { VerticalNav2 } from './Components/verticalNav2';
import { BottomNav } from './Components/bottomNav';
import { useSelector } from 'react-redux';




function App() {
  const [initialData , set_data] = useState([])
  const [isLoading , setLoding] = useState(true)
  const [name , setName] = useState()
  const {searchValue , replay  , backgroundColorType} = useSelector((state)=> state)

  const [nextValue , setnext] = useState(0)
  const [mainData , setMainData] = useState([])

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
              obj['date'] = full_Date
              obj.open = lst[3]
              obj.low = lst[4]
              obj.high = lst[5]
              obj.close = lst[6]
              obj.volume = lst[7]
              obj.idx = i
              full_data.push(obj)

            }

          }
          set_data(full_data)
          setLoding(false)

        })

      }

      //handle index for replay
      function handleIndex(index){
        setnext(index)
      }



      //on click next show next data(Candle)
      function replayNextButton(){
          setnext(prev =>{
            if (prev === initialData.length - 1) {
              return 0;
            } else {
              return prev + 1;
            }
          })

          setMainData([...mainData , initialData[nextValue]])



      }



      //reset charts
      function handlereset(){
        setMainData(initialData)
      }


      let id = useRef()

      // handle play of charts
      function handlePlay(){
        setplay(true)
        id.current = setInterval(()=>{
          setnext(prev =>{
              if (prev === initialData.length - 1) {
                return 0;
              } else {
                return prev + 1;
              }
            })
          },500)


      }

      function handlePause(){
        clearInterval(id.current)
        setplay(false)
      }

      const {solid , gradient , backgroundType} = backgroundColorType
      let stylegradientBackground = {background : `linear-gradient(${gradient.color1} , ${gradient.color2})`}
      let stylePlainBackground = {background : solid.color}
      if(isLoading){
        return <div>loding....</div>
      }
  return (
    <div className="App">

        <HorizontalNav handleIndex={handleIndex}/>

        <div className='main_container' style={backgroundType == 'solid' ?  stylePlainBackground : stylegradientBackground}>
          <VerticalNav/>
          <div style={{flex:'1'}}>
            <StockChart initialData={replay ? initialData.slice(0, nextValue) : initialData} name={name}/>
            <BottomNav />
          </div>
          <VerticalNav2 replayNextButton={replayNextButton} handlePlay={handlePlay} handlereset={handlereset} handlePause={handlePause} play={play}/>
        </div>





    </div>
  );
}

export default App;
