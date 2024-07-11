function calculateComparison() {
    // Retrieve values from Control inputs
    let rmcr_control = parseFloat(document.getElementById('rmcr_control').value) || 0;
    let plp_control = parseFloat(document.getElementById('plp_control').value) || 0;
    let plp_dmx7_control = parseFloat(document.getElementById('plp_dmx7_control').value) || 0;
    let prtmm_control = parseFloat(document.getElementById('prtmm_control').value) || 0;
    let elec_control = parseFloat(document.getElementById('elec_control').value) || 0;
    let control_micronutrient = parseFloat(document.getElementById('control_micronutrient').value) || 0;

    // Retrieve values from DMX-7 inputs
    let rmcr_dmx7 = parseFloat(document.getElementById('rmcr_dmx7').value) || 0;
    let plp_dmx7 = parseFloat(document.getElementById('plp_dmx7').value) || 0;
    let plp_dmx7_output = parseFloat(document.getElementById('plp_dmx7_output').value) || 0;
    let prtmm_dmx7 = parseFloat(document.getElementById('prtmm_dmx7').value) || 0;
    let elec_dmx7 = parseFloat(document.getElementById('elec_dmx7').value) || 0;
    let dmx7_micronutrient = parseFloat(document.getElementById('dmx7_micronutrient').value) || 0;

    // Retrieve values from Assumptions inputs
    let feed_cost_without_dmx7 = parseFloat(document.getElementById('feed_cost_without_dmx7').value) || 0;
    let feed_cost_with_dmx7 = parseFloat(document.getElementById('feed_cost_with_dmx7').value) || 0;
    let rated_capacity = parseFloat(document.getElementById('rated_capacity').value) || 0;
    let processing_cost = parseFloat(document.getElementById('processing_cost').value) || 0;
    let electricity_rate = parseFloat(document.getElementById('electricity_rate').value) || 0;
    let premixers_cost = parseFloat(document.getElementById('premixers_cost').value) || 0;

    // Perform calculations

    // Step 1: Calculate Process Loss / Gain in Percentage for Control and DMX-7
    let process_loss_control_percentage = ((plp_dmx7_control - plp_control) / plp_control) * 100;

    // Corrected formula for DMX-7 process loss percentage
    let process_loss_dmx7_percentage =  ((plp_dmx7_output - plp_dmx7) / plp_control) * 100;

    // Calculate Process Loss / Gain in Rupees for Control and DMX-7
    let process_loss_control_rupees = rmcr_control * process_loss_control_percentage / 100;
    let difference_process_loss_control = plp_control - plp_dmx7_control
    let difference_process_loss_dmx7 = - ( plp_dmx7 - plp_dmx7_output )
    let process_loss_dmx7_rupees = (difference_process_loss_control + difference_process_loss_dmx7) * feed_cost_with_dmx7;

    // Step 2: Calculate Savings on Process Cost (Pellet Mill Run Time Difference) in Minutes for Control and DMX-7
    let percentage_savings_on_process_cost_dmx7 = ((prtmm_control - prtmm_dmx7) / prtmm_control) * 100;

    // Step 3: Calculate Total Processing Cost in Rupees for Control and DMX-7 (3% of RM Cost)
    let total_processing_cost_control = rmcr_control * 0.03;
    let total_processing_cost_dmx7 = total_processing_cost_control - ( total_processing_cost_control * percentage_savings_on_process_cost_dmx7 ) / 100;

    // Step 4: Calculate Savings on lesser Electricity Consumption in Rupees for Control and DMX-7
    let difference_electricity_consumption_dmx7 = elec_control - elec_dmx7;
    let savings_on_electricity_consumption_dmx7 = difference_electricity_consumption_dmx7 * electricity_rate;

    // Calculate Micronutrient loss in Rupees for Control and DMX-7
    let micronutrient_loss_conntrol = ( premixers_cost / 1000 ) * control_micronutrient;
    let micronutrient_loss_dmx7 = ( premixers_cost / 1000 ) * dmx7_micronutrient;


    // Example of updating the results div
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
<h2>Comparison Results</h2>
<table>
    <tr>
        <th>Calculation</th>
        <th>Control</th>
        <th>DMX-7</th>
    </tr>
    <tr>
        <td>Process Loss / Gain (%)</td>
        <td>${process_loss_control_percentage.toFixed(2)} %</td>
        <td>${process_loss_dmx7_percentage.toFixed(2)} %</td>
    </tr>
    <tr>        
        <td>Process Loss / Gain (in Rupees)</td>
        <td>INR ${process_loss_control_rupees.toFixed(2)}</td>
        <td>INR ${process_loss_dmx7_rupees.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Savings on Process Cost (%)</td>
        <td>0 %</td>
        <td>${percentage_savings_on_process_cost_dmx7.toFixed(2)} %</td>
    </tr>
    <tr>
        <td>Savings on Electricity Consumption (in Rupees)</td>
        <td>0</td>
        <td>INR ${savings_on_electricity_consumption_dmx7.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Total Processing Cost (in Rupees) - 3 % of RM Cost </td>
        <td>INR ${total_processing_cost_control.toFixed(2)}</td>
        <td>INR ${total_processing_cost_dmx7.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Micronutrient Loss (in Rupees)</td>
        <td>INR ${micronutrient_loss_conntrol.toFixed(2)}</td>
        <td>INR ${micronutrient_loss_dmx7.toFixed(2)}</td>
    </tr>
</table>

`;
}