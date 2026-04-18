/**
 * Địa điểm trong UI filter — cần khớp chính xác chuỗi `location` trên document provider trong Sanity.
 * (Đồng bộ với seed/sanity/providers.ndjson.)
 */
export const FILTER_LOCATIONS: string[] = [
  "Balaclava",
  "Beau Bassin",
  "Bel Ombre",
  "Black River",
  "Blue Bay",
  "Curepipe",
  "Cybercity",
  "Ebène",
  "Flacq",
  "Flic en Flac",
  "Grand Baie",
  "Le Morne",
  "Mahébourg",
  "Moka",
  "Pamplemousses",
  "Pointe aux Piments",
  "Port Louis",
  "Poste de Flacq",
  "Quatre Bornes",
  "Riche Terre",
  "Rose Hill",
  "Saint Pierre",
  "Tamarin",
  "Vacoas",
].sort((a, b) => a.localeCompare(b, "en"));
