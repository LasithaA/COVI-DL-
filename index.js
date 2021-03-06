const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const multer = require("multer");
// Imports the Google Cloud client library.
const { Storage } = require("@google-cloud/storage");
const { PredictionServiceClient } = require("@google-cloud/automl").v1;

const projectId = "boxwood-plating-277400";
const location = "us-central1";
const modelId = "ICN4592119109499486208";

const client = new PredictionServiceClient({
  projectId: "boxwood-plating-277400",
  keyFilename: path.join(__dirname, "creds.json"),
});

// const storage = new Storage({
//   projectId: "boxwood-plating-277400",
//   keyFilename: path.join(__dirname, "creds.json"),
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html"],
  })
);

async function predict(locallyStoredFileName) {
  const filePath = path.join(__dirname, "uploads", locallyStoredFileName);
  // Read the file content for translation.
  const content = fs.readFileSync(filePath);
  // Construct request
  // params is additional domain-specific parameters.
  // score_threshold is used to filter the result
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      image: {
        imageBytes: content,
      },
    },
  };

  const [response] = await client.predict(request);
  for (const annotationPayload of response.payload) {
    // console.log(`Predicted class name: ${annotationPayload.displayName}`);
    // console.log(
    //   `Predicted class score: ${annotationPayload.classification.score}`
    // );
    return [
      annotationPayload.displayName,
      annotationPayload.classification.score,
    ];
  }
}

// predict("pneumonia.jpg").then(results => {
//   console.log("Class: " + results[0]);
//   console.log("Score: " + results[1]);
// }).catch(err => {
//   console.error(err);
// });

// async function init() {
//   try {
//     const results = await storage.getBuckets();
//     const [buckets] = results;
//     console.log('Buckets:');
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   } catch (err) {
//     console.error('ERROR:', err);
//   }
// }

// init();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  predict(file.filename)
    .then((results) => {
      console.log("Class: " + results[0]);
      console.log("Score: " + results[1]);
      fs.unlinkSync(path.join(__dirname, "uploads", file.filename));
      res.send(results);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error: " + err);
    });
});

const PORT = 443;
app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log;
  console.log(`Server started on port: ${PORT}`);
});
