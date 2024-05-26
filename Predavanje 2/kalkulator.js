const sabiranje = (x, y) => {
    return x + y
};

const oduzimanje = (x, y) => {
    return x - y;
};

const mnozenje = (x, y) => {
    return x * y;
};

const deljenje = (x, y) => {
    if (y === 0) {
        return 'Nije moguće deliti sa nulom';
    }
    return x / y;
};

const racunanje = (operacija, x, y) => {
    let rezultat;
    switch (operacija) {
        case '+':
            rezultat = sabiranje(x, y);
            break;
        case '-':
            rezultat = oduzimanje(x, y);
            break;
        case '*':
            rezultat = mnozenje(x, y);
            break;
        case '/':
            rezultat = deljenje(x, y);
            break;
        default:
            return 'Nepoznata operacija';
    }
    return `${x} ${operacija} ${y} = ${rezultat}`;
}

//const privatnaFunkcija = x => x - 5;

module.exports = {
    sabiranje,
    oduzimanje,
    mnozenje,
    deljenje,
    racunanje
};