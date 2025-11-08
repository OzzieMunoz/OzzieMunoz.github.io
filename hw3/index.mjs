import express from "express";
import fetch from "node-fetch";
import moment from "moment";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

async function fetchData(month, day) {
  let eventsUrl = `https://byabbe.se/on-this-day/${month}/${day}/events.json`;
  let birthsUrl = `https://byabbe.se/on-this-day/${month}/${day}/births.json`;
  let deathsUrl = `https://byabbe.se/on-this-day/${month}/${day}/deaths.json`;

  let eResponse = await fetch(eventsUrl);
  let eData = await eResponse.json();
  let bResponse = await fetch(birthsUrl);
  let bData = await bResponse.json();
  let dResponse = await fetch(deathsUrl);
  let dData = await dResponse.json();

  let eRandom = eData.events[Math.floor(Math.random() * eData.events.length)];
  let bRandom = bData.births[Math.floor(Math.random() * bData.births.length)];
  let dRandom = dData.deaths[Math.floor(Math.random() * dData.deaths.length)];

  return { eData, bData, dData, eRandom, bRandom, dRandom };
}

// Home route
app.get("/", (req, res) => {
  const fullDate = moment().format("MMMM Do");
  res.render("home", { fullDate });
});

app.get("/date", async (req, res) => {
  let month = req.query.month || moment().format("M");
  let day = req.query.day || moment().format("D");
  let fullDate = moment(`${month}-${day}`, "M-D").format("MMMM Do");
  let { eData, bData, dData, eRandom, bRandom, dRandom } = await fetchData(month, day);

  res.render("date", { month, day, fullDate, eData, bData, dData, eRandom, bRandom, dRandom });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
