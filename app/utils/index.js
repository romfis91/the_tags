Array.prototype.shuffle = function() {
    let i = this.length, j, temp;
    if ( i === 0 ) return this;
    while ( --i ) {
       j = Math.floor( Math.random() * ( i + 1 ) );
       temp = this[i];
       this[i] = this[j];
       this[j] = temp;
    }
    return this;
  };

export const generateCombination = () => {
    const fixedArray = new Array(16);
    fixedArray.fill(null);
    const combination = fixedArray.map((v, i) => {
        let value = i + 1;
        if(value === 16){
            return 0;
        }
        return value;
    });
    combination.shuffle();
    return combination;
};
