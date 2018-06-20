export interface IApplicationState {
    form?: IFormState;
}

export interface IFormState {
    name?: string;
    isValid: boolean;
    isDirty: boolean;
}

export function getDefaultFormState(): IFormState {
    return {
        isValid: false,
        isDirty: false
    };
}