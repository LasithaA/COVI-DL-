// async function init() {
//     const model = await tf.loadLayersModel('https://ritesh.social/ml/covid/patient_model/model.json');
//     // model.summary();
//
//     model.predict(tf.tensor([[1, 0, 0, 20, 0, 0, 0, 0, 1, 0]])).array().then(arr => {
//         console.log(arr[0][0]);
//     });
// }
//
// init();

const formSectionSexAge = document.getElementById("form_sex_age");
const formSectionCurrentTreatmentStatus = document.getElementById("form_current_treatment_status");
const formSectionPriorHealthConditions = document.getElementById("form_prior_current_health_conditions");
const formSectionSmoker = document.getElementById("form_smoker");

const buttonContinueSexAge = document.getElementById("sex_age_form_continue");
const buttonContinueCurrentTreatmentStatus = document.getElementById("current_treatment_form_continue");
const buttonContinuePriorHealthConditions = document.getElementById("prior_health_form_continue");
const buttonSubmit = document.getElementById("submit_form");

// Add the logic to each form section that only enables the "Continue" buttons when all
// required information in that section has been inputted by the user
//-----------------------------------------------------------------------------------------
// Sex/age form section
for (inputItem of formSectionSexAge.querySelectorAll("input")) {
    inputItem.onchange = function () {
        let formCompleted = (document.getElementById("sex_male").checked || document.getElementById("sex_female").checked)
            && document.getElementById("age_selector").value;

        buttonContinueSexAge.disabled = !formCompleted;
    }
}

// Current treatment status form section
for (inputItem of formSectionCurrentTreatmentStatus.querySelectorAll("input")) {
    inputItem.onchange = function () {
        console.log("did it");
        let formCompleted = (document.getElementById("intubation_yes").checked || document.getElementById("intubation_no").checked)
            && (document.getElementById("icu_yes").checked || document.getElementById("icu_no").checked);

        buttonContinueCurrentTreatmentStatus.disabled = !formCompleted;
    }
}

// Prior health conditions form section
for (inputItem of formSectionPriorHealthConditions.querySelectorAll("input")) {
    inputItem.onchange = function () {
        let formCompleted = (document.getElementById("pneumonia_yes").checked || document.getElementById("pneumonia_no").checked)
            && (document.getElementById("diabetes_yes").checked || document.getElementById("diabetes_no").checked)
            && (document.getElementById("copd_yes").checked || document.getElementById("copd_no").checked)
            && (document.getElementById("hypertension_yes").checked || document.getElementById("hypertension_no").checked)
            && (document.getElementById("other_diseases_yes").checked || document.getElementById("other_diseases_no").checked);

        buttonContinuePriorHealthConditions.disabled = !formCompleted;
    }
}

// Smoker form section
for (inputItem of formSectionSmoker.querySelectorAll("input")) {
    inputItem.onchange = function () {
        let formCompleted = (document.getElementById("smoker_yes").checked || document.getElementById("smoker_no").checked);

        buttonSubmit.disabled = !formCompleted;
    }
}

// Add the logic to each of the continue buttons to create the "slideshow effect" of questions
// appearing below as the user completes the above questions
buttonContinueSexAge.onclick = function () {
    // Show the next section
    formSectionCurrentTreatmentStatus.hidden = false;

    // Disable this button (since the next section's button is what the user should use next)
    buttonContinueSexAge.disabled = true;
    buttonContinueSexAge.hidden = true;
};

buttonContinueCurrentTreatmentStatus.onclick = function () {
    // Show the next section
    formSectionPriorHealthConditions.hidden = false;

    // Disable this button (since the next section's button is what the user should use next)
    buttonContinueCurrentTreatmentStatus.disabled = true;
    buttonContinueCurrentTreatmentStatus.hidden = true;
};

buttonContinuePriorHealthConditions.onclick = function () {
    // Show the next section
    formSectionSmoker.hidden = false;

    // The next section is the last one, so enable the submit button now
    buttonSubmit.hidden = false;

    // Disable this button (since the next section's button is what the user should use next)
    buttonContinuePriorHealthConditions.disabled = true;
    buttonContinuePriorHealthConditions.hidden = true;
};

buttonSubmit.onclick = function () {
    // Call the patient.js code to get the prediction and display it to the user
}
