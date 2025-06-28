export interface PurchaseOrder {
  id: string;
  vendor: string;
  priority: string;
  status: string;
  department: string;
  requestedBy: string;
  createdDate: string;
  deliveryDate: string;
  deliveryAddress: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  financials: {
    subtotal: number;
    tax: number;
    total: number;
  };
  notes: string;
  approvals: {
    approver: string;
    date: string;
    status: string;
    comments: string;
  }[];
  tracking: {
    created: string;
    lastUpdated: string;
    receivedDate?: string;
    receivedBy?: string;
  };
}

export const purchaseOrderData: PurchaseOrder[] = [
  {
    id: 'PO-2024-001',
    vendor: 'Cardinal Health',
    priority: 'normal',
    status: 'approved',
    department: 'Pharmacy',
    requestedBy: 'Dr. Sarah Johnson',
    createdDate: '2024-01-05',
    deliveryDate: '2024-01-15',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Lisinopril 10mg Tablets',
        quantity: 500,
        unitPrice: 0.15,
        total: 75.00
      },
      {
        description: 'Metformin 500mg Tablets',
        quantity: 1000,
        unitPrice: 0.08,
        total: 80.00
      },
      {
        description: 'Atorvastatin 20mg Tablets',
        quantity: 300,
        unitPrice: 0.25,
        total: 75.00
      }
    ],
    financials: {
      subtotal: 230.00,
      tax: 18.40,
      total: 248.40
    },
    notes: 'Regular monthly order for maintenance medications',
    approvals: [
      {
        approver: 'James Wilson',
        date: '2024-01-06',
        status: 'approved',
        comments: 'Approved as requested'
      }
    ],
    tracking: {
      created: '2024-01-05T10:30:00Z',
      lastUpdated: '2024-01-06T14:15:00Z',
      receivedDate: '2024-01-15T11:20:00Z',
      receivedBy: 'Mike Chen'
    }
  },
  {
    id: 'PO-2024-002',
    vendor: 'McKesson Corporation',
    priority: 'high',
    status: 'pending',
    department: 'Pharmacy',
    requestedBy: 'Dr. Sarah Johnson',
    createdDate: '2024-01-10',
    deliveryDate: '2024-01-18',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Amoxicillin 500mg Capsules',
        quantity: 300,
        unitPrice: 0.12,
        total: 36.00
      },
      {
        description: 'Azithromycin 250mg Tablets',
        quantity: 200,
        unitPrice: 0.35,
        total: 70.00
      },
      {
        description: 'Prednisone 10mg Tablets',
        quantity: 200,
        unitPrice: 0.10,
        total: 20.00
      }
    ],
    financials: {
      subtotal: 126.00,
      tax: 10.08,
      total: 136.08
    },
    notes: 'Expedited order for antibiotics due to increased demand',
    approvals: [],
    tracking: {
      created: '2024-01-10T09:45:00Z',
      lastUpdated: '2024-01-10T09:45:00Z'
    }
  },
  {
    id: 'PO-2024-003',
    vendor: 'Medical Supplies Co.',
    priority: 'normal',
    status: 'received',
    department: 'Front Store',
    requestedBy: 'James Wilson',
    createdDate: '2024-01-03',
    deliveryDate: '2024-01-12',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Disposable Face Masks (Box of 50)',
        quantity: 20,
        unitPrice: 12.99,
        total: 259.80
      },
      {
        description: 'Hand Sanitizer 8oz',
        quantity: 50,
        unitPrice: 3.99,
        total: 199.50
      },
      {
        description: 'Nitrile Gloves (Box of 100)',
        quantity: 15,
        unitPrice: 15.99,
        total: 239.85
      }
    ],
    financials: {
      subtotal: 699.15,
      tax: 55.93,
      total: 755.08
    },
    notes: 'Regular order for front store medical supplies',
    approvals: [
      {
        approver: 'James Wilson',
        date: '2024-01-04',
        status: 'approved',
        comments: 'Approved'
      }
    ],
    tracking: {
      created: '2024-01-03T14:20:00Z',
      lastUpdated: '2024-01-12T10:30:00Z',
      receivedDate: '2024-01-12T10:30:00Z',
      receivedBy: 'Robert Garcia'
    }
  },
  {
    id: 'PO-2024-004',
    vendor: 'TechRx Solutions',
    priority: 'normal',
    status: 'approved',
    department: 'Management',
    requestedBy: 'James Wilson',
    createdDate: '2024-01-08',
    deliveryDate: '2024-01-25',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Barcode Scanner',
        quantity: 2,
        unitPrice: 199.99,
        total: 399.98
      },
      {
        description: 'Label Printer',
        quantity: 1,
        unitPrice: 349.99,
        total: 349.99
      },
      {
        description: 'Pharmacy Software License (Annual)',
        quantity: 1,
        unitPrice: 1200.00,
        total: 1200.00
      }
    ],
    financials: {
      subtotal: 1949.97,
      tax: 156.00,
      total: 2105.97
    },
    notes: 'Technology upgrades for pharmacy operations',
    approvals: [
      {
        approver: 'James Wilson',
        date: '2024-01-09',
        status: 'approved',
        comments: 'Approved as per budget allocation'
      }
    ],
    tracking: {
      created: '2024-01-08T11:15:00Z',
      lastUpdated: '2024-01-09T13:45:00Z'
    }
  },
  {
    id: 'PO-2024-005',
    vendor: 'CleanCare Products',
    priority: 'low',
    status: 'received',
    department: 'Front Store',
    requestedBy: 'Robert Garcia',
    createdDate: '2024-01-02',
    deliveryDate: '2024-01-10',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'All-Purpose Cleaner (Gallon)',
        quantity: 10,
        unitPrice: 8.99,
        total: 89.90
      },
      {
        description: 'Disinfectant Wipes (Canister)',
        quantity: 30,
        unitPrice: 5.99,
        total: 179.70
      },
      {
        description: 'Paper Towels (Case)',
        quantity: 5,
        unitPrice: 24.99,
        total: 124.95
      }
    ],
    financials: {
      subtotal: 394.55,
      tax: 31.56,
      total: 426.11
    },
    notes: 'Regular cleaning supplies order',
    approvals: [
      {
        approver: 'James Wilson',
        date: '2024-01-03',
        status: 'approved',
        comments: 'Approved'
      }
    ],
    tracking: {
      created: '2024-01-02T09:30:00Z',
      lastUpdated: '2024-01-10T15:20:00Z',
      receivedDate: '2024-01-10T15:20:00Z',
      receivedBy: 'Robert Garcia'
    }
  },
  {
    id: 'PO-2024-006',
    vendor: 'AmerisourceBergen',
    priority: 'urgent',
    status: 'pending',
    department: 'Pharmacy',
    requestedBy: 'Dr. Sarah Johnson',
    createdDate: '2024-01-15',
    deliveryDate: '2024-01-18',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Insulin Glargine 100 units/mL',
        quantity: 20,
        unitPrice: 125.00,
        total: 2500.00
      },
      {
        description: 'Insulin Syringes (Box of 100)',
        quantity: 15,
        unitPrice: 15.99,
        total: 239.85
      },
      {
        description: 'Glucose Test Strips (Box of 50)',
        quantity: 25,
        unitPrice: 45.99,
        total: 1149.75
      }
    ],
    financials: {
      subtotal: 3889.60,
      tax: 311.17,
      total: 4200.77
    },
    notes: 'Urgent order for diabetic supplies - low stock alert',
    approvals: [],
    tracking: {
      created: '2024-01-15T08:45:00Z',
      lastUpdated: '2024-01-15T08:45:00Z'
    }
  },
  {
    id: 'PO-2024-007',
    vendor: 'Office Depot',
    priority: 'normal',
    status: 'approved',
    department: 'Management',
    requestedBy: 'James Wilson',
    createdDate: '2024-01-12',
    deliveryDate: '2024-01-20',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Copy Paper (Case)',
        quantity: 5,
        unitPrice: 35.99,
        total: 179.95
      },
      {
        description: 'Ink Cartridges (Set)',
        quantity: 3,
        unitPrice: 89.99,
        total: 269.97
      },
      {
        description: 'Office Supplies Bundle',
        quantity: 2,
        unitPrice: 45.99,
        total: 91.98
      }
    ],
    financials: {
      subtotal: 541.90,
      tax: 43.35,
      total: 585.25
    },
    notes: 'Monthly office supplies order',
    approvals: [
      {
        approver: 'James Wilson',
        date: '2024-01-13',
        status: 'approved',
        comments: 'Approved as requested'
      }
    ],
    tracking: {
      created: '2024-01-12T13:30:00Z',
      lastUpdated: '2024-01-13T10:15:00Z'
    }
  },
  {
    id: 'PO-2024-008',
    vendor: 'PharmaLabels Inc.',
    priority: 'normal',
    status: 'received',
    department: 'Pharmacy',
    requestedBy: 'Mike Chen',
    createdDate: '2024-01-04',
    deliveryDate: '2024-01-14',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Prescription Labels (Roll of 1000)',
        quantity: 10,
        unitPrice: 24.99,
        total: 249.90
      },
      {
        description: 'Auxiliary Warning Labels (Pack)',
        quantity: 5,
        unitPrice: 12.99,
        total: 64.95
      },
      {
        description: 'Pharmacy Bags (Box of 500)',
        quantity: 4,
        unitPrice: 35.99,
        total: 143.96
      }
    ],
    financials: {
      subtotal: 458.81,
      tax: 36.70,
      total: 495.51
    },
    notes: 'Regular order for pharmacy labeling supplies',
    approvals: [
      {
        approver: 'Dr. Sarah Johnson',
        date: '2024-01-05',
        status: 'approved',
        comments: 'Approved'
      }
    ],
    tracking: {
      created: '2024-01-04T15:45:00Z',
      lastUpdated: '2024-01-14T11:30:00Z',
      receivedDate: '2024-01-14T11:30:00Z',
      receivedBy: 'Mike Chen'
    }
  },
  {
    id: 'PO-2024-009',
    vendor: 'MedWaste Disposal',
    priority: 'normal',
    status: 'approved',
    department: 'Pharmacy',
    requestedBy: 'Dr. Sarah Johnson',
    createdDate: '2024-01-14',
    deliveryDate: '2024-01-30',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Sharps Container Disposal (Monthly Service)',
        quantity: 1,
        unitPrice: 199.99,
        total: 199.99
      },
      {
        description: 'Pharmaceutical Waste Disposal (Monthly Service)',
        quantity: 1,
        unitPrice: 249.99,
        total: 249.99
      },
      {
        description: 'Compliance Documentation',
        quantity: 1,
        unitPrice: 49.99,
        total: 49.99
      }
    ],
    financials: {
      subtotal: 499.97,
      tax: 40.00,
      total: 539.97
    },
    notes: 'Monthly medical waste disposal services',
    approvals: [
      {
        approver: 'James Wilson',
        date: '2024-01-15',
        status: 'approved',
        comments: 'Approved as per contract'
      }
    ],
    tracking: {
      created: '2024-01-14T16:20:00Z',
      lastUpdated: '2024-01-15T09:45:00Z'
    }
  },
  {
    id: 'PO-2024-010',
    vendor: 'Refrigeration Experts',
    priority: 'high',
    status: 'pending',
    department: 'Pharmacy',
    requestedBy: 'James Wilson',
    createdDate: '2024-01-16',
    deliveryDate: '2024-01-23',
    deliveryAddress: '123 Main St, Anytown, ST 12345',
    items: [
      {
        description: 'Pharmaceutical Refrigerator Maintenance',
        quantity: 1,
        unitPrice: 499.99,
        total: 499.99
      },
      {
        description: 'Temperature Monitoring System',
        quantity: 1,
        unitPrice: 1299.99,
        total: 1299.99
      },
      {
        description: 'Backup Power Supply',
        quantity: 1,
        unitPrice: 799.99,
        total: 799.99
      }
    ],
    financials: {
      subtotal: 2599.97,
      tax: 208.00,
      total: 2807.97
    },
    notes: 'Critical maintenance and upgrade for medication refrigeration systems',
    approvals: [],
    tracking: {
      created: '2024-01-16T10:15:00Z',
      lastUpdated: '2024-01-16T10:15:00Z'
    }
  }
];