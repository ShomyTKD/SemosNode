
try {
  /*function sabiraj (a,b,c)
  {
  
      console.log(a+b+c);
      return a+b+c;
  }
  
  sabiraj(3,3,3);
  
  const saberi = function (a,b)
  {
      console.log(a+b);
      return a+b;
  
  }
  saberi(2,3);
  
  const razlika = (a,b) => a-b;
  
  console.log(razlika(6,2))
  
  const mojObjekat1 = {
      vrednost : 10,
      povecaj : function()
      {
          this.vrednost++;
          console.log(this.vrednost);
      }
  };
  mojObjekat1.povecaj()
  
  const mojObjekat2 = {
      vrednost : 10,
      povecaj : () => 
      {
          this.vrednost++;
          console.log(this.vrednost);
      }
  };
  mojObjekat2.povecaj();
  
  const mojObjekat3 = {
      vrednost : 10,
      povecaj : () => 
      {
          mojObjekat.vrednost++;
          console.log(mojObjekat.vrednost);
      }
  };
  
  mojObjekat3.povecaj();*/

  //######################################################################
  //HIGH ORDER FUNCTIONS

  function mnozenje(broj1) {
    return function (broj2) {
      return broj1 * broj2;
    }

  }
  /*const pomnozen = mnozenje(2);
  const rezultat = pomnozen(10);
  const rezultat2 = pomnozen(20);
  console.log(rezultat);
  console.log(rezultat2);*/


  function calculator(operacija) {
    return function (a, b) {
      switch (operacija) {
        case "saberi":
          return a + b;
        case "oduzmi":
          return a - b;
        case "pomnozi":
          return a * b;
        case "podeli":
          return a / b;
        default:
          console.log(`operacija ne postoji`);
          return undefined;
      }
    };
  }

  //#######################################################################
  //
  // //! TYPEOF
  /*console.log(typeof undefined);
  console.log(typeof 239);
  console.log(typeof 12n);
  console.log(typeof false);
  console.log(typeof "undefined");
  console.log(typeof null);
  console.log(console.log);
  //! BOOLEAN TRUE FALSE
  console.log(Boolean(1));
  console.log(Boolean(0));
  console.log(Boolean("1"));
  console.log(Boolean("135235623"));
  console.log(Boolean(""));*/
  //console.log(Boolean(" "));
  /*console.log(+true);
  console.log(2 > 1);
  console.log(2 == 2);
  console.log(2 == "2");
  console.log(2 != 1);
  //! || - or (ili ili)
  console.log(true || true);
  console.log(true || false);
  console.log(false || true);
  console.log(false || false);
  //! && - and (oba uslova)
  console.log(true && false);
  console.log(false && false);
  console.log(false && true);
  console.log(true && true);
  //! Ternarni operatori
  //* uslov ? vrednost ako je tačan : vrednost ako nije tačan
  const godine = 17;
  const uzrast = godine >= 18 ? "Punoletan" : "Maloletan";
  console.log(uzrast);*/

  //####################################################################################
  //Kreiranje lokalnog modula
  const kalkulatorImport = require("./kalkulator.js");
  //destrukturiranje
  //const {sabiranje, oduzimanje} = require("./kalkulator.js");

  // Test za domaci
  console.log(kalkulatorImport.deljenje(10, 0));
  console.log(kalkulatorImport.racunanje('+', 10, 2))

  //console.log(sabiranje(2,2));

  //#######################################################################################
  //MODULI
  //! 1. OSNOVNI MODULI
  //* http, assert, fs, path, process, os...
  //! 2. LOKALNI MODULI
  //* Ove ćemo kreirati

  //! 3. THIRD-PARTY
  //*mongoose,express,dotenv,ejs,morgan..

  //#######################################################################################
  //FS
  const fs = require("fs");

  //const podatak = `Želimo da zapišemo ovo na naš računar ${2 + 100}`;
  //fs.writeFileSync(`./noviTekst${Date.now()}.txt`, podatak);

  /*fs.readFile("./tekst.txt", "utf-8", (err, tekst) => {
      if (err) {
        return console.log("Došlo je do greške: " + err);
      }
      console.log(tekst);
    });*/

  /*const asinhroniPodatak = "ovaj fajl je kreiran asinhrono";
  fs.writeFile("./asinhroniWrite.txt", asinhroniPodatak, "utf-8", (err) => {
    if (err) {
      return console.log("Greška");
    }
    console.log("Uspešno");
  });*/

  //##################################################################################
  const fileWrite = (filename, data) => {
    return new Promise((success, fail) => {
      fs.writeFile(filename, data, "utf-8", (err) => {
        if (err) return fail(err);
        return success();
      });
    });
  };

  const fileRead = (filename) => {
    return new Promise((success, fail) => {
      fs.readFile(filename, "utf-8", (err, data) => {
        if (err) return fail(err);
        return success(data);
      });
    });
  };
  /*const funkcija = async () => {
    try {
      await fileWrite("data1.txt", "Asynhron zapis od promis");
      await fileWrite("data2.txt", "Asynhron zapis od promis 2");
      const rezultat = await fileRead("super2.txt");
      console.log(rezultat);
    } catch (err) {
      console.log(err);
    }
  };
  funkcija();*/

  /*(async () => {
    try {
      await fileWrite("data1.txt", "Asynhron zapis od promis");
      await fileWrite("data2.txt", "Asynhron zapis od promis 2");
      const rezultat = await fileRead("super.txt");
      console.log(rezultat);
    } catch (err) {
      console.log(err);
    }
  })();*/

  /*  console.log("then, catch");
  const nekiAsyncZadatak = () => {
      return new Promise((resolve, reject) => {
        // Simulacija asinhronog zadatka koji može uspeti ili neuspeti
          const uspeh = Math.random() < 0.5;
          if (uspeh) {
            resolve("Uspeh!");
          } else {
            reject(new Error("Neuspeh!"));
          }
        
      });
    };
  
    nekiAsyncZadatak()
    .then((rezultat) => {
      console.log(`Otisao u then ${rezultat}`);
    })
    .catch((error) => {
      console.error(`Otisao u catch:Greška: ${error.message}`);
    });
    function readFileWithCallback(filePath, callback) {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, data);
      });
    }
    // Korišćenje funkcije sa callback-om
  readFileWithCallback('./super.txt', (err, data) => {
      if (err) {
        return console.error('Greška pri čitanju fajla:', err);
      }
      console.log('Sadržaj fajla:', data);
    });
  */
  function readFileWithPromise(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  }

  readFileWithPromise('./super.txt')
    .then(data => {
      console.log('Sadržaj fajla:', data);
    })
    .catch(err => {
      console.error('Greška pri čitanju fajla:', err);
    });
}
catch (err) {
  console.log(err);

}

