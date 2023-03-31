const form = document.querySelector('#input-form');
const outputDiv = document.querySelector('#output');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const featureColumnA = form.elements['feature-column-a'].value;
  const featureColumnB = form.elements['feature-column-b'].value;

  const inputData = {
    "instances": [
      { "feature_column_a": featureColumnA, "feature_column_b": featureColumnB }
    ]
  };

  const endpointId = "6567598456985092096";
  const projectId = "my-project-1-ece-528";

  const response = await fetch(`https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/us-central1/endpoints/${endpointId}:predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${gcloud.auth.get_application_default().credentials.token}`
    },
    body: JSON.stringify(inputData)
  });

  const result = await response.json();

  // Display the output in the UI
  outputDiv.innerHTML = `Prediction: ${result.predictions[0]}`;
});