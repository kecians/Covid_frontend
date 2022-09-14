import cookie from "react-cookies";

import {
  PATIENT_LIST_UPDATED,
  PATIENT_BED_CHANGE,
  PATIENT_EXPIRED,
  PATIENT_HEALTH_UPDATED,
  GET_PATIENT_DETAILS,
  PATIENT_MIGRATED,
  PATIENT_STATUS_CHANGE,
} from "../types/patient.js";

const initialState = {
  info: {},
  profileUpdated: false,
  patientListUpdated: false,
  
};
export default function patientProfileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PATIENT_DETAILS:
      return {
        ...state,
        info: payload,
      };

    case (PATIENT_BED_CHANGE,
        PATIENT_HEALTH_UPDATED,
      PATIENT_STATUS_CHANGE):
      return( {
        ...state,
        profileUpdated: payload,
      });
    case PATIENT_LIST_UPDATED:
      return {
        ...state,
        patientListUpdated: payload,
      };

    default:
      return state;
  }
}
