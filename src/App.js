import logo from './logo.svg';
import './App.css';
import React, { useState , useEffect}  from 'react';
import { ChartStock, StockChart } from './Components/ChartStock';
import raw from './ACC.txt'
import { HorizontalNav } from './Components/HorizontalNav';
import { VerticalNav } from './Components/verticalNav';
import { VerticalNav2 } from './Components/verticalNav2';
import { BottomNav } from './Components/bottomNav';



function App() {
  const [initialData , set_data] = useState(initialData)
    const [isLoading , setLoding] = useState(true)
    const [name , setName] = useState()
    try{
      console.log(require('./acc.txt'))
    }catch(err){
      // console.log(err)
    }

    useEffect(()=>{

        fetch(raw).then((r)=> r.text()).then((r)=>{
          let data = r.split(',').join('/s').split('\n')
          // setName()
          let name = data[0].split('/s')[0]
          setName(name)
          let full_data = []
          data.map((txt)=>{
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
              obj.open = lst[3],
              obj.low = lst[4],
              obj.high = lst[5],
              obj.close = lst[6],
              obj.volume = lst[7]
              full_data.push(obj)
              return
            }

          })
          set_data(full_data)
          setLoding(false)

        })
      },[])

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
        {/* <ChartStock initialData={initialData}/> */}



    </div>
  );
}

export default App;