//DOMACI:
/*
Zadatak broj 1:

Da se kreira funkcionalni izraz sa imenom c2f koji prima jedan parametar celsius i konvertuje tu vrednost u Farenhajt pomoću formule (celsius * 9/5) + 32.

Zadatak broj 2:

Da se kreira Fat Arrow Function sa imenom f2c koja prima jedan parametar fahrenheit i konvertuje tu vrednost u Celzijusove stepene pomoću formule (fahrenheit - 32) * 5/9.

Zadatak dodatni:

HIGH ORDER FUNCTIONS
ZA upis i ispis u odvojenom modulu koji se poziva preko koristeći destrukturiranje


//! PROČITAJTE DOKUMENTACIJU
//? Istražite još nekoliko metoda u fs modulu
//? Kako da obrišete datoteku, kako da preimenujete datoteku
//? i još neku po želji
//? Takođe, kreirajte datoteku
//? i pročitajte datoteku
Domaci poslati na zlatkohajdarevic@gmail.com

ZIP FAJL ili repositorijum na git-u
*/

// Domaci

// Zadatak 1

function c2f(celsius) {
  return (celsius * 9 / 5) + 32
}
const tempFahrenheit = c2f(17)
console.log(`Temperatura u Fahrenheit: ${tempFahrenheit}F`)

// Zadatak 2

const f2c = fahrenheit => (fahrenheit - 32) * 5 / 9;
const tempCelcius = f2c(62.6)
console.log(`Temperatura u Celsius: ${tempCelcius}C`)


// Brisanje datoteke
//fs.unlink()

// Preimenovanje datoteke
//fs.rename()

// Kreiranje datoteke
//fs.writeFile()

// Čitanje datoteke
//fs.readFile()
















/* 
DOMACI



*/