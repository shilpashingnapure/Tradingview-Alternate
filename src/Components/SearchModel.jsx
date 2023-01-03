import React  from "react"
import { Modal,Button } from "@mui/material"
import { Box } from "@mui/system"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    p: 4,
  };

export const SearchModel = ()=>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen}>GBPUSD</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <div>
                    <h1>Symbol Search</h1>
                    <button onClick={handleClose}>X</button>
                </div>
                <div>
                    <input type='text' />
                </div>
                <div>

                </div>
            </Box>
            </Modal>
        </div>
    )
}