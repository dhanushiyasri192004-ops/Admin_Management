import React, { useState, useEffect } from 'react';
import { dataService } from '../../services/dataService';
import { DataTable } from '../../components/DataTable';
import { TierBadge, StatusBadge } from '../../components/Badge';
import { MembershipCardVisual } from '../../components/MembershipCardVisual';
import { Modal } from '../../components/Modal';
import { CreditCard, Sparkles, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function PincodeMembershipCards() {
  const [cardsData, setCardsData] = useState({ counts: {}, cards: [] });
  const [loading, setLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState('');
  
  // Upgrade Modal
  const [selectedCard, setSelectedCard] = useState(null);
  const [newTier, setNewTier] = useState('Diamond');
  const [bonusPoints, setBonusPoints] = useState(500);
  const [updating, setUpdating] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await dataService.getMembershipCards();
      if (res.success) setCardsData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpgrade = async () => {
    if (!selectedCard) return;
    setUpdating(true);
    try {
      await dataService.upgradeMembership({
        customerId: selectedCard.customerId,
        tier: newTier,
        pointsBonus: bonusPoints
      });
      setSelectedCard(null);
      loadData();
    } catch (e) {
      alert(e.message || 'Upgrade failed');
    } finally {
      setUpdating(false);
    }
  };

  const filteredCards = tierFilter
    ? cardsData.cards.filter(c => c.tier.toLowerCase() === tierFilter.toLowerCase())
    : cardsData.cards;

  const columns = [
    {
      header: 'Card Number & Holder',
      accessor: 'cardNumber',
      render: (row) => (
        <div>
          <div className="font-mono font-bold text-white text-sm tracking-wider">{row.cardNumber}</div>
          <div className="text-xs text-slate-300 font-semibold mt-0.5">{row.customerName}</div>
          <div className="text-[10px] text-slate-400">{row.customerPhone}</div>
        </div>
      )
    },
    {
      header: 'Membership Tier',
      accessor: 'tier',
      render: (row) => (
        <div>
          <TierBadge tier={row.tier} />
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            {row.discountPercent}% Instant Cart Discount
          </div>
        </div>
      )
    },
    {
      header: 'Reward Points',
      accessor: 'points',
      render: (row) => (
        <span className="font-mono font-bold text-amber-300 text-sm">
          {row.points?.toLocaleString()} Pts
        </span>
      )
    },
    {
      header: 'Validity Period',
      accessor: 'expiryDate',
      render: (row) => (
        <div className="text-xs text-slate-300 font-mono">
          <div>Issued: {row.issueDate}</div>
          <div className="text-slate-400">Expires: {row.expiryDate}</div>
        </div>
      )
    },
    {
      header: 'Card Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <button
          onClick={() => {
            setSelectedCard(row);
            setNewTier(row.tier === 'Diamond' ? 'Diamond' : row.tier === 'Gold' ? 'Diamond' : 'Gold');
          }}
          className="px-3 py-1 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/60 border border-indigo-500/50 text-indigo-300 text-xs font-bold transition flex items-center gap-1"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>Upgrade Tier</span>
        </button>
      )
    }
  ];

  const counts = cardsData.counts || {};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Membership Card Customers</h2>
        <p className="text-xs text-slate-400">
          Manage privilege loyalty cards across Silver, Gold, and Diamond tiers in this Pincode.
        </p>
      </div>

      {/* Tier Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Silver Card Box */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Silver Advantage</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              5% Off
            </span>
          </div>
          <div className="text-3xl font-black text-white mt-3 font-mono">
            {counts.silver || 0}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active Silver cardholders</p>
        </div>

        {/* Gold Card Box */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Gold Privilege</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/50">
              12% Off
            </span>
          </div>
          <div className="text-3xl font-black text-amber-400 mt-3 font-mono">
            {counts.gold || 0}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active Gold cardholders</p>
        </div>

        {/* Diamond Card Box */}
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Diamond VIP Elite</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
              20% Off
            </span>
          </div>
          <div className="text-3xl font-black text-cyan-400 mt-3 font-mono">
            {counts.diamond || 0}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active VIP Diamond members</p>
        </div>
      </div>

      {/* Visual Showcase of Top Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Privilege Card Visual Designs (Silver, Gold, Diamond)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cardsData.cards.slice(0, 3).map((c) => (
            <MembershipCardVisual
              key={c.cardNumber}
              customer={{ name: c.customerName }}
              tier={c.tier}
              cardNumber={c.cardNumber}
              points={c.points}
              expiryDate={c.expiryDate}
              discountPercent={c.discountPercent}
            />
          ))}
        </div>
      </div>

      {/* Cards Table */}
      <DataTable
        title="Membership Cards Directory"
        subtitle="Manage benefits and tiers"
        columns={columns}
        data={filteredCards}
        loading={loading}
        onRefresh={loadData}
        filterOptions={[
          { label: 'All Card Tiers (Silver/Gold/Diamond)', value: '' },
          { label: 'Diamond Tier Cards', value: 'Diamond' },
          { label: 'Gold Tier Cards', value: 'Gold' },
          { label: 'Silver Tier Cards', value: 'Silver' },
        ]}
        activeFilter={tierFilter}
        onFilterChange={setTierFilter}
        exportFileName="membership_cards.csv"
      />

      {/* Upgrade Tier Modal */}
      <Modal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        title="Upgrade Customer Membership Tier"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-xs text-slate-400">Card Holder</div>
            <div className="font-bold text-white text-base">{selectedCard?.customerName}</div>
            <div className="text-xs font-mono text-slate-400 mt-0.5">{selectedCard?.cardNumber}</div>
            <div className="mt-2 text-xs">
              Current Tier: <TierBadge tier={selectedCard?.tier} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select New Membership Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Silver', 'Gold', 'Diamond'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNewTier(t)}
                  className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 ${
                    newTier === t
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span>{t}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    {t === 'Diamond' ? '20% Off' : t === 'Gold' ? '12% Off' : '5% Off'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Bonus Loyalty Points to Award
            </label>
            <input
              type="number"
              value={bonusPoints}
              onChange={(e) => setBonusPoints(e.target.value)}
              placeholder="e.g. 500"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setSelectedCard(null)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              disabled={updating}
              onClick={handleUpgrade}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30"
            >
              {updating ? 'Upgrading...' : `Confirm Upgrade to ${newTier}`}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
