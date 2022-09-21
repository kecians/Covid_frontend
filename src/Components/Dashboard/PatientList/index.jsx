import React, { useState } from "react";
import { Container } from "@mui/material";
import Searchbar from "./SearchBar";
import PatientTable from "./PatientTable";
import PatientProfile from "./PatientProfile/index.jsx";
import { useEffect } from "react";
import cookie from "react-cookies";
import { patientListPagination } from "../../../Api/patient.api";
import axios from "axios";
import { useTheme } from "@mui/styles";

const PatientList = () => {
  const [query, setQuery] = useState("");
  const [show_profile, toggleProfile] = useState(false);
  const [profile, setProfile] = useState(false);

  const [data, setData] = React.useState({
    rows: [],
    final_page: false,
    total_page: 0,
    total_record: 0,
  });

  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const [pageCount, setPageCount] = React.useState({ count: 1 });

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
      console.log("query", pageCount.count);
      setData((state) => ({
        ...state,
        rows: [],
        final_page: false,
        total_page: 0,
        total_record: 0,
      }));
      setPageCount((state) => ({ ...state, count: 1 }));
    }
  }, [query]);

  return (
    <Container
      maxWidth="100%"
      sx={{
        height: "auto",
        padding: "0px !important",
        margin: "0px",
      }}
    >
      {!profile ? (
        <>
          <Searchbar setQuery={setQuery} />
          <PatientTable
            query={query}
            toggleProfile={toggleProfile}
            setProfile={setProfile}
            data={data}
            setPageCount={setPageCount}
            loading = {loading}
          />
        </>
      ) : (
        <PatientProfile closeProfile={setProfile} query_params={profile} />
      )}
    </Container>
  );
};

export default PatientList;
