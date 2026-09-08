import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard,
  MapPin,
  Building2,
  Users,
  CreditCard,
  Store,
  ShoppingBag,
  CalendarCheck,
  Briefcase,
  Wrench,
  UserCheck,
  Headphones,
  UserPlus,
  UserCog,
  IndianRupee,
  FileCheck2,
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  LogOut,
  Sliders,
  Settings,
  Globe2,
  Layers,
  User,
  Truck,
  ClipboardList,
  CircleHelp
} from 'lucide-react';

export function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();

  if (!user) return null;

  const role = user.role;

  let navSections = [];

  if (role === 'State Admin') {
    navSections = [
      {
        title: '',
        items: [
          { name: 'Dashboard', path: '/state-admin/dashboard', icon: LayoutDashboard },
        ]
      },
      {
        title: 'Districts',
        items: [
          { name: 'District List', path: '/state-admin/districts', icon: Building2 },
          { name: 'District Admins', path: '/state-admin/district-admins', icon: ShieldAlert },
          { name: 'District Details', path: '/state-admin/district-details', icon: Building2 },
        ]
      },
      {
        title: 'Divisions',
        items: [
          { name: 'Division List', path: '/state-admin/divisions', icon: Layers },
          { name: 'Division Admins', path: '/state-admin/division-admins', icon: ShieldAlert },
          { name: 'Division Details', path: '/state-admin/division-details', icon: Building2 },
        ]
      },
      {
        title: 'Pincodes',
        items: [
          { name: 'Pincode List', path: '/state-admin/pincodes', icon: MapPin },
          { name: 'Pincode Admins', path: '/state-admin/pincode-admins', icon: ShieldCheck },
          { name: 'Pincode Details', path: '/state-admin/pincode-details', icon: Building2 },
        ]
      },
      {
        title: 'Managers',
        items: [
          { name: 'State Managers', path: '/state-admin/managers/state', icon: UserCog },
          { name: 'District Managers', path: '/state-admin/managers/district', icon: Building2 },
          { name: 'Divisional Managers', path: '/state-admin/managers/divisional', icon: Layers },
          { name: 'Pincode Managers', path: '/state-admin/managers/pincode', icon: MapPin },
        ]
      },
      {
        title: 'Agents',
        items: [
          { name: 'State Agent', path: '/state-admin/agents/state', icon: UserPlus },
          { name: 'District Agent', path: '/state-admin/agents/district', icon: Building2 },
          { name: 'Divisional Agent', path: '/state-admin/agents/divisional', icon: Layers },
          { name: 'Pincode Agent', path: '/state-admin/agents/pincode', icon: MapPin },
          { name: 'Agents Payment', path: '/state-admin/agent-payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Customers & Membership',
        items: [
          { name: 'Customers', path: '/state-admin/customers', icon: Users },
          { name: 'Membership Cards', path: '/state-admin/membership-cards', icon: CreditCard },
        ]
      },
      {
        title: 'Vendors',
        items: [
          { name: 'Vendors', path: '/state-admin/vendors', icon: Store },
          { name: 'Vendor Payment Status', path: '/state-admin/vendor-payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Operations',
        items: [
          { name: 'Orders', path: '/state-admin/orders', icon: ShoppingBag },
          { name: 'Bookings', path: '/state-admin/bookings', icon: CalendarCheck },
          { name: 'Jobs', path: '/state-admin/jobs', icon: Briefcase },
          { name: 'Delivery Partners', path: '/state-admin/delivery-partners', icon: Truck },
          { name: 'Technicians', path: '/state-admin/technicians', icon: Wrench },
          { name: 'Executives', path: '/state-admin/executives', icon: UserCheck },
          { name: 'Support Team', path: '/state-admin/support-team', icon: Headphones },
        ]
      },
      {
        title: 'Finance & Compliance',
        items: [
          { name: 'KYC', path: '/state-admin/kyc', icon: FileCheck2 },
          { name: 'Payments', path: '/state-admin/payments', icon: IndianRupee },
          { name: 'Business Reports', path: '/state-admin/reports', icon: BarChart3 },
          { name: 'Tasks', path: '/state-admin/tasks', icon: ClipboardList },
          { name: 'Queries', path: '/state-admin/queries', icon: CircleHelp },
        ]
      },
      {
        title: 'Account',
        items: [
          { name: 'Profile', path: '/state-admin/profile', icon: User },
          { name: 'Settings', path: '/state-admin/settings', icon: Settings },
        ]
      }
    ];
  } else if (role === 'District Admin') {
    navSections = [
      {
        title: '',
        items: [
          { name: 'Dashboard', path: '/district-admin/dashboard', icon: LayoutDashboard },
          { name: 'District Overview', path: '/district-admin/overview', icon: Globe2 },
        ]
      },
      {
        title: 'Divisions',
        items: [
          { name: 'Division List', path: '/district-admin/divisions', icon: Layers },
          { name: 'Division Admins', path: '/district-admin/division-admins', icon: ShieldAlert },
          { name: 'Division Details', path: '/district-admin/division-details', icon: Building2 },
        ]
      },
      {
        title: 'Pincodes',
        items: [
          { name: 'Pincode List', path: '/district-admin/pincodes', icon: MapPin },
          { name: 'Pincode Admins', path: '/district-admin/pincode-admins', icon: ShieldCheck },
        ]
      },
      {
        title: 'Agents',
        items: [
          { name: 'Agents', path: '/district-admin/agents', icon: UserPlus },
          { name: 'Agent Payments', path: '/district-admin/agent-payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Customers & Loyalty',
        items: [
          { name: 'Customers', path: '/district-admin/customers', icon: Users },
          { name: 'Membership Cards', path: '/district-admin/membership-cards', icon: CreditCard },
        ]
      },
      {
        title: 'Vendors',
        items: [
          { name: 'Vendors', path: '/district-admin/vendors', icon: Store },
          { name: 'Vendor Payments', path: '/district-admin/vendor-payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Operations',
        items: [
          { name: 'Orders', path: '/district-admin/orders', icon: ShoppingBag },
          { name: 'Bookings', path: '/district-admin/bookings', icon: CalendarCheck },
          { name: 'Jobs', path: '/district-admin/jobs', icon: Briefcase },
          { name: 'Delivery Partners', path: '/district-admin/delivery-partners', icon: Truck },
          { name: 'Technicians', path: '/district-admin/technicians', icon: Wrench },
          { name: 'Executives', path: '/district-admin/executives', icon: UserCheck },
          { name: 'Support Team', path: '/district-admin/support-team', icon: Headphones },
        ]
      },
      {
        title: 'Finance & Compliance',
        items: [
          { name: 'KYC', path: '/district-admin/kyc', icon: FileCheck2 },
          { name: 'Business Reports', path: '/district-admin/reports', icon: BarChart3 },
          { name: 'Payments', path: '/district-admin/payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Account',
        items: [
          { name: 'Profile', path: '/district-admin/profile', icon: User },
          { name: 'Settings', path: '/district-admin/settings', icon: Settings },
        ]
      }
    ];
  } else if (role === 'Divisional Admin') {
    navSections = [
      {
        title: '',
        items: [
          { name: 'Dashboard', path: '/divisional-admin/dashboard', icon: LayoutDashboard },
          { name: 'Division Overview', path: '/divisional-admin/overview', icon: Globe2 },
        ]
      },
      {
        title: 'Pincodes',
        items: [
          { name: 'Pincode List', path: '/divisional-admin/pincodes', icon: MapPin },
          { name: 'Pincode Admins', path: '/divisional-admin/pincode-admins', icon: ShieldAlert },
          { name: 'Pincode Details', path: '/divisional-admin/pincode-details', icon: Building2 },
        ]
      },
      {
        title: 'Agents',
        items: [
          { name: 'Agents', path: '/divisional-admin/agents', icon: UserPlus },
          { name: 'Agent Payments', path: '/divisional-admin/agent-payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Customers & Loyalty',
        items: [
          { name: 'Customers', path: '/divisional-admin/customers', icon: Users },
          { name: 'Membership Cards', path: '/divisional-admin/membership-cards', icon: CreditCard },
        ]
      },
      {
        title: 'Vendors',
        items: [
          { name: 'Vendors', path: '/divisional-admin/vendors', icon: Store },
          { name: 'Vendor Payments', path: '/divisional-admin/vendor-payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Operations',
        items: [
          { name: 'Orders', path: '/divisional-admin/orders', icon: ShoppingBag },
          { name: 'Bookings', path: '/divisional-admin/bookings', icon: CalendarCheck },
          { name: 'Jobs', path: '/divisional-admin/jobs', icon: Briefcase },
          { name: 'Delivery Partners', path: '/divisional-admin/delivery-partners', icon: Truck },
          { name: 'Technicians', path: '/divisional-admin/technicians', icon: Wrench },
          { name: 'Executives', path: '/divisional-admin/executives', icon: UserCheck },
          { name: 'Support Team', path: '/divisional-admin/support-team', icon: Headphones },
        ]
      },
      {
        title: 'Finance & Compliance',
        items: [
          { name: 'KYC', path: '/divisional-admin/kyc', icon: FileCheck2 },
          { name: 'Business Reports', path: '/divisional-admin/reports', icon: BarChart3 },
          { name: 'Payments', path: '/divisional-admin/payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Account',
        items: [
          { name: 'Profile', path: '/divisional-admin/profile', icon: User },
          { name: 'Settings', path: '/divisional-admin/settings', icon: Settings },
        ]
      }
    ];
  } else if (role === 'Pincode Admin') {
    navSections = [
      {
        title: '',
        items: [
          { name: 'Dashboard', path: '/pincode-admin/dashboard', icon: LayoutDashboard },
          { name: 'Pincode Overview', path: '/pincode-admin/overview', icon: Globe2 },
        ]
      },
      {
        title: 'Customers & Loyalty',
        items: [
          { name: 'Customers', path: '/pincode-admin/customers', icon: Users },
          { name: 'Membership Cards', path: '/pincode-admin/membership-cards', icon: CreditCard },
        ]
      },
      {
        title: 'Vendors',
        items: [
          { name: 'Vendor List', path: '/pincode-admin/vendors', icon: Store },
          { name: 'Vendor Details', path: '/pincode-admin/vendor-details', icon: Building2 },
          { name: 'Vendor Payments', path: '/pincode-admin/vendor-payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Operations',
        items: [
          { name: 'Orders', path: '/pincode-admin/orders', icon: ShoppingBag },
          { name: 'Bookings', path: '/pincode-admin/bookings', icon: CalendarCheck },
          { name: 'Jobs', path: '/pincode-admin/jobs', icon: Briefcase },
          { name: 'Delivery Partner', path: '/pincode-admin/delivery-partners', icon: Truck },
          { name: 'Technicians', path: '/pincode-admin/technicians', icon: Wrench },
          { name: 'Executives', path: '/pincode-admin/executives', icon: UserCheck },
          { name: 'Support Team', path: '/pincode-admin/support-team', icon: Headphones },
          { name: 'Agents', path: '/pincode-admin/agents', icon: UserPlus },
          { name: 'Agent Payments', path: '/pincode-admin/agent-payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Finance & Compliance',
        items: [
          { name: 'KYC', path: '/pincode-admin/kyc', icon: FileCheck2 },
          { name: 'Business Reports', path: '/pincode-admin/business-reports', icon: BarChart3 },
          { name: 'Pincode Manager', path: '/pincode-admin/pincode-manager', icon: Sliders },
          { name: 'Payments', path: '/pincode-admin/payments', icon: IndianRupee },
        ]
      },
      {
        title: 'Account',
        items: [
          { name: 'Profile', path: '/pincode-admin/profile', icon: User },
          { name: 'Settings', path: '/pincode-admin/settings', icon: Settings },
        ]
      }
    ];
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 ${
          isDark
            ? 'bg-[#0c182b] text-slate-300 border-slate-800/80'
            : 'bg-white text-slate-700 border-slate-200'
        } border-r flex flex-col transition-all duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className={`p-4 border-b ${
          isDark ? 'border-slate-800/80 bg-transparent' : 'border-slate-100 bg-slate-50/50'
        } flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-blue-500/20">
              A
            </div>
            <div>
              <h1 className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'} tracking-wider leading-none`}>
                FORGE INDIA
              </h1>
              <span className={`text-[10px] ${isDark ? 'text-amber-400' : 'text-blue-600'} font-bold tracking-wider uppercase mt-0.5 block`}>
                {role === 'State Admin' ? 'STATE ADMIN' : role === 'District Admin' ? 'DISTRICT ADMIN' : role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3">
          {navSections.map((section, sIdx) => (
            <div key={section.title || sIdx} className="space-y-0.5">
              {section.title && (
                <div className={`text-[10px] font-extrabold ${isDark ? 'text-slate-500' : 'text-slate-400'} uppercase tracking-wider px-3 pt-2 pb-1`}>
                  {section.title}
                </div>
              )}

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.name + item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                        : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-white'
                            : isDark
                            ? 'text-slate-400 group-hover:text-blue-400'
                            : 'text-slate-400 group-hover:text-blue-600'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Logout at bottom */}
        <div className={`p-3 border-t ${
          isDark ? 'border-slate-800/80 bg-[#0a1424]' : 'border-slate-100 bg-slate-50/50'
        }`}>
          <button
            onClick={logout}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
              isDark ? 'text-slate-300 hover:text-rose-400 hover:bg-rose-950/30' : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
            } transition`}
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
