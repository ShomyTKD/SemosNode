/*
Objašnjenje
Kreiranje servera: Koristimo http.createServer da kreiramo novi HTTP server.
Parsiranje URL-a: Koristimo url.parse da parsiramo URL zahteva.
Rute: Definišemo rute kao niz objekata sa pattern (regularni izraz) i handler (funkcija koja će rukovati rutom).
Proveravanje ruta: Iteriramo kroz rute i koristimo pattern.exec da proverimo da li URL zahteva odgovara nekoj od definisanih ruta. 
Ako odgovara, pozivamo odgovarajuću funkciju rukovatelja.
Rukovatelji: Funkcije getUserById i getProducts rukovode odgovarajućim rutama i vraćaju JSON odgovor.
Slušanje na portu: Server sluša na portu 3000 i ispisuje poruku kada je pokrenut.
*/
/* 
localhost:3000/users/123

localhost:3000/users?id=123

*/
const http = require('http');
const url = require('url');

///^\/users\/(\d+)$/
const routes = [
    { pattern: /^\/users\/(\d+)$/, handler: getUserById },
    { pattern: /^\/products$/, handler: getProducts }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    //Proveravamo rute
    for (const route of routes) {
        const match = route.pattern.exec(parsedUrl.pathname);
        if (match) {
            return route.handler(req, res, match);
        }

    }
    //GetCars(req,res)
    //Ako ruta nije pronadjena vracamo 404
    /* 
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    */
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

//Definisemo handler-e
function getUserById(req, res, match) {
    const userId = match[1];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ IdKorisnika: userId }))

};

function getProducts(req, res) {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ Proizvodi: [] }))
};
server.listen(3000, () => {
    console.log('Server working on port 3000');
});

//Deljenje na infrastrukturalni i aplikativni deo nasu aplikaciju
const app = require('./app');

const server2 = http.createServer(app);

server2.listen(3001, () => {
    console.log('Server working on port 3001');
});


/*
http://localhost:3000/users/123
http://localhost:3000/products
*/


/*
Regex (Regularni izraz) ^\/users\/(\d+)$ koristi se za prepoznavanje URL putanja koje prate određeni obrazac. Hajde da ga razložimo deo po deo:

^:
Ovo označava početak stringa. U kontekstu URL-a, označava početak putanje.
/users/:

Ovo doslovno odgovara stringu "/users/".
/ je način da se znak '/' u regularnom izrazu prikaže kao doslovni znak, jer '/' ima posebno značenje u regexima.

(\d+):
\d odgovara bilo kojoj cifri (od 0 do 9).
+ označava "jedan ili više" prethodnih karaktera. Dakle, \d+ znači "jedan ili više brojeva".
() grupiše deo izraza koji može biti uhvaćen za kasniju upotrebu (tzv. capturing group). U ovom slučaju, grupa će uhvatiti niz cifara koji sledi posle "/users/".

$:
Ovo označava kraj stringa. U kontekstu URL-a, označava kraj putanje.
Kombinovanjem ovih delova, regularni izraz ^\/users\/(\d+)$ odgovara stringu koji:

Počinje sa "/users/".
Sledi ga jedan ili više brojeva.
Završava se na kraju stringa.

Primeri odgovarajućih URL-ova:
/users/123
/users/4567

Primeri neodgovarajućih URL-ova:
/user/123 (nedostaje 's')
/users/abc (sadrži slova umesto brojeva)
/users/123/extra (sadrži dodatni deo nakon brojeva)

const pattern = /^\/users\/(\d+)$/;
const url = "/users/123";
const match = pattern.exec(url);

if (match) {
    console.log(match[1]); // Ispisuje: 123
}
*/

/* Domaci rad
- Napisati 10 različitih regularnih izraza - potraziti na web-u stranice za Regex
- Preneti funkcionalnosti iz prethodnog domaćeg zadatka u novi projekat sa novim ruterom
*/

// Regex izrazi
// Provera se vrši sa .text ili .match funcijom

/* Provera da li string sadrži samo slova i brojeve 
/^[a-zA-Z0-9]+$/;
*/

/* Provera da li string sadrži samo slova
    /^[a-zA-Z]+$/
*/

/* Provera da li string sadrži samo mala slova
/^[a-z]+$/;
*/

/* Provera da li string sadrži samo velika slova
/^[A-Z]+$/;
*/

/* Provera da li je string URL adresa
/^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[-a-zA-Z\d_]*)?$/;
*/

/* Provera da li su u stringu samo brojevi
/^[0-9]+$/
*/

/* Provera da li je string validan email
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
*/

// Usecase scenario
const hasOnlyLetters = (str) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(str);
}

console.log(hasOnlyLetters("abc")); // true
console.log(hasOnlyLetters("abc123")); // false



//https://regex101.com/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions