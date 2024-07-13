85% of storage used … If you run out, you can't create, edit, and upload files. Get 100 GB of storage for ₹130.00 ₹35.00/month for 2 months.
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
    let electricity_rate = parseFloat(document.getElementById('electricity_rate').value) || 0;
    let premixers_cost = parseFloat(document.getElementById('premixers_cost').value) || 0;

    // Perform calculations

    // Step 1: Calculate Process Loss / Gain in Percentage for Control and DMX-7
    let process_loss_control_percentage = ((plp_dmx7_control - plp_control) / plp_control) * 100;
    let process_loss_dmx7_percentage = ((plp_dmx7_output - plp_dmx7) / plp_dmx7) * 100;

    // Calculate Process Loss / Gain in Rupees for Control and DMX-7
    let process_loss_control_rupees = rmcr_control * process_loss_control_percentage / 100;
    let difference_process_loss_control = plp_control - plp_dmx7_control;
    let difference_process_loss_dmx7 = plp_dmx7_output - plp_dmx7;
    let process_loss_dmx7_rupees = (difference_process_loss_control + difference_process_loss_dmx7) * feed_cost_with_dmx7;

    // Step 2: Calculate Savings on Process Cost (Pellet Mill Run Time Difference) in Minutes for Control and DMX-7
    let percentage_savings_on_process_cost_dmx7 = ((prtmm_control - prtmm_dmx7) / prtmm_control) * 100;

    // Step 3: Calculate Total Processing Cost in Rupees for Control and DMX-7 (3% of RM Cost)
    let total_processing_cost_control = rmcr_control * 0.03;
    let total_processing_cost_dmx7 = total_processing_cost_control - (total_processing_cost_control * percentage_savings_on_process_cost_dmx7) / 100;

    // Step 4: Calculate Savings on Lesser Electricity Consumption in Rupees for Control and DMX-7
    let difference_electricity_consumption_dmx7 = elec_control - elec_dmx7;
    let savings_on_electricity_consumption_dmx7 = difference_electricity_consumption_dmx7 * electricity_rate;

    // Calculate Micronutrient Loss in Rupees for Control and DMX-7
    let micronutrient_loss_control = (premixers_cost / plp_control) * control_micronutrient;
    let micronutrient_loss_dmx7 = (premixers_cost / plp_dmx7) * dmx7_micronutrient;

    // Correct calculations for Control and DMX-7 values
    let control_value = rmcr_control + - (rmcr_control * process_loss_control_percentage / 100) + total_processing_cost_control + micronutrient_loss_control;
    let dmx7_value = rmcr_dmx7 - process_loss_dmx7_rupees + (rmcr_control * process_loss_control_percentage / 100) + total_processing_cost_dmx7 - micronutrient_loss_dmx7 - savings_on_electricity_consumption_dmx7;

    // Ensure values are in Thousands - can be used later not using now 13-7-24
    let control_value_semi_easy_final = control_value / 1000;
    let dmx7_value_semi_easy_final_make_my = dmx7_value / 1000;

    // Ensure values are in Thousands
    let difference_amount = (control_value - dmx7_value);

    // Ensure values are in Thousands
    let difference_amount_rupees = (difference_amount * 1000);

    // Calculate ROI Result
    let roi_result = rmcr_dmx7 - rmcr_control;


    // Calculate ROI Result
    let roi_result_ratio = roi_result / difference_amount;


    // Log intermediate calculations for debugging
    console.log("process_loss_control_percentage:", process_loss_control_percentage);
    console.log("process_loss_dmx7_percentage:", process_loss_dmx7_percentage);
    console.log("process_loss_control_rupees:", process_loss_control_rupees);
    console.log("process_loss_dmx7_rupees:", process_loss_dmx7_rupees);
    console.log("total_processing_cost_control:", total_processing_cost_control);
    console.log("total_processing_cost_dmx7:", total_processing_cost_dmx7);
    console.log("savings_on_electricity_consumption_dmx7:", savings_on_electricity_consumption_dmx7);
    console.log("micronutrient_loss_control:", micronutrient_loss_control);
    console.log("micronutrient_loss_dmx7:", micronutrient_loss_dmx7);
    console.log("control_value_semi_easy_final:", control_value_semi_easy_final);
    console.log("dmx7_value_semi_easy_final_make_my:", dmx7_value_semi_easy_final_make_my);

    // Update the results div with the calculations
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
        <td>Savings on Lesser Electricity Consumption (in Rupees)</td>
        <td>0</td>
        <td>INR ${savings_on_electricity_consumption_dmx7.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Total Processing Cost (in Rupees)</td>
        <td>INR ${total_processing_cost_control.toFixed(2)}</td>
        <td>INR ${total_processing_cost_dmx7.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Micronutrient Loss (in Rupees)</td>
        <td>INR ${micronutrient_loss_control.toFixed(2)}</td>
        <td>INR ${micronutrient_loss_dmx7.toFixed(2)}</td>
    </tr>
    </table>
    <h3>Conclusion :</h3>
    <table>
    <tr>
        <th>Value Without DMX-7 </th>
        <td>INR ${control_value.toFixed(3)}</td>
    </tr>
     <tr>
        <th>Value With DMX-7 </th>
        <td>INR ${dmx7_value.toFixed(3)}</td>
    </tr>
    <tr>
    <th>Difference</th>
    <td style="background-color: #ffeb3b; color: #d32f2f; font-weight: bold; padding: 10px; border-radius: 5px;">
        <span style="font-size: 1.2em;">&#8377;</span> ${difference_amount.toFixed(3)}
        <span style="font-size: 1.2em; margin-left: 5px;">&#9650;</span>
    </td>
    </tr>
    </table>


    `;
}
