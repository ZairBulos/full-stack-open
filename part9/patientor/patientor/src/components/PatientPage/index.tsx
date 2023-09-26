import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "@mui/material";
import { Icon } from "semantic-ui-react";

import { Entry, Gender, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import { setPatient, useStateValue } from "../../state";
import AddEntryModal from "../AddEntryModal";

const HospitalEntryComp: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Container sx={{ border: 1, borderColor: 'grey.500', marginTop: '15px' }}>
      <h3>
        {entry.date}
        <Icon name="hospital symbol" />
      </h3>
      <p>
        {entry.description}
      </p>
    </Container>
  );
};

const OccupationalHealthcareEntryComp: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Container sx={{ border: 1, borderColor: 'grey.500', marginTop: '15px' }}>
      <h3>
        {entry.date}
        <Icon name="stethoscope" />
        {entry.employerName}
      </h3>
      <p>
        {entry.description}
      </p>
    </Container>
  );
};

const HealthCheckEntryComp: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Container sx={{ border: 1, borderColor: 'grey.500', marginTop: '15px' }}>
      <h3>
        {entry.date}
        <Icon name="doctor" />
      </h3>
      <p>
        {entry.description}
      </p>
    </Container>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComp entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComp entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComp entry={entry} />;
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const updatedPatient = await patientService.createEntry(id, values);
        dispatch(setPatient(updatedPatient));
        closeModal();
      }
    } catch (e: unknown) {
      console.error("Unknown error", e);
      setError("Unknown error");
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patientFromApi = await patientService.getOne(id);
        dispatch(setPatient(patientFromApi));
      }
    };

    if (!patient || patient.id !== id) {
      void fetchPatient();
    }
  }, [id, dispatch]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  let iconName: "man" | "woman" | "genderless";
  switch (patient.gender) {
    case Gender.Male:
      iconName = "man";
      break;
    case Gender.Female:
      iconName = "woman";
      break;
    case Gender.Other:
      iconName = "genderless";
      break;
  }

  return (
    <Container>
      <h2>
        {patient.name} <Icon name={iconName} />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <div>
        <h3>entries</h3>
        {patient.entries.map(entry =>
          <EntryDetails key={entry.id} entry={entry} />
        )}
      </div>
      <div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          onClose={closeModal}
          error={error}
        />
        <Button onClick={() => openModal()} variant="contained">Add New Entry</Button>
      </div>
    </Container>
  );
};

export default PatientPage;