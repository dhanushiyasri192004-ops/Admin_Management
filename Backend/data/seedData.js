const bcrypt = require('bcryptjs');

// Pre-hashed password for "admin123"
const DEFAULT_HASH = bcrypt.hashSync('admin123', 10);

const hierarchy = {
  states: [
    {
      id: 'ST-TN',
      name: 'Tamil Nadu',
      code: 'TN',
      districts: [
        {
          id: 'DST-SALEM',
          name: 'Salem',
          code: 'SLM',
          divisions: [
            {
              id: 'DIV-SLM-N',
              name: 'Salem North',
              pincodes: ['636001', '636002']
            },
            {
              id: 'DIV-SLM-S',
              name: 'Salem South',
              pincodes: ['636003', '636004']
            }
          ]
        },
        {
          id: 'DST-CBE',
          name: 'Coimbatore',
          code: 'CBE',
          divisions: [
            {
              id: 'DIV-CBE-C',
              name: 'Coimbatore Central',
              pincodes: ['641001', '641002']
            },
            {
              id: 'DIV-CBE-N',
              name: 'Coimbatore North',
              pincodes: ['641003', '641004']
            }
          ]
        }
      ]
    },
    {
      id: 'ST-MH',
      name: 'Maharashtra',
      code: 'MH',
      districts: [
        {
          id: 'DST-PUN',
          name: 'Pune',
          code: 'PUN',
          divisions: [
            {
              id: 'DIV-PUN-W',
              name: 'Pune West',
              pincodes: ['411001', '411002']
            },
            {
              id: 'DIV-PUN-E',
              name: 'Pune East',
              pincodes: ['411003', '411004']
            }
          ]
        }
      ]
    }
  ]
};

const admins = [
  {
    id: 'ADM-001',
    name: 'Rajesh Sharma (State Admin)',
    email: 'state_admin@admin.com',
    passwordHash: DEFAULT_HASH,
    role: 'State Admin',
    state: 'Tamil Nadu',
    district: null,
    division: null,
    pincode: null,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '+91 98765 43210'
  },
  {
    id: 'ADM-002',
    name: 'Ananya Iyer (District Admin)',
    email: 'district_admin@admin.com',
    passwordHash: DEFAULT_HASH,
    role: 'District Admin',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: null,
    pincode: null,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    phone: '+91 98765 43211'
  },
  {
    id: 'ADM-003',
    name: 'Karthik Subramanian (Divisional Admin)',
    email: 'divisional_admin@admin.com',
    passwordHash: DEFAULT_HASH,
    role: 'Divisional Admin',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: null,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+91 98765 43212'
  },
  {
    id: 'ADM-004',
    name: 'Priya Narayanan (Pincode Admin - 636001)',
    email: 'pincode_admin@admin.com',
    passwordHash: DEFAULT_HASH,
    role: 'Pincode Admin',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    phone: '+91 98765 43213'
  },
  {
    id: 'ADM-005',
    name: 'Suresh Raina (Pincode Admin - 636002)',
    email: 'pincode_admin_636002@admin.com',
    passwordHash: DEFAULT_HASH,
    role: 'Pincode Admin',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '+91 98765 43214'
  }
];

const pincodeDetails = [
  { pincode: '636001', areaName: 'Salem Town Fort', division: 'Salem North', district: 'Salem', state: 'Tamil Nadu', assignedAdmin: 'Priya Narayanan', status: 'Active', population: '84,500', totalCustomers: 1420 },
  { pincode: '636002', areaName: 'Shevapet & Market', division: 'Salem North', district: 'Salem', state: 'Tamil Nadu', assignedAdmin: 'Suresh Raina', status: 'Active', population: '62,100', totalCustomers: 980 },
  { pincode: '636003', areaName: 'Ammapet Colony', division: 'Salem South', district: 'Salem', state: 'Tamil Nadu', assignedAdmin: 'Venkatesh Babu', status: 'Active', population: '75,400', totalCustomers: 1150 },
  { pincode: '636004', areaName: 'Gugai Industrial Area', division: 'Salem South', district: 'Salem', state: 'Tamil Nadu', assignedAdmin: 'Meena Kumari', status: 'Active', population: '53,200', totalCustomers: 720 },
  { pincode: '641001', areaName: 'Town Hall & Big Bazaar', division: 'Coimbatore Central', district: 'Coimbatore', state: 'Tamil Nadu', assignedAdmin: 'Arun Kumar', status: 'Active', population: '110,000', totalCustomers: 2300 },
  { pincode: '641002', areaName: 'RS Puram & DB Road', division: 'Coimbatore Central', district: 'Coimbatore', state: 'Tamil Nadu', assignedAdmin: 'Deepa Rajan', status: 'Active', population: '95,000', totalCustomers: 1850 },
  { pincode: '641003', areaName: 'Gandhipuram Central', division: 'Coimbatore North', district: 'Coimbatore', state: 'Tamil Nadu', assignedAdmin: 'Vijay Ganesh', status: 'Active', population: '88,000', totalCustomers: 1400 },
  { pincode: '641004', areaName: 'Peelamedu Tech Zone', division: 'Coimbatore North', district: 'Coimbatore', state: 'Tamil Nadu', assignedAdmin: 'Bhavani Shankar', status: 'Active', population: '102,000', totalCustomers: 1950 },
  { pincode: '411001', areaName: 'Pune Camp & Station', division: 'Pune West', district: 'Pune', state: 'Maharashtra', assignedAdmin: 'Nitin Deshmukh', status: 'Active', population: '130,000', totalCustomers: 2400 },
  { pincode: '411002', areaName: 'Shivajinagar & FC Road', division: 'Pune West', district: 'Pune', state: 'Maharashtra', assignedAdmin: 'Sneha Patil', status: 'Active', population: '115,000', totalCustomers: 2100 }
];

const customers = [
  {
    id: 'CUST-101',
    name: 'Vikram Chandran',
    email: 'vikram.c@gmail.com',
    phone: '+91 98401 12345',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    address: '14/B, Gandhi Road, Fort',
    membership: {
      tier: 'Diamond',
      cardNumber: 'CARD-DIA-88902',
      issueDate: '2025-01-15',
      expiryDate: '2027-01-15',
      points: 4500,
      discountPercent: 20,
      status: 'Active'
    },
    totalOrders: 28,
    totalSpent: 48500,
    status: 'Active',
    joinedDate: '2024-03-12'
  },
  {
    id: 'CUST-102',
    name: 'Lakshmi Narayanan',
    email: 'lakshmi.n@yahoo.com',
    phone: '+91 98402 23456',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    address: '88, Rajaji Street, Hasthampatti',
    membership: {
      tier: 'Gold',
      cardNumber: 'CARD-GLD-77341',
      issueDate: '2025-06-10',
      expiryDate: '2026-06-10',
      points: 2100,
      discountPercent: 12,
      status: 'Active'
    },
    totalOrders: 14,
    totalSpent: 22400,
    status: 'Active',
    joinedDate: '2024-08-19'
  },
  {
    id: 'CUST-103',
    name: 'Ramesh Sundaram',
    email: 'ramesh.s@hotmail.com',
    phone: '+91 98403 34567',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    address: '23, Anna Nagar East, 636001',
    membership: {
      tier: 'Silver',
      cardNumber: 'CARD-SLV-11209',
      issueDate: '2025-09-01',
      expiryDate: '2026-09-01',
      points: 850,
      discountPercent: 5,
      status: 'Active'
    },
    totalOrders: 6,
    totalSpent: 8900,
    status: 'Active',
    joinedDate: '2025-01-05'
  },
  {
    id: 'CUST-104',
    name: 'Divya Prakash',
    email: 'divya.p@outlook.com',
    phone: '+91 98404 45678',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    address: '45, Shevapet Main Road',
    membership: {
      tier: 'Gold',
      cardNumber: 'CARD-GLD-66542',
      issueDate: '2025-04-12',
      expiryDate: '2026-04-12',
      points: 1950,
      discountPercent: 12,
      status: 'Active'
    },
    totalOrders: 18,
    totalSpent: 31200,
    status: 'Active',
    joinedDate: '2024-05-11'
  },
  {
    id: 'CUST-105',
    name: 'Ganesh Moorthy',
    email: 'ganesh.m@gmail.com',
    phone: '+91 98405 56789',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636003',
    address: '12, Ammapet Weavers Colony',
    membership: {
      tier: 'Diamond',
      cardNumber: 'CARD-DIA-99431',
      issueDate: '2024-11-20',
      expiryDate: '2026-11-20',
      points: 5200,
      discountPercent: 20,
      status: 'Active'
    },
    totalOrders: 32,
    totalSpent: 64000,
    status: 'Active',
    joinedDate: '2023-11-15'
  },
  {
    id: 'CUST-106',
    name: 'Kavitha Radhakrishnan',
    email: 'kavitha.r@gmail.com',
    phone: '+91 98406 67890',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641001',
    address: '52, Big Bazaar Street',
    membership: {
      tier: 'Diamond',
      cardNumber: 'CARD-DIA-55612',
      issueDate: '2025-02-18',
      expiryDate: '2027-02-18',
      points: 6100,
      discountPercent: 20,
      status: 'Active'
    },
    totalOrders: 41,
    totalSpent: 89400,
    status: 'Active',
    joinedDate: '2023-08-01'
  },
  {
    id: 'CUST-107',
    name: 'Siddharth Joshi',
    email: 'siddharth.j@gmail.com',
    phone: '+91 98201 11223',
    state: 'Maharashtra',
    district: 'Pune',
    division: 'Pune West',
    pincode: '411001',
    address: '108, MG Road, Camp Area',
    membership: {
      tier: 'Gold',
      cardNumber: 'CARD-GLD-33412',
      issueDate: '2025-03-01',
      expiryDate: '2026-03-01',
      points: 2800,
      discountPercent: 12,
      status: 'Active'
    },
    totalOrders: 22,
    totalSpent: 42000,
    status: 'Active',
    joinedDate: '2024-02-14'
  },
  {
    id: 'CUST-108',
    name: 'Pradeep Kumar',
    email: 'pradeep.k@gmail.com',
    phone: '+91 98407 78901',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    address: '15, Meyyanur Main Road, 636001',
    membership: null,
    totalOrders: 3,
    totalSpent: 3400,
    status: 'Active',
    joinedDate: '2025-02-10'
  },
  {
    id: 'CUST-109',
    name: 'Anitha Soundararajan',
    email: 'anitha.s@outlook.com',
    phone: '+91 98408 89012',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636003',
    address: '28, Gandhi Road, Ammapet',
    membership: null,
    totalOrders: 5,
    totalSpent: 6200,
    status: 'Active',
    joinedDate: '2025-01-18'
  },
  {
    id: 'CUST-110',
    name: 'Manoj Balaji',
    email: 'manoj.b@yahoo.com',
    phone: '+91 98409 90123',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641001',
    address: '74, Cross Cut Road, Gandhipuram',
    membership: null,
    totalOrders: 2,
    totalSpent: 2100,
    status: 'Active',
    joinedDate: '2025-03-01'
  },
  {
    id: 'CUST-111',
    name: 'Saravanan Veerasamy',
    email: 'saravanan.v@gmail.com',
    phone: '+91 98410 01234',
    state: 'Tamil Nadu',
    district: 'Madurai',
    division: 'Madurai North',
    pincode: '625001',
    address: '19, West Tower Street, Madurai',
    membership: null,
    totalOrders: 4,
    totalSpent: 4800,
    status: 'Active',
    joinedDate: '2025-02-22'
  }
];

