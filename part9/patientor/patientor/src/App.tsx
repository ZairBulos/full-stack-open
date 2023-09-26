import { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import { setDiagnoseList, setPatientList, useStateValue } from "./state";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const patientListFromApi = await patientService.getAll();
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fechDiagnoseList = async () => {
      try {
        const diagnoseListFromApi = await diagnoseService.getAll();
        dispatch(setDiagnoseList(diagnoseListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    fetchPatientList();
    fechDiagnoseList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<PatientPage />} />
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
