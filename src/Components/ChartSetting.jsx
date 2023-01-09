import React, { useState }  from "react"
import { Modal,Button } from "@mui/material"
import { Box } from "@mui/system"
import CloseIcon from '@mui/icons-material/Close';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VerticalTabs from "./SettingTab";



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height:'683px',
    bgcolor: '#fff',
    boxShadow: '0 2px 4px #0003',
    borderRadius:'6px',
    border:'none',
    fontSize:'14px'
  };

export const ChartSetting = ()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div >

            <SettingsOutlinedIcon onClick={handleOpen}/>

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

            >
            <Box sx={style}>
                <div className="flex search_heading" style={{borderBottom:'1px solid  #e0e3eb'}}>
                    <h1>Chart Setting</h1>
                    <button onClick={handleClose}>
                        <CloseIcon sx={{ color:'#e0e3eb'}}/>
                    </button>
                </div>
                <div>
                    <VerticalTabs/>
                </div>
            </Box>
            </Modal>
        </div>
    )
}