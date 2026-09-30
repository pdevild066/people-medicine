const diseaseData = {
  Fever: {
    medications: ["Paracetamol", "Ibuprofen"],
    foodRecommended: "Hydrating fluids, fruits, light soups",
    foodAvoid: "Spicy foods, caffeine, oily foods",
    govtSchemes: ["Ayushman Bharat", "National Health Mission"]
  },
  Cold: {
    medications: ["Antihistamines", "Decongestants"],
    foodRecommended: "Warm tea, honey, ginger, citrus fruits",
    foodAvoid: "Cold drinks, processed foods, dairy in excess",
    govtSchemes: ["Free Health Checkup Program"]
  },
  Cough: {
    medications: ["Cough syrups", "Lozenges", "Expectorants"],
    foodRecommended: "Ginger tea, honey, warm water",
    foodAvoid: "Cold beverages, fried foods, dairy",
    govtSchemes: ["National Respiratory Care Program"]
  },
  Headache: {
    medications: ["Paracetamol", "Ibuprofen", "Aspirin"],
    foodRecommended: "Hydrating fluids, magnesium-rich foods",
    foodAvoid: "Caffeine, processed foods, alcohol",
    govtSchemes: ["Pain Management Program"]
  },
  BodyPain: {
    medications: ["Pain relievers (Ibuprofen, Naproxen)"],
    foodRecommended: "Anti-inflammatory foods like turmeric, fish oil",
    foodAvoid: "Sugary foods, processed meats",
    govtSchemes: ["Ayushman Bharat Yojana"]
  },
  Diarrhea: {
    medications: ["Oral Rehydration Salts (ORS)", "Loperamide"],
    foodRecommended: "Bananas, rice, yogurt, coconut water",
    foodAvoid: "Spicy foods, dairy, caffeine",
    govtSchemes: ["National Nutrition Mission"]
  },
  KidneyDisease: {
    medications: ["ACE inhibitors", "Diuretics", "Phosphate binders"],
    foodRecommended: "Low-sodium foods, high-fiber foods, water",
    foodAvoid: "High-protein foods, processed salt, caffeine",
    govtSchemes: ["Pradhan Mantri Dialysis Program"]
  },
  Stroke: {
    medications: ["Aspirin", "Blood thinners", "Statins"],
    foodRecommended: "Leafy greens, omega-3-rich foods, whole grains",
    foodAvoid: "Processed foods, high-sugar foods, trans fats",
    govtSchemes: ["National Stroke Prevention Program"]
  },
  Arthritis: {
    medications: ["NSAIDs (Ibuprofen, Naproxen)", "Corticosteroids"],
    foodRecommended: "Omega-3 fatty acids, green vegetables, turmeric",
    foodAvoid: "Sugary foods, processed meats, alcohol",
    govtSchemes: ["Senior Citizen Healthcare Scheme"]
  },
  Anemia: {
    medications: ["Iron supplements", "Folic acid", "Vitamin B12"],
    foodRecommended: "Iron-rich foods (spinach, red meat, beans)",
    foodAvoid: "Caffeine, high-calcium foods (interferes with iron absorption)",
    govtSchemes: ["National Anemia Control Program"]
  }
};

// Function to update results dynamically
function searchDisease() {
  const selectedDisease = document.getElementById("disease").value;
  displayDiseaseInfo(selectedDisease);
}

function displayDiseaseInfo(disease) {
  const output = document.getElementById("output");
  const medicationsList = document.getElementById("medications");
  const foodRecommended = document.getElementById("food-recommended");
  const foodAvoid = document.getElementById("food-avoid");
  const govtSchemesList = document.getElementById("govt-schemes");

  // Clear previous results
  medicationsList.innerHTML = "";
  govtSchemesList.innerHTML = "";

  if (diseaseData[disease]) {
    const diseaseInfo = diseaseData[disease];

    // Display medications
    diseaseInfo.medications.forEach(med => {
      const li = document.createElement("li");
      li.textContent = med;
      medicationsList.appendChild(li);
    });

    // Display food recommendations
    foodRecommended.textContent = diseaseInfo.foodRecommended;
    foodAvoid.textContent = diseaseInfo.foodAvoid;

    // Display government schemes
    diseaseInfo.govtSchemes.forEach(scheme => {
      const li = document.createElement("li");
      li.textContent = scheme;
      govtSchemesList.appendChild(li);
    });

    output.textContent = `Showing details for ${disease}`;
    speakText(`Here are the details for ${disease}`);
  } else {
    output.textContent = "No information available for the selected disease.";
    medicationsList.innerHTML = "<li>No medication information available.</li>";
    foodRecommended.textContent = "No recommendations available.";
    foodAvoid.textContent = "No information available.";
    govtSchemesList.innerHTML = "<li>No schemes available for this disease.</li>";
  }
}

// Voice Assistant
function startVoiceAssistant() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  speakText("Welcome to People Medicine. How can I help you?");
  
  recognition.onresult = function(event) {
    const spokenText = event.results[0][0].transcript.toLowerCase();
    console.log("User said:", spokenText);
    
    // Check if spoken disease exists
    const diseaseNames = Object.keys(diseaseData);
    const matchedDisease = diseaseNames.find(disease => disease.toLowerCase() === spokenText);
    
    if (matchedDisease) {
      displayDiseaseInfo(matchedDisease);
    } else {
      speakText("Sorry, I couldn't find that disease in my database.");
    }
  };

  recognition.onerror = function(event) {
    console.error("Speech recognition error:", event.error);
    speakText("Sorry, I didn't catch that. Please try again.");
  };
}

// Function to make the voice assistant speak
function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
}
