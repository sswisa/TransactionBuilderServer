import {IPaymentModel, IVendorModel, IPersonModel, IItemModel} from "../../schemas";
import {IPrice} from "./price";

export interface ITransaction {
    dates: Date[];
    vendors: IVendorModel[];
    persons: IPaymentModel[];
    payments: IPaymentModel[];
    items: IItemModel[];
    price: IPrice
}