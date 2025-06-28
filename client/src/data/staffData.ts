export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  department: string;
  hireDate: string;
  lastLogin: string;
  certifications: string[];
  performance: number;
  address: string;
  emergencyContact: string;
  schedule: string;
  avatar: string | null;
}

export const staffData: StaffMember[] = [
  {
    id: 'EMP-001',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@pulserx.com',
    phone: '(555) 123-4567',
    role: 'Pharmacist',
    status: 'active',
    department: 'Clinical',
    hireDate: '2020-01-15',
    lastLogin: '2024-01-16 09:30 AM',
    certifications: ['PharmD', 'Immunization Certified', 'MTM Certified'],
    performance: 95,
    address: '123 Main St, City, State 12345',
    emergencyContact: 'John Johnson - (555) 987-6543',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-002',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@pulserx.com',
    phone: '(555) 234-5678',
    role: 'Pharmacy Technician',
    status: 'active',
    department: 'Operations',
    hireDate: '2021-03-22',
    lastLogin: '2024-01-16 08:15 AM',
    certifications: ['CPhT', 'Sterile Compounding'],
    performance: 88,
    address: '456 Oak Ave, City, State 12345',
    emergencyContact: 'Lisa Chen - (555) 876-5432',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-003',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@pulserx.com',
    phone: '(555) 345-6789',
    role: 'Pharmacy Intern',
    status: 'active',
    department: 'Clinical',
    hireDate: '2023-09-01',
    lastLogin: '2024-01-15 04:45 PM',
    certifications: ['PharmD Student', 'CPR Certified'],
    performance: 92,
    address: '789 Pine St, City, State 12345',
    emergencyContact: 'Maria Rodriguez - (555) 765-4321',
    schedule: 'Part-time',
    avatar: null
  },
  {
    id: 'EMP-004',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@pulserx.com',
    phone: '(555) 456-7890',
    role: 'Store Manager',
    status: 'on-leave',
    department: 'Management',
    hireDate: '2019-05-10',
    lastLogin: '2024-01-10 06:20 PM',
    certifications: ['Pharmacy Management', 'Leadership Certified'],
    performance: 91,
    address: '321 Elm Dr, City, State 12345',
    emergencyContact: 'Susan Wilson - (555) 654-3210',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-005',
    firstName: 'Jessica',
    lastName: 'Martinez',
    email: 'jessica.martinez@pulserx.com',
    phone: '(555) 567-8901',
    role: 'Pharmacist',
    status: 'active',
    department: 'Clinical',
    hireDate: '2020-06-15',
    lastLogin: '2024-01-16 10:45 AM',
    certifications: ['PharmD', 'Diabetes Educator', 'Immunization Certified'],
    performance: 94,
    address: '567 Cedar St, City, State 12345',
    emergencyContact: 'Carlos Martinez - (555) 432-1098',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-006',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@pulserx.com',
    phone: '(555) 678-9012',
    role: 'Pharmacy Technician',
    status: 'active',
    department: 'Operations',
    hireDate: '2022-02-10',
    lastLogin: '2024-01-16 09:15 AM',
    certifications: ['CPhT', 'Inventory Management'],
    performance: 87,
    address: '890 Birch Ave, City, State 12345',
    emergencyContact: 'Lisa Thompson - (555) 321-0987',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-007',
    firstName: 'Amanda',
    lastName: 'Lee',
    email: 'amanda.lee@pulserx.com',
    phone: '(555) 789-0123',
    role: 'Pharmacy Intern',
    status: 'active',
    department: 'Clinical',
    hireDate: '2023-06-01',
    lastLogin: '2024-01-16 11:30 AM',
    certifications: ['PharmD Student', 'BLS Certified'],
    performance: 90,
    address: '123 Maple Dr, City, State 12345',
    emergencyContact: 'John Lee - (555) 210-9876',
    schedule: 'Part-time',
    avatar: null
  },
  {
    id: 'EMP-008',
    firstName: 'Robert',
    lastName: 'Garcia',
    email: 'robert.garcia@pulserx.com',
    phone: '(555) 890-1234',
    role: 'Cashier',
    status: 'active',
    department: 'Front Store',
    hireDate: '2022-08-15',
    lastLogin: '2024-01-16 08:45 AM',
    certifications: ['Customer Service', 'Cash Handling'],
    performance: 85,
    address: '456 Pine Ave, City, State 12345',
    emergencyContact: 'Maria Garcia - (555) 109-8765',
    schedule: 'Part-time',
    avatar: null
  },
  {
    id: 'EMP-009',
    firstName: 'Michelle',
    lastName: 'Kim',
    email: 'michelle.kim@pulserx.com',
    phone: '(555) 901-2345',
    role: 'Pharmacist',
    status: 'active',
    department: 'Clinical',
    hireDate: '2019-11-20',
    lastLogin: '2024-01-16 09:00 AM',
    certifications: ['PharmD', 'Immunization Certified', 'Medication Therapy Management'],
    performance: 96,
    address: '789 Oak Dr, City, State 12345',
    emergencyContact: 'David Kim - (555) 098-7654',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-010',
    firstName: 'Daniel',
    lastName: 'Brown',
    email: 'daniel.brown@pulserx.com',
    phone: '(555) 012-3456',
    role: 'Assistant Manager',
    status: 'active',
    department: 'Management',
    hireDate: '2020-03-10',
    lastLogin: '2024-01-16 08:30 AM',
    certifications: ['Pharmacy Operations', 'Leadership Training'],
    performance: 89,
    address: '321 Cedar Ln, City, State 12345',
    emergencyContact: 'Jennifer Brown - (555) 987-6543',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-011',
    firstName: 'Sophia',
    lastName: 'Patel',
    email: 'sophia.patel@pulserx.com',
    phone: '(555) 123-4567',
    role: 'Pharmacy Technician',
    status: 'active',
    department: 'Operations',
    hireDate: '2021-09-15',
    lastLogin: '2024-01-16 09:45 AM',
    certifications: ['CPhT', 'Medication Reconciliation'],
    performance: 92,
    address: '567 Elm St, City, State 12345',
    emergencyContact: 'Raj Patel - (555) 876-5432',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-012',
    firstName: 'William',
    lastName: 'Taylor',
    email: 'william.taylor@pulserx.com',
    phone: '(555) 234-5678',
    role: 'Pharmacy Intern',
    status: 'active',
    department: 'Clinical',
    hireDate: '2023-01-10',
    lastLogin: '2024-01-16 10:15 AM',
    certifications: ['PharmD Student', 'Immunization Training'],
    performance: 88,
    address: '890 Maple Ave, City, State 12345',
    emergencyContact: 'Elizabeth Taylor - (555) 765-4321',
    schedule: 'Part-time',
    avatar: null
  },
  {
    id: 'EMP-013',
    firstName: 'Olivia',
    lastName: 'Davis',
    email: 'olivia.davis@pulserx.com',
    phone: '(555) 345-6789',
    role: 'Cashier',
    status: 'terminated',
    department: 'Front Store',
    hireDate: '2022-05-01',
    lastLogin: '2023-12-15 03:30 PM',
    certifications: ['Customer Service'],
    performance: 75,
    address: '123 Oak St, City, State 12345',
    emergencyContact: 'Robert Davis - (555) 654-3210',
    schedule: 'Part-time',
    avatar: null
  },
  {
    id: 'EMP-014',
    firstName: 'Ethan',
    lastName: 'Nguyen',
    email: 'ethan.nguyen@pulserx.com',
    phone: '(555) 456-7890',
    role: 'Pharmacy Technician',
    status: 'active',
    department: 'Operations',
    hireDate: '2021-07-15',
    lastLogin: '2024-01-16 08:00 AM',
    certifications: ['CPhT', 'Compounding'],
    performance: 91,
    address: '456 Pine Dr, City, State 12345',
    emergencyContact: 'Mai Nguyen - (555) 543-2109',
    schedule: 'Full-time',
    avatar: null
  },
  {
    id: 'EMP-015',
    firstName: 'Isabella',
    lastName: 'Lopez',
    email: 'isabella.lopez@pulserx.com',
    phone: '(555) 567-8901',
    role: 'Pharmacist',
    status: 'on-leave',
    department: 'Clinical',
    hireDate: '2018-09-20',
    lastLogin: '2023-12-20 02:15 PM',
    certifications: ['PharmD', 'Board Certified Pharmacotherapy Specialist'],
    performance: 97,
    address: '789 Birch Ln, City, State 12345',
    emergencyContact: 'Carlos Lopez - (555) 432-1098',
    schedule: 'Full-time',
    avatar: null
  }
];

