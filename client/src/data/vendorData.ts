export interface Vendor {
  id: string;
  name: string;
  category: string;
  status: string;
  contact: {
    contactPerson: string;
    email: string;
    phone: string;
    website: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  business: {
    taxId: string;
    paymentTerms: string;
    creditLimit: number;
  };
  performance: {
    rating: number;
    totalOrders: number;
    totalSpent: number;
    onTimeDelivery: number;
  };
  notes: string;
  contracts: any[];
  orders: any[];
}

export const vendorData: Vendor[] = [
  {
    id: 'VEN001',
    name: 'Cardinal Health',
    category: 'Pharmaceuticals',
    status: 'active',
    contact: {
      contactPerson: 'John Smith',
      email: 'john.smith@cardinalhealth.com',
      phone: '(555) 123-4567',
      website: 'www.cardinalhealth.com'
    },
    address: {
      street: '123 Main St',
      city: 'Columbus',
      state: 'OH',
      zipCode: '43215'
    },
    business: {
      taxId: '12-3456789',
      paymentTerms: 'Net 30',
      creditLimit: 100000
    },
    performance: {
      rating: 4.8,
      totalOrders: 125,
      totalSpent: 450000,
      onTimeDelivery: 98
    },
    notes: 'Primary pharmaceutical supplier',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN002',
    name: 'McKesson Corporation',
    category: 'Pharmaceuticals',
    status: 'active',
    contact: {
      contactPerson: 'Sarah Johnson',
      email: 'sarah.johnson@mckesson.com',
      phone: '(555) 234-5678',
      website: 'www.mckesson.com'
    },
    address: {
      street: '456 Oak Ave',
      city: 'Irving',
      state: 'TX',
      zipCode: '75039'
    },
    business: {
      taxId: '23-4567890',
      paymentTerms: 'Net 45',
      creditLimit: 150000
    },
    performance: {
      rating: 4.7,
      totalOrders: 98,
      totalSpent: 380000,
      onTimeDelivery: 96
    },
    notes: 'Secondary pharmaceutical supplier',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN003',
    name: 'AmerisourceBergen',
    category: 'Pharmaceuticals',
    status: 'active',
    contact: {
      contactPerson: 'Michael Brown',
      email: 'michael.brown@amerisourcebergen.com',
      phone: '(555) 345-6789',
      website: 'www.amerisourcebergen.com'
    },
    address: {
      street: '789 Pine St',
      city: 'Chesterbrook',
      state: 'PA',
      zipCode: '19087'
    },
    business: {
      taxId: '34-5678901',
      paymentTerms: 'Net 30',
      creditLimit: 120000
    },
    performance: {
      rating: 4.6,
      totalOrders: 75,
      totalSpent: 290000,
      onTimeDelivery: 95
    },
    notes: 'Specialty medications supplier',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN004',
    name: 'Medical Supplies Co.',
    category: 'Medical Supplies',
    status: 'active',
    contact: {
      contactPerson: 'Jennifer Wilson',
      email: 'jennifer.wilson@medsupplies.com',
      phone: '(555) 456-7890',
      website: 'www.medsupplies.com'
    },
    address: {
      street: '321 Elm St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601'
    },
    business: {
      taxId: '45-6789012',
      paymentTerms: 'Net 15',
      creditLimit: 50000
    },
    performance: {
      rating: 4.5,
      totalOrders: 62,
      totalSpent: 120000,
      onTimeDelivery: 94
    },
    notes: 'Primary medical supplies vendor',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN005',
    name: 'TechRx Solutions',
    category: 'Technology',
    status: 'active',
    contact: {
      contactPerson: 'David Thompson',
      email: 'david.thompson@techrx.com',
      phone: '(555) 567-8901',
      website: 'www.techrxsolutions.com'
    },
    address: {
      street: '654 Maple Dr',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95110'
    },
    business: {
      taxId: '56-7890123',
      paymentTerms: 'Net 30',
      creditLimit: 75000
    },
    performance: {
      rating: 4.4,
      totalOrders: 28,
      totalSpent: 180000,
      onTimeDelivery: 92
    },
    notes: 'Pharmacy technology and software provider',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN006',
    name: 'CleanCare Products',
    category: 'Cleaning Supplies',
    status: 'active',
    contact: {
      contactPerson: 'Lisa Garcia',
      email: 'lisa.garcia@cleancare.com',
      phone: '(555) 678-9012',
      website: 'www.cleancare.com'
    },
    address: {
      street: '987 Birch Ln',
      city: 'Atlanta',
      state: 'GA',
      zipCode: '30301'
    },
    business: {
      taxId: '67-8901234',
      paymentTerms: 'Net 15',
      creditLimit: 25000
    },
    performance: {
      rating: 4.3,
      totalOrders: 45,
      totalSpent: 65000,
      onTimeDelivery: 97
    },
    notes: 'Cleaning and sanitization supplies',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN007',
    name: 'Office Depot',
    category: 'Office Supplies',
    status: 'active',
    contact: {
      contactPerson: 'Robert Davis',
      email: 'robert.davis@officedepot.com',
      phone: '(555) 789-0123',
      website: 'www.officedepot.com'
    },
    address: {
      street: '123 Office Pkwy',
      city: 'Boca Raton',
      state: 'FL',
      zipCode: '33431'
    },
    business: {
      taxId: '78-9012345',
      paymentTerms: 'Net 30',
      creditLimit: 15000
    },
    performance: {
      rating: 4.2,
      totalOrders: 36,
      totalSpent: 42000,
      onTimeDelivery: 96
    },
    notes: 'Office supplies and equipment',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN008',
    name: 'Pharma Packaging Inc.',
    category: 'Packaging',
    status: 'inactive',
    contact: {
      contactPerson: 'Thomas Anderson',
      email: 'thomas.anderson@pharmapkg.com',
      phone: '(555) 890-1234',
      website: 'www.pharmapackaging.com'
    },
    address: {
      street: '456 Industrial Blvd',
      city: 'Memphis',
      state: 'TN',
      zipCode: '38101'
    },
    business: {
      taxId: '89-0123456',
      paymentTerms: 'Net 30',
      creditLimit: 30000
    },
    performance: {
      rating: 3.9,
      totalOrders: 18,
      totalSpent: 35000,
      onTimeDelivery: 88
    },
    notes: 'Pharmacy packaging supplies - contract expired',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN009',
    name: 'MedFoods Catering',
    category: 'Food & Beverages',
    status: 'active',
    contact: {
      contactPerson: 'Emily Rodriguez',
      email: 'emily.rodriguez@medfoods.com',
      phone: '(555) 901-2345',
      website: 'www.medfoodscatering.com'
    },
    address: {
      street: '789 Culinary Way',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108'
    },
    business: {
      taxId: '90-1234567',
      paymentTerms: 'Net 15',
      creditLimit: 10000
    },
    performance: {
      rating: 4.5,
      totalOrders: 52,
      totalSpent: 28000,
      onTimeDelivery: 99
    },
    notes: 'Staff cafeteria and event catering',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN010',
    name: 'SafeGuard Security',
    category: 'Security Services',
    status: 'active',
    contact: {
      contactPerson: 'James Wilson',
      email: 'james.wilson@safeguard.com',
      phone: '(555) 012-3456',
      website: 'www.safeguardsecurity.com'
    },
    address: {
      street: '321 Security Ave',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001'
    },
    business: {
      taxId: '01-2345678',
      paymentTerms: 'Net 30',
      creditLimit: 45000
    },
    performance: {
      rating: 4.7,
      totalOrders: 24,
      totalSpent: 120000,
      onTimeDelivery: 100
    },
    notes: 'Security systems and monitoring services',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN011',
    name: 'GreenLeaf Landscaping',
    category: 'Maintenance',
    status: 'active',
    contact: {
      contactPerson: 'Michelle Lee',
      email: 'michelle.lee@greenleaf.com',
      phone: '(555) 123-4567',
      website: 'www.greenleaflandscaping.com'
    },
    address: {
      street: '456 Garden Way',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201'
    },
    business: {
      taxId: '12-3456789',
      paymentTerms: 'Net 15',
      creditLimit: 8000
    },
    performance: {
      rating: 4.4,
      totalOrders: 12,
      totalSpent: 24000,
      onTimeDelivery: 92
    },
    notes: 'Landscaping and grounds maintenance',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN012',
    name: 'MedWaste Disposal',
    category: 'Waste Management',
    status: 'active',
    contact: {
      contactPerson: 'Daniel Brown',
      email: 'daniel.brown@medwaste.com',
      phone: '(555) 234-5678',
      website: 'www.medwastedisposal.com'
    },
    address: {
      street: '789 Disposal Rd',
      city: 'Denver',
      state: 'CO',
      zipCode: '80201'
    },
    business: {
      taxId: '23-4567890',
      paymentTerms: 'Net 30',
      creditLimit: 20000
    },
    performance: {
      rating: 4.6,
      totalOrders: 36,
      totalSpent: 72000,
      onTimeDelivery: 98
    },
    notes: 'Medical waste disposal and compliance services',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN013',
    name: 'PharmaLabels Inc.',
    category: 'Packaging',
    status: 'active',
    contact: {
      contactPerson: 'Sophia Martinez',
      email: 'sophia.martinez@pharmalabels.com',
      phone: '(555) 345-6789',
      website: 'www.pharmalabelsinc.com'
    },
    address: {
      street: '123 Label St',
      city: 'Nashville',
      state: 'TN',
      zipCode: '37201'
    },
    business: {
      taxId: '34-5678901',
      paymentTerms: 'Net 30',
      creditLimit: 15000
    },
    performance: {
      rating: 4.5,
      totalOrders: 48,
      totalSpent: 36000,
      onTimeDelivery: 97
    },
    notes: 'Pharmacy labels and printing supplies',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN014',
    name: 'MedEquip Solutions',
    category: 'Equipment',
    status: 'active',
    contact: {
      contactPerson: 'William Johnson',
      email: 'william.johnson@medequip.com',
      phone: '(555) 456-7890',
      website: 'www.medequipsolutions.com'
    },
    address: {
      street: '456 Equipment Blvd',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101'
    },
    business: {
      taxId: '45-6789012',
      paymentTerms: 'Net 45',
      creditLimit: 60000
    },
    performance: {
      rating: 4.3,
      totalOrders: 15,
      totalSpent: 85000,
      onTimeDelivery: 93
    },
    notes: 'Pharmacy equipment and fixtures',
    contracts: [],
    orders: []
  },
  {
    id: 'VEN015',
    name: 'Refrigeration Experts',
    category: 'Equipment',
    status: 'active',
    contact: {
      contactPerson: 'Olivia Taylor',
      email: 'olivia.taylor@refrigexperts.com',
      phone: '(555) 567-8901',
      website: 'www.refrigerationexperts.com'
    },
    address: {
      street: '789 Cooling Way',
      city: 'Minneapolis',
      state: 'MN',
      zipCode: '55401'
    },
    business: {
      taxId: '56-7890123',
      paymentTerms: 'Net 30',
      creditLimit: 40000
    },
    performance: {
      rating: 4.8,
      totalOrders: 8,
      totalSpent: 120000,
      onTimeDelivery: 100
    },
    notes: 'Specialized pharmaceutical refrigeration systems',
    contracts: [],
    orders: []
  }
];