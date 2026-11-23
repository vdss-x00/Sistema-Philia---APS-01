import http from "node:http";

const port = 3000;

const routes = {
    "/": {
        message: "Philia Fundraising System API",
        version: "1.0.0",
    },
    "/campaigns": {
        message: "Lista de Campanhas"
    },
    "/organizers": {
        message: "Lista de Organizadores."
    },
    "/contributors": {
        message: "Lista de Contribuidores."
    },
    "/campaign_contributors":{
        message: "Lista de Contribuições."
    }
}

const server = http.createServer((req, res) => {

    const response = routes[req.url as keyof typeof routes];

    if (!response) {
        res.writeHead(404, {
            "content-type": "application/json",
        });

        return res.end(
            JSON.stringify({
                message: "Route not found",
            })
        );
    }

    res.writeHead(200, {
        "content-type": "application/json",
    });

    res.end(JSON.stringify(response));
});

server.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}`)
})