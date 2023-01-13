import React, { useState }  from "react"
import { Modal,Button } from "@mui/material"
import { Box } from "@mui/system"
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch , useSelector } from "react-redux";
import { handleSearchValue } from "../REDUX/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55%',
    height:'680px',
    bgcolor: '#fff',
    boxShadow: '0 2px 4px #0003',
    borderRadius:'6px'
  };

export const SearchModel = ()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const value = useSelector((state)=> state.searchValue)
    const [searchValue , setSearchValue] = useState()
    const dispatch = useDispatch()

    // NAME VALUE FOR SEARCH
    function handleSearch(){
        dispatch(handleSearchValue(searchValue))
        setOpen(false)
    }
    return (
        <div>
            <Button onClick={handleOpen}>{value}</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <div className="flex search_heading">
                    <h1>Symbol Search</h1>
                    <button onClick={handleClose}>
                        <CloseIcon sx={{ color:'#e0e3eb'}}/>
                    </button>
                </div>
                <div className="flex search_section">
                    <SearchIcon  onClick={handleSearch}/>
                    <input type='text' onChange={(e)=> setSearchValue(e.target.value)}/>
                </div>
                <div>

                </div>
            </Box>
            </Modal>
        </div>
    )
}