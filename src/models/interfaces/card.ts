import {IPersonModel} from "../../schemas";
import {IAutoComplete} from "./autoComplete";

export interface ICard {
    type: string;
    last4Digits: number;
    cardNumber: string;
    owner: IPersonModel;
    autoComplete: IAutoComplete;
}