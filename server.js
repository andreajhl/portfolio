const express = require("express");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const app = express();
const compression = require("compression");
const cookieParser = require("cookie-parser");

// DOTENV SETTINGS
require("dotenv").config({ path: ".env" });

// COMPRESSION SETTINGS
app.use(compression());

// COOKIES MIDDLEWARE
app.use(cookieParser());

const getUserLocationCountryCode2 = async (request) => {
  return "";
  // const userIp = (
  //   request.headers["x-forwarded-for"] || request.connection.remoteAddress
  // )
  //   .split(",")[0]
  //   .trim();
  // try {
  //   const response = await axios.get(
  //     `http://api.ipstack.com/${userIp}?access_key=ac1c0a88db0de9da13fcdba5d6742384&fields=country_code`
  //   );
  //   return response.data["country_code"] || "";
  // } catch (error) {
  //   return "";
  // }
};

const getUserLocationCountryCode = async (request) => {
  const userIp = (
    request.headers["x-forwarded-for"] || request.connection.remoteAddress
  )
    .split(",")[0]
    .trim();
  try {
    const response = await axios.get(
      `http://api.ipstack.com/${userIp}?access_key=ac1c0a88db0de9da13fcdba5d6742384&fields=country_code`
    );
    return response.data["country_code"] || "";
  } catch (error) {
    return "";
  }
};

const { getLandingPageSync } = require("./templates/landing");
const { response } = require("express");
// ################################################################
// default OG
const defaultOG = async (data, request) => {
  data = data.replace(
    /\$OG_TITLE/g,
    "Famosos.com - Videos personalizados de tus famosos favoritos."
  );
  data = data.replace(/\$OG_TYPE/, "website");
  data = data.replace(/\$OG_URL/, "https://www.famosos.com");
  const isProdEnviroment = process.env.NODE_ENV === "production";
  data = data.replace(/\$ROBOTS_META/, isProdEnviroment ? "index" : "noindex");
  data = data.replace(
    /\$OG_IMAGE/g,
    "https://www.famosos.com/assets/img/famosos-share-img.jpg"
  );
  data = data.replace(/\$OG_SITE_NAME/, "Famosos.com");
  data = data.replace(
    /\$OG_DESCRIPTION/,
    "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas."
  );
  data = data.replace(/\$OG_VIDEO_WITH/, "400");
  data = data.replace(/\$OG_VIDEO_HEIGHT/, "400");
  data = data.replace(
    /\$OG_VIDEO_SECURE_URL/,
    "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
  );
  data = data.replace(
    /\$OG_VIDEO_URL/,
    "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
  );
  data = data.replace(
    /\$OG_VIDEO/,
    "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
  );
  data = data.replace(
    "$COUNTRY_CODE",
    await getUserLocationCountryCode2(request)
  );
  return data;
};

// ################################################################
const USER_LOCATION_KEY = "userLocation";

const getUserLocationMiddleware = async (request, response, next) => {
  if (request.cookies[USER_LOCATION_KEY]) return next();
  const userLocationValue = await getUserLocationCountryCode(request);
  const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
  response.cookie(USER_LOCATION_KEY, userLocationValue, {
    maxAge: oneYearInMilliseconds
  });
  next();
};

app.use(getUserLocationMiddleware);

