import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ReceivedChecks } from './pages/ReceivedChecks';
import { IssuedChecks } from './pages/IssuedChecks';
import { ReceivedLCRs } from './pages/ReceivedLCRs';
import { IssuedLCRs } from './pages/IssuedLCRs';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/received-checks" element={<ReceivedChecks />} />
          <Route path="/issued-checks" element={<IssuedChecks />} />
          <Route path="/received-lcrs" element={<ReceivedLCRs />} />
          <Route path="/issued-lcrs" element={<IssuedLCRs />} />
        </Routes>
      </Layout>
    </Router>
  );
}