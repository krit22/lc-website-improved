import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import { HomePage } from './pages/HomePage';
import { AuditionsPage } from './pages/AuditionsPage';
import { DejaVuPage } from './pages/DejaVuPage';
import { MembersDashboardPage } from './pages/MembersDashboardPage';
import { AlumniPage } from './pages/AlumniPage';
import { migrateTeamMembersToFirestore } from './firebase/migrateTeam';

function App() {
  useEffect(() => {
    migrateTeamMembersToFirestore();
  }, []);

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auditions" element={<AuditionsPage />} />
          <Route path="/dejavu" element={<DejaVuPage />} />
          <Route path="/members" element={<MembersDashboardPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;

