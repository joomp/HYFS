import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Patient, Diagnose, Entry } from "../types";
import {apiBaseUrl} from "../constants";
import {Icon, Button} from 'semantic-ui-react';
import {updatePatient, addDiagnoses} from '../state/reducer';
import EntryDetails from './EntryDetails';
import AddEntryModal from './addEntry/index';
import { EntryFormValues } from "./addEntry/AddEntryForm";

const PatientPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<undefined | Patient>(undefined);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const patientID = useParams<{ id: string }>().id;

  const getPatient = async (id: string): Promise<Patient|undefined> => {
    const patient = patients[id];
    if (!patient?.ssn){
      try {
        const { data: patientFull } = await axios.get(
          `${apiBaseUrl}/patients/${patientID}`);
        dispatch(updatePatient(patientFull));
        return patientFull;
      } catch (e) {
        console.error(e.message);
      }
      return patient;
    }
    return patient;
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
  const getDiagnoses = async () => {
    if (!diagnoses.size) {
      try {
        const { data: diagnoses } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(addDiagnoses(diagnoses));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const res = (await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientID}/entries`,
        values
      )).data;
      if (patient){
        patient.entries.push(res);
        dispatch(updatePatient(patient));
        closeModal();
      }
    } catch (e) {
      setError(e.response.data.error);
      console.error(e);
    }
  };

  const getGenderIcon = () => {
    if (patient?.gender === 'male') {
      return <Icon name='mars'/>;
    } else if (patient?.gender === 'female') {
      return <Icon name='venus'/>;
    } else {
      return <Icon name='genderless'/>;
    }
  };

  useEffect( () => {
    const foo = async () => {
      if (!patient){
        await getDiagnoses();
        setPatient( (await getPatient(patientID)));
      }
    };
    foo();
    // eslint-disable-next-line
  }, [patient]);

  if (!patient) {
    return <p>Patient not found</p>;
  } else{
    return (
      <div>
        <h2>
          {patient.name}
          {getGenderIcon()}
        </h2>
        <p>Ssn: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
        <Button onClick={() => openModal()}>Add New Entry</Button>
        {Boolean(patient.entries?.length) && <h2> Entries:</h2>}
        {patient.entries?.map( e => <EntryDetails key={e.id} entry={e}/> )}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitEntry}
          error={error}
          onClose={closeModal}
        />
      </div>
    );
  }
};

export default PatientPage;