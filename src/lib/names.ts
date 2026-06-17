// Curated name list. Every name here has demonstrated real search demand in
// Google Search Console. Thin, zero-demand and duplicate pages were pruned
// (2026-06-17) — fewer, genuinely useful pages beat a wall of near-duplicates.
// Ordered by current search impressions (highest first).
export const POPULAR_NAMES = [
  'Priya','Anjali','Lisa','David','Robert','Neha','Rahul','Richard','Paul','George',
  'Steven','Olivia','Ava','Noah','Emma','Oliver','Zainab','Kenneth','John','Mark',
  'Pooja','Thomas','Lucas','Anthony','Joshua','Anna','Matthew','Ahmed','Sandra','Emily',
  'Amy','Rebecca','Jeffrey','Owen','Omar','Ryan','Vikram','Eric','Liam','James',
  'Andrew','Benjamin','Edward','Fatima','Jessica','Jason','Laura','Justin','Hassan','Kevin',
  'Stephanie','Patricia','Ethan','Dorothy',
];

export const NAME_SLUGS = POPULAR_NAMES.map(n => n.toLowerCase().replace(/\s+/g, '-'));

// Re-exported from nameContent for backward compatibility.
export { getNameMeta } from './nameContent';
