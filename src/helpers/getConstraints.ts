export let getConstraints = (headersArr: string[]) => {
    let constraints = {};
    headersArr.forEach((header: string) => {
        constraints[header] = header;
    });
    return constraints;
};