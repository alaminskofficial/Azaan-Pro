
export type AsmaName = {
    number: number;
    name: string;
    transliteration: string;
    en: {
      meaning: string;
    };
  };
  
  export async function fetchAsmaUlHusna(): Promise<AsmaName[]> {
    const res = await fetch("https://api.aladhan.com/v1/asmaAlHusna");
  
    if (!res.ok) {
      throw new Error("Failed to fetch Asma-ul-Husna");
    }
  
    const json = await res.json();
    return json.data || [];
  }