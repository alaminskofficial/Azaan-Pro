
export type HisnText = {
    ID: number;
    ARABIC_TEXT: string;
    LANGUAGE_ARABIC_TRANSLATED_TEXT: string;
    TRANSLATED_TEXT: string;
    REPEAT: number;
    AUDIO: string;
  };
  
  export type HisnCategory = {
    ID: number;
    TITLE: string;
    AUDIO_URL: string;
    TEXT: HisnText[];
  };
  
  export type HisnData = {
    English: HisnCategory[];
  };