export interface Patient {
  id: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  lastVisit: string;
  activeRx: number;
  allergies: string[];
  status: string;
}

export const patientData: Patient[] = [
  {
    id: 'PT001',
    name: 'John Smith',
    dob: '03/15/1965',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    address: '123 Main St, Anytown, ST 12345',
    insurance: 'Blue Cross Blue Shield',
    lastVisit: '01/15/2024',
    activeRx: 3,
    allergies: ['Penicillin', 'Sulfa'],
    status: 'Active'
  },
  {
    id: 'PT002',
    name: 'Maria Garcia',
    dob: '07/22/1978',
    phone: '(555) 987-6543',
    email: 'maria.garcia@email.com',
    address: '456 Oak Ave, Anytown, ST 12345',
    insurance: 'Aetna',
    lastVisit: '01/10/2024',
    activeRx: 2,
    allergies: ['None known'],
    status: 'Active'
  },
  {
    id: 'PT003',
    name: 'Robert Davis',
    dob: '12/08/1945',
    phone: '(555) 456-7890',
    email: 'robert.davis@email.com',
    address: '789 Pine St, Anytown, ST 12345',
    insurance: 'Medicare',
    lastVisit: '12/20/2023',
    activeRx: 5,
    allergies: ['Aspirin', 'Latex'],
    status: 'Active'
  },
  {
    id: 'PT004',
    name: 'Jennifer Wilson',
    dob: '09/14/1982',
    phone: '(555) 234-5678',
    email: 'jennifer.wilson@email.com',
    address: '321 Elm St, Anytown, ST 12345',
    insurance: 'Cigna',
    lastVisit: '01/05/2024',
    activeRx: 1,
    allergies: ['None known'],
    status: 'Active'
  },
  {
    id: 'PT005',
    name: 'Michael Brown',
    dob: '05/22/1950',
    phone: '(555) 876-5432',
    email: 'michael.brown@email.com',
    address: '567 Maple Ave, Anytown, ST 12345',
    insurance: 'Medicare',
    lastVisit: '01/08/2024',
    activeRx: 4,
    allergies: ['Codeine', 'Ibuprofen'],
    status: 'Active'
  },
  {
    id: 'PT006',
    name: 'Sarah Johnson',
    dob: '11/30/1975',
    phone: '(555) 765-4321',
    email: 'sarah.johnson@email.com',
    address: '789 Oak St, Anytown, ST 12345',
    insurance: 'Cigna',
    lastVisit: '12/15/2023',
    activeRx: 2,
    allergies: ['None known'],
    status: 'Active'
  },
  {
    id: 'PT007',
    name: 'David Wilson',
    dob: '08/15/1968',
    phone: '(555) 543-2109',
    email: 'david.wilson@email.com',
    address: '456 Pine St, Anytown, ST 12345',
    insurance: 'United Healthcare',
    lastVisit: '01/12/2024',
    activeRx: 3,
    allergies: ['Penicillin'],
    status: 'Inactive'
  },
  {
    id: 'PT008',
    name: 'Lisa Martinez',
    dob: '03/25/1985',
    phone: '(555) 321-0987',
    email: 'lisa.martinez@email.com',
    address: '123 Elm St, Anytown, ST 12345',
    insurance: 'Anthem',
    lastVisit: '01/03/2024',
    activeRx: 1,
    allergies: ['None known'],
    status: 'Active'
  },
  {
    id: 'PT009',
    name: 'Thomas Anderson',
    dob: '06/12/1990',
    phone: '(555) 109-8765',
    email: 'thomas.anderson@email.com',
    address: '789 Maple St, Anytown, ST 12345',
    insurance: 'Blue Cross',
    lastVisit: '12/28/2023',
    activeRx: 2,
    allergies: ['Sulfa'],
    status: 'Active'
  },
  {
    id: 'PT010',
    name: 'Emily Thompson',
    dob: '09/05/1988',
    phone: '(555) 987-0123',
    email: 'emily.thompson@email.com',
    address: '456 Birch St, Anytown, ST 12345',
    insurance: 'Aetna',
    lastVisit: '01/14/2024',
    activeRx: 0,
    allergies: ['None known'],
    status: 'Active'
  },
  {
    id: 'PT011',
    name: 'James Wilson',
    dob: '04/18/1972',
    phone: '(555) 876-0123',
    email: 'james.wilson@email.com',
    address: '789 Cedar St, Anytown, ST 12345',
    insurance: 'Humana',
    lastVisit: '12/10/2023',
    activeRx: 3,
    allergies: ['Penicillin', 'Tetracycline'],
    status: 'Active'
  },
  {
    id: 'PT012',
    name: 'Patricia Moore',
    dob: '07/29/1955',
    phone: '(555) 765-0123',
    email: 'patricia.moore@email.com',
    address: '123 Walnut St, Anytown, ST 12345',
    insurance: 'Medicare',
    lastVisit: '01/02/2024',
    activeRx: 6,
    allergies: ['Aspirin'],
    status: 'Active'
  }
];