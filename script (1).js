// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form input values
        const yearsOfExperience = parseFloat(form.elements['years_of_experience'].value);
        const educationLevel = parseInt(form.elements['education_level'].value);
        const jobTitle = parseInt(form.elements['job_title'].value);

        // Validate input
        if (isNaN(yearsOfExperience) || isNaN(educationLevel) || isNaN(jobTitle)) {
            alert('Please enter valid input for all fields.');
            return;
        }

        // Perform AJAX request to predict salary
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                years_of_experience: yearsOfExperience,
                education_level: educationLevel,
                job_title: jobTitle
            })
        })
        .then(response => response.json())
        .then(data => {
            // Display predicted salary
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = `Predicted salary: $${data.salary.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while predicting salary. Please try again later.');
        });
    });
});
