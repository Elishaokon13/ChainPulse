// src/services/scoring.js
// Mock logic for scoring. Replace with real scoring algorithm when ready.

export function computeScore({ wallets, tvl, txVolume, tokenAge, devActivity, dappUsage, mentions }) {
  // TODO: Implement real weighted scoring logic
  // Example weights: wallets (30%), tvl (25%), txVolume (20%), tokenAge (10%), devActivity (10%), dappUsage (5%)
  const score = (
    (wallets || 0) * 0.3 +
    (tvl || 0) * 0.25 +
    (txVolume || 0) * 0.2 +
    (tokenAge || 0) * 0.1 +
    (devActivity || 0) * 0.1 +
    (dappUsage || 0) * 0.05
  ) / 1000; // mock normalization
  return Math.round(score * 100) / 100;
} 