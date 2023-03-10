import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { Divider, IconButton } from '@mui/material';
import './navbar.css'
import { useDispatch } from 'react-redux';
import { handleChartType, handleTimeFrameInput } from '../REDUX/action';
import { useState } from 'react';



export const SubMenu = ({list , type , handleTimeFrameConvertion , setopenTimeInput , handleActive}) => {

  const dispatch = useDispatch()

  // HANDLE THE DROP MENU
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // HANDLE THE CHART TYPE
  function handleChart(value){
    dispatch(handleChartType(value))
  }

  function handleInputFrame(){
    dispatch(handleTimeFrameInput(true))
  }



  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color:'#000'}}
        size="small"
      >
        <ExpandMoreOutlinedIcon size='inherit' fontSize='8px'/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'basic-button'}}
        sx={{ marginTop:'6px'}}
      >
        {/* SHOW CHART LIST */}
        {type==='chart' ? list.map(([img , name] , index)=>{
          return <MenuItem onClick={handleClose} key={index} >
                  <div className='flex' style={{alignItems:'center'}} onClick={()=>handleChart(name)}>
                    <img alt='icon' src={require('../image/' + img)} className='svg_size'/>
                    <span>{name}</span>
                  </div>
                </MenuItem>
          }) :''}
          {type=='timeframe' ?
          <div>
            {/* SHOW TIME FRAME LIST */}
            {list.min.map((item , index)=>{
              return <MenuItem
                    key={index}
                    onClick={()=>{handleClose();handleTimeFrameConvertion('min' , item);handleActive('m',item)}}
                    >
                      {item} minutes
                    </MenuItem>
            })}
            <Divider />
            {list.hour.map((item , index)=>{
                return <MenuItem
                        key={index}
                        onClick={()=> {handleClose() ; handleTimeFrameConvertion('hour' , item)}}
                        >
                        {item} Hours
                    </MenuItem>
            })}
            <MenuItem onClick={()=> {handleClose(); handleInputFrame()}}>
                Custom Time
            </MenuItem>


        </div>
        :''}
        {type=='indicator' ? list.map((item , index)=>{
          return <MenuItem onClick={handleClose} key={index} >
                  <div className='flex' style={{alignItems:'center'}} >
                    <span>{item}</span>
                  </div>
                </MenuItem>
          }):''}
      </Menu>
    </div>
  );
}