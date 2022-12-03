
const convertArrayToObject = (arr1, arr2, arr3) => {
    let allObj = {}
    const array = [arr1, arr2, arr3];
    array.map((arr) => {
        let obj = arr.reduce(function(acc, curr) {
            const ar = curr.split(":");
               acc[ar[0]] = ar.length > 1 ? ar[1] : "";
               return acc;
        }, {});
        Object.assign(allObj, obj);
    })
    return allObj;
}

module.exports = convertArrayToObject;