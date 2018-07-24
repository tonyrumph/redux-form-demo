export interface IApplicationState {
    form?: IFormState;
}

export interface IFormState {
    name?: string;
    country?: ICountry;
    countries?: ICountry[];
    cities?: ICity[];
    city?: ICity;
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

export function getDefaultFormState(): IFormState {
    return {
        isValid: false,
        isDirty: false
    };
}