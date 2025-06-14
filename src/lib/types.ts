
export interface CountryFlag {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Currencies {
  [key: string]: Currency;
}

export interface Languages {
  [key: string]: string;
}

export interface CountrySummary {
  cca3: string;
  flags: CountryFlag;
  name: CountryName;
  population: number;
  region: string;
  capital: string[];
}

export interface CountryDetailData extends CountrySummary {
  subregion?: string;
  tld?: string[];
  currencies?: Currencies;
  languages?: Languages;
  borders?: string[];
}

export interface User {
  name: string;
}
