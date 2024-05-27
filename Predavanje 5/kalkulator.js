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
        case 'sabiranje':
            operacija = '+';
            rezultat = sabiranje(x, y);
            break;
        case 'oduzimanje':
            operacija = '-';
            rezultat = oduzimanje(x, y);
            break;
        case 'mnozenje':
            operacija = '*';
            rezultat = mnozenje(x, y);
            break;
        case 'deljenje':
            operacija = '/';
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