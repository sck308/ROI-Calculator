function calculateComparison() {
    // Retrieve values from control inputs
    let rmcr_control = parseFloat(document.getElementById('rmcr_control').value) || 0;
    let plp_control = parseFloat(document.getElementById('plp_control').value) || 0;
    let prtmm_control = parseFloat(document.getElementById('prtmm_control').value) || 0;
    let saving_processing_cost = parseFloat(document.getElementById('saving_processing_cost').value) || 0;
    let elec_control = parseFloat(document.getElementById('elec_control').value) || 0;
    let control_micronutrient = parseFloat(document.getElementById('control_micronutrient').value) || 0;

    // Retrieve values from DMX-7 inputs
    let rmcr_dmx7 = parseFloat(document.getElementById('rmcr_dmx7').value) || 0;
    let plp_dmx7 = parseFloat(document.getElementById('plp_dmx7').value) || 0;
    let prtmm_dmx7 = parseFloat(document.getElementById('prtmm_dmx7').value) || 0;
    let elec_dmx7 = parseFloat(document.getElementById('elec_dmx7').value) || 0;
    let dmx7_micronutrient = parseFloat(document.getElementById('dmx7_micronutrient').value) || 0;

    // Retrieve values from assumptions inputs
    let rated_capacity = parseFloat(document.getElementById('rated_capacity').value) || 0;
    let processing_cost = parseFloat(document.getElementById('processing_cost').value) || 0;
    let electricity_rate = parseFloat(document.getElementById('electricity_rate').value) || 0;
    let premixers_cost = parseFloat(document.getElementById('premixers_cost').value) || 0;

    // Perform calculations

    // Step 1: Calculate Process Loss in Rupees for Control and DMX-7
    let process_loss_control = rmcr_control * (plp_control / 100);
    let process_loss_dmx7 = rmcr_dmx7 * (plp_dmx7 / 100);

    // Step 2: Calculate Savings on Process Cost (Pellet Mill Run Time Difference) in Minutes for Control and DMX-7
    let savings_on_process_cost_control = prtmm_control - prtmm_control * (saving_processing_cost / 100);
    let savings_on_process_cost_dmx7 = prtmm_dmx7 - prtmm_dmx7 * (saving_processing_cost / 100);
    let difference_process_cost = savings_on_process_cost_control - savings_on_process_cost_dmx7;
    let percentage_difference_process_cost = (difference_process_cost / prtmm_control) * 100;

    // Step 3: Calculate Total Processing Cost in Rupees for Control and DMX-7 (3% of RM Cost)
    let total_processing_cost_control = rmcr_control * 0.03;
    let total_processing_cost_dmx7 = rmcr_dmx7 * 0.03;

    // Step 4: Calculate Savings on Electricity Consumption in Rupees for Control and DMX-7
    let savings_on_electricity_control = elec_control - elec_control;
    let savings_on_electricity_dmx7 = elec_control - elec_dmx7;
    let difference_electricity_consumption = savings_on_electricity_dmx7 * electricity_rate;

    // Step 5: Calculate total money saved in electricity
    let total_money_saved_electricity = difference_electricity_consumption * electricity_rate;
    let per = (((process_loss_control - process_loss_dmx7) / process_loss_control) * 100);
    console.log(per);

    // Calculate percentage difference for Total Processing Cost
    let percentage_total_processing_cost = (total_processing_cost_control - ((total_processing_cost_control * percentage_difference_process_cost) / 100));

    let ctr_micor = control_micronutrient / control_micronutrient;
    let dmx_micor = dmx7_micronutrient / control_micronutrient;

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
                <td>Process Loss (in Rupees)</td>
                <td>INR ${process_loss_control.toFixed(2)}</td>
                <td>INR ${process_loss_dmx7.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Pellet Mill Run Time (in Minutes)</td>
                <td>${savings_on_process_cost_control.toFixed(2)} minutes</td>
                <td>${savings_on_process_cost_dmx7.toFixed(2)} minutes</td>
            </tr>
            <tr>
                <td>Total Processing Cost (in Rupees)</td>
                <td>INR ${total_processing_cost_control.toFixed(2)}</td>
                <td>INR ${percentage_total_processing_cost.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Saving on Electricity Consumption (in Rupees)</td>
                <td>${savings_on_electricity_control.toFixed(2)}</td>
                <td>${savings_on_electricity_dmx7.toFixed(2)}</td>
            </tr>
        </table>
        <h3>Conclusion :</h3>
        <p><strong>Saving on Process Cost in : ${percentage_difference_process_cost.toFixed(2)} % </strong></p>
        <p><strong>Saving on Electricity Consumption : INR ${difference_electricity_consumption.toFixed(2)} </strong> </p>
        <p><strong>Cost without DMX-7: ${(rmcr_control + process_loss_control + (elec_control * electricity_rate)) / 1000} </strong></p>
        <p><strong>Cost with DMX-7: ${(rmcr_dmx7 + process_loss_dmx7 + (elec_dmx7 * electricity_rate)) / 1000} </strong></p>
    `;
}