export interface ScheduleEntry {
  employeeId: string;
  name: string;
  role: string;
  schedule: {
    monday: { start: string, end: string, status: string };
    tuesday: { start: string, end: string, status: string };
    wednesday: { start: string, end: string, status: string };
    thursday: { start: string, end: string, status: string };
    friday: { start: string, end: string, status: string };
    saturday: { start: string, end: string, status: string };
    sunday: { start: string, end: string, status: string };
  };
}

export const scheduleData: ScheduleEntry[] = [
  {
    employeeId: 'EMP-001',
    name: 'Dr. Sarah Johnson',
    role: 'Pharmacist',
    schedule: {
      monday: { start: '08:00', end: '17:00', status: 'scheduled' },
      tuesday: { start: '08:00', end: '17:00', status: 'scheduled' },
      wednesday: { start: '08:00', end: '17:00', status: 'scheduled' },
      thursday: { start: '08:00', end: '17:00', status: 'scheduled' },
      friday: { start: '08:00', end: '17:00', status: 'scheduled' },
      saturday: { start: 'off', end: 'off', status: 'off' },
      sunday: { start: 'off', end: 'off', status: 'off' }
    }
  },
  {
    employeeId: 'EMP-002',
    name: 'Mike Chen',
    role: 'Pharmacy Technician',
    schedule: {
      monday: { start: '09:00', end: '18:00', status: 'scheduled' },
      tuesday: { start: '09:00', end: '18:00', status: 'scheduled' },
      wednesday: { start: '09:00', end: '18:00', status: 'scheduled' },
      thursday: { start: 'off', end: 'off', status: 'off' },
      friday: { start: '09:00', end: '18:00', status: 'scheduled' },
      saturday: { start: '10:00', end: '15:00', status: 'scheduled' },
      sunday: { start: 'off', end: 'off', status: 'off' }
    }
  },
  {
    employeeId: 'EMP-003',
    name: 'Emily Rodriguez',
    role: 'Pharmacy Intern',
    schedule: {
      monday: { start: '14:00', end: '20:00', status: 'scheduled' },
      tuesday: { start: 'off', end: 'off', status: 'off' },
      wednesday: { start: '14:00', end: '20:00', status: 'scheduled' },
      thursday: { start: '14:00', end: '20:00', status: 'scheduled' },
      friday: { start: 'off', end: 'off', status: 'off' },
      saturday: { start: '10:00', end: '18:00', status: 'scheduled' },
      sunday: { start: 'off', end: 'off', status: 'off' }
    }
  },
  {
    employeeId: 'EMP-005',
    name: 'Jessica Martinez',
    role: 'Pharmacist',
    schedule: {
      monday: { start: '08:00', end: '17:00', status: 'scheduled' },
      tuesday: { start: '08:00', end: '17:00', status: 'scheduled' },
      wednesday: { start: 'off', end: 'off', status: 'off' },
      thursday: { start: 'off', end: 'off', status: 'off' },
      friday: { start: '08:00', end: '17:00', status: 'scheduled' },
      saturday: { start: '09:00', end: '18:00', status: 'scheduled' },
      sunday: { start: '10:00', end: '16:00', status: 'scheduled' }
    }
  },
  {
    employeeId: 'EMP-006',
    name: 'David Thompson',
    role: 'Pharmacy Technician',
    schedule: {
      monday: { start: '10:00', end: '19:00', status: 'scheduled' },
      tuesday: { start: '10:00', end: '19:00', status: 'scheduled' },
      wednesday: { start: '10:00', end: '19:00', status: 'scheduled' },
      thursday: { start: '10:00', end: '19:00', status: 'scheduled' },
      friday: { start: 'off', end: 'off', status: 'off' },
      saturday: { start: 'off', end: 'off', status: 'off' },
      sunday: { start: '12:00', end: '18:00', status: 'scheduled' }
    }
  }
];

