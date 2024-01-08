import * as React from 'react';

//Material UI
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//Components
import PalettePdf from "./PalettePdf";

//React PDF
import { PDFDownloadLink } from "@react-pdf/renderer";

//React icons
import { GrDocumentPdf } from "react-icons/gr"
import {AiOutlineLink,AiOutlinePicture} from "react-icons/ai"
import { BsShare } from "react-icons/bs";

//Redux
import {useSelector} from "react-redux";


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { paletteForPdf } = useSelector((state) => state.paletteForPdf);

  const valuesArray = [];
  for (const key in paletteForPdf) {
    if (Object.prototype.hasOwnProperty.call(paletteForPdf, key)) {
      valuesArray.push(paletteForPdf[key].hexPalette);
    }
  }
  


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
                <BsShare style={{alignSelf:"center", paddingTop:"2px",fontSize:"25px"}} />
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
        <MenuItem onClick={handleClose}><GrDocumentPdf style={{marginRight:"4px"}}/>
        
        <PDFDownloadLink
                document={<PalettePdf colors={valuesArray} />}
                fileName="YourPalette.pdf"
              >
                PDF
              </PDFDownloadLink>

         </MenuItem>
        <MenuItem onClick={handleClose}><AiOutlinePicture style={{marginRight:"4px"}}/> png</MenuItem>
        <MenuItem onClick={handleClose}><AiOutlineLink style={{marginRight:"4px"}}/> link</MenuItem>
      </Menu>
    </div>
  );
}