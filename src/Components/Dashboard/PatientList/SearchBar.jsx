import React, { useState } from "react";
import { patientSearch } from "../../../Api/patient.api";
import axios from "axios";
import cookie from "react-cookies";
import { PrimaryHeading, SecondaryHeading, SMText } from "../../RUCApi/Text";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { BsSearch } from "react-icons/bs";
import Stack from "@mui/material/Stack";
import { PrimaryButton } from "../../RUCApi/Button";
import { CgAdd } from "react-icons/cg";
import { useTheme } from "@mui/material";



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  width: "auto",
  fontSize : theme.size.text.p2,
  backgroundColor: alpha(theme.palette.v2.primary, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.v2.primary, 0.75),
  },
  marginLeft: 0,
   
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  width: "40px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  minWidth : "300px",
  fontSize : theme.size.text.p2,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "120px",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Searchbar(props) {
  const { setState = () => {} } = props;

  const [search_query, setQuery] = useState("");
 
  const theme = useTheme()

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState((state) => ({ ...state, loading: true }));
    axios({
      url: patientSearch + `${search_query}/`,
      method: "GET",
      headers: {
        Authorization: `Token ${cookie.load("token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 404) {
          setState((state) => ({
            ...state,
            show: true,
            loading: false,
            data: "Data Not Found!!",
          }));
        } else {
          console.log(res.data.data.reverse())
          setState((state) => ({
            ...state,
            show: true,
            data: res.data.data.reverse(),
          }));
        }
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          show: true,
          loading: false,
          data: "Data Not Found!!",
        }));
      });
    setState((state) => ({ ...state, loading: false }));
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        minHeight: "100px",
        alignItems: "center",
        borderBottom :  "1px solid " + theme.palette.border.primary

      }}

      px = {3}
     
    >
      <Box>
        <PrimaryHeading>Patients</PrimaryHeading>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
      >
        <Search>
          <SearchIconWrapper>
            <BsSearch />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
          />
        </Search>
        <PrimaryButton type="submit">Search</PrimaryButton>
        <PrimaryButton startIcon={<CgAdd />}>Add Patient</PrimaryButton>
      </Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <img
          src="https://happyhospital.in/wp-content/uploads/2016/08/single-doctor.jpg"
          width="50px"
          height="50px"
          style={{ borderRadius: "100%", objectFit: "cover" }}
        />

        <SecondaryHeading>
          Ayush Bisht
          <SMText component="div">Doctor</SMText>
        </SecondaryHeading>
      </Box>
    </Box>
  );
}
