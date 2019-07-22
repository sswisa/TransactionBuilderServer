import {IAddressModel} from "../../schemas";
import {IAutoComplete} from "./autoComplete";

export interface IPersonName {
    first: string;
    last: string;
    full: string;
}

export interface IContact {
    type: string;
    phone: number;
    emails?: string[];
    address: IAddressModel;
}

export interface IVendor extends IContact {
    name: string;
    displayText?: string;
    autoComplete: IAutoComplete;
}

export interface IPerson extends IContact{
    name: IPersonName;
    autoComplete: IAutoComplete;
}