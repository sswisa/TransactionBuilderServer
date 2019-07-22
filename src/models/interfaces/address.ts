import {IAutoComplete} from "./autoComplete";

export interface IState {
    name: string;
    abbreviation: string;
}

export interface IAddress {
    state?: IState;
    country: string;
    city: string;
    street: string;
    zip?: number;
    autoComplete: IAutoComplete;
}