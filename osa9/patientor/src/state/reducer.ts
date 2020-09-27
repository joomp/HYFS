import { State } from "./state";
import { Diagnose, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "ADD_DIAGNOSES";
    payload: Diagnose[];
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  };

export const setPatientList = (payload: Patient[]): Action => (
  {
    type: "SET_PATIENT_LIST",
    payload,
  }
);

export const addPatient = (payload: Patient): Action => (
  {
    type: "ADD_PATIENT",
    payload,
  }
);

export const updatePatient = (payload: Patient): Action => (
  {
    type: "UPDATE_PATIENT",
    payload,
  }
);

export const addDiagnoses = (payload: Diagnose[]): Action => (
  {
    type: "ADD_DIAGNOSES",
    payload,
  }
);

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (carry, diagnose) => ({ ...carry, [diagnose.code]: diagnose }),
            {}
          )
        }
      };
    default:
      return state;
  }
};
