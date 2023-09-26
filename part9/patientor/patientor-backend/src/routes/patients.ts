import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils/utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

patientRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(patientService.getOnePatient(id));
});

patientRouter.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientService.addPatient(newPatient);

  res.send(addedPatient);
});

patientRouter.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const petient = patientService.getOnePatient(id);

  if (!petient) {
    res.status(400).send({ error: "Patient not found" });
  } else {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(petient, newEntry);
    res.send(addedEntry);
  }
});

export default patientRouter;