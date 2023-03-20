import * as React from 'react';

//Material UI
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//React icons
import { GrDocumentPdf } from "react-icons/gr"
import {AiOutlineLink,AiOutlinePicture} from "react-icons/ai"


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color:"black", fontWeight:"700"}}
      >
        Export
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><GrDocumentPdf style={{marginRight:"4px"}}/> pdf</MenuItem>
        <MenuItem onClick={handleClose}><AiOutlinePicture style={{marginRight:"4px"}}/> png</MenuItem>
        <MenuItem onClick={handleClose}><AiOutlineLink style={{marginRight:"4px"}}/> link</MenuItem>
      </Menu>
    </div>
  );
}