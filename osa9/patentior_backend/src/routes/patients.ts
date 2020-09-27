import express from 'express';
import patientService from '../services/patient';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  try {
    const patientId = req.params.id;
    const entry = toNewEntry(req.body);
    res.json(patientService.addEntry(patientId, entry));
  } catch(e) {
    res.status(400).json({error: e.message});
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else{
    res.status(404).send('404 <br> patient not found');
  }
});

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatientInformation());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
});

export default router;