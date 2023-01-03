import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import icon from '../image/downArrow.svg'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import { IconButton } from '@mui/material';
import './navbar.css'
import { useDispatch } from 'react-redux';
import { handleChartType } from '../REDUX/action';



export const SubMenu = ({list , type}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch()
  function handleChart(value){
    dispatch(handleChartType(value))
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
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        style={{
          marginTop:'6px'
        }}

      >
        {type=='chart' ? list.map(([img , name])=>{
          return <MenuItem onClick={handleClose}

          >
            <div className='flex' style={{alignItems:'center'}} onClick={()=>handleChart(name)}>
              <img src={require('../image/' + img)} className='svg_size'/>
              <span>{name}</span>
            </div>
            </MenuItem>
        }) :
          list.map((item)=>{
            return <MenuItem onClick={handleClose}>{item}
            </MenuItem>
          })
        }


      </Menu>
    </div>
  );
}