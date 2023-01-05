import logo from './logo.svg';
import './App.css';
import React, { useState , useEffect}  from 'react';
import { ChartStock, StockChart } from './Components/ChartStock';
import raw from './02JAN/ACC.txt'
import { HorizontalNav } from './Components/HorizontalNav';
import { VerticalNav } from './Components/verticalNav';
import { VerticalNav2 } from './Components/verticalNav2';
import { BottomNav } from './Components/bottomNav';
import { useSelector } from 'react-redux';




function App() {
  const [initialData , set_data] = useState(initialData)
    const [isLoading , setLoding] = useState(true)
    const [name , setName] = useState()

    const [data , setdata] = useState(raw)

    const value = useSelector((state)=> state.searchValue)





    useEffect(()=>{

      try{

        let a = require(`./02JAN/${value}.txt`)
        console.log(a)
        // setdata(a)
        getData(a)
      }catch(err){
        console.log(err)
      }




    },[value])

      function getData(data){
        fetch(data).then((r)=> {
          let content = r.text()
          return content
        }).then((r)=>{
          let data = r.split(',').join('/s').split('\n')
          // setName()
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
              full_data.push(obj)
              
            }

          }
          set_data(full_data)
          setLoding(false)

        })

      }

      if(isLoading){
        return <div>loding....</div>
      }
  return (
    <div className="App">

        <HorizontalNav />

        <div className='main_container'>
          <VerticalNav/>
          <div style={{flex:'1'}}>
            <StockChart initialData={initialData} name={name}/>
            <BottomNav />
          </div>
          <VerticalNav2/>
        </div>





    </div>
  );
}

export default App;
