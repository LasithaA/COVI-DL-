

function displayOptions(){
    console.log("hello");
    document.getElementById("right").innerHTML ="";
    let h1 = document.createElement("h1");
    h1.innerHTML = "Choose An Option";

    let patientBtn = document.createElement("button");
    let btn1Text = document.createTextNode("Patient");
    patientBtn.appendChild(btn1Text);
    patientBtn.onclick =  function () {
        location.href = "/patient";
    };
    patientBtn.style.margin = '5px';
 

    let xrayBtn = document.createElement("button");
    let btn2Text = document.createTextNode("X-Ray");
    xrayBtn.appendChild(btn2Text);
    xrayBtn.onclick =  function () {
        location.href = "/xray";
    };
    xrayBtn.style.margin = '5px';

    let div = document.getElementById("right");

    div.appendChild(h1);
    div.appendChild(patientBtn);
    div.appendChild(xrayBtn);
}
/*
    document.getElementById("xrayButton").onclick = function () {
        location.href = "/xray";
    };

    document.getElementById("patientButton").onclick = function () {
        location.href = "/patient";
    };

*/