// ################################################################
// ROOT
app.get("/", async (request, response) => {
  const _filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(_filePath, "utf8", async (err, data) => {
    if (err) {
      return console.log(err);
    }
    data = data.replace(
      /\$OG_TITLE/g,
      "Famosos.com - Videos personalizados de tus famosos favoritos."
    );
    data = data.replace(/\$OG_TYPE/, "website");
    data = data.replace(/\$OG_URL/, "https://www.famosos.com");
    const isProdEnviroment = process.env.NODE_ENV === "production";
    data = data.replace(
      /\$ROBOTS_META/,
      isProdEnviroment ? "index" : "noindex"
    );
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/,
      "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(/\$OG_VIDEO_WITH/, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/, "400");
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO/,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// LANDING PAGE
const landingPage = getLandingPageSync();
app.get("/landing", async (request, response) => {
  response.send(await defaultOG(landingPage, request));
});
// ################################################################

// ################################################################
// CELEBRITY PROFILE
app.get("/:celebrity_username", async (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  if (
    req.params.celebrity_username !== "inicio" &&
    req.params.celebrity_username &&
    req.params.celebrity_username !== "inicio/"
  ) {
    await axios
      .get(
        process.env.REACT_APP_ENDPOINT +
          "custom-endpoints/celebrities/public-get/" +
          req.params.celebrity_username
      )
      .then((r) => {
        if (r.data.data.username) {
          fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
              return console.log(err);
            }
            data = data.replace(
              /\$OG_TITLE/g,
              "Famosos.com - " + r.data.data.fullName
            );
            data = data.replace(/\$OG_TYPE/g, "website");
            data = data.replace(
              /\$OG_URL/g,
              "https://www.famosos.com/" + r.data.data.username
            );
            data = data.replace(/\$OG_IMAGE/g, r.data.data.avatar);
            data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
            data = data.replace(
              /\$OG_DESCRIPTION/g,
              "Perfil oficial de " +
                r.data.data.fullName +
                " en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas."
            );
            data = data.replace(/\$OG_VIDEO/g, r.data.data.mainVideo);
            data = data.replace(/\$OG_VIDEO_URL/g, r.data.data.mainVideo);
            data = data.replace(
              /\$OG_VIDEO_SECURE_URL/g,
              r.data.data.mainVideo
            );
            data = data.replace(/\$OG_VIDEO_WITH/g, "400");
            data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
            getUserLocationCountryCode2(req).then((userLocationCountryCode) => {
              data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
              res.send(data);
            });
          });
        } else {
          fs.readFile(filePath, "utf8", function (err, data) {
            if (err) {
              return console.log(err);
            }
            data = data.replace(/\$OG_TITLE/g, "Famoso no encontrado");
            data = data.replace(/\$OG_TYPE/g, "website");
            data = data.replace(/\$OG_URL/g, "https://www.famosos.com/");
            data = data.replace(
              /\$OG_IMAGE/g,
              "https://www.famosos.com/assets/img/famosos-share-img.jpg"
            );
            data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
            data = data.replace(
              /\$OG_DESCRIPTION/g,
              "No se encontró un famoso con este usuario"
            );
            data = data.replace(
              /\$OG_VIDEO/,
              "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
            );
            data = data.replace(
              /\$OG_VIDEO_URL/g,
              "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
            );
            data = data.replace(
              /\$OG_VIDEO_SECURE_URL/g,
              "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
            );
            data = data.replace(/\$OG_VIDEO_WITH/g, "400");
            data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
            data = data.replace(/\$ROBOTS_META/, "noindex");
            getUserLocationCountryCode2(req).then((userLocationCountryCode) => {
              data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
              res.status(404).send(data);
            });
          });
        }
      })
      .catch((e) => {
        console.log(e);
        const _filePath = path.resolve(__dirname, "./build", "index.html");
        fs.readFile(_filePath, "utf8", async (err, data) => {
          if (err) {
            return console.log(err);
          }
          defaultOG(data, req).then(res.send);
        });
      });
  } else {
    const _filePath = path.resolve(__dirname, "./build", "index.html");
    fs.readFile(_filePath, "utf8", async (err, data) => {
      if (err) {
        return console.log(err);
      }
      data = defaultOG(data, req);
      res.send(data);
    });
  }
});
// ################################################################

// ################################################################
// CELEBRITY PROFILE
app.get("/:celebrity_username/contratar", async (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await axios
    .get(
      process.env.REACT_APP_ENDPOINT +
        "custom-endpoints/celebrities/public-get/" +
        req.params.celebrity_username
    )
    .then((r) => {
      if (r.data.status === "OK") {
        fs.readFile(filePath, "utf8", function (err, data) {
          if (err) {
            return console.log(err);
          }
          data = data.replace(
            /\$OG_TITLE/g,
            "Famosos.com -  Comprar video personalizado de " +
              r.data.data.fullName
          );
          data = data.replace(/\$OG_TYPE/g, "website");
          data = data.replace(
            /\$OG_URL/g,
            "https://www.famosos.com/" + r.data.data.username
          );
          data = data.replace(/\$OG_IMAGE/g, r.data.data.avatar);
          data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
          data = data.replace(
            /\$OG_DESCRIPTION/g,
            "Comprar video personalizado de  " +
              r.data.data.fullName +
              " en Famosos.com. Reserva tu video personalizado y disfruta de experiencias únicas."
          );
          data = data.replace(/\$OG_VIDEO/g, r.data.data.mainVideo);
          data = data.replace(/\$OG_VIDEO_URL/g, r.data.data.mainVideo);
          data = data.replace(/\$OG_VIDEO_SECURE_URL/g, r.data.data.mainVideo);
          data = data.replace(/\$OG_VIDEO_WITH/g, "400");
          data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
          getUserLocationCountryCode2(req).then((userLocationCountryCode) => {
            data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
            res.send(data);
          });
        });
      } else {
        const _filePath = path.resolve(__dirname, "./build", "index.html");
        fs.readFile(_filePath, "utf8", async (err, data) => {
          if (err) {
            return console.log(err);
          }
          defaultOG(data, req).then(res.send);
        });
      }
    })
    .catch((e) => {
      console.log(e);
      const _filePath = path.resolve(__dirname, "./build", "index.html");
      fs.readFile(_filePath, "utf8", async (err, data) => {
        if (err) {
          return console.log(err);
        }
        defaultOG(data, req).then(res.send);
      });
    });
});
// ################################################################

// ################################################################
// HIRING PREVIEW
app.get("/hirings/:contract_reference", async (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await axios
    .get(
      process.env.REACT_APP_ENDPOINT +
        "custom-endpoints/contracts/get-contract-by-reference/" +
        req.params.contract_reference
    )
    .then((r) => {
      if (r.data.status === "OK") {
        fs.readFile(filePath, "utf8", function (err, data) {
          if (err) {
            return console.log(err);
          }
          data = data.replace(
            /\$OG_TITLE/g,
            "Famosos.com - " + r.data.data.celebrityData.fullName
          );
          data = data.replace(/\$OG_TYPE/g, "website");
          data = data.replace(
            /\$OG_URL/g,
            "https://www.famosos.com/" + r.data.data.celebrityData.username
          );
          data = data.replace(/\$OG_IMAGE/g, r.data.data.celebrityData.avatar);
          data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
          data = data.replace(
            /\$OG_DESCRIPTION/g,
            "Video personalizado de " +
              r.data.data.celebrityData.fullName +
              " hecho en Famosos.com. Tu lugar favorito para contratar a celebridades."
          );
          data = data.replace(/\$OG_VIDEO/g, r.data.data.media);
          data = data.replace(/\$OG_VIDEO_URL/g, r.data.data.media);
          data = data.replace(/\$OG_VIDEO_SECURE_URL/g, r.data.data.media);
          data = data.replace(/\$OG_VIDEO_WITH/g, "400");
          data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
          getUserLocationCountryCode2(req).then((userLocationCountryCode) => {
            data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
            res.send(data);
          });
        });
      } else {
        const _filePath = path.resolve(__dirname, "./build", "index.html");
        fs.readFile(_filePath, "utf8", async (err, data) => {
          if (err) {
            return console.log(err);
          }
          defaultOG(data, req).then(res.send);
        });
      }
    })
    .catch((e) => {
      const _filePath = path.resolve(__dirname, "./build", "index.html");
      fs.readFile(_filePath, "utf8", async (err, data) => {
        if (err) {
          return console.log(err);
        }
        defaultOG(data).then(res.send);
      });
    });
});
// ################################################################

// ################################################################
// SIGN IN EMAIL
app.get("/auth/sign-in/email-form/", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Iniciar Sesión");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Inicia sesión en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// SIGN IN CELLPHONE
app.get("/auth/sign-in/cellphone-form/", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Iniciar Sesión");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Inicia sesión en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// CONTINUE / LOGIN
app.get("/auth/sign-up", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Iniciar Sesión");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Inicia sesión en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// SIGN UP EMAIL
app.get("/auth/sign-up/email-form/", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Crear una cuenta");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Crea una cuenta en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// SIGN UP CELLPHONE
app.get("/auth/sign-up/cellphone-form/", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Crear una cuenta");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Crea una cuenta en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// SIGN UP CELLPHONE
app.get("/auth/reset-password", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Recupera tu contraseña");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Recupera la contraseña de tu cuenta de Famosos.com. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// TERMS
app.get("/docs/terminos", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(
      /\$OG_TITLE/g,
      "Famosos.com - Términos de servicio de usuario"
    );
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// POLITICAS
app.get("/docs/politicas", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Política de privacidad");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// APLICAR COMO FAMOSO
app.get("/forms/aplicar/", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Aplicar como Famoso");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Aplica como Famoso y descubre una nueva forma de conectarte con tus Fans. Crea experiencias increíbles."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// TRENDING
app.get("/tendencias/", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Tendencias");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "Estos son los videos que estan siendo tendencia en Famosos.com. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// TRENDING
app.get("/docs/faqs", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Famosos.com - Preguntas Frecuentes");
    data = data.replace(/\$OG_TYPE/g, "website");
    data = data.replace(/\$OG_URL/g, "https://www.famosos.com");
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/g, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "¿Qué es Famosos.com? Famosos es una plataforma en dónde puedes comprar video-mensajes de tus famosos favoritos. ¿Cómo puedo comprar un video?"
    );
    data = data.replace(
      /\$OG_VIDEO/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/g,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(/\$OG_VIDEO_WITH/g, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/g, "400");
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
app.use(express.static(path.resolve(__dirname, "./build")));
app.use(
  express.static(path.resolve(__dirname, "./templates"), { maxAge: "1y" })
);
// ################################################################

// ################################################################
// OTHER PAGES
// ################################################################
app.get("*", async (request, response) => {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  await fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(
      /\$OG_TITLE/g,
      "Famosos.com - Videos personalizados de tus famosos favoritos."
    );
    data = data.replace(/\$OG_TYPE/, "website");
    data = data.replace(/\$OG_URL/, "https://www.famosos.com");
    const isProdEnviroment = process.env.NODE_ENV === "production";
    data = data.replace(
      /\$ROBOTS_META/,
      isProdEnviroment ? "index" : "noindex"
    );
    data = data.replace(
      /\$OG_IMAGE/g,
      "https://www.famosos.com/assets/img/famosos-share-img.jpg"
    );
    data = data.replace(/\$OG_SITE_NAME/, "Famosos.com");
    data = data.replace(
      /\$OG_DESCRIPTION/,
      "Videos personalizados de tus Famosos favoritos. Reserva tu video y disfruta de experiencias únicas."
    );
    data = data.replace(/\$OG_VIDEO_WITH/, "400");
    data = data.replace(/\$OG_VIDEO_HEIGHT/, "400");
    data = data.replace(
      /\$OG_VIDEO_SECURE_URL/,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO_URL/,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    data = data.replace(
      /\$OG_VIDEO/,
      "https://famosos-output-videos.s3.amazonaws.com/videos/8/143/201912030248-353316-143.mp4#t=0.5"
    );
    getUserLocationCountryCode2(request).then((userLocationCountryCode) => {
      data = data.replace("$COUNTRY_CODE", userLocationCountryCode);
      response.send(data);
    });
  });
});
// ################################################################

// ################################################################
// SERVER PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
// ################################################################