export interface TrainingRecord {
  employeeId: string;
  name: string;
  trainings: {
    course: string;
    completed: string | null;
    expiry: string | null;
    status: string;
  }[];
}

export const trainingData: TrainingRecord[] = [
  {
    employeeId: 'EMP-001',
    name: 'Dr. Sarah Johnson',
    trainings: [
      { course: 'Advanced Clinical Pharmacy', completed: '2024-01-10', expiry: '2025-01-10', status: 'completed' },
      { course: 'Immunization Updates', completed: '2023-12-15', expiry: '2024-12-15', status: 'current' },
      { course: 'HIPAA Compliance', completed: '2023-11-20', expiry: '2024-11-20', status: 'expiring' }
    ]
  },
  {
    employeeId: 'EMP-002',
    name: 'Mike Chen',
    trainings: [
      { course: 'Sterile Compounding Safety', completed: '2023-10-05', expiry: '2024-10-05', status: 'expiring' },
      { course: 'Customer Service Excellence', completed: '2024-01-08', expiry: '2025-01-08', status: 'completed' },
      { course: 'Pharmacy Technology Updates', completed: null, expiry: null, status: 'pending' }
    ]
  },
  {
    employeeId: 'EMP-003',
    name: 'Emily Rodriguez',
    trainings: [
      { course: 'Pharmacy Intern Orientation', completed: '2023-09-01', expiry: '2024-09-01', status: 'current' },
      { course: 'Patient Counseling Basics', completed: '2023-10-15', expiry: '2024-10-15', status: 'current' },
      { course: 'Emergency Procedures', completed: null, expiry: null, status: 'pending' }
    ]
  },
  {
    employeeId: 'EMP-005',
    name: 'Jessica Martinez',
    trainings: [
      { course: 'Advanced Diabetes Management', completed: '2023-11-15', expiry: '2024-11-15', status: 'current' },
      { course: 'Medication Therapy Management', completed: '2023-08-20', expiry: '2024-08-20', status: 'current' },
      { course: 'Immunization Certification Renewal', completed: '2023-12-10', expiry: '2025-12-10', status: 'completed' }
    ]
  },
  {
    employeeId: 'EMP-006',
    name: 'David Thompson',
    trainings: [
      { course: 'Pharmacy Calculations', completed: '2023-07-15', expiry: '2024-07-15', status: 'current' },
      { course: 'Inventory Management Systems', completed: '2023-09-10', expiry: '2024-09-10', status: 'current' },
      { course: 'HIPAA Compliance', completed: null, expiry: null, status: 'pending' }
    ]
  },
  {
    employeeId: 'EMP-009',
    name: 'Michelle Kim',
    trainings: [
      { course: 'Advanced Pharmacotherapy', completed: '2023-10-20', expiry: '2024-10-20', status: 'current' },
      { course: 'Medication Safety', completed: '2023-11-15', expiry: '2024-11-15', status: 'current' },
      { course: 'Preceptor Training', completed: '2023-12-05', expiry: '2025-12-05', status: 'completed' }
    ]
  }
];