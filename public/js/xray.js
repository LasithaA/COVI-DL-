// document.body.style.background = yes;

// we want to display our image
const sandFile = document.getElementById("sandFile");
const previewContainer = document.getElementById("imgPreview");
const previewImage = previewContainer.querySelector(".preview-image");
const previewDefault = previewContainer.querySelector(".default-text");
const submitButton = document.getElementById("submit-xray");
// when file selected, get file object
sandFile.addEventListener("change", function () {
  const file = this.files[0];

  if (file && file.size / 1024 / 1024 < 1.5) {
    // console.log('uploaded file');

    const reader = new FileReader();
    // hide preview text and show the selected image
    previewDefault.style.display = "none";
    previewImage.style.display = "block";

    reader.addEventListener("load", function () {
      // this.result refers to the data url of image
    //   console.log(this);
      previewImage.setAttribute("src", this.result);
    });
    reader.readAsDataURL(file);
  } else {
    previewDefault.style.display = null;
    previewImage.style.display = null;
    previewImage.setAttribute("src", "");
  }
});

submitButton.addEventListener("click", () => {
  var formData = new FormData();
  formData.append("myFile", sandFile.files[0]);
  axios
    .post("/uploadfile", formData)
    .then((res) => {
      console.log(res);
      console.log(res.data[0]);
  
      if (res.data[0] == 'covid'){
        document.getElementById('status').innerHTML = "The patient has Covid-19";
      }
      else if (res.data[0] == 'pneumonia') {
        document.getElementById('status').innerHTML = "The patient has Pneumonia";
      }
      else if (res.data[0] == 'healthy') {
        document.getElementById('status').innerHTML = "The patient is Healthy";
      }

      console.log(res.data[1]);
      const end_percentage = Math.round(`${res.data[1]}`*100);
      var current_percentage = 0;

      let intervalTimeout = 500 / end_percentage; // Fix the animation to last for 0.5 seconds

      const percentageDisplayInterval = setInterval(function () {
          document.getElementById("percentage").textContent = current_percentage + "% Confidence";
          current_percentage++;

          if (current_percentage > end_percentage) {
              clearInterval(percentageDisplayInterval);
          }
      }, intervalTimeout);

      // document.getElementById('percentage').innerHTML =  + '% confidence';

    })
    .catch((err) => {
      console.error(err);
    });
});
