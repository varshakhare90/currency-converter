export interface CountryObject{
    country: string;
    currency: string;
    countryFlag:string;
    index: number;
}

export interface objFromApi{
    [x: string]: string;
}

export interface ErrorObj{
    error?:boolean;
    errorMsg?: string;
}