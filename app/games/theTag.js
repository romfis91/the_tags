export const isValidStep = (items, item) => {
    const total = items.length;
    const i1 = items.findIndex((v) => !v);
    const i2 = items.findIndex(v => v === item);
    if(i1 === -1 || i2 === -1){
        return false;
    }
    return isHorizontal(i1, i2, total) || isVertical(i1, i2, total);
};

export const getAvailableValues = (items) => {
    const total = items.length;
    const i1 = items.findIndex((v) => !v);
    return items.filter((v, i2) => 
        isHorizontal(i1, i2, total) || isVertical(i1, i2, total)
    );
}

export const isWin = (items) => {
    let first = 1;
    let isWin = true;
    let eArr = items[Symbol.iterator]();
    let isDone = false;

    while(!isDone && isWin){
        const { done, value } = eArr.next();
        isWin = first === value;
        isDone = done;
        first++;
    }
    return isWin;
}

const isHorizontal = (i1, i2, total) => {
    const size = Math.sqrt(total);
    const indexDiff = Math.abs(i1 - i2);
    return indexDiff === 1 && 
        Math.floor((i1 + size)/size - size) ===  Math.floor((i2 + size)/size - size);
}

const isVertical = (i1, i2, total) => {
    const size = Math.sqrt(total);
    const indexDiff = Math.abs(i1 - i2);
    return indexDiff !== 1 && indexDiff === size;
}