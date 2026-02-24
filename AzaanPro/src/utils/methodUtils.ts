export const METHOD_IDS = [
  0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23,
];

export function getMethodName(method: number): string {
  const methods: Record<number, string> = {
    0: "Jafari / Shia Ithna-Ashari",
    1: "University of Islamic Sciences, Karachi",
    2: "Islamic Society of North America",
    3: "Muslim World League",
    4: "Umm Al-Qura University, Makkah",
    5: "Egyptian General Authority of Survey",
    7: "Institute of Geophysics, University of Tehran",
    8: "Gulf Region",
    9: "Kuwait",
    10: "Qatar",
    11: "Majlis Ugama Islam Singapura, Singapore",
    12: "Union Organization islamic de France",
    13: "Diyanet İşleri Başkanlığı, Turkey",
    14: "Spiritual Administration of Muslims of Russia",
    15: "Moonsighting Committee Worldwide (also requires shafaq parameter)",
    16: "Dubai (experimental)",
    17: "Jabatan Kemajuan Islam Malaysia (JAKIM)",
    18: "Tunisia",
    19: "Algeria",
    20: "KEMENAG - Kementerian Agama Republik Indonesia",
    21: "Morocco",
    22: "Comunidade Islamica de Lisboa",
    23: "Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan",
  };

  return methods[method] || "Unknown";
}

export function cleanTime(time?: string) {
  if (!time) return null;
  return time.split(" ")[0];
}
