import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { customStyles } from './styles'

function Paginator({ setPage, itemsPerPage, setAutoRefresh, setKeyword }) {
    const [pageNumber, setPageNumber] = useState(1)

    const handleChange = (event, value) => {
      setPageNumber(value)
      setKeyword('')
      setPage(value)
      setAutoRefresh(true)
    };

    const count = 100 % itemsPerPage ? Math.floor((100 / itemsPerPage)) + 1 : 100 / itemsPerPage
  
    return (
      <div id="pagination">
          <Stack spacing={2} >
            <Pagination count={count} variant="outlined" color="success" shape="rounded" page={pageNumber} onChange={handleChange} sx={customStyles} />
          </Stack>
      </div>
    );
}

export default Paginator