const vendors = [
  {
    id: 'VND-001',
    name: 'Sri Krishna Electricals & Spares',
    contactPerson: 'Krishna Murthy',
    email: 'krishna.elec@vendor.com',
    phone: '+91 94431 10001',
    category: 'Services',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    address: '42, Bazaar Street, Fort, Salem',
    rating: 4.8,
    bankDetails: {
      accountNumber: '918020019284102',
      ifsc: 'HDFC0001234',
      bankName: 'HDFC Bank',
      upiId: 'srikrishna@okhdfcbank'
    },
    kycStatus: 'Verified',
    addedBy: {
      id: 'ADM-001',
      name: 'Rajesh Sharma',
      role: 'State Admin',
      phone: '+91 98765 43210',
      email: 'state_admin@admin.com',
      addedAt: '2026-02-10'
    },
    assignedAgent: {
      id: 'AGT-701',
      name: 'Thirunavukkarasu R',
      phone: '+91 98940 55101'
    },
    totalOrdersDelivered: 245,
    pendingPayout: 18500,
    status: 'Active'
  },
  {
    id: 'VND-002',
    name: 'Salem Supermart & Grocery Supplies',
    contactPerson: 'Babu Janardhan',
    email: 'salem.supermart@vendor.com',
    phone: '+91 94431 10002',
    category: 'Food',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    address: '10, Fort Main Road, Salem',
    rating: 4.6,
    bankDetails: {
      accountNumber: '60291011002341',
      ifsc: 'SBIN0000890',
      bankName: 'State Bank of India',
      upiId: 'salemsupermart@oksbi'
    },
    kycStatus: 'Verified',
    addedBy: {
      id: 'MGR-PIN-01',
      name: 'Saravanan Muthuraj',
      role: 'Pincode Manager',
      phone: '+91 98409 66001',
      email: 'saravanan.636001@forgeindia.in',
      addedAt: '2026-02-15'
    },
    assignedAgent: {
      id: 'AGT-702',
      name: 'Jayachandran Mohan',
      phone: '+91 98940 55102'
    },
    totalOrdersDelivered: 412,
    pendingPayout: 34200,
    status: 'Active'
  },
  {
    id: 'VND-003',
    name: 'Shevapet Textures & Home Decors',
    contactPerson: 'Govindarajulu',
    email: 'shevapet.textures@vendor.com',
    phone: '+91 94431 10003',
    category: 'Daily Needs',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    address: '77, Shevapet Weaving Lane',
    rating: 4.4,
    bankDetails: {
      accountNumber: '003201509923',
      ifsc: 'ICIC0000032',
      bankName: 'ICICI Bank',
      upiId: 'shevapettext@icici'
    },
    kycStatus: 'Pending',
    addedBy: {
      id: 'AGT-PIN-01',
      name: 'Naveen Kumar M',
      role: 'Pincode Agent',
      phone: '+91 98940 55103',
      email: 'naveen.agent@gmail.com',
      addedAt: '2026-02-20'
    },
    assignedAgent: {
      id: 'AGT-703',
      name: 'Naveen Kumar M',
      phone: '+91 98940 55103'
    },
    totalOrdersDelivered: 110,
    pendingPayout: 12000,
    status: 'Active'
  },
  {
    id: 'VND-004',
    name: 'Kovai Industrial Components',
    contactPerson: 'Santhosh Vel',
    email: 'kovai.ind@vendor.com',
    phone: '+91 94431 10004',
    category: 'Product',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641001',
    address: '12, Town Hall Extension',
    rating: 4.9,
    bankDetails: {
      accountNumber: '5010028491023',
      ifsc: 'HDFC0000189',
      bankName: 'HDFC Bank',
      upiId: 'kovaiind@hdfcbank'
    },
    kycStatus: 'Verified',
    addedBy: {
      id: 'ADM-002',
      name: 'Ananya Iyer',
      role: 'District Admin',
      phone: '+91 98765 43211',
      email: 'district_admin@admin.com',
      addedAt: '2026-02-24'
    },
    assignedAgent: {
      id: 'AGT-701',
      name: 'Thirunavukkarasu R',
      phone: '+91 98940 55101'
    },
    totalOrdersDelivered: 590,
    pendingPayout: 56000,
    status: 'Active'
  }
];

const vendorPayments = [
  {
    id: 'VPAY-901',
    vendorId: 'VND-001',
    vendorName: 'Sri Krishna Electricals & Spares',
    amount: 18500,
    requestDate: '2026-03-01',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    invoiceNumber: 'INV-2026-0881',
    bankDetails: 'HDFC Bank - A/C ...4102',
    status: 'Pending',
    notes: 'Monthly spare supply settlement'
  },
  {
    id: 'VPAY-902',
    vendorId: 'VND-002',
    vendorName: 'Salem Supermart & Grocery Supplies',
    amount: 34200,
    requestDate: '2026-02-28',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    invoiceNumber: 'INV-2026-0842',
    bankDetails: 'SBI - A/C ...2341',
    status: 'Approved',
    approvedBy: 'Priya Narayanan (Pincode Admin)',
    approvalDate: '2026-03-02',
    notes: 'Bulk consumer pack orders'
  },
  {
    id: 'VPAY-903',
    vendorId: 'VND-003',
    vendorName: 'Shevapet Textures & Home Decors',
    amount: 12000,
    requestDate: '2026-02-25',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    invoiceNumber: 'INV-2026-0790',
    bankDetails: 'ICICI Bank - A/C ...9923',
    status: 'Paid',
    approvedBy: 'Suresh Raina (Pincode Admin)',
    approvalDate: '2026-02-26',
    transactionRef: 'UTR99824102941',
    notes: 'Textile clearance'
  }
];

