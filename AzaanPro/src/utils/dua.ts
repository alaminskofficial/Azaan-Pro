export type CategoryType = {
    name: string;
    slug: string;
  };
  
  export type DetailType = {
    title: string;
    arabic: string;
    latin: string;
    translation: string;
    notes?: string;
    benefits?: string  | null;
    source?: string;
  };

  export type DataType = {
    categories: CategoryType[]
    items: Record<string, Record<string, DetailType[]>>
  } 