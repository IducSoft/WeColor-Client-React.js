import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const ExplorePallettesInputSearch = () => {
    return (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '50%', margin:"1rem", display:"flex", flexDirection:"row", },
          }}
          noValidate
          autoComplete="off"
        >
          
            <TextField id="outlined-basic" label="Search by colors, tags, etc." variant="outlined" />
            <Button variant="outlined" startIcon={<SearchIcon/>}>
              Search
            </Button>
        </Box>
      );
}

export default ExplorePallettesInputSearch;