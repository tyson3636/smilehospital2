import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginView from './components/LoginView';
import DashboardView from './components/DashboardView';
import DepartmentsView from './components/DepartmentsView';
import AccountsView from './components/AccountsView';
import HRView from './components/HRView';
import EmergencyView from './components/EmergencyView';
import PharmacyView from './components/PharmacyView';
import ReceptionView from './components/ReceptionView';
import DoctorView from './components/DoctorView';

// Dummy views for now
const DummyView = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
    <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300">
       <h1 className="text-4xl font-black">?</h1>
    </div>
    <div>
      <h2 className="text-3xl font-black text-hospital-black tracking-tighter">{title} Section</h2>
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2">{title} Protocol Under Development</p>
    </div>
  </div>
);

const AppContent = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!user) {
    return <LoginView />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardView onSectionChange={setActiveSection} />;
      case 'departments':
        return <DepartmentsView onSectionChange={setActiveSection} />;
      case 'hr':
        return <HRView />;
      case 'bil':
      case 'billing':
        return <AccountsView />;
      case 'pha':
      case 'pharmacy':
        return <PharmacyView />;
      case 'lab':
      case 'laboratory':
        return <DummyView title="Laboratory" />;
      case 'rad':
      case 'radiology':
        return <DummyView title="Radiology" />;
      case 'rec':
      case 'reception':
        return <ReceptionView />;
      case 'opd':
      case 'doctor':
        return <DoctorView />;
      case 'bil':
      case 'billing':
        return <AccountsView />;
      case 'ipd':
        return <DummyView title="Inpatient Service" />;
      case 'patients':
        return <DummyView title="Patients Management" />;
      case 'schedules':
        return <DummyView title="Shift Schedules" />;
      case 'communication':
        return <DummyView title="Staff Communication" />;
      case 'emergency':
        return <EmergencyView />;
      case 'settings':
        return <DummyView title="System Settings" />;
      case 'it':
        return <DummyView title="Hospital ICT & Systems" />;
      case 'sec':
      case 'security':
        return <DummyView title="Hospital Security" />;
      case 'amb':
      case 'logistics':
        return <DummyView title="Logistics & Ambulance" />;
      default:
        return <DashboardView onSectionChange={setActiveSection} />;
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </Layout>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
