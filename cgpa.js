import { creditsTillSem } from "./credits.js";

const cgpaSemesterInput = document.getElementById("cgpaSemester");
const calculateCGPAButton = document.getElementById("calculateCGPA");

window.addEventListener("load", function () {
  // Initialize result element with show-result class
  document.getElementById("cgpaResult").classList.add("show-result");
});

calculateCGPAButton.addEventListener("click", function () {
  const semester = parseInt(cgpaSemesterInput.value);

  const cgpaPrevious = parseFloat(
    document.getElementById("cgpaPrevious").value
  );
  const sgpaCurrent = parseFloat(
    document.getElementById("sgpaCurrent").value
  );

  if (isNaN(cgpaPrevious) || isNaN(sgpaCurrent)) {
    const resultElement = document.getElementById("cgpaResult");
    resultElement.classList.remove("show-result");
    
    // Force reflow
    void resultElement.offsetWidth;
    
    resultElement.classList.add("show-result");
    resultElement.textContent = "Please enter valid CGPA and SGPA values";
    return;
  }

  const totalCreditsPrevious = creditsTillSem[semester - 1];
  const totalCreditsCurrent = creditsTillSem[semester] - totalCreditsPrevious;

  const totalCGPAPrevious = cgpaPrevious * totalCreditsPrevious;
  const totalCGPACurrent = sgpaCurrent * totalCreditsCurrent;

  const totalCredits = totalCreditsPrevious + totalCreditsCurrent;

  const cgpa = (totalCGPAPrevious + totalCGPACurrent) / totalCredits;

  // Add animation by removing and adding a class
  const resultElement = document.getElementById("cgpaResult");
  resultElement.classList.remove("show-result");
  
  // Force reflow
  void resultElement.offsetWidth;
  
  resultElement.classList.add("show-result");
  resultElement.innerHTML = `Your CGPA is: <span class="highlight">${cgpa.toFixed(2)}</span>`;
});
