export interface IPrice {
    tax: number;
    tip: number;
    subTotal: number; // no tip, no tax
    totalWithoutTip: number; // no tip, with tax
    total: number; // with tip, with tax
}
