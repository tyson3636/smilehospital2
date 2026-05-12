import React, { createContext, useContext, useState, useEffect } from 'react';
import { StaffRole, User } from '../types';
import { APP_CONFIG } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isSuperAdmin: boolean;
  staffList: any[];
  addStaff: (staff: any) => void;
  removeStaff: (id: string) => void;
  deptPasswords: Record<string, string>;
  updateDeptPassword: (id: string, pass: string) => void;
  activityLogs: any[];
  departments: any[];
  addDepartment: (dept: any) => void;
  // Patient & Coordination
  patients: any[];
  registerPatient: (patient: any) => void;
  notifications: any[];
  clearNotification: (id: string) => void;
  transactions: any[];
  addTransaction: (tx: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  
  const [staffList, setStaffList] = useState<any[]>([
    { 
      id: '1', 
      name: 'Dr. Michael Scott', 
      role: StaffRole.ADMIN, 
      dept: 'Administration', 
      email: 'admin@smile.com',
      contact: '0712345678',
      bankName: 'NMB Bank',
      accountNumber: '11039847123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
    },
    { 
      id: '2', 
      name: 'Pam Beesly', 
      role: StaffRole.NURSE, 
      dept: 'Reception & Triages', 
      email: 'pam@smile.com',
      contact: '0754332211',
      bankName: 'CRDB Bank',
      accountNumber: '01509938477',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pam'
    },
    { 
      id: '3', 
      name: 'Jim Halpert', 
      role: StaffRole.LAB_TECH, 
      dept: 'Pharmacy (Idara ya Dawa)', 
      email: 'jim@smile.com',
      contact: '0655998877',
      bankName: 'NBC Bank',
      accountNumber: '22048857321',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jim'
    },
    {
      id: '4',
      name: 'Dr. Dwight Schrute',
      role: StaffRole.DOCTOR,
      dept: 'Outpatient (OPD)',
      email: 'dwight@smile.com',
      contact: '0711223344',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dwight'
    }
  ]);

  const [departments, setDepartments] = useState<any[]>([
    { id: 'REC', name: 'Reception & Triages', head: 'Pam Beesly', staffCount: 12, status: 'Active', description: 'Kituo cha Mapokezi na kupimia wagonjwa' },
    { id: 'PHA', name: 'Pharmacy (Idara ya Dawa)', head: 'Jim Halpert', staffCount: 18, status: 'Active', description: 'Maabara ya dawa na usimamizi wa stoo' },
    { id: 'LAB', name: 'Laboratory', head: 'Dwight Schrute', staffCount: 22, status: 'Active', description: 'Uchunguzi wa sampuli na vipimo vya damu' },
    { id: 'RAD', name: 'Radiology & Imaging', head: 'Angela Martin', staffCount: 15, status: 'Active', description: 'X-Ray, Ultrasound na CT Scan' },
    { id: 'BIL', name: 'Billing & Finance', head: 'Oscar Martinez', staffCount: 10, status: 'Active', description: 'Malipo, Bima na Masuala ya fedha' },
    { id: 'HR', name: 'HR & Personnel', head: 'Toby Flenderson', staffCount: 8, status: 'Active', description: 'Usimamizi wa wafanyakazi na maslahi' },
    { id: 'ADM', name: 'Administration Hub', head: 'Michael Scott', staffCount: 6, status: 'Active', description: 'Usimamizi mkuu wa hospitali' },
    { id: 'IT', name: 'Hospital ICT & Systems', head: 'Kevin Malone', staffCount: 5, status: 'Active', description: `Mifumo ya kidigitali na ${APP_CONFIG.name}` },
    { id: 'SEC', name: 'Hospital Security', head: 'Creed Bratton', staffCount: 14, status: 'Active', description: 'Ulinzi na usalama wa watu na mali' },
    { id: 'AMB', name: 'Logistics & Ambulance', head: 'Darryl Philbin', staffCount: 20, status: 'Active', description: 'Usafiri na huduma za dharura' },
    { id: 'OPD', name: 'Outpatient (OPD)', head: 'Ryan Howard', staffCount: 25, status: 'Active', description: 'Wagonjwa wa nje na kliniki' },
    { id: 'IPD', name: 'Inpatient Service', head: 'Jan Levinson', staffCount: 40, status: 'Active', description: 'Lalo la wagonjwa na uangalizi' },
  ]);

  const [deptPasswords, setDeptPasswords] = useState<Record<string, string>>({
    'PHA': '123456789',
    'OPD': '123456789',
    'REC': '123456789',
    'HR': '123456789',
    'BIL': '123456789',
    'LAB': '123456789',
    'RAD': '123456789',
    'ADM': '123456789',
    'IT': '123456789',
    'SEC': '123456789',
    'AMB': '123456789',
    'IPD': '123456789'
  });

  const [activityLogs, setActivityLogs] = useState<any[]>([]);

  const login = (email: string) => {
    // Basic simulation for demo
    if (email === 'admin@smile.com' || email === 'emmanueltyson36@gmail.com') {
      setUser({ id: '1', name: 'Emmanuel Tyson', role: StaffRole.ADMIN, email });
      setIsSuperAdmin(true);
    } else {
      const staff = staffList.find(s => s.email === email);
      if (staff) {
        setUser({ id: staff.id, name: staff.name, role: staff.role, email, dept: staff.dept });
        setIsSuperAdmin(false);
      } else {
        // Just let them in as a guest doctor for demo if not found
        setUser({ id: 'guest', name: 'Guest Doctor', role: StaffRole.DOCTOR, email });
        setIsSuperAdmin(false);
      }
    }
  };

  const logout = () => {
    setUser(null);
    setIsSuperAdmin(false);
  };

  const addStaff = (staff: any) => {
    setStaffList(prev => [...prev, staff]);
    setActivityLogs(prev => [{
      id: Date.now().toString(),
      type: 'STAFF_ENROLLED',
      user: staff.name,
      timestamp: new Date().toISOString(),
      details: `New staff enrolled in ${staff.dept}`
    }, ...prev]);
  };

  const removeStaff = (id: string) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
  };

  const updateDeptPassword = (id: string, pass: string) => {
    setDeptPasswords(prev => ({ ...prev, [id]: pass }));
  };

  const addDepartment = (dept: any) => {
    setDepartments(prev => [...prev, { ...dept, status: 'Active', staffCount: 0, head: 'Not Assigned' }]);
    setDeptPasswords(prev => ({ ...prev, [dept.id.toUpperCase()]: dept.password }));
    setActivityLogs(prev => [{
      id: Date.now().toString(),
      type: 'DEPT_REGISTERED',
      user: 'HR Manager',
      timestamp: new Date().toISOString(),
      details: `Idara mpya: ${dept.name} imesajiliwa.`
    }, ...prev]);
  };

  const addTransaction = (tx: any) => {
    const newTx = {
      ...tx,
      id: `TXN-${Math.floor(Math.random() * 1000000)}`,
      timestamp: new Date().toISOString(),
      status: 'Cleared'
    };
    setTransactions(prev => [newTx, ...prev]);

    // Notify Accounts/Finance
    setNotifications(prev => [{
      id: Date.now().toString() + '-acc',
      recipientId: 'FINANCE', // Special ID for the finance department
      message: `Malipo Mapya: ${tx.detail} - ${tx.amount} TZS imepokelewa kupitia ${tx.method}.`,
      timestamp: new Date().toISOString(),
      type: 'PAYMENT_RECEIVED'
    }, ...prev]);
  };

  const registerPatient = (patient: any) => {
    setPatients(prev => [patient, ...prev]);
    
    // Notify the assigned doctor
    setNotifications(prev => [{
      id: Date.now().toString(),
      recipientId: patient.doctorId,
      message: `Mgonjwa Mpya: ${patient.fullName} (${patient.fileNumber}) amesajiliwa na anakusubiri.`,
      timestamp: new Date().toISOString(),
      type: 'PATIENT_READY'
    }, ...prev]);

    // If it was a cash payment, record the transaction automatically
    if (patient.paymentType === 'Cash' && patient.amountPaid) {
      addTransaction({
        detail: `Usajili wa Mgonjwa: ${patient.fullName}`,
        amount: `+${patient.amountPaid}`,
        method: 'Lipa Number / Cash',
        category: 'Revenue',
        staffId: user?.id
      });
    }
    
    setActivityLogs(prev => [{
      id: Date.now().toString(),
      type: 'PATIENT_REGISTERED',
      user: user?.name,
      timestamp: new Date().toISOString(),
      details: `Registered patient: ${patient.fullName} to Dr. ${staffList.find(s => s.id === patient.doctorId)?.name}`
    }, ...prev]);
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };



  return (
    <AuthContext.Provider value={{ 
      user, login, logout, isSuperAdmin, 
      staffList, addStaff, removeStaff,
      deptPasswords, updateDeptPassword,
      activityLogs, departments, addDepartment,
      patients, registerPatient, notifications, clearNotification,
      transactions, addTransaction
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
