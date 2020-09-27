import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectType, TypeOption, DiagnosisSelection} from "./FormField";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import {useStateValue} from '../../state/state';
import { NumberField } from "../../AddPatientModal/FormField";

export type EntryFormValues =
  Omit<HealthCheckEntry , "id" >
  |
  Omit<OccupationalHealthcareEntry , "id" >
  |
  Omit<HospitalEntry , "id" >;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health check" },
  { value: "OccupationalHealthcare", label: "Occupational health care" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const initialType = "HealthCheck";
  

  const getDate = (): string => {
    const today = new Date();
    let month = (today.getMonth() + 1).toString();
    if (month.length < 2) {
      month = "0" + month;
    }
    let day = (today.getDate()).toString();
    if (day.length < 2) {
      day = "0" + day;
    }
    return `${today.getFullYear()}-${month}-${day}`;
  };

  return (
    <Formik
      initialValues={{
        type: initialType,
        specialist: "",
        description: "",
        date: getDate(),
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const typeNotSupported = "Type is not (yet) supported";
        const invalidDateFormat = "Invalid date format";
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        // eslint-disable-next-line no-useless-escape
        if (!/^(\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(values.date)) {
          errors.date = invalidDateFormat;
        }
        if (values.type !== 'HealthCheck') {
          errors.type = typeNotSupported;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectType 
              label="Type"
              name="type"
              options={typeOptions}
            />
            {values.type === 'HealthCheck' && 
              <Field
              label="Health check rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />}
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
