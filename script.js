import { SemToCredits } from "./credits.js";
import gradePoints from "./gradePoints.js";

const semesterInput = document.getElementById("semester");
const calculateButton = document.getElementById("calculate");

semesterInput.addEventListener("change", renderSubjectInputs);
window.addEventListener("load", function () {
  renderSubjectInputs();

  // Initialize result element with show-result class
  document.getElementById("result").classList.add("show-result");
});
calculateButton.addEventListener("click", calculateSGPA);

function renderSubjectInputs() {
  const semester = parseInt(semesterInput.value);
  const { subjectToCredits: credits, totalCredits } = SemToCredits[semester];

  const subjectInputsContainer = document.getElementById("subjectInputs");
  const totalCreditsElement = document.getElementById("totalCredits");

  subjectInputsContainer.innerHTML = "";

  for (const subject in credits) {
    const div = document.createElement("div"); // Create a container for each input
    div.classList.add("input-container");

    const label = document.createElement("label");
    label.setAttribute("for", subject); // Set label for attribute
    label.textContent = `${subject} (Credits: ${credits[subject]})`;

    const select = document.createElement("select");
    select.id = subject;

    // Populate options
    for (const grade in gradePoints) {
      const option = document.createElement("option");
      option.value = grade.toLowerCase();
      option.textContent = grade;
      select.appendChild(option);
    }

    div.appendChild(label);
    div.appendChild(select);
    subjectInputsContainer.appendChild(div);
  }

  totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
}

function calculateSGPA() {
  let totalGradePoints = 0;
  const semester = parseInt(semesterInput.value);
  const { subjectToCredits: credits, totalCredits } = SemToCredits[semester];

  // Loop through each subject
  for (const subject in credits) {
    const gradeInput = document.getElementById(subject).value.toUpperCase();
    const gradePoint = gradePoints[gradeInput];

    if (gradePoint !== undefined) {
      totalGradePoints += gradePoint * credits[subject];
    }
  }

  const SGPA = totalGradePoints / totalCredits;

  // Add animation by removing and adding a class
  const resultElement = document.getElementById("result");
  resultElement.classList.remove("show-result");

  // Force reflow
  void resultElement.offsetWidth;

  resultElement.classList.add("show-result");
  resultElement.innerHTML = `Your SGPA is: <span class="highlight">${SGPA.toFixed(
    2
  )}</span>`;
}

document.getElementById('year').textContent = new Date().getFullYear();