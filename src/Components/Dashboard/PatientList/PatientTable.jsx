import { Link, Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import PatientFilter from "./Filter";
import {
  PrimaryText,
  SecondaryHeading,
  SecondaryText,
  SMHeading,
  SMText,
} from "../../RUCApi/Text";
import { PrimaryButton } from "../../RUCApi/Button";
import { NativeCard } from "../../RUCApi/Cards";
import { useTheme } from "@mui/material";
import { NativeHeading } from "../../RUCApi/Text";
import { getDateTimeString } from "../../../assets/scripts";
import { useEffect } from "react";
import cookie from "react-cookies";
import { patientListPagination } from "../../../Api/patient.api";
import axios from "axios";

const StatuButton = ({ status }) => {
  const statusMapper = {
    Asymptomataic: "orange",
    Mild: "green",
    Severe: "red",
    Moderate: "light green",
    migrated: "red",
    active: "blue",
  };

  const theme = useTheme();
  return (
    <Button
      p={1}
      variant="outlined"
      size="small"
      sx={{
        color: statusMapper[status] || "black",
        borderColor: statusMapper[status] || "black",
        fontSize: theme.size.text.p3,
      }}
    >
      {status}
    </Button>
  );
};

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
  return order === "desc"
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

const headCells = [
  {
    id: "Patient name",
    numeric: false,
    disablePadding: true,
    label: "Patient name",
  },
  {
    id: "Patient ID",
    numeric: true,
    disablePadding: false,
    label: "Patient ID",
  },
  {
    id: "Sex",
    numeric: true,
    disablePadding: false,
    label: "Sex",
  },
  {
    id: "Alloted Bed",
    numeric: true,
    disablePadding: false,
    label: "Alloted Bed",
  },
  {
    id: "Admitted on",
    numeric: true,
    disablePadding: false,
    label: "Admitted on",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const theme = useTheme();

  return (
    <TableHead>
      <TableRow
        sx={{
          background: theme.palette.v2.primary,
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <NativeHeading
                sx={{
                  color: theme.palette.text.ternary,
                  fontSize: theme.size.heading.h4,
                }}
              >
                {headCell.label}
              </NativeHeading>
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const TableToolbar = (props) => {
  const { numSelected , rowCount = 0 } = props;
  const theme = useTheme()
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <NativeHeading sx = {{ color : theme.palette.text.primary, fontSize : theme.size.heading.h3 }}>{rowCount} Patients</NativeHeading>
      {/* <PatientFilter /> */}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const PatientTable = (props) => {
  const { toggleProfile = () => {}, setProfile = () => {}, query = "" } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState({
    rows: [],
    final_page: false,
    total_page: 0,
    total_record: 0,
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);

  const theme = useTheme();

  const [state, setState] = React.useState([]);
  const [pageCount, setPageCount] = React.useState({ count: 1 });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    setLoading(true);
    axios({
      url: patientListPagination + `?page=${pageCount.count}&query=${query}`,
      method: "GET",
      headers: {
        Authorization: `Token ${cookie.load("token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 404) {
          setLoading(false);
          // setState(res.data.data)
          // setvaccine
        } else {
          setLoading(false);
          setData((state) => ({
            ...state,
            rows: [...state.rows, ...res.data.results],
            final_page: res.data.next == null ? true : state.final_page,
            total_page: res.data.total_pages,
            total_record: res.data.count,
          }));
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [pageCount]);

  useEffect(() => {
    if (query) {
      setData((state) => ({
        ...state,
        rows: [],
        final_page: false,
        total_page: 0,
        total_record: 0,
      }));
      setPage(0);
      setRowsPerPage(5);
      setPageCount((state) => ({ ...state, count: 1 }));
    }
  }, [query]);

  useEffect(() => {
    console.log("rows", data.rows, query);
  }, [data]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id, contact) => {
    setProfile({
      id,
      contact,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log("rows pages - ", newPage, rowsPerPage);
  };

  useEffect(() => {
    if (page) {
      if (!data.final_page && data.rows.length < rowsPerPage * (page + 1)) {
        console.log("handle change page", data);
        setPageCount((state) => ({ ...state, count: state.count + 1 }));
      }
    }
  }, [page]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (!data.final_page && data.rows.length < rowsPerPage * (page + 1)) {
      setPageCount((state) => ({ ...state, count: state.count + 1 }));
    }
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }} p={3}>
      <NativeCard sx={{ width: "100%", padding: "0px" }}>
        <TableToolbar numSelected={selected.length} rowCount = {data.total_record} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.rows.length}
            />
            <TableBody>
              {Array.isArray(data.rows) && data.rows.length
                ? data.rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) =>
                            handleClick(
                              event,
                              row.patient_id,
                              row.contact_number
                            )
                          }
                          role="checkbox"
                          tabIndex={-1}
                          key={row.patient_id}
                          sx={{
                            "& td": {
                              fontSize: theme.size.text.p2,
                              color: theme.palette.text.ternary,
                            },
                          }}
                        >
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.patient_id}</TableCell>
                          <TableCell align="center">{row.gender}</TableCell>
                          <TableCell align="center">
                            {!row.patient_bed ?? row.patient_bed.bed_id}
                          </TableCell>
                          <TableCell align="center">
                            {getDateTimeString(row.admitted_on)}
                          </TableCell>
                          <TableCell align="center">
                            <StatuButton status={row.patient_status_display} />
                          </TableCell>
                        </TableRow>
                      );
                    })
                : ""}
              {loading &&
                [1, 2, 3, 4, 5].map((val) => (
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={6}
                      sx={{
                        padding: "5px",
                      }}
                    >
                      <Skeleton width="100%" height={40} />
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
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
          count={data.total_record}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </NativeCard>
    </Box>
  );
};

// const PatientTable = (props) => {
//     const{
//         data = {},
//     } = props;

//     return (
//      data.show ?
//             <div className="row p-3">
//                 <div className="col-md-12 col-sm-12 col-lg-12 col-12 profile">
//                     <Table responsive="md" className="" id="searchtable">
//                     <thead>
//                     <tr>
//                         <th>Patient ID</th>
//                         <th>Patient Name</th>
//                         {data.query==="home_isolated"?
//                             <th>Health Update</th>
//                             :null
//                         }

//                         <th>Admitted On</th>
//                         <th>{data.query==="migrated"? "Migrated On":data.query==="death"? "Deceased On": data.query==="death"? "Recovered On": "Last Updated on"}</th>
//                         {data.query==="migrated"?
//                             <th>Migrated To</th>
//                             :null
//                         }
//                         {data.query!=="recovered" && data.query!=="home_isolated"?
//                             <th>Reason</th>
//                             :null
//                         }
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {data.loading ?
//                         <tr>
//                             <td>
//                                 <span>Loading.....</span>

//                             </td>
//                         </tr>
//                         :
//                     null
//                     }
//                     {typeof(data.data)==="string"?
//                     "Patients Doesn't Exist!!"
//                     :
//                     <>
//                         {data.data.map((i,index) => (
//                     <tr>
//                         <td>{i.patient_id}</td>
//                         <td><Link to={`/patient/profile/${i.patient_id}/${i.contact_number}`}className="text-primary text-center">{i.name}</Link></td>
//                         {data.query==="home_isolated"?
//                             <td> <Link to={`/patient/healthcheck/${i.patient_id}/${i.name}`} className="text-primary text-center">Health Checkup</Link></td>
//                                     :null
//                         }
//                         <td>{i.admitted_on}</td>
//                         <td>{data.query!=="death"? i.updated_on? i.updated_on.split("T")[0]: "N/A" : i.patient_death? i.patient_death.expired_on: "N/A"}</td>

//                         {data.query==="migrated"?
//                             <td>{i.patient_migrate? i.patient_migrate.migrated_to: "N/A"}</td>
//                             :null
//                         }
//                         {data.query!=="recovered" && data.query!=="home_isolated"?
//                             <td>{data.query==="death"?
//                             i.patient_death? i.patient_death.reason: "N/A": i.patient_migrate? i.patient_migrate.reason: "N/A" }</td>
//                             :null
//                         }
//                     </tr>
//                     ))}
//                     </>
//                     }
//                     </tbody>
//                 </Table>
//                 </div>
//             </div>

//         : null

//     );
// }

export default PatientTable;
