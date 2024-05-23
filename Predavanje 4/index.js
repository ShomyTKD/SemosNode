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
    {pattern: /^\/users\/(\d+)$/, handler: getUserById},
    {pattern: /^\/products$/, handler: getProducts}
];

const server = http.createServer((req, res) => {

        const parsedUrl = url.parse(req.url, true);
        //Proveravamo rute
        for(const route of routes)
            {
                const match = route.pattern.exec(parsedUrl.pathname);
                if(match)
                    {
                        return route.handler(req, res, match);
                    } 

            }
            //GetCars(req,res)
            //Ako ruta nije pronadjena vracamo 404
            /* 
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain');
            */
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
});
//Definisemo handler-e
function getUserById(req, res, match)
{
    const userId = match[1];
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ IdKorisnika : userId}))

};

function getProducts(req, res)
{
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ Proizvodi : []}))
};
server.listen(3000, ()=>{
    console.log('Server working on port 3000');
});


//Deljenje na infrastrukturalni i aplikativni deo nasu aplikaciju
const app = require('./app');

const server2 = http.createServer(app);

server2.listen(3001, ()=>{
    console.log('Server working on port 3001');
});





/* Domaci rad
- Napisati 10 različitih regularnih izraza - potraziti na web-u stranice za Regex
- Preneti funkcionalnosti iz prethodnog domaćeg zadatka u novi projekat sa novim ruterom
*/