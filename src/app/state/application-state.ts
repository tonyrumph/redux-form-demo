export interface IApplicationState {
    form?: IFormState;
}

export interface IFormState {
    name?: string;
    country?: ICountry;
    countries?: ICountry[];
    cities?: ICity[];
    city?: ICity;
    titles?: ITitle[];
    title?: ITitle; 
    isValid: boolean;
    isDirty: boolean;
}

export interface ICity {
    id: string;
    name: string;
}

export interface ICountry {
    id: string;
    name: string;
}

export interface ITitle {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export function getDefaultFormState(): IFormState {
    return {
        isValid: false,
        isDirty: false
    };
}