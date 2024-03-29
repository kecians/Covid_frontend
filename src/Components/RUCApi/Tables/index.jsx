import {  Link } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import PatientFilter from './Filter';
import { PrimaryText, SecondaryHeading, SecondaryText, SMHeading, SMText } from '../../RUCApi/Text';
import { PrimaryButton } from '../../RUCApi/Button';
import { NativeCard } from '../../RUCApi/Cards';
import { useTheme } from '@mui/styles';


const StatuButton = ({status}) => {

    const statusMapper = {
        'Asymptomataic' : 'orange',
        'Mild' : 'green',
        'Severe' : 'red',
        'Moderate' : 'yellow'
    }

    return (

        <Button 
            p = {1}
            variant="outlined"
            size = "small"
            sx = {{
                color : statusMapper[status] || "black",
                borderColor : statusMapper[status]||"black" 
            }}
            >
            {status}
        </Button>

    )
}
 



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

 
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// const headCells = [
//   {
//     id: 'Patient name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Patient name',
//   },
//   {
//     id: 'Patient ID',
//     numeric: true,
//     disablePadding: false,
//     label: 'Patient ID',
//   },
//   {
//     id: 'Sex',
//     numeric: true,
//     disablePadding: false,
//     label: 'Sex',
//   },
//   {
//     id: 'Alloted Bed',
//     numeric: true,
//     disablePadding: false,
//     label: 'Alloted Bed',
//   },
//   {
//     id: 'Admitted on',
//     numeric: true,
//     disablePadding: false,
//     label: 'Admitted on',
//   },
//   {
//     id: 'status',
//     numeric: true,
//     disablePadding: false,
//     label: 'Status',
//   },
// ];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells} =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
            <SecondaryText>

              {headCell.label}
            </SecondaryText>
      
            </TableSortLabel>
            
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const TableToolbar = (props) => {
  const { numSelected, tools } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
   {tools}
      
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const  PatientTable = (props) => {

    const{
        rows = [],
        toggleProfile = () => {}, 
        setProfile =() => {},
        headCells = [],
        rowLabels = [],
        tools

    } = props;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const theme = useTheme();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id, contact) => {

        setProfile( {
            id,
            contact
        })

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }} 
    p = {3}
    >
      <NativeCard sx={{ width: '100%' }}   > 
        <TableToolbar numSelected={selected.length}   tools  = {tools} />
        <TableContainer
        >
          <Table
            sx={{ minWidth: 750,
            
            }}
            aria-labelledby="tableTitle"
            size={  'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells = {headCells}
            />
            <TableBody>
             
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.patient_id, row.contact_number)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.patient_id}
                      sx={{
                        '& td' : {
                        fontSize: theme.size.text.p2,
                        color : theme.palette.text.ternary

                        }
                        }}
                    >
                    {
                    
                        
                    
                    }
                      <TableCell
                        align = "center"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.patient_id}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{ !row.patient_bed ?? row.patient_bed.bed_id}</TableCell>
                      <TableCell align="center">{row.admitted_on}</TableCell>
                      <TableCell align="center">
                        <StatuButton status = {row.patient_status}  />

                      </TableCell>
                    
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: ( 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </NativeCard>
      
    </Box>
  );
}



 

export default PatientTable;
