const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URL = require("./models/url.model");
const request = require('request-promise')
const cheerio = require('cheerio')

app.set("view engine", "pug");
app.set("views", "./views/");
const PORT = process.env.PORT || 4000;
const db_name = "url_shortener";

mongoose.connect("mongodb://127.0.0.1:27017/" + db_name, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB conenction Success");
});

app.post("/", (req, res) => {
  const url = req.body.full; // This line here takes the URL which we need.
  
  request(url)
  .then((html) => {
    const $= cheerio.load(html)
    const x = ($('meta', html))
    const dict = {'og:locale':[], 'og:type':[], 'og:title':[], 'og:description':[], 'og:url':[], 'og:site_name':[], 'og:image':[], 'og:title':[]}
    const list = ['og:locale', 'og:type', 'og:title', 'og:description', 'og:url', 'og:site_name', 'og:image', 'og:title']
    for(i = 0; i < x.length; i++){
      if(list.includes(x[i].attribs.property)){
        dict[x[i].attribs.property].push(x[i].attribs.content)
      }
    }
    // Now dict here has all the ogs in the dictionary ready
    URL.findOne({ full: req.body.full }, (err, url) => {
      if (url) {
        /*Meaning that the URL exists in the database */
        res.status(200).send({ message: "Already exists", url: url });
      } else {
        URL.create({ full: req.body.full, og: dict})
          .then((docs) => {
            res.send({
              message: "Successfully added",
              err: null,
              short_url: docs.short,
            });
          })
          .catch((err) => {
            res.send({ message: "Failure", err: err });
          });
      }
    });
  })
  .catch(err => {
    console.log("error")
    res.status(400).send("Error", err.body)
  })
  // This would add the meta data from the website once we have given the website to it.
  
  
  
});

app.get("/ok", (req, res) => {
  res.send("OK");
});

app.get("/", (req, res) => {
  const full = req.query.full;
  if (full) {
    URL.findOne({ full: full }, (err, url) => {
      res.send(url.short);
    });
  } else {
    res.send("Does not Exist");
  }
});

app.get("/:short", (req, res) => {
  const short = req.params.short; // Params is for the situation in which we send the URL and pass the short one.
  URL.findOneAndUpdate(
    { short: short },
    { $inc: { clicks: 1 } },
    (err, docs) => {
      if (docs) {
        console.log(docs)
        res.render("view_1", {
          // og_description_content: "Buy food from known people.",
          img_source:
            "https://chotu.com/wp-content/uploads/2021/12/chotu-Hyderabad-Manjeera-Trinity-Corporate-e1638373237807.webp", // this is just a temp
          og: docs.og,
          redirect_content: "0; "+docs.full
        });
        
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// Take frontend too.
