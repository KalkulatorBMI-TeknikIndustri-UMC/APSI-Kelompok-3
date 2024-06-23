const bmiText = document.getElementById("bmi");
const descText = document.getElementById("desc");
const form = document.querySelector("form");

form.addEventListener("submit", onFormSubmit);
form.addEventListener("reset", onFormReset);

function onFormReset() {
 bmiText.textContent = 0;
 bmiText.className = "";
 descText.textContent = "Keterangan";
}

function onFormSubmit(e) {
 e.preventDefault();

 const weight = parseFloat(form.weight.value);
 const height = parseFloat(form.height.value);
 const age = parseFloat(form.age.value);
 const gender = document.querySelector('input[name="gender"]:checked').value;

 if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
  alert("Silakan masukkan berat badan, tinggi badan, usia dan jenis kelamin yang valid");
  return;
 }

 const heightInMeters = height / 100; // cm -> m
 let bmi;

 if (gender === "Laki-Laki") {
  bmi = calculateBMIMale(weight, heightInMeters, age);
 } else if (gender === "Perempuan") {
  bmi = calculateBMIFemale(weight, heightInMeters, age);
 } else {
  alert("Pilih jenis kelamin Anda");
  return;
 }

 const desc = interpretBMI(bmi);

 bmiText.textContent = bmi.toFixed(2);
 bmiText.className = desc;
 descText.innerHTML = `Kamu <strong>${desc}</strong>`;
}

function calculateBMIMale(weight, heightInMeters, age) {
 return weight / Math.pow(heightInMeters, 2) - 0.1 - (age - 20) * 0.006; // Male BMI formula with age adjustment
}

function calculateBMIFemale(weight, heightInMeters, age) {
 return weight / Math.pow(heightInMeters, 2) - 0.2 - (age - 20) * 0.005; // Female BMI formula with age adjustment 
}

function interpretBMI(bmi) {
 if (bmi < 18.5) {
  return "KURUS <p>1. Konsultasikan dengan dokter/ahli gizi <p>2. Terapkan pola makan yang sehat <p>3. Tidur yang cukup <p>4. Rutin berolahraga";
 } else if (bmi < 25) {
  return "IDEAL <p>Pertahankan gaya hidup sehat 😊";
 } else if (bmi < 30) {
  return "GEMUK <p>1. Hindari makan berlebihan <p> 2. Fokus pada makanan yang rendah lemak, rendah gula & tinggi serat <p> 3. Lakukan aktivitas fisik secara teratur <p> 4. Hindari minuman bersoda atau beralkohol";
 } else {
  return "OBESITAS <p> 1. Konsultasikan dengan dokter <p> 2. Gunakan piring yang lebih kecil & hindari makan berlebihan <p> 3. Fokus pada makanan yang sehat & bergizi <p> 4. Lakukan aktivitas fisik & kekuatan secara teratur";
 }
}
