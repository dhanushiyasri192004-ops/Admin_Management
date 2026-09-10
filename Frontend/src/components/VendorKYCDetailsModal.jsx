import React from 'react';
import { Modal } from './Modal';
import { StatusBadge } from './Badge';
import {
  Building2,
  Store,
  Tag,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Compass,
  ShieldCheck,
  Calendar,
  FileCheck2,
  CheckCircle2,
  Clock,
  XCircle,
  Briefcase
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function VendorKYCDetailsModal({ isOpen, onClose, vendor }) {
  const { isDark } = useTheme();

  if (!vendor) return null;

  const businessName = vendor.businessName || vendor.name || 'Vendor Enterprise';
  const category = vendor.category || 'Services';
  const businessType = vendor.businessType || 'Proprietorship';
  const businessDescription =
    vendor.businessDescription ||
    'Authorized merchant operations managing certified trade services and retail provisions.';

  const vendorName = vendor.vendorName || vendor.contactPerson || 'Vendor Owner';
  const phone = vendor.phone || '+91 94431 00000';
  const email = vendor.email || 'vendor@company.com';

  const fullAddress = vendor.fullAddress || vendor.address || 'Commercial Center, Main Bazaar';
  const pincode = vendor.pincode || '636001';
  const district = vendor.district || 'Salem';
  const division = vendor.division || 'Salem North';
  const state = vendor.state || 'Tamil Nadu';

  const kycStatus = vendor.status || vendor.kycStatus || 'Approved';
  const verifiedBy = vendor.verifiedBy || 'Priya Narayanan (Pincode Admin)';
  const verificationDate = vendor.verifiedDate || vendor.verificationDate || (kycStatus === 'Pending' ? 'Under Review' : '2026-02-18');
  const submittedDocuments = Array.isArray(vendor.submittedDocuments) && vendor.submittedDocuments.length > 0
    ? vendor.submittedDocuments
    : [
        'GST Registration Certificate',
        'Business PAN Card',
        'Trade / Municipal Health License',
        'Cancelled Cheque / Bank Passbook'
      ];

  const getStatusIcon = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('approved') || s.includes('verified')) {
      return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    }
    if (s.includes('reject')) {
      return <XCircle className="w-4 h-4 text-rose-500" />;
    }
    return <Clock className="w-4 h-4 text-amber-500" />;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Vendor KYC Full Details"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Top Summary Header Banner */}
        <div
          className={`p-3.5 rounded-2xl border ${
            isDark
              ? 'bg-slate-950/60 border-slate-800'
              : 'bg-slate-50 border-slate-200/90'
          } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base shrink-0 border border-blue-200 dark:border-blue-900/50">
              <Store className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {businessName}
                </h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-900/60 whitespace-nowrap">
                  {category}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                <span>Vendor ID: <strong className="font-mono text-slate-700 dark:text-slate-300">{vendor.id || 'KYC-VND-001'}</strong></span>
                <span>•</span>
                <span>Type: <strong className="text-slate-700 dark:text-slate-300">{businessType}</strong></span>
              </div>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 self-start sm:self-center">
            {getStatusIcon(kycStatus)}
            <StatusBadge status={kycStatus} />
          </div>
        </div>

        {/* 1. BUSINESS DETAILS */}
        <div
          className={`p-3.5 rounded-2xl border ${
            isDark
              ? 'bg-slate-900/40 border-slate-800/80'
              : 'bg-white border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Business Details
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Business Name
              </span>
              <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                {businessName}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Category
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-slate-900 dark:text-white mt-0.5">
                <Tag className="w-3 h-3 text-indigo-500" />
                {category}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Business Type
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-slate-900 dark:text-white mt-0.5">
                <Briefcase className="w-3 h-3 text-slate-400" />
                {businessType}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Business Description
              </span>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5 text-xs leading-relaxed">
                {businessDescription}
              </p>
            </div>
          </div>
        </div>

        {/* 2. PERSONAL DETAILS */}
        <div
          className={`p-3.5 rounded-2xl border ${
            isDark
              ? 'bg-slate-900/40 border-slate-800/80'
              : 'bg-white border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Personal Details
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Vendor Name
              </span>
              <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                {vendorName}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Phone Number
              </span>
              <div className="flex items-center gap-1 font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:underline text-indigo-600 dark:text-indigo-400 font-semibold">
                  {phone}
                </a>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Email Address
              </span>
              <div className="flex items-center gap-1 font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:underline truncate text-slate-700 dark:text-slate-300">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ADDRESS DETAILS */}
        <div
          className={`p-3.5 rounded-2xl border ${
            isDark
              ? 'bg-slate-900/40 border-slate-800/80'
              : 'bg-white border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Address Details
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="col-span-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Full Address
              </span>
              <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                {fullAddress}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Pincode
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                PIN: {pincode}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                District
              </span>
              <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                {district}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Division
              </span>
              <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                {division}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                State
              </span>
              <span className="font-semibold text-slate-900 dark:text-white mt-0.5 block">
                {state}
              </span>
            </div>
          </div>
        </div>

        {/* 4. KYC DETAILS */}
        <div
          className={`p-3.5 rounded-2xl border ${
            isDark
              ? 'bg-slate-900/40 border-slate-800/80'
              : 'bg-white border-slate-200/80 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              KYC Details
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                KYC Status
              </span>
              <div className="mt-1">
                <StatusBadge status={kycStatus} />
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Verified By (Pincode Admin)
              </span>
              <span className="font-semibold text-slate-900 dark:text-white mt-1 block">
                {verifiedBy}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                Verification Date
              </span>
              <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-mono mt-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{verificationDate}</span>
              </div>
            </div>
            <div className="sm:col-span-3 mt-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium mb-1.5">
                Submitted Documents
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {submittedDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs ${
                      isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
