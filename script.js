// Global chart variable
let emissionsChart = null;

document.getElementById("carbon-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get values
  let carKm = parseFloat(document.getElementById("car-km").value) || 0;
  let flights = parseFloat(document.getElementById("flights").value) || 0;
  let publicTransport = parseFloat(document.getElementById("public-transport").value) || 0;
  let electricity = parseFloat(document.getElementById("electricity").value) || 0;
  let gas = parseFloat(document.getElementById("gas").value) || 0;
  let meatMeals = parseFloat(document.getElementById("meat-meals").value) || 0;
  let vegMeals = parseFloat(document.getElementById("veg-meals").value) || 0;
  let veganMeals = parseFloat(document.getElementById("vegan-meals").value) || 0;

  // Emission factors
  const CAR_FACTOR = 0.21;
  const FLIGHT_FACTOR = 90;
  const BUS_FACTOR = 0.10;
  const ELECTRICITY_FACTOR = 0.4;
  const GAS_FACTOR = 2.3;
  const MEAT_FACTOR = 2.5;
  const VEG_FACTOR = 1.5;
  const VEGAN_FACTOR = 0.9;

  // Annualized calculations
  let transportEmissions = (carKm * CAR_FACTOR * 52) +
                           (flights * FLIGHT_FACTOR) +
                           (publicTransport * BUS_FACTOR * 52);

  let energyEmissions = (electricity * ELECTRICITY_FACTOR * 12) +
                        (gas * GAS_FACTOR * 12);

  let foodEmissions = (meatMeals * MEAT_FACTOR * 52) +
                      (vegMeals * VEG_FACTOR * 52) +
                      (veganMeals * VEGAN_FACTOR * 52);

  let totalEmissions = transportEmissions + energyEmissions + foodEmissions;

  // Display results
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("total").innerText =
    ` Your estimated annual footprint: ${totalEmissions.toFixed(2)} kg CO₂`;

  document.getElementById("breakdown").innerHTML = `
    <p> Transport: ${transportEmissions.toFixed(2)} kg CO₂</p>
    <p> Energy: ${energyEmissions.toFixed(2)} kg CO₂</p>
    <p> Food: ${foodEmissions.toFixed(2)} kg CO₂</p>
  `;

  // Chart.js pie chart
  const ctx = document.getElementById('emissionsChart').getContext('2d');

  if (emissionsChart !== null) {
    emissionsChart.destroy();
  }

  emissionsChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Transport', 'Energy', 'Food'],
      datasets: [{
        data: [transportEmissions, energyEmissions, foodEmissions],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        }
      }
    }
  });
});
