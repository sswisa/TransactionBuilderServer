export let getObjectByPath = (path: string, doc): Object => {
    let obj = JSON.parse(JSON.stringify(doc));
    path.split(".").forEach((node: string) => {
        obj = obj[node];
    });
    return obj;
}