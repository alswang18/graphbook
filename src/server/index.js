import express from "express";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";

const app = express();
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],

      scriptSrc: ["'self'", "'unsafe-inline'"],

      styleSrc: ["'self'", "'unsafe-inline'"],

      imgSrc: ["'self'", "data:", "*.amazonaws.com"],
    },
  })
);
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(compress());
app.use(cors());
import path from "path";

const root = path.join(__dirname, "../../");

app.get(
  "/",
  function (req, res, next) {
    var random = Math.random() * (10 - 1) + 1;
    if (random > 5) next("route");
    else next();
  },
  function (req, res, next) {
    res.send("first");
  }
);

app.get("/", function (req, res, next) {
  res.send("second");
});

app.listen(8000, () => console.log("Listening on port 8000!"));
