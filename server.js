const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const app = express();
require("dotenv").config({path: ".env"});

// default OG
function defaultOG(data) {
    data = data.replace(/\$OG_TITLE/g, 'Famosos.com - Videos personalizados de tus famosos favoritos.');
    data = data.replace(/\$OG_TYPE/g, 'website');
    data = data.replace(/\$OG_URL/g, 'https://www.famosos.com');
    data = data.replace(/\$OG_IMAGE/g, 'https://www.famosos.com/assets/img/favicon.png');
    data = data.replace(/\$OG_SITE_NAME/g, 'Famosos.com');
    data = data.replace(/\$OG_DESCRIPTION/g, 'Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas.');
    data = data.replace(/\$OG_VIDEO/g, 'https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5');
    data = data.replace(/\$OG_VIDEO_URL/g, 'https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5');
    data = data.replace(/\$OG_VIDEO_SECURE_URL/g, 'https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5');
    data = data.replace(/\$OG_VIDEO_WITH/g, '400');
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, '400');
    return data;
}

// default response
function defaultResponse(res) {
    const _filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(_filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(defaultOG(data));
    });
}


// ROOT PAGE
app.get('/', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        response.send(defaultOG(data));
    });
});

// CELEBRITY PROFILE
app.get('/:celebrity_username', async (req, res) => {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    if (req.params.celebrity_username !== "inicio" && req.params.celebrity_username && req.params.celebrity_username !== "inicio/") {
        console.log("celebrity_username", req.params.celebrity_username);
        await axios
            .get(process.env.REACT_APP_ENDPOINT + "custom-endpoints/celebrities/public-get/" + req.params.celebrity_username)
            .then((r) => {
                if (r.data.status === "OK") {
                    fs.readFile(filePath, 'utf8', function (err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        data = data.replace(/\$OG_TITLE/g, 'Famosos.com - ' + r.data.data.fullName);
                        data = data.replace(/\$OG_TYPE/g, 'website');
                        data = data.replace(/\$OG_URL/g, 'https://www.famosos.com/' + r.data.data.username);
                        data = data.replace(/\$OG_IMAGE/g, r.data.data.avatar);
                        data = data.replace(/\$OG_SITE_NAME/g, 'Famosos.com');
                        data = data.replace(/\$OG_DESCRIPTION/g, "Perfil oficial de " + r.data.data.fullName + " en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas.");
                        data = data.replace(/\$OG_VIDEO/g, r.data.data.mainVideo);
                        data = data.replace(/\$OG_VIDEO_URL/g, r.data.data.mainVideo);
                        data = data.replace(/\$OG_VIDEO_SECURE_URL/g, r.data.data.mainVideo);
                        data = data.replace(/\$OG_VIDEO_WITH/g, '400');
                        data = data.replace(/\$OG_VIDEO_HEIGHT/g, '400');
                        res.send(data);
                    });
                } else {
                    return defaultResponse(res);
                }
            })
            .catch((e) => {
                console.log(e);
                return defaultResponse(res);
            });
    } else {
        return defaultResponse(res);
    }
});

// HIRING PREVIEW
app.get('/hirings/:contract_reference', async (req, res) => {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    await axios
        .get(process.env.REACT_APP_ENDPOINT + "custom-endpoints/contracts/get-contract-by-reference/" + req.params.contract_reference)
        .then((r) => {
            if (r.data.status === "OK") {
                fs.readFile(filePath, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    data = data.replace(/\$OG_TITLE/g, 'Famosos.com - ' + r.data.data.celebrityData.fullName);
                    data = data.replace(/\$OG_TYPE/g, 'website');
                    data = data.replace(/\$OG_URL/g, 'https://www.famosos.com/' + r.data.data.celebrityData.username);
                    data = data.replace(/\$OG_IMAGE/g, r.data.data.celebrityData.avatar);
                    data = data.replace(/\$OG_SITE_NAME/g, 'Famosos.com');
                    data = data.replace(/\$OG_DESCRIPTION/g, 'Video personalizado de ' + r.data.data.celebrityData.fullName + " hecho en Famosos.com. Tu lugar favorito para contratar a celebridades.");
                    data = data.replace(/\$OG_VIDEO/g, r.data.data.media);
                    data = data.replace(/\$OG_VIDEO_URL/g, r.data.data.media);
                    data = data.replace(/\$OG_VIDEO_SECURE_URL/g, r.data.data.media);
                    data = data.replace(/\$OG_VIDEO_WITH/g, '400');
                    data = data.replace(/\$OG_VIDEO_HEIGHT/g, '400');
                    res.send(data);
                });
            } else {
                return defaultResponse(res);
            }
        })
        .catch((e) => {
            return defaultResponse(res);
        });
});


app.use(express.static(path.resolve(__dirname, './build')));


// OTHER PAGES
app.get('*', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        response.send(defaultOG(data));
    });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
