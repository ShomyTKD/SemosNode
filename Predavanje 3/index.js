const http = require('http');
const url = require('url');

const serverRequest = http.createServer((req, res) => {
  console.log(req.method);


  //const queryObject = url.parse(req.url, true).query;
  console.log(queryObject); // Ispisuje GET parametre
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Check the console for GET parameters, parameters: ${JSON.stringify(queryObject)}`); //Ovde cete imati gresku jer prosledjujemo object a potrebno je proslediti string
  // JSON.stringify(queryObject)
  // Drugi nacin je const [_, op, a, b] = req.url.split("/");                                                                               
  /*
  Ako vidite [Object: null prototype] { key: 'value' } kada ispisujete queryObject, 
  to je zbog načina na koji url.parse funkcija u Node.js kreira objekat. 
  Ovaj objekat nema prototip (null prototype), 
  što je zapravo sigurnosna funkcija koja sprečava eventualne probleme sa prototipnim lancem.                                                                                                                                                         
  */
  // nakon 9 linije staviti const normalQueryObject = Object.assign({}, queryObject);

  //res.statusCode = 200;
  //res.setHeader('Content-Type','text/plain');
  //res.end('Ovo je odgovor');
});

serverRequest.listen(3000);

/*
1xx - Informativni odgovori:

100 Continue: Klijent treba da nastavi sa slanjem ostatka zahteva.
101 Switching Protocols: Server prihvata zahtev klijenta za promenom protokola.

2xx - Uspešni odgovori:

200 OK: Zahtev je uspešno obrađen.
201 Created: Resurs je uspešno kreiran.
202 Accepted: Zahtev je prihvaćen za obradu, ali obrada još nije završena.
204 No Content: Server je uspešno obradio zahtev, ali nema sadržaja za vraćanje.

3xx - Preusmeravanje:

301 Moved Permanently: Resurs je trajno premješten na novu lokaciju.
302 Found: Resurs je privremeno premješten na novu lokaciju.
304 Not Modified: Resurs nije promenjen od poslednjeg pristupa.

4xx - Klijentske greške:

400 Bad Request: Zahtev je neispravan ili ne može biti obrađen.
401 Unauthorized: Zahtev zahteva autentifikaciju.
403 Forbidden: Server razume zahtev, ali odbija da ga obradi.
404 Not Found: Traženi resurs nije pronađen na serveru.
405 Method Not Allowed: Metoda korišćena u zahtevu nije dozvoljena za traženi resurs.
409 Conflict: Došlo je do sukoba sa trenutnim stanjem resursa.

5xx - Serverske greške:

500 Internal Server Error: Došlo je do greške na strani servera.
501 Not Implemented: Server ne podržava funkcionalnost potrebnu za obradu zahteva.
502 Bad Gateway: Server je primio neispravan odgovor od uzvodnog servera.
503 Service Unavailable: Server je trenutno nedostupan (preopterećen ili u održavanju).
504 Gateway Timeout: Server nije dobio blagovremeni odgovor od uzvodnog servera.

*/

//Post metoda
const serverPostPodaci = http.createServer((req, res) => {
  //Ukoliko je klijent poslao POST zahtev
  if (req.method === 'POST') {
    let body = '';
    req.on('data', podaci => {
      body += podaci.toString();
    });

    req.on('end', () => {
      console.log(body);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`POST pogodjen, podaci:${body}`);
    });
  }
  //Ukoliko je klijent poslao razlicit metod od POST-a
  else {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Da bi ste videli odgovor ovog servera potrebno je da koristite POST metodu');
  }
});

serverPostPodaci.listen(3001);

//Kreiranje servera sa rutiranjem uz pomoc switch-a

const serverSwitch = http.createServer((req, res) => {
  switch (req.url) {
    case '/': //saberi
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Dobro dosli na pocetnu');
      break;

    case '/about': //oduzme
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Bavimo se web developmentom');
      break;

    case '/contact': // nova ruta
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Kontaktirajte nas na contact@semosakademije.rs');
      break;

    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Stranica nije pronadjena');
      break;
  }

});
serverSwitch.listen(3002);



/* Domaci
- Dodavanje novih ruta na projekat koji smo radili na času (izlaz je bilo sta) - misli se na switch koji smo radili
- Proširivanje kalkulatora sa novim vrstama računanja (dva broja - ili ukoliko se pogodi ruta koliko god da je stavljeno u ?) - prosledivanje 3 parametra koji ce biti operacija, prva
vrednost i druga vrednost, izlaz (response rezultat operacije => 10+20 = 30)
- Definisanje rute koja služi za konverziju vrednosti iz jednog u drugi sistem (cs u fn i obrnuto)
  ruta 1: localhost:3000/csToFn => pretvara iz celzijus u Farenhajt tako sto prosledjujemo parametar primer => vrednost: 50
  izlaz je konvertovana vrednost
  ruta 2: localhost:3000/fnToCs => pretvara iz Farenhajt u Celzijus tako sto prosledjujemo parametar primer => vrednost: 50
  izlaz je konvertovana vrednost
*/



