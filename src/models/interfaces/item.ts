import {IAutoComplete} from "./autoComplete";

export interface IItem {
    severity?: string;
    onWatchList?: boolean;
    isRefund?: boolean;
    categories: string[];
    price: number;
    amount?: number;
    name: string;
    autoComplete: IAutoComplete;
}
