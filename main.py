from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

# Load the pre-trained model
with open('salary_prediction_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Define the routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        years_of_experience = float(request.form['years_of_experience'])
        education_level = int(request.form['education_level'])
        job_title = int(request.form['job_title'])

        # Make prediction
        input_features = np.array([[years_of_experience, education_level, job_title]])
        predicted_salary = model.predict(input_features)

        return render_template('result.html', salary=predicted_salary[0])

if __name__ == '__main__':
    app.run(debug=True)


