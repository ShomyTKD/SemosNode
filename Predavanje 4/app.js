const url = require('url');


///^\/users\/(\d+)$/
const routes = [
    {pattern: /^\/users\/(\d+)$/, handler: getUserById},
    {pattern: /^\/products$/, handler: getProducts}
];

const app = (req, res) => {

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
};
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
module.exports = app;
