async function init() {
    const model = await tf.loadLayersModel('https://ritesh.social/ml/covid/patient_model/model.json'); 
    // model.summary();

    model.predict(tf.tensor([[1, 0, 0, 20, 0, 0, 0, 0, 1, 0]])).array().then(arr => {
        console.log(arr[0][0]);
    });
}

init();
