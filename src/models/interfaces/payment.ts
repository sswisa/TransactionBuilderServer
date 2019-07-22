import {ICardModel} from "../../schemas";
import {IAutoComplete} from "./autoComplete";

export interface IPayment {
    type: string;
    method: string;
    card: ICardModel;
    currency: string;
    autoComplete: IAutoComplete;
}