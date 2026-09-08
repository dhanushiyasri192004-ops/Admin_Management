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
    category: 'Electrical & Hardware',
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
    category: 'FMCG & Groceries',
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
    category: 'Home & Furnishing',
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
    category: 'Industrial Tools',
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
      { name: 'Smart Home Automation Hub', qty: 1, price: 6500 },
      { name: 'Motion Sensor Light Pack', qty: 2, price: 1200 }
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
      { name: 'Organic Cold Pressed Oil Box', qty: 3, price: 1100 },
      { name: 'Millets Nutrition Pack', qty: 2, price: 450 }
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
      { name: 'Water Purifier Filter Cartridge', qty: 2, price: 850 }
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
      { name: 'Cotton Bed Linen Combo', qty: 2, price: 2200 }
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
      { name: 'Heavy Duty Precision Tool Set', qty: 1, price: 12500 }
    ],
    totalAmount: 12500,
    discountAmount: 2500,
    netPayable: 10000,
    membershipTier: 'Diamond',
    status: 'Delivered',
    paymentMode: 'Online (UPI)',
    orderDate: '2026-02-28 11:20',
    deliveryDate: '2026-03-01'
  }
];

const bookings = [
  {
    id: 'BKG-301',
    bookingNumber: 'BK-2026-001',
    customerName: 'Vikram Chandran',
    service: 'AC Deep Service & Gas Refill',
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
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    scheduledDate: '2026-03-06 11:00 AM',
    technicianAssigned: 'Palanisamy K',
    charge: 950,
    status: 'Pending'
  }
];

const jobs = [
  {
    id: 'JOB-801',
    title: 'AC Comprehensive Maintenance',
    bookingId: 'BKG-301',
    customerName: 'Vikram Chandran',
    customerAddress: '14/B Gandhi Road, Fort 636001',
    technicianName: 'Murugan Perumal',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    priority: 'High',
    status: 'Scheduled',
    estimatedTime: '2 hours',
    createdAt: '2026-03-02'
  },
  {
    id: 'JOB-802',
    title: 'Water Pipe Leakage Fixing',
    bookingId: 'BKG-302',
    customerName: 'Lakshmi Narayanan',
    customerAddress: '88 Rajaji Street, Hasthampatti 636001',
    technicianName: 'Selvamurthy R',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    priority: 'Urgent',
    status: 'In Progress',
    estimatedTime: '1.5 hours',
    createdAt: '2026-03-03'
  },
  {
    id: 'JOB-803',
    title: 'Master Switchboard Rewiring',
    bookingId: 'BKG-303',
    customerName: 'Divya Prakash',
    customerAddress: '45 Shevapet Main Road 636002',
    technicianName: 'Palanisamy K',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    priority: 'Medium',
    status: 'Pending',
    estimatedTime: '3 hours',
    createdAt: '2026-03-03'
  }
];

const technicians = [
  {
    id: 'TECH-401',
    name: 'Murugan Perumal',
    phone: '+91 97890 12001',
    specialization: 'HVAC / AC Technician',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    rating: 4.9,
    jobsCompleted: 142,
    activeJobs: 1,
    status: 'Available'
  },
  {
    id: 'TECH-402',
    name: 'Selvamurthy R',
    phone: '+91 97890 12002',
    specialization: 'Master Plumber',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    rating: 4.7,
    jobsCompleted: 98,
    activeJobs: 1,
    status: 'Busy'
  },
  {
    id: 'TECH-403',
    name: 'Palanisamy K',
    phone: '+91 97890 12003',
    specialization: 'Certified Electrician',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    rating: 4.6,
    jobsCompleted: 76,
    activeJobs: 0,
    status: 'Available'
  }
];

const executives = [
  {
    id: 'EXEC-201',
    name: 'Balaji Varma',
    role: 'Field Operations Executive',
    phone: '+91 96550 44001',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    activeTerritory: 'Fort & Surrounding 2km',
    merchantsOnboarded: 42,
    performanceScore: '94%',
    status: 'On Duty'
  },
  {
    id: 'EXEC-202',
    name: 'Manikandan S',
    role: 'Merchant Relationship Executive',
    phone: '+91 96550 44002',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    activeTerritory: 'Shevapet Commercial Ward',
    merchantsOnboarded: 29,
    performanceScore: '89%',
    status: 'On Duty'
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
  {
    id: 'AGT-701',
    name: 'Thirunavukkarasu R',
    phone: '+91 98940 55101',
    email: 'thiru.agent@gmail.com',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    totalReferrals: 165,
    activeSubscribers: 110,
    walletBalance: 14500,
    totalEarned: 84000,
    status: 'Active',
    joinedDate: '2024-04-10'
  },
  {
    id: 'AGT-702',
    name: 'Jayachandran Mohan',
    phone: '+91 98940 55102',
    email: 'jaya.agent@gmail.com',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    totalReferrals: 88,
    activeSubscribers: 54,
    walletBalance: 7200,
    totalEarned: 39000,
    status: 'Active',
    joinedDate: '2024-09-15'
  },
  {
    id: 'AGT-703',
    name: 'Naveen Kumar M',
    phone: '+91 98940 55103',
    email: 'naveen.agent@gmail.com',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    totalReferrals: 94,
    activeSubscribers: 72,
    walletBalance: 9800,
    totalEarned: 52000,
    status: 'Active',
    joinedDate: '2024-07-20'
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
    id: 'KYC-501',
    name: 'Vikram Chandran',
    type: 'Customer',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    docType: 'Aadhaar & PAN Card',
    docNumber: 'XXXX-XXXX-4819 / ABCDE1234F',
    submittedDate: '2026-02-10',
    status: 'Verified',
    verifiedBy: 'State Admin Verification Bot',
    verifiedDate: '2026-02-11'
  },
  {
    id: 'KYC-502',
    name: 'Sri Krishna Electricals & Spares',
    type: 'Vendor',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    docType: 'GST Certificate & MSME Udyam',
    docNumber: '33AAAAA0000A1Z5',
    submittedDate: '2026-02-15',
    status: 'Verified',
    verifiedBy: 'Priya Narayanan (Pincode Admin)',
    verifiedDate: '2026-02-16'
  },
  {
    id: 'KYC-503',
    name: 'Shevapet Textures & Home Decors',
    type: 'Vendor',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636002',
    docType: 'Trade License & Bank Passbook',
    docNumber: 'TL-SLM-2024-991',
    submittedDate: '2026-03-01',
    status: 'Pending',
    verifiedBy: null,
    verifiedDate: null
  },
  {
    id: 'KYC-504',
    name: 'Thirunavukkarasu R',
    type: 'Agent',
    state: 'Tamil Nadu',
    district: 'Salem',
    division: 'Salem North',
    pincode: '636001',
    docType: 'Aadhaar Card & Bank Cheque',
    docNumber: 'XXXX-XXXX-9901',
    submittedDate: '2026-02-05',
    status: 'Verified',
    verifiedBy: 'Priya Narayanan (Pincode Admin)',
    verifiedDate: '2026-02-06'
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
  kycRecords
};