const orders = [
  {
    id: 'ORD-5001',
    orderNumber: 'ORD-2026-001',
    customerId: 'CUST-101',
    customerName: 'Vikram Chandran',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    items: [
      { name: 'Smart Home Automation Hub', qty: 1, price: 6500, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=150&auto=format&fit=crop&q=60' },
      { name: 'Motion Sensor Light Pack', qty: 2, price: 1200, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 8900,
    discountAmount: 1780,
    netPayable: 7120,
    membershipTier: 'Diamond',
    status: 'Delivered',
    paymentMode: 'Online (UPI)',
    orderDate: '2026-03-01 10:30',
    deliveryDate: '2026-03-02 14:00'
  },
  {
    id: 'ORD-5002',
    orderNumber: 'ORD-2026-002',
    customerId: 'CUST-102',
    customerName: 'Lakshmi Narayanan',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    items: [
      { name: 'Organic Cold Pressed Oil Box', qty: 3, price: 1100, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&auto=format&fit=crop&q=60' },
      { name: 'Millets Nutrition Pack', qty: 2, price: 450, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 4200,
    discountAmount: 504,
    netPayable: 3696,
    membershipTier: 'Gold',
    status: 'Out for Delivery',
    paymentMode: 'Cash on Delivery',
    orderDate: '2026-03-02 09:15',
    deliveryDate: '2026-03-03'
  },
  {
    id: 'ORD-5003',
    orderNumber: 'ORD-2026-003',
    customerId: 'CUST-103',
    customerName: 'Ramesh Sundaram',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    items: [
      { name: 'Water Purifier Filter Cartridge', qty: 2, price: 850, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 1700,
    discountAmount: 85,
    netPayable: 1615,
    membershipTier: 'Silver',
    status: 'Processing',
    paymentMode: 'Net Banking',
    orderDate: '2026-03-03 08:00',
    deliveryDate: '2026-03-04'
  },
  {
    id: 'ORD-5004',
    orderNumber: 'ORD-2026-004',
    customerId: 'CUST-104',
    customerName: 'Divya Prakash',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    items: [
      { name: 'Cotton Bed Linen Combo', qty: 2, price: 2200, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 4400,
    discountAmount: 528,
    netPayable: 3872,
    membershipTier: 'Gold',
    status: 'Shipped',
    paymentMode: 'Credit Card',
    orderDate: '2026-03-01 16:45',
    deliveryDate: '2026-03-03'
  },
  {
    id: 'ORD-5005',
    orderNumber: 'ORD-2026-005',
    customerId: 'CUST-106',
    customerName: 'Kavitha Radhakrishnan',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641001',
    items: [
      { name: 'Heavy Duty Precision Tool Set', qty: 1, price: 12500, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 12500,
    discountAmount: 2500,
    netPayable: 10000,
    membershipTier: 'Diamond',
    status: 'Delivered',
    paymentMode: 'Online (UPI)',
    orderDate: '2026-02-28 11:20',
    deliveryDate: '2026-03-01'
  },
  {
    id: 'ORD-5006',
    orderNumber: 'ORD-2026-006',
    customerId: 'CUST-108',
    customerName: 'Pradeep Kumar',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    items: [
      { name: 'LED Flood Light 50W', qty: 2, price: 1200, image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 2400,
    discountAmount: 0,
    netPayable: 2400,
    membershipTier: null,
    status: 'Processing',
    paymentMode: 'Cash on Delivery',
    orderDate: '2026-03-03 14:10',
    deliveryDate: '2026-03-05'
  },
  {
    id: 'ORD-5007',
    orderNumber: 'ORD-2026-007',
    customerId: 'CUST-109',
    customerName: 'Anitha Soundararajan',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636003',
    items: [
      { name: 'Stainless Steel Kitchen Rack Set', qty: 1, price: 1850, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 1850,
    discountAmount: 0,
    netPayable: 1850,
    membershipTier: null,
    status: 'Delivered',
    paymentMode: 'Online (UPI)',
    orderDate: '2026-03-02 16:30',
    deliveryDate: '2026-03-04'
  },
  {
    id: 'ORD-5008',
    orderNumber: 'ORD-2026-008',
    customerId: 'CUST-110',
    customerName: 'Manoj Balaji',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641001',
    items: [
      { name: 'Industrial Safety Gloves Pack', qty: 5, price: 190, image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 950,
    discountAmount: 0,
    netPayable: 950,
    membershipTier: null,
    status: 'Shipped',
    paymentMode: 'Online (UPI)',
    orderDate: '2026-03-03 11:00',
    deliveryDate: '2026-03-05'
  },
  {
    id: 'ORD-5009',
    orderNumber: 'ORD-2026-009',
    customerId: 'CUST-111',
    customerName: 'Sathish Kumar V',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    items: [
      { name: 'Smart Wireless Doorbell Camera', qty: 1, price: 3200, image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 3200,
    discountAmount: 384,
    netPayable: 2816,
    membershipTier: 'Gold',
    status: 'Cancelled',
    paymentMode: 'Credit Card',
    orderDate: '2026-03-02 12:45',
    deliveryDate: null
  },
  {
    id: 'ORD-5010',
    orderNumber: 'ORD-2026-010',
    customerId: 'CUST-112',
    customerName: 'Priya Dharshini M',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    items: [
      { name: 'Ergonomic Lumbar Cushion', qty: 1, price: 1499, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=150&auto=format&fit=crop&q=60' }
    ],
    totalAmount: 1499,
    discountAmount: 300,
    netPayable: 1199,
    membershipTier: 'Diamond',
    status: 'Return Requested',
    paymentMode: 'Online (UPI)',
    orderDate: '2026-02-27 15:10',
    deliveryDate: '2026-03-01'
  }
];

const bookings = [
  {
    id: 'BKG-301',
    bookingNumber: 'BK-2026-001',
    customerName: 'Vikram Chandran',
    service: 'AC Deep Service & Gas Refill',
    bookingType: 'Service',
    membershipTier: 'Diamond',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    scheduledDate: '2026-03-05 10:00 AM',
    technicianAssigned: 'Murugan Perumal',
    charge: 1499,
    status: 'Confirmed'
  },
  {
    id: 'BKG-302',
    bookingNumber: 'BK-2026-002',
    customerName: 'Lakshmi Narayanan',
    service: 'Plumbing & Water Filter Repair',
    bookingType: 'Service',
    membershipTier: 'Gold',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    scheduledDate: '2026-03-04 02:30 PM',
    technicianAssigned: 'Selvamurthy R',
    charge: 650,
    status: 'In Progress'
  },
  {
    id: 'BKG-303',
    bookingNumber: 'BK-2026-003',
    customerName: 'Divya Prakash',
    service: 'Electrical Switchboard Modernization',
    bookingType: 'Service',
    membershipTier: 'Gold',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    scheduledDate: '2026-03-06 11:00 AM',
    technicianAssigned: 'Palanisamy K',
    charge: 950,
    status: 'Pending'
  },
  {
    id: 'BKG-304',
    bookingNumber: 'BK-2026-004',
    customerName: 'Kavitha Radhakrishnan',
    service: 'Heritage Resort Stay & Room Booking',
    bookingType: 'Stay',
    membershipTier: 'Diamond',
    stayExecutive: 'Balaji Varma',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    scheduledDate: '2026-03-07 12:00 PM',
    charge: 3500,
    status: 'Confirmed'
  },
  {
    id: 'BKG-305',
    bookingNumber: 'BK-2026-005',
    customerName: 'Pradeep Kumar',
    service: 'Airport Cab Transfer & Outstation Travel',
    bookingType: 'Travel',
    membershipTier: 'Normal',
    travelExecutive: 'Manikandan S',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    scheduledDate: '2026-03-08 07:00 AM',
    charge: 1800,
    status: 'In Progress'
  }
];

const jobs = [
  {
    id: 'APP-2026-001',
    title: 'HVAC Maintenance Specialist',
    jobTitle: 'HVAC Maintenance Specialist',
    vendorName: 'CoolCare Services Pvt Ltd',
    jobType: 'Full-time',
    category: 'Non-IT',
    customerName: 'Vikram Chandran',
    customerEmail: 'vikram.c@gmail.com',
    customerPhone: '+91 98401 23456',
    applicationDate: '2026-03-05 10:30 AM',
    experience: '4+ Years in HVAC & VRF Diagnostics',
    education: 'Diploma in Mechanical Engineering (Air Conditioning)',
    skills: ['HVAC Repair', 'Gas Charging', 'Inverter PCB Diagnosis', 'Safety Protocols'],
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    status: 'Shortlisted',
    resumeName: 'Vikram_Chandran_Resume.pdf',
    createdAt: '2026-03-05'
  },
  {
    id: 'APP-2026-002',
    title: 'Master Plumbing Technician',
    jobTitle: 'Master Plumbing Technician',
    vendorName: 'AquaFlow Infrastructure',
    jobType: 'Full-time',
    category: 'Non-IT',
    customerName: 'Lakshmi Narayanan',
    customerEmail: 'lakshmi.n@gmail.com',
    customerPhone: '+91 98402 34567',
    applicationDate: '2026-03-04 02:15 PM',
    experience: '6 Years in Industrial & Residential Plumbing',
    education: 'ITI Certified Plumber & Pipe Fitter',
    skills: ['Pipe Fitting', 'Water Filter Tech', 'Drainage Design', 'Leak Detection'],
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    status: 'Under Review',
    resumeName: 'Lakshmi_Narayanan_CV.pdf',
    createdAt: '2026-03-04'
  },
  {
    id: 'APP-2026-003',
    title: 'Senior Electrical Engineer',
    jobTitle: 'Senior Electrical Engineer',
    vendorName: 'VoltMaster Electricals',
    jobType: 'Contract',
    category: 'IT',
    customerName: 'Divya Prakash',
    customerEmail: 'divya.p@gmail.com',
    customerPhone: '+91 98403 45678',
    applicationDate: '2026-03-06 11:20 AM',
    experience: '3.5 Years in Industrial Switchgear & Wiring',
    education: 'B.E. Electrical & Electronics Engineering',
    skills: ['Switchgear Wiring', 'Load Balancing', 'Circuit Breakers', 'PLC Basics'],
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    status: 'Interview',
    resumeName: 'Divya_Prakash_Resume.pdf',
    createdAt: '2026-03-06'
  },
  {
    id: 'APP-2026-004',
    title: 'Hotel Front Office Supervisor',
    jobTitle: 'Hotel Front Office Supervisor',
    vendorName: 'Grand Heritage Resort & Suites',
    jobType: 'Full-time',
    category: 'Non-IT',
    customerName: 'Kavitha Radhakrishnan',
    customerEmail: 'kavitha.r@gmail.com',
    customerPhone: '+91 98404 56789',
    applicationDate: '2026-03-07 09:45 AM',
    experience: '5 Years in Luxury Hospitality Management',
    education: 'B.Sc. in Hotel Management & Catering',
    skills: ['Guest Relations', 'PMS Software', 'Team Leadership', 'Billing & Auditing'],
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    status: 'Selected',
    resumeName: 'Kavitha_Radhakrishnan_Resume.pdf',
    createdAt: '2026-03-07'
  },
  {
    id: 'APP-2026-005',
    title: 'Tour Fleet Chauffeur & Driver',
    jobTitle: 'Tour Fleet Chauffeur & Driver',
    vendorName: 'RapidGo Express Travels',
    jobType: 'Full-time',
    category: 'Non-IT',
    customerName: 'Pradeep Kumar',
    customerEmail: 'pradeep.k@gmail.com',
    customerPhone: '+91 98405 67890',
    applicationDate: '2026-03-08 04:10 PM',
    experience: '7 Years Commercial Heavy & Light Vehicle Driving',
    education: 'Commercial Heavy Badge License holder',
    skills: ['Defensive Driving', 'GPS Route Optimization', 'Fleet Maintenance', 'Customer Courtesy'],
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    status: 'Application Submitted',
    resumeName: 'Pradeep_Kumar_Driver_Profile.pdf',
    createdAt: '2026-03-08'
  },
  {
    id: 'APP-2026-006',
    title: 'Full Stack React & Node Developer',
    jobTitle: 'Full Stack React & Node Developer',
    vendorName: 'TechVibe Software Solutions',
    jobType: 'Full-time',
    category: 'IT',
    customerName: 'Siddharth Joshi',
    customerEmail: 'siddharth.j@gmail.com',
    customerPhone: '+91 98201 11223',
    applicationDate: '2026-03-08 01:20 PM',
    experience: '3+ Years in JavaScript, React & Node.js',
    education: 'B.Tech in Computer Science & Engineering',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'REST APIs'],
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    status: 'Shortlisted',
    resumeName: 'Siddharth_Joshi_Resume.pdf',
    createdAt: '2026-03-08'
  },
  {
    id: 'APP-2026-007',
    title: 'Cloud Infrastructure & DevOps Engineer',
    jobTitle: 'Cloud Infrastructure & DevOps Engineer',
    vendorName: 'CloudSphere Technologies',
    jobType: 'Contract',
    category: 'IT',
    customerName: 'Manoj Balaji',
    customerEmail: 'manoj.b@yahoo.com',
    customerPhone: '+91 98409 90123',
    applicationDate: '2026-03-07 03:45 PM',
    experience: '2 Years in AWS Cloud & Linux Systems',
    education: 'B.Sc. Information Technology',
    skills: ['AWS', 'Linux Administration', 'CI/CD Pipelines', 'Terraform'],
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    status: 'Rejected',
    rejectedStage: 'Under Review',
    rejectionReason: 'Required 4+ years hands-on production Kubernetes experience',
    resumeName: 'Manoj_Balaji_CV.pdf',
    createdAt: '2026-03-07'
  }
];

const technicians = [
  {
    id: 'TECH-401',
    name: 'Murugan Perumal',
    phone: '+91 97890 12001',
    skillSpecialty: 'HVAC / AC Technician',
    specialization: 'HVAC / AC Technician',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    rating: 4.9,
    completedJobs: 142,
    jobsCompleted: 142,
    totalJobs: 154,
    status: 'Available',
    verificationStatus: 'Verified',
    recentJobs: [
      { jobId: 'JOB-2026-901', customer: 'Ramesh Sundaram', service: 'Split AC Deep Cleaning & Gas Refill', location: 'Hasthampatti, Salem', time: '10:30 AM Today', status: 'Completed' },
      { jobId: 'JOB-2026-885', customer: 'Kavitha M', service: 'Inverter AC PCB Circuit Repair', location: 'Fairlands, Salem', time: 'Yesterday, 04:15 PM', status: 'Completed' },
      { jobId: 'JOB-2026-842', customer: 'Ganesh Kumar', service: 'Cassette AC Indoor Unit Installation', location: 'Suramangalam, Salem', time: '05 Mar 2026, 02:00 PM', status: 'Completed' }
    ]
  },
  {
    id: 'TECH-402',
    name: 'Selvamurthy R',
    phone: '+91 97890 12002',
    skillSpecialty: 'Master Plumber',
    specialization: 'Master Plumber',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    rating: 4.7,
    completedJobs: 98,
    jobsCompleted: 98,
    totalJobs: 105,
    status: 'Busy',
    verificationStatus: 'Verified',
    recentJobs: [
      { jobId: 'JOB-2026-914', customer: 'Deepak Raj', service: 'Concealed Pipeline Leakage Rectification', location: 'Meyyanur Main Rd, Salem', time: 'In Progress (Started 11:00 AM)', status: 'In Progress' },
      { jobId: 'JOB-2026-879', customer: 'Swaminathan V', service: 'Commercial Water Tank Valve Replacement', location: 'Town Railway Station Rd, Salem', time: 'Yesterday, 02:30 PM', status: 'Completed' },
      { jobId: 'JOB-2026-831', customer: 'Lakshmi Priya', service: 'Bathroom Fitting & Sanitary Installation', location: 'Alagapuram, Salem', time: '04 Mar 2026, 05:45 PM', status: 'Completed' }
    ]
  },
  {
    id: 'TECH-403',
    name: 'Palanisamy K',
    phone: '+91 97890 12003',
    skillSpecialty: 'Certified Electrician',
    specialization: 'Certified Electrician',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    rating: 4.6,
    completedJobs: 76,
    jobsCompleted: 76,
    totalJobs: 82,
    status: 'Available',
    verificationStatus: 'Verified',
    recentJobs: [
      { jobId: 'JOB-2026-898', customer: 'Anand Murugan', service: '3-Phase Main Distribution Board Rewiring', location: 'Five Roads, Salem', time: '09:15 AM Today', status: 'Completed' },
      { jobId: 'JOB-2026-862', customer: 'Suresh Babu', service: 'Automatic Inverter & Battery Setup', location: 'Ammapet, Salem', time: '06 Mar 2026, 03:00 PM', status: 'Completed' },
      { jobId: 'JOB-2026-815', customer: 'Meenakshi Sundaram', service: 'Commercial LED Panel Illumination Setup', location: 'Gugai, Salem', time: '03 Mar 2026, 11:20 AM', status: 'Completed' }
    ]
  },
  {
    id: 'TECH-404',
    name: 'Dinesh Karthik',
    phone: '+91 97890 12004',
    skillSpecialty: 'Home Appliances Tech',
    specialization: 'Home Appliances Tech',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    rating: 4.8,
    completedJobs: 114,
    jobsCompleted: 114,
    totalJobs: 120,
    status: 'Busy',
    verificationStatus: 'Verified',
    recentJobs: [
      { jobId: 'JOB-2026-920', customer: 'Sivakumar N', service: 'Front Load Washing Machine Drum Bearing Replacement', location: 'Fairlands Main Rd, Salem', time: 'In Progress (Started 12:15 PM)', status: 'In Progress' },
      { jobId: 'JOB-2026-871', customer: 'Revathi S', service: 'Double Door Refrigerator Cooling Coil Servicing', location: 'Seelanaickenpatti, Salem', time: 'Yesterday, 05:00 PM', status: 'Completed' },
      { jobId: 'JOB-2026-828', customer: 'Bala Chandran', service: 'Microwave Magnetron Replacement', location: 'Shevapet, Salem', time: '04 Mar 2026, 01:30 PM', status: 'Completed' }
    ]
  },
  {
    id: 'TECH-405',
    name: 'Saravanan Muthu',
    phone: '+91 97890 12005',
    skillSpecialty: 'CCTV & Security Tech',
    specialization: 'CCTV & Security Tech',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636004',
    rating: 4.9,
    completedJobs: 165,
    jobsCompleted: 165,
    totalJobs: 172,
    status: 'Available',
    verificationStatus: 'Verified',
    recentJobs: [
      { jobId: 'JOB-2026-905', customer: 'Vasanth Jewellers', service: '8-Channel IP Camera Setup & NVR Configuration', location: 'Bazaar Street, Salem', time: '08:45 AM Today', status: 'Completed' },
      { jobId: 'JOB-2026-866', customer: 'Salem Medical Center', service: 'Biometric Access Control System Maintenance', location: 'Suramangalam, Salem', time: '06 Mar 2026, 04:30 PM', status: 'Completed' },
      { jobId: 'JOB-2026-810', customer: 'Karthik Warehousing', service: 'Outdoor Night-Vision Bullet Camera Replacement', location: 'Kandhampatty, Salem', time: '02 Mar 2026, 02:15 PM', status: 'Completed' }
    ]
  },
  {
    id: 'TECH-406',
    name: 'Rajendran V',
    phone: '+91 97890 12006',
    skillSpecialty: 'Solar Panel Specialist',
    specialization: 'Solar Panel Specialist',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636008',
    rating: 4.5,
    completedJobs: 52,
    jobsCompleted: 52,
    totalJobs: 58,
    status: 'Offline',
    verificationStatus: 'Verified',
    recentJobs: [
      { jobId: 'JOB-2026-890', customer: 'Greenfield Mills', service: '5kW Rooftop On-Grid Inverter Servicing', location: 'Attur Bypass, Salem', time: '06 Mar 2026, 11:00 AM', status: 'Completed' },
      { jobId: 'JOB-2026-840', customer: 'Dr. Subramanian', service: 'Solar Water Heater Cleaning & Anode Replacement', location: 'Hasthampatti, Salem', time: '04 Mar 2026, 03:30 PM', status: 'Completed' }
    ]
  },
  {
    id: 'TECH-407',
    name: 'Karthikeyan B',
    phone: '+91 97890 12007',
    skillSpecialty: 'HVAC / AC Technician',
    specialization: 'HVAC / AC Technician',
    state: 'Tamil Nadu',
    district: 'Chennai',
    division: 'Chennai Central',
    pincode: '600001',
    rating: 4.8,
    completedJobs: 138,
    jobsCompleted: 138,
    totalJobs: 145,
    status: 'Available',
    verificationStatus: 'Verified',
    recentJobs: [
      { jobId: 'JOB-2026-910', customer: 'Marina Corporate Hub', service: 'Central Duct AC Filter & Blower Servicing', location: 'George Town, Chennai', time: 'Yesterday, 03:00 PM', status: 'Completed' }
    ]
  },
  {
    id: 'TECH-408',
    name: 'Venkatesh Prasad',
    phone: '+91 97890 12008',
    skillSpecialty: 'Certified Electrician',
    specialization: 'Certified Electrician',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore North',
    pincode: '641001',
    rating: 4.9,
    completedJobs: 180,
    jobsCompleted: 180,
    totalJobs: 192,
    status: 'Available',
    verificationStatus: 'Verified',
    recentJobs: [
      { jobId: 'JOB-2026-915', customer: 'Textech Automations', service: 'Industrial Control Panel Breaker Overhaul', location: 'RS Puram, Coimbatore', time: '09:30 AM Today', status: 'Completed' }
    ]
  }
];

const executives = [
  {
    id: 'EXEC-201',
    name: 'Balaji Varma',
    phone: '+91 96550 44001',
    email: 'balaji.varma@stayroyal.in',
    type: 'Stay Executive',
    vendorName: 'Muruganandam S',
    shopName: 'Grand Palace Stay & Suites',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    activeBookings: 6,
    completedBookings: 142,
    status: 'Active',
    joinedDate: '2025-11-10',
    recentBookings: [
      { bookingId: 'BKG-2026-801', customer: 'Deepak Raj', roomOrTrip: 'Deluxe Suite Room #304', dates: '10 Mar - 12 Mar 2026', amount: 4800, status: 'Confirmed' },
      { bookingId: 'BKG-2026-784', customer: 'Kavitha S', roomOrTrip: 'Executive King Room #201', dates: '06 Mar - 08 Mar 2026', amount: 3200, status: 'Completed' },
      { bookingId: 'BKG-2026-750', customer: 'Arun Prakash', roomOrTrip: 'Family Suite Room #105', dates: '01 Mar - 03 Mar 2026', amount: 5600, status: 'Completed' }
    ]
  },
  {
    id: 'EXEC-202',
    name: 'Manikandan S',
    phone: '+91 96550 44002',
    email: 'manikandan.s@salemtravels.in',
    type: 'Travel Executive',
    vendorName: 'K. Ramakrishnan',
    shopName: 'Salem Royal Cabs & Travels',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    activeBookings: 4,
    completedBookings: 98,
    status: 'Active',
    joinedDate: '2025-12-05',
    recentBookings: [
      { bookingId: 'BKG-2026-815', customer: 'Swathi Radhakrishnan', roomOrTrip: 'Airport Pickup - Sedan (Coimbatore)', dates: 'Today, 04:30 PM', amount: 2800, status: 'Active' },
      { bookingId: 'BKG-2026-792', customer: 'Vignesh Kumar', roomOrTrip: 'Outstation Round Trip (Yercaud 2-Day)', dates: '05 Mar - 06 Mar 2026', amount: 6200, status: 'Completed' }
    ]
  },
  {
    id: 'EXEC-203',
    name: 'Dinesh Karthik',
    phone: '+91 96550 44003',
    email: 'dinesh.k@srikrishna.in',
    type: 'Stay Executive',
    vendorName: 'Babu Janardhan',
    shopName: 'Sri Krishna Residency & Rooms',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    activeBookings: 3,
    completedBookings: 76,
    status: 'Active',
    joinedDate: '2026-01-15',
    recentBookings: [
      { bookingId: 'BKG-2026-809', customer: 'Suresh Babu', roomOrTrip: 'Premium Double Room #112', dates: '08 Mar - 10 Mar 2026', amount: 2400, status: 'Confirmed' },
      { bookingId: 'BKG-2026-771', customer: 'Anitha S', roomOrTrip: 'Single Standard Room #204', dates: '03 Mar - 04 Mar 2026', amount: 1200, status: 'Completed' }
    ]
  },
  {
    id: 'EXEC-204',
    name: 'Praveen Kumar R',
    phone: '+91 96550 44004',
    email: 'praveen.k@expresslogistics.in',
    type: 'Travel Executive',
    vendorName: 'Govindarajulu',
    shopName: 'Shevapet Express Fleet & Tours',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    activeBookings: 2,
    completedBookings: 64,
    status: 'Inactive',
    joinedDate: '2026-02-01',
    recentBookings: [
      { bookingId: 'BKG-2026-780', customer: 'Meenakshi S', roomOrTrip: 'Local Sightseeing Package (Salem Temples)', dates: '04 Mar 2026', amount: 1800, status: 'Completed' }
    ]
  },
  {
    id: 'EXEC-205',
    name: 'Sivakumar V',
    phone: '+91 96550 44005',
    email: 'siva.v@hillviewresorts.in',
    type: 'Stay Executive',
    vendorName: 'Thirunavukkarasu R',
    shopName: 'Hillview Eco Resort & Cottages',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636004',
    activeBookings: 5,
    completedBookings: 110,
    status: 'Active',
    joinedDate: '2025-10-20',
    recentBookings: [
      { bookingId: 'BKG-2026-820', customer: 'Rajendran M', roomOrTrip: 'Mountain View Villa #04', dates: '11 Mar - 14 Mar 2026', amount: 11500, status: 'Confirmed' }
    ]
  },
  {
    id: 'EXEC-206',
    name: 'Karthik Narayanan',
    phone: '+91 96550 44006',
    email: 'karthik.n@emeraldtravel.in',
    type: 'Travel Executive',
    vendorName: 'Jayachandran Mohan',
    shopName: 'Emerald Coast Travel Services',
    state: 'Tamil Nadu',
    district: 'Chennai',
    division: 'Chennai Central',
    pincode: '600001',
    activeBookings: 7,
    completedBookings: 185,
    status: 'Active',
    joinedDate: '2025-09-15',
    recentBookings: [
      { bookingId: 'BKG-2026-830', customer: 'Lakshmi N', roomOrTrip: 'Chennai Airport Transfer - Luxury SUV', dates: 'Today, 02:00 PM', amount: 3500, status: 'Active' }
    ]
  },
  {
    id: 'EXEC-207',
    name: 'Venkatesh Babu',
    phone: '+91 96550 44007',
    email: 'venkatesh.b@textechstay.in',
    type: 'Stay Executive',
    vendorName: 'Textech Automations',
    shopName: 'Kovai Business Suites & Inn',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore North',
    pincode: '641001',
    activeBookings: 3,
    completedBookings: 120,
    status: 'Active',
    joinedDate: '2025-11-28',
    recentBookings: [
      { bookingId: 'BKG-2026-822', customer: 'Siddharth J', roomOrTrip: 'Corporate Studio Apartment #402', dates: '09 Mar - 13 Mar 2026', amount: 8000, status: 'Confirmed' }
    ]
  }
];

const supportTeam = [
  {
    id: 'SUPP-601',
    ticketId: 'TCK-2026-101',
    subject: 'Delayed AC Service Arrival',
    requesterName: 'Vikram Chandran',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    assignedTo: 'Geetha Swaminathan',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-03-01 14:00'
  },
  {
    id: 'SUPP-602',
    ticketId: 'TCK-2026-102',
    subject: 'Card Diamond Discount Not Applied on Cart',
    requesterName: 'Lakshmi Narayanan',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    assignedTo: 'Deepak Shankar',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-03-02 18:30'
  }
];

const agents = [
  // 1. STATE AGENTS (Apex Level - Statewide Governance)
  {
    id: 'AGT-STA-01',
    name: 'Thirunavukkarasu R',
    phone: '+91 98940 55101',
    email: 'thiru.state@domain.com',
    level: 'state',
    role: 'State Agent',
    state: 'Tamil Nadu',
    district: null,
    division: null,
    pincode: null,
    jurisdiction: 'Tamil Nadu (State-wide)',
    assignedArea: '38 Districts Coverage',
    supervisorId: null,
    supervisorName: 'Apex Governance',
    subordinatesCount: 3, // District Agents supervised
    totalReferrals: 420,
    activeSubscribers: 340,
    vendorOnboardings: 128,
    walletBalance: 28500,
    totalEarned: 165000,
    status: 'Active',
    joinedDate: '2024-01-10'
  },
  {
    id: 'AGT-STA-02',
    name: 'Jayachandran Mohan',
    phone: '+91 98940 55102',
    email: 'jaya.state@domain.com',
    level: 'state',
    role: 'State Agent',
    state: 'Tamil Nadu',
    district: null,
    division: null,
    pincode: null,
    jurisdiction: 'Tamil Nadu (North Zone)',
    assignedArea: '14 Districts Coverage',
    supervisorId: null,
    supervisorName: 'Apex Governance',
    subordinatesCount: 2,
    totalReferrals: 310,
    activeSubscribers: 245,
    vendorOnboardings: 94,
    walletBalance: 18200,
    totalEarned: 122000,
    status: 'Active',
    joinedDate: '2024-03-15'
  },
  {
    id: 'AGT-STA-03',
    name: 'Senthil Nathan K',
    phone: '+91 98940 55107',
    email: 'senthil.state@domain.com',
    level: 'state',
    role: 'State Agent',
    state: 'Tamil Nadu',
    district: null,
    division: null,
    pincode: null,
    jurisdiction: 'Tamil Nadu (South Zone)',
    assignedArea: '16 Districts Coverage',
    supervisorId: null,
    supervisorName: 'Apex Governance',
    subordinatesCount: 2,
    totalReferrals: 285,
    activeSubscribers: 210,
    vendorOnboardings: 82,
    walletBalance: 15400,
    totalEarned: 98500,
    status: 'Active',
    joinedDate: '2024-05-20'
  },

  // 2. DISTRICT AGENTS (Territorial Level)
  {
    id: 'AGT-DST-01',
    name: 'Karthik Subramanian',
    phone: '+91 98401 22345',
    email: 'karthik.district@domain.com',
    level: 'district',
    role: 'District Agent',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: null,
    pincode: null,
    jurisdiction: 'Salem District',
    assignedArea: 'Salem North & South Divisions',
    supervisorId: 'AGT-STA-01',
    supervisorName: 'Thirunavukkarasu R (State Agent)',
    subordinatesCount: 2, // Divisional Agents supervised
    totalReferrals: 195,
    activeSubscribers: 155,
    vendorOnboardings: 64,
    walletBalance: 14500,
    totalEarned: 84000,
    status: 'Active',
    joinedDate: '2025-02-01'
  },
  {
    id: 'AGT-DST-02',
    name: 'Venkatesh Babu',
    phone: '+91 98402 33456',
    email: 'venkat.district@domain.com',
    level: 'district',
    role: 'District Agent',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: null,
    pincode: null,
    jurisdiction: 'Coimbatore District',
    assignedArea: 'Coimbatore North & Central Divisions',
    supervisorId: 'AGT-STA-01',
    supervisorName: 'Thirunavukkarasu R (State Agent)',
    subordinatesCount: 2,
    totalReferrals: 230,
    activeSubscribers: 190,
    vendorOnboardings: 76,
    walletBalance: 16800,
    totalEarned: 96000,
    status: 'Active',
    joinedDate: '2025-02-12'
  },
  {
    id: 'AGT-DST-03',
    name: 'Madhavan S',
    phone: '+91 98403 44567',
    email: 'madhav.district@domain.com',
    level: 'district',
    role: 'District Agent',
    state: 'Tamil Nadu',
    district: 'Madurai',
    division: null,
    pincode: null,
    jurisdiction: 'Madurai District',
    assignedArea: 'Madurai Central & South Divisions',
    supervisorId: 'AGT-STA-03',
    supervisorName: 'Senthil Nathan K (State Agent)',
    subordinatesCount: 1,
    totalReferrals: 175,
    activeSubscribers: 130,
    vendorOnboardings: 48,
    walletBalance: 11200,
    totalEarned: 72000,
    status: 'Active',
    joinedDate: '2025-03-05'
  },

  // 3. DIVISIONAL AGENTS (Cluster Level)
  {
    id: 'AGT-DIV-01',
    name: 'Rajendran P',
    phone: '+91 98940 77101',
    email: 'rajendran.div@domain.com',
    level: 'divisional',
    role: 'Divisional Agent',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: null,
    jurisdiction: 'Salem North Division',
    assignedArea: 'PIN: 636001, 636002',
    supervisorId: 'AGT-DST-01',
    supervisorName: 'Karthik Subramanian (District Agent)',
    subordinatesCount: 2, // Pincode Agents supervised
    totalReferrals: 112,
    activeSubscribers: 88,
    vendorOnboardings: 38,
    walletBalance: 9800,
    totalEarned: 54000,
    status: 'Active',
    joinedDate: '2025-04-10'
  },
  {
    id: 'AGT-DIV-02',
    name: 'Anand Kumar V',
    phone: '+91 98940 77102',
    email: 'anand.div@domain.com',
    level: 'divisional',
    role: 'Divisional Agent',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: null,
    jurisdiction: 'Salem South Division',
    assignedArea: 'PIN: 636003, 636004',
    supervisorId: 'AGT-DST-01',
    supervisorName: 'Karthik Subramanian (District Agent)',
    subordinatesCount: 2,
    totalReferrals: 98,
    activeSubscribers: 74,
    vendorOnboardings: 29,
    walletBalance: 7600,
    totalEarned: 46000,
    status: 'Active',
    joinedDate: '2025-04-18'
  },
  {
    id: 'AGT-DIV-03',
    name: 'Saravanan M',
    phone: '+91 98940 77103',
    email: 'saravanan.div@domain.com',
    level: 'divisional',
    role: 'Divisional Agent',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: null,
    jurisdiction: 'Coimbatore Central Division',
    assignedArea: 'PIN: 641001, 641002',
    supervisorId: 'AGT-DST-02',
    supervisorName: 'Venkatesh Babu (District Agent)',
    subordinatesCount: 2,
    totalReferrals: 135,
    activeSubscribers: 105,
    vendorOnboardings: 42,
    walletBalance: 12400,
    totalEarned: 68000,
    status: 'Active',
    joinedDate: '2025-04-22'
  },

  // 4. PINCODE AGENTS (Ground Level - Field Execution & Vendor Onboarding)
  {
    id: 'AGT-PIN-01',
    name: 'Naveen Kumar M',
    phone: '+91 98940 55103',
    email: 'naveen.agent@gmail.com',
    level: 'pincode',
    role: 'Pincode Agent',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    jurisdiction: 'PIN: 636001 (Salem Fort)',
    assignedArea: 'Salem Town Fort Zone',
    supervisorId: 'AGT-DIV-01',
    supervisorName: 'Rajendran P (Divisional Agent)',
    subordinatesCount: 0,
    totalReferrals: 94,
    activeSubscribers: 72,
    vendorOnboardings: 21,
    walletBalance: 9800,
    totalEarned: 52000,
    status: 'Active',
    joinedDate: '2024-07-20'
  },
  {
    id: 'AGT-PIN-02',
    name: 'Dinesh Karthik R',
    phone: '+91 98940 88201',
    email: 'dinesh.pincode@gmail.com',
    level: 'pincode',
    role: 'Pincode Agent',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    jurisdiction: 'PIN: 636002 (Shevapet)',
    assignedArea: 'Shevapet & Market Area',
    supervisorId: 'AGT-DIV-01',
    supervisorName: 'Rajendran P (Divisional Agent)',
    subordinatesCount: 0,
    totalReferrals: 82,
    activeSubscribers: 61,
    vendorOnboardings: 17,
    walletBalance: 6500,
    totalEarned: 41000,
    status: 'Active',
    joinedDate: '2024-08-05'
  },
  {
    id: 'AGT-PIN-03',
    name: 'Pravin Chandran',
    phone: '+91 98940 88202',
    email: 'pravin.pincode@gmail.com',
    level: 'pincode',
    role: 'Pincode Agent',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636003',
    jurisdiction: 'PIN: 636003 (Ammapet)',
    assignedArea: 'Ammapet Colony Hub',
    supervisorId: 'AGT-DIV-02',
    supervisorName: 'Anand Kumar V (Divisional Agent)',
    subordinatesCount: 0,
    totalReferrals: 76,
    activeSubscribers: 58,
    vendorOnboardings: 15,
    walletBalance: 5900,
    totalEarned: 37500,
    status: 'Active',
    joinedDate: '2024-08-12'
  },
  {
    id: 'AGT-PIN-04',
    name: 'Gowtham Raj',
    phone: '+91 98940 88203',
    email: 'gowtham.pincode@gmail.com',
    level: 'pincode',
    role: 'Pincode Agent',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636004',
    jurisdiction: 'PIN: 636004 (Gugai)',
    assignedArea: 'Gugai Industrial Area',
    supervisorId: 'AGT-DIV-02',
    supervisorName: 'Anand Kumar V (Divisional Agent)',
    subordinatesCount: 0,
    totalReferrals: 68,
    activeSubscribers: 49,
    vendorOnboardings: 14,
    walletBalance: 5100,
    totalEarned: 32000,
    status: 'Active',
    joinedDate: '2024-08-25'
  },
  {
    id: 'AGT-PIN-05',
    name: 'Kavin Selvan',
    phone: '+91 98940 88204',
    email: 'kavin.cbe@gmail.com',
    level: 'pincode',
    role: 'Pincode Agent',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641001',
    jurisdiction: 'PIN: 641001 (Gandhipuram)',
    assignedArea: 'Gandhipuram Commercial Hub',
    supervisorId: 'AGT-DIV-03',
    supervisorName: 'Saravanan M (Divisional Agent)',
    subordinatesCount: 0,
    totalReferrals: 89,
    activeSubscribers: 67,
    vendorOnboardings: 19,
    walletBalance: 7800,
    totalEarned: 44000,
    status: 'Active',
    joinedDate: '2024-09-02'
  }
];

// AGENT ACTIVITY & VENDOR ONBOARDING FLOW RECORDS
// Hierarchy Activity Flow:
// Pincode Agent (Initiation/Ground) -> Activity / Vendor Onboarding -> Divisional Agent (Verification) -> District Agent (Endorsement) -> State Agent (Statewide Visibility & Approval)
const agentActivities = [
  {
    id: 'ACT-VND-001',
    type: 'Vendor Onboarding',
    title: 'Vendor Onboarding: Sri Krishna Electricals & Spares',
    description: 'Ground merchant enrollment and physical commercial address inspection for electricals dealership.',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    category: 'Services',
    vendorDetails: {
      id: 'VND-001',
      name: 'Sri Krishna Electricals & Spares',
      contactPerson: 'Krishna Murthy',
      phone: '+91 94431 10001',
      address: '42, Bazaar Street, Fort, Salem - 636001',
      category: 'Services'
    },
    pincodeAgent: {
      id: 'AGT-PIN-01',
      name: 'Naveen Kumar M',
      phone: '+91 98940 55103',
      pincode: '636001'
    },
    divisionalAgent: {
      id: 'AGT-DIV-01',
      name: 'Rajendran P',
      division: 'Salem North'
    },
    districtAgent: {
      id: 'AGT-DST-01',
      name: 'Karthik Subramanian',
      district: 'Salem'
    },
    stateAgent: {
      id: 'AGT-STA-01',
      name: 'Thirunavukkarasu R',
      state: 'Tamil Nadu'
    },
    currentStage: 'State Agent', // Completed full workflow
    status: 'State Approved',
    flowStages: [
      {
        stage: 'Pincode Agent',
        actor: 'Naveen Kumar M (PIN 636001)',
        action: 'Onboarding Initiated',
        status: 'Completed',
        timestamp: '2026-03-01 09:30 AM',
        notes: 'Merchant profile collected, shop photos and GST documents uploaded.'
      },
      {
        stage: 'Divisional Agent',
        actor: 'Rajendran P (Salem North)',
        action: 'Division Verified',
        status: 'Completed',
        timestamp: '2026-03-01 02:45 PM',
        notes: 'Verified local business authenticity and trade permit.'
      },
      {
        stage: 'District Agent',
        actor: 'Karthik Subramanian (Salem)',
        action: 'District Endorsed',
        status: 'Completed',
        timestamp: '2026-03-02 10:15 AM',
        notes: 'Territorial quota approved and bank details verified.'
      },
      {
        stage: 'State Agent',
        actor: 'Thirunavukkarasu R (Tamil Nadu)',
        action: 'Statewide Activation',
        status: 'Completed',
        timestamp: '2026-03-02 03:00 PM',
        notes: 'Vendor activated statewide in ledger. ₹1,500 onboarding commission credited.'
      }
    ],
    commissionAmount: 1500,
    createdDate: '2026-03-01',
    completedDate: '2026-03-02'
  },
  {
    id: 'ACT-VND-002',
    type: 'Vendor Onboarding',
    title: 'Vendor Onboarding: Salem Supermart & Grocery Supplies',
    description: 'Onboarding supermarket franchise for daily essentials & grocery delivery.',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    category: 'Food',
    vendorDetails: {
      id: 'VND-002',
      name: 'Salem Supermart & Grocery Supplies',
      contactPerson: 'Babu Janardhan',
      phone: '+91 94431 10002',
      address: '10, Fort Main Road, Salem - 636001',
      category: 'Food'
    },
    pincodeAgent: {
      id: 'AGT-PIN-01',
      name: 'Naveen Kumar M',
      phone: '+91 98940 55103',
      pincode: '636001'
    },
    divisionalAgent: {
      id: 'AGT-DIV-01',
      name: 'Rajendran P',
      division: 'Salem North'
    },
    districtAgent: {
      id: 'AGT-DST-01',
      name: 'Karthik Subramanian',
      district: 'Salem'
    },
    stateAgent: {
      id: 'AGT-STA-01',
      name: 'Thirunavukkarasu R',
      state: 'Tamil Nadu'
    },
    currentStage: 'State Agent',
    status: 'State Approved',
    flowStages: [
      {
        stage: 'Pincode Agent',
        actor: 'Naveen Kumar M (PIN 636001)',
        action: 'Onboarding Initiated',
        status: 'Completed',
        timestamp: '2026-03-03 11:00 AM',
        notes: 'Collected FSSAI certification and current account details.'
      },
      {
        stage: 'Divisional Agent',
        actor: 'Rajendran P (Salem North)',
        action: 'Division Verified',
        status: 'Completed',
        timestamp: '2026-03-03 04:20 PM',
        notes: 'Physical outlet verified. Delivery radius aligned.'
      },
      {
        stage: 'District Agent',
        actor: 'Karthik Subramanian (Salem)',
        action: 'District Endorsed',
        status: 'Completed',
        timestamp: '2026-03-04 09:45 AM',
        notes: 'Compliance approved for district food supplies catalog.'
      },
      {
        stage: 'State Agent',
        actor: 'Thirunavukkarasu R (Tamil Nadu)',
        action: 'Statewide Activation',
        status: 'Completed',
        timestamp: '2026-03-04 01:30 PM',
        notes: 'Live on consumer mobile app statewide.'
      }
    ],
    commissionAmount: 1800,
    createdDate: '2026-03-03',
    completedDate: '2026-03-04'
  },
  {
    id: 'ACT-VND-003',
    type: 'Vendor Onboarding',
    title: 'Vendor Onboarding: Royal Home Appliances Service Hub',
    description: 'Home appliance repair and multi-brand service center registration.',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    category: 'Services',
    vendorDetails: {
      id: 'VND-003',
      name: 'Royal Home Appliances Service Hub',
      contactPerson: 'Saravanan S',
      phone: '+91 94431 10003',
      address: '88, Gugai Line Road, Shevapet, Salem - 636002',
      category: 'Services'
    },
    pincodeAgent: {
      id: 'AGT-PIN-02',
      name: 'Dinesh Karthik R',
      phone: '+91 98940 88201',
      pincode: '636002'
    },
    divisionalAgent: {
      id: 'AGT-DIV-01',
      name: 'Rajendran P',
      division: 'Salem North'
    },
    districtAgent: {
      id: 'AGT-DST-01',
      name: 'Karthik Subramanian',
      district: 'Salem'
    },
    stateAgent: {
      id: 'AGT-STA-01',
      name: 'Thirunavukkarasu R',
      state: 'Tamil Nadu'
    },
    currentStage: 'District Agent', // In District Review stage
    status: 'District Review',
    flowStages: [
      {
        stage: 'Pincode Agent',
        actor: 'Dinesh Karthik R (PIN 636002)',
        action: 'Onboarding Initiated',
        status: 'Completed',
        timestamp: '2026-03-07 10:00 AM',
        notes: 'Technician team verification and workshop inspection completed.'
      },
      {
        stage: 'Divisional Agent',
        actor: 'Rajendran P (Salem North)',
        action: 'Division Verified',
        status: 'Completed',
        timestamp: '2026-03-07 03:15 PM',
        notes: 'Service SLA and spares availability attested.'
      },
      {
        stage: 'District Agent',
        actor: 'Karthik Subramanian (Salem)',
        action: 'Under Review',
        status: 'In Progress',
        timestamp: '2026-03-08 11:00 AM',
        notes: 'Awaiting background check on commercial trade license.'
      },
      {
        stage: 'State Agent',
        actor: 'Thirunavukkarasu R (Tamil Nadu)',
        action: 'Pending District Endorsement',
        status: 'Queued',
        timestamp: null,
        notes: 'Will be notified upon district endorsement.'
      }
    ],
    commissionAmount: 1200,
    createdDate: '2026-03-07',
    completedDate: null
  },
  {
    id: 'ACT-VND-004',
    type: 'Vendor Onboarding',
    title: 'Vendor Onboarding: Green Valley Agro & Farm Produce',
    description: 'Farm-to-fork organic vegetables and seasonal fresh fruits wholesale supplier.',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636003',
    category: 'Daily Needs',
    vendorDetails: {
      id: 'VND-004',
      name: 'Green Valley Agro & Farm Produce',
      contactPerson: 'Venkatesan G',
      phone: '+91 94431 10004',
      address: '15, Market Road, Ammapet, Salem - 636003',
      category: 'Daily Needs'
    },
    pincodeAgent: {
      id: 'AGT-PIN-03',
      name: 'Pravin Chandran',
      phone: '+91 98940 88202',
      pincode: '636003'
    },
    divisionalAgent: {
      id: 'AGT-DIV-02',
      name: 'Anand Kumar V',
      division: 'Salem South'
    },
    districtAgent: {
      id: 'AGT-DST-01',
      name: 'Karthik Subramanian',
      district: 'Salem'
    },
    stateAgent: {
      id: 'AGT-STA-01',
      name: 'Thirunavukkarasu R',
      state: 'Tamil Nadu'
    },
    currentStage: 'Divisional Agent', // In Divisional Review stage
    status: 'Divisional Review',
    flowStages: [
      {
        stage: 'Pincode Agent',
        actor: 'Pravin Chandran (PIN 636003)',
        action: 'Onboarding Initiated',
        status: 'Completed',
        timestamp: '2026-03-08 09:15 AM',
        notes: 'Merchant registered, APMC market yard card submitted.'
      },
      {
        stage: 'Divisional Agent',
        actor: 'Anand Kumar V (Salem South)',
        action: 'Under Review',
        status: 'In Progress',
        timestamp: '2026-03-08 02:00 PM',
        notes: 'Validating cold chain facilities and supply frequency.'
      },
      {
        stage: 'District Agent',
        actor: 'Karthik Subramanian (Salem)',
        action: 'Pending Division Verification',
        status: 'Queued',
        timestamp: null,
        notes: 'Queued for district level approval.'
      },
      {
        stage: 'State Agent',
        actor: 'Thirunavukkarasu R (Tamil Nadu)',
        action: 'Pending Division & District',
        status: 'Queued',
        timestamp: null,
        notes: 'State tracking enabled.'
      }
    ],
    commissionAmount: 1400,
    createdDate: '2026-03-08',
    completedDate: null
  },
  {
    id: 'ACT-VND-005',
    type: 'Vendor Onboarding',
    title: 'Vendor Onboarding: Kovai Tech Systems & Security Soln',
    description: 'CCTV surveillance installation and smart security systems vendor onboarding.',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore Central',
    pincode: '641001',
    category: 'Services',
    vendorDetails: {
      id: 'VND-009',
      name: 'Kovai Tech Systems & Security Soln',
      contactPerson: 'Mani Ratnam',
      phone: '+91 94431 10009',
      address: '77, 100 Feet Road, Gandhipuram, Coimbatore - 641001',
      category: 'Services'
    },
    pincodeAgent: {
      id: 'AGT-PIN-05',
      name: 'Kavin Selvan',
      phone: '+91 98940 88204',
      pincode: '641001'
    },
    divisionalAgent: {
      id: 'AGT-DIV-03',
      name: 'Saravanan M',
      division: 'Coimbatore Central'
    },
    districtAgent: {
      id: 'AGT-DST-02',
      name: 'Venkatesh Babu',
      district: 'Coimbatore'
    },
    stateAgent: {
      id: 'AGT-STA-01',
      name: 'Thirunavukkarasu R',
      state: 'Tamil Nadu'
    },
    currentStage: 'State Agent',
    status: 'State Approved',
    flowStages: [
      {
        stage: 'Pincode Agent',
        actor: 'Kavin Selvan (PIN 641001)',
        action: 'Onboarding Initiated',
        status: 'Completed',
        timestamp: '2026-03-05 10:30 AM',
        notes: 'Security vendor on-site verification completed.'
      },
      {
        stage: 'Divisional Agent',
        actor: 'Saravanan M (Coimbatore Central)',
        action: 'Division Verified',
        status: 'Completed',
        timestamp: '2026-03-05 03:00 PM',
        notes: 'Hardware warranty policy and service certificates verified.'
      },
      {
        stage: 'District Agent',
        actor: 'Venkatesh Babu (Coimbatore)',
        action: 'District Endorsed',
        status: 'Completed',
        timestamp: '2026-03-06 11:20 AM',
        notes: 'District commercial enterprise category approved.'
      },
      {
        stage: 'State Agent',
        actor: 'Thirunavukkarasu R (Tamil Nadu)',
        action: 'Statewide Activation',
        status: 'Completed',
        timestamp: '2026-03-06 04:00 PM',
        notes: 'Active statewide in merchant catalog.'
      }
    ],
    commissionAmount: 2000,
    createdDate: '2026-03-05',
    completedDate: '2026-03-06'
  },
  {
    id: 'ACT-FLD-006',
    type: 'Card Distribution Campaign',
    title: 'Pincode Membership Card Distribution Drive',
    description: 'Ground membership card distribution and customer registration at Shevapet bazaar.',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    category: 'Membership',
    vendorDetails: null,
    pincodeAgent: {
      id: 'AGT-PIN-02',
      name: 'Dinesh Karthik R',
      phone: '+91 98940 88201',
      pincode: '636002'
    },
    divisionalAgent: {
      id: 'AGT-DIV-01',
      name: 'Rajendran P',
      division: 'Salem North'
    },
    districtAgent: {
      id: 'AGT-DST-01',
      name: 'Karthik Subramanian',
      district: 'Salem'
    },
    stateAgent: {
      id: 'AGT-STA-01',
      name: 'Thirunavukkarasu R',
      state: 'Tamil Nadu'
    },
    currentStage: 'State Agent',
    status: 'State Approved',
    flowStages: [
      {
        stage: 'Pincode Agent',
        actor: 'Dinesh Karthik R (PIN 636002)',
        action: 'Drive Completed (35 Cards)',
        status: 'Completed',
        timestamp: '2026-03-04 05:00 PM',
        notes: '35 Silver and Gold cards distributed to local shoppers.'
      },
      {
        stage: 'Divisional Agent',
        actor: 'Rajendran P (Salem North)',
        action: 'Division Logged',
        status: 'Completed',
        timestamp: '2026-03-05 10:00 AM',
        notes: 'Card serials cross-matched with inventory batch.'
      },
      {
        stage: 'District Agent',
        actor: 'Karthik Subramanian (Salem)',
        action: 'District Recorded',
        status: 'Completed',
        timestamp: '2026-03-05 02:30 PM',
        notes: 'Salem district quota credited.'
      },
      {
        stage: 'State Agent',
        actor: 'Thirunavukkarasu R (Tamil Nadu)',
        action: 'Apex Ledger Synced',
        status: 'Completed',
        timestamp: '2026-03-05 06:15 PM',
        notes: 'Customer rewards enabled across state network.'
      }
    ],
    commissionAmount: 3500,
    createdDate: '2026-03-04',
    completedDate: '2026-03-05'
  }
];

const agentPayments = [
  {
    id: 'APAY-1001',
    agentId: 'AGT-701',
    agentName: 'Thirunavukkarasu R',
    amount: 14500,
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    paymentDetails: 'GPay / UPI: 9894055101@okaxis',
    requestDate: '2026-03-01',
    status: 'Pending',
    notes: 'Q1 Customer Membership Acquisition Commission'
  },
  {
    id: 'APAY-1002',
    agentId: 'AGT-702',
    agentName: 'Jayachandran Mohan',
    amount: 7200,
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    paymentDetails: 'PhonePe: 9894055102@ybl',
    requestDate: '2026-02-27',
    status: 'Approved',
    approvedBy: 'Priya Narayanan (Pincode Admin)',
    approvalDate: '2026-03-01',
    notes: 'February Payout Approval'
  },
  {
    id: 'APAY-1003',
    agentId: 'AGT-703',
    agentName: 'Naveen Kumar M',
    amount: 9800,
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    paymentDetails: 'HDFC A/C: 5010049219401 / HDFC0000341',
    requestDate: '2026-02-20',
    status: 'Paid',
    approvedBy: 'Suresh Raina (Pincode Admin)',
    approvalDate: '2026-02-22',
    transactionRef: 'UPI-TXN-20260222-09412',
    notes: 'Commission transferred successfully'
  }
];

const kycRecords = [
  {
    id: 'KYC-VND-001',
    businessName: 'Sri Krishna Electricals & Spares',
    name: 'Sri Krishna Electricals & Spares',
    category: 'Services',
    businessType: 'Proprietorship',
    businessDescription: 'Authorized dealer of industrial and commercial electrical switchgears, lighting fixtures, and wiring accessories.',
    vendorName: 'Krishna Murthy',
    phone: '+91 94431 10001',
    email: 'krishna.elec@vendor.com',
    address: '42, Bazaar Street, Fort, Salem',
    fullAddress: '42, Bazaar Street, Fort, Salem - 636001',
    pincode: '636001',
    district: 'Salem',
    division: 'Salem North',
    state: 'Tamil Nadu',
    status: 'Approved',
    verifiedBy: 'Priya Narayanan (Pincode Admin)',
    verifiedDate: '2026-02-16',
    submittedDate: '2026-02-14',
    submittedDocuments: ['GST Certificate (33AAAAA0000A1Z5)', 'PAN Card (ABCDE1234F)', 'MSME Udyam Registration', 'Cancelled Cheque']
  },
  {
    id: 'KYC-VND-002',
    businessName: 'Salem Supermart & Grocery Supplies',
    name: 'Salem Supermart & Grocery Supplies',
    category: 'Food',
    businessType: 'Partnership',
    businessDescription: 'Wholesale and retail distributor of daily organic produce, packaged groceries, and essential home provisions.',
    vendorName: 'Babu Janardhan',
    phone: '+91 94431 10002',
    email: 'salem.supermart@vendor.com',
    address: '10, Fort Main Road, Salem',
    fullAddress: '10, Fort Main Road, Salem - 636001',
    pincode: '636001',
    district: 'Salem',
    division: 'Salem North',
    state: 'Tamil Nadu',
    status: 'Approved',
    verifiedBy: 'Priya Narayanan (Pincode Admin)',
    verifiedDate: '2026-02-18',
    submittedDate: '2026-02-15',
    submittedDocuments: ['FSSAI License (12421001000234)', 'GST Certificate', 'PAN Card', 'Partnership Deed', 'Bank Passbook']
  },
  {
    id: 'KYC-VND-003',
    businessName: 'Shevapet Textures & Home Decors',
    name: 'Shevapet Textures & Home Decors',
    category: 'Daily Needs',
    businessType: 'Proprietorship',
    businessDescription: 'Interior fabrics, curtains, bed linens, and domestic textile decors manufacturer and retailer.',
    vendorName: 'Govindarajulu',
    phone: '+91 94431 10003',
    email: 'shevapet.textures@vendor.com',
    address: '112, Long Bazaar, Shevapet, Salem',
    fullAddress: '112, Long Bazaar, Shevapet, Salem - 636002',
    pincode: '636002',
    district: 'Salem',
    division: 'Salem North',
    state: 'Tamil Nadu',
    status: 'Pending',
    verifiedBy: 'Pending Verification (Priya Narayanan)',
    verifiedDate: null,
    submittedDate: '2026-03-01',
    submittedDocuments: ['Trade License Copy', 'Aadhaar Card', 'GST Application Form', 'Bank Statement (6 Months)']
  },
  {
    id: 'KYC-VND-004',
    businessName: 'Grand Palace Stay & Suites',
    name: 'Grand Palace Stay & Suites',
    category: 'Stay',
    businessType: 'Private Limited',
    businessDescription: 'Luxury heritage hotel offering 45 premium executive rooms, multi-cuisine dining, and conference banquet halls.',
    vendorName: 'Muruganandam S',
    phone: '+91 94431 10004',
    email: 'grandpalace.stay@vendor.com',
    address: '88, Junction Main Road, Fairlands, Salem',
    fullAddress: '88, Junction Main Road, Fairlands, Salem - 636004',
    pincode: '636004',
    district: 'Salem',
    division: 'Salem North',
    state: 'Tamil Nadu',
    status: 'Approved',
    verifiedBy: 'Priya Narayanan (Pincode Admin)',
    verifiedDate: '2026-02-22',
    submittedDate: '2026-02-20',
    submittedDocuments: ['Certificate of Incorporation', 'Tourism Department License', 'Fire Safety NOC', 'GST Certificate', 'PAN Card']
  },
  {
    id: 'KYC-VND-005',
    businessName: 'Salem Royal Cabs & Travels',
    name: 'Salem Royal Cabs & Travels',
    category: 'Travel',
    businessType: 'Partnership',
    businessDescription: 'Intercity and airport transfer fleet operators with 50+ tourist permits and premium sedans/SUVs.',
    vendorName: 'K. Ramakrishnan',
    phone: '+91 94431 10005',
    email: 'salem.royalcabs@vendor.com',
    address: '15, Old Bus Stand Road, Salem',
    fullAddress: '15, Old Bus Stand Road, Salem - 636001',
    pincode: '636001',
    district: 'Salem',
    division: 'Salem North',
    state: 'Tamil Nadu',
    status: 'Approved',
    verifiedBy: 'Priya Narayanan (Pincode Admin)',
    verifiedDate: '2026-02-25',
    submittedDate: '2026-02-23',
    submittedDocuments: ['RTO Tourist Permit Registration', 'GST Certificate', 'Commercial Fleet Insurance', 'Partnership Deed', 'Bank Passbook']
  },
  {
    id: 'KYC-VND-006',
    businessName: 'Anandhavalli Organic Herbals',
    name: 'Anandhavalli Organic Herbals',
    category: 'Product',
    businessType: 'Individual Enterprise',
    businessDescription: 'Certified organic cold-pressed edible oils, traditional wellness herbal powders, and millet flours.',
    vendorName: 'Anandhavalli M',
    phone: '+91 94431 10006',
    email: 'anandhavalli.organics@vendor.com',
    address: '29, Meyyanur Bypass, Salem',
    fullAddress: '29, Meyyanur Bypass, Salem - 636001',
    pincode: '636001',
    district: 'Salem',
    division: 'Salem North',
    state: 'Tamil Nadu',
    status: 'Rejected',
    verifiedBy: 'Priya Narayanan (Pincode Admin)',
    verifiedDate: '2026-03-04',
    submittedDate: '2026-03-02',
    submittedDocuments: ['PAN Card', 'Incomplete Trade Certificate', 'Unverified Bank Slip']
  },
  {
    id: 'KYC-VND-007',
    businessName: 'Hillview Eco Resort & Cottages',
    name: 'Hillview Eco Resort & Cottages',
    category: 'Stay',
    businessType: 'Proprietorship',
    businessDescription: 'Nature cottages and coffee plantation stay with outdoor trekking and camp activities.',
    vendorName: 'Thirunavukkarasu R',
    phone: '+91 94431 10007',
    email: 'hillview.resort@vendor.com',
    address: '7, Mountain Valley Road, Yercaud Foothills, Salem',
    fullAddress: '7, Mountain Valley Road, Yercaud Foothills, Salem - 636004',
    pincode: '636004',
    district: 'Salem',
    division: 'Salem South',
    state: 'Tamil Nadu',
    status: 'Approved',
    verifiedBy: 'K. Suresh (Pincode Admin)',
    verifiedDate: '2026-02-28',
    submittedDate: '2026-02-26',
    submittedDocuments: ['Forest Dept Clearance', 'Commercial Property Tax Receipt', 'GST Certificate', 'Aadhaar Card']
  },
  {
    id: 'KYC-VND-008',
    businessName: 'Salem Artisan Bakery & Confectionery',
    name: 'Salem Artisan Bakery & Confectionery',
    category: 'Food',
    businessType: 'Proprietorship',
    businessDescription: 'Artisan sourdough breads, customized celebratory cakes, and European breakfast pastries.',
    vendorName: 'Deepak Chandran',
    phone: '+91 94431 10008',
    email: 'artisan.bakery@vendor.com',
    address: '52, Fairlands Main Road, Salem',
    fullAddress: '52, Fairlands Main Road, Salem - 636001',
    pincode: '636001',
    district: 'Salem',
    division: 'Salem North',
    state: 'Tamil Nadu',
    status: 'Pending',
    verifiedBy: 'Pending Verification (Priya Narayanan)',
    verifiedDate: null,
    submittedDate: '2026-03-06',
    submittedDocuments: ['FSSAI Application Challan', 'Municipal Health License', 'PAN Card', 'Lease Agreement']
  }
];

const qualityCheckRecords = [
  {
    id: 'QC-ISSUE-001',
    vendorName: 'Sri Krishna Electricals & Spares',
    vendorId: 'VND-001',
    productName: 'Finolex 2.5 sq mm Flame Retardant Wire (90m)',
    productId: 'PRD-101',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    issue: 'Counterfeit ISI Mark & Substandard Fire-Retardant Polymer',
    warningCount: 1,
    status: 'Warning',
    date: '2026-03-08',
    details: 'Tested insulation breakdown at 450V instead of mandatory 1100V threshold. 1st warning issued by QC module.',
    qcCheckedBy: 'Automated QC Module v2.4'
  },
  {
    id: 'QC-ISSUE-002',
    vendorName: 'Salem Supermart & Grocery Supplies',
    vendorId: 'VND-002',
    productName: 'Nandini Pure Ghee (1L Tin)',
    productId: 'PRD-102',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    issue: 'Adulteration Detected - Non-standard Milk Fat & Acid Value Discrepancy',
    warningCount: 2,
    status: 'Warning',
    date: '2026-03-05',
    details: 'Laboratory chromatogram confirmed presence of 18% non-dairy fats. 2nd warning issued by QC module. 1 more warning will lead to suspension.',
    qcCheckedBy: 'Food Safety & Standards QC Node'
  },
  {
    id: 'QC-ISSUE-003',
    vendorName: 'Sri Krishna Electricals & Spares',
    vendorId: 'VND-001',
    productName: 'Generic 3-Pin Surge Protector Multi-Plug',
    productId: 'PRD-103',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    issue: 'Hazardous Shock Risk - Missing Ground Earth Pin Continuity',
    warningCount: 3,
    status: 'Suspended',
    date: '2026-03-01',
    details: 'Critical safety hazard. Product has reached 3 warnings. Under QC policy (3 Warnings = Suspend), product is now suspended from customer purchase.',
    qcCheckedBy: 'Automated QC Module v2.4'
  },
  {
    id: 'QC-ISSUE-004',
    vendorName: 'Sri Krishna Electricals & Spares',
    vendorId: 'VND-001',
    productName: 'Unbranded Quartz Room Heater 800W',
    productId: 'PRD-100',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    issue: 'Severe Fire Hazard - Defective Thermostat Cut-off After Suspension',
    warningCount: 4,
    status: 'Deleted',
    date: '2026-02-24',
    details: 'Product was previously suspended at 3 warnings. Repeated non-compliance and hazardous defect confirmation post-suspension resulted in permanent deletion from platform.',
    qcCheckedBy: 'Automated QC Module v2.4'
  },
  {
    id: 'QC-ISSUE-005',
    vendorName: 'Shevapet Textures & Home Decors',
    vendorId: 'VND-003',
    productName: 'Pure Silk Kanchipuram Saree (Gold Zari)',
    productId: 'PRD-104',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    issue: 'Mislabeled Composition - 40% Synthetic Viscose Blend Sold as 100% Silk',
    warningCount: 1,
    status: 'Warning',
    date: '2026-03-09',
    details: 'Silk Mark tag could not be validated against Central Silk Board database. 1st warning served to update product description accurately.',
    qcCheckedBy: 'Textile Compliance QC Scanner'
  },
  {
    id: 'QC-ISSUE-006',
    vendorName: 'Gugai Spares & Hardware Depot',
    vendorId: 'VND-004',
    productName: 'Cast Iron 1-Inch Gate Valve',
    productId: 'PRD-105',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem South',
    pincode: '636004',
    issue: 'Pressure Rupture Defect - Fails 10 Bar Hydrostatic Burst Test',
    warningCount: 3,
    status: 'Suspended',
    date: '2026-03-02',
    details: 'Valve casting micro-fissures detected. 3rd warning accumulated; product automatically suspended.',
    qcCheckedBy: 'Industrial Standards QC System'
  },
  {
    id: 'QC-ISSUE-007',
    vendorName: 'Kovai Power Tools & Spares',
    vendorId: 'VND-005',
    productName: 'Bosch 850W Heavy Angle Grinder (Replica)',
    productId: 'PRD-106',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore North',
    pincode: '641001',
    issue: 'Trademark Infringement & Uncertified Armature Coil Overheating',
    warningCount: 4,
    status: 'Deleted',
    date: '2026-02-26',
    details: 'Counterfeit unit infringing Bosch trademark. Product was suspended and has now been permanently deleted.',
    qcCheckedBy: 'Automated IP & Quality Enforcement'
  },
  {
    id: 'QC-ISSUE-008',
    vendorName: 'Peelamedu Hardware & Electricals',
    vendorId: 'VND-006',
    productName: 'Submersible Water Pump 1.5 HP',
    productId: 'PRD-107',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    division: 'Coimbatore South',
    pincode: '641004',
    issue: 'Efficiency Rating Mismatch - Copper Impeller Replaced with Recycled Plastic',
    warningCount: 2,
    status: 'Warning',
    date: '2026-03-07',
    details: 'Destructive testing revealed plastic composite instead of copper. 2nd warning issued.',
    qcCheckedBy: 'Hardware Quality Inspection Unit'
  },
  {
    id: 'QC-ISSUE-009',
    vendorName: 'Madras Natural Foods',
    vendorId: 'VND-009',
    productName: 'Organic Forest Honey (500g Glass Jar)',
    productId: 'PRD-108',
    state: 'Tamil Nadu',
    district: 'Chennai',
    division: 'Chennai Central',
    pincode: '600001',
    issue: 'Excess High-Fructose Invert Sugar Syrup (C4 Sugars Exceed 28%)',
    warningCount: 3,
    status: 'Suspended',
    date: '2026-03-04',
    details: 'Reached 3 warnings under FSSAI Honey Regulations 2020. Suspended from catalog.',
    qcCheckedBy: 'Food Safety & Standards QC Node'
  },
  {
    id: 'QC-ISSUE-010',
    vendorName: 'T. Nagar Electronics Emporium',
    vendorId: 'VND-010',
    productName: 'Fast Charging Type-C GaN 65W Power Adapter',
    productId: 'PRD-109',
    state: 'Tamil Nadu',
    district: 'Chennai',
    division: 'Chennai South',
    pincode: '600017',
    issue: 'BIS Safety Exemption Forgery & Overvoltage Spark Hazard',
    warningCount: 4,
    status: 'Deleted',
    date: '2026-02-20',
    details: 'Dielectric test failed creating dangerous arcing. Deleted post-suspension.',
    qcCheckedBy: 'Electronics Safety QC Node'
  }
];

module.exports = {
  hierarchy,
  admins,
  pincodeDetails,
  customers,
  vendors,
  vendorPayments,
  orders,
  bookings,
  jobs,
  technicians,
  executives,
  supportTeam,
  agents,
  agentPayments,
  agentActivities,
  kycRecords,
  qualityCheckRecords
};
