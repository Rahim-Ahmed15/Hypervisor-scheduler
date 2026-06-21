// // ============================================
// // STATE
// // ============================================

// let vmCount = 0;
// let totalCPU = 0;
// let vmData = [];

// // ============================================
// // DOM REFS
// // ============================================

// const vmCountInput = document.getElementById('vmCount');
// const totalCPUInput = document.getElementById('totalCPU');
// const generateBtn = document.getElementById('generateBtn');
// const runBtn = document.getElementById('runBtn');

// const configPanel = document.getElementById('configPanel');
// const vmPanel = document.getElementById('vmPanel');
// const resultsPanel = document.getElementById('resultsPanel');

// const vmGrid = document.getElementById('vmGrid');
// const resultBody = document.getElementById('resultBody');
// const utilPercent = document.getElementById('utilPercent');
// const utilFill = document.getElementById('utilFill');
// const summaryGrid = document.getElementById('summaryGrid');

// const aiBox = document.getElementById('aiBox');
// const aiSpinner = document.getElementById('aiSpinner');
// const aiStatusText = document.getElementById('aiStatusText');
// const aiBody = document.getElementById('aiBody');
// const aiTitle = document.getElementById('aiTitle');
// const aiMessage = document.getElementById('aiMessage');

// const configError = document.getElementById('configError');
// const vmError = document.getElementById('vmError');

// // ============================================
// // EVENT LISTENERS
// // ============================================

// generateBtn.addEventListener('click', handleGenerate);
// runBtn.addEventListener('click', handleRun);

// // Enter key support
// vmCountInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') handleGenerate();
// });
// totalCPUInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') handleGenerate();
// });

// // ============================================
// // HANDLERS
// // ============================================

// function handleGenerate() {
//     // Get values
//     const count = parseInt(vmCountInput.value);
//     const cpu = parseInt(totalCPUInput.value);

//     // Validate
//     configError.hidden = true;

//     if (!count || count < 1 || count > 16) {
//         configError.textContent = 'Please enter a valid number of VMs (1-16).';
//         configError.hidden = false;
//         return;
//     }

//     if (!cpu || cpu < 1) {
//         configError.textContent = 'Please enter a valid CPU capacity (minimum 1).';
//         configError.hidden = false;
//         return;
//     }

//     vmCount = count;
//     totalCPU = cpu;

//     // Generate VM inputs
//     generateVMInputs(count);
    
//     // Show VM panel, hide results
//     vmPanel.hidden = false;
//     resultsPanel.hidden = true;
    
//     // Scroll to VM panel
//     vmPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
// }

// function generateVMInputs(count) {
//     vmGrid.innerHTML = '';
//     vmData = [];

//     for (let i = 0; i < count; i++) {
//         const defaultDemand = Math.max(1, Math.floor((totalCPU * 0.3) + (i * 5)));
//         const defaultWeight = Math.max(1, 5 + i * 2);

//         const card = document.createElement('div');
//         card.className = 'vm-card';
//         card.style.animationDelay = `${i * 0.05}s`;
//         card.innerHTML = `
//             <div class="vm-card__title">VM ${i + 1}</div>
//             <div class="field-group">
//                 <label for="demand_${i}">CPU Demand</label>
//                 <input type="number" id="demand_${i}" min="1" value="${defaultDemand}" inputmode="numeric">
//             </div>
//             <div class="field-group">
//                 <label for="weight_${i}">Weight</label>
//                 <input type="number" id="weight_${i}" min="1" value="${defaultWeight}" inputmode="numeric">
//             </div>
//         `;
//         vmGrid.appendChild(card);

//         vmData.push({
//             demand: defaultDemand,
//             weight: defaultWeight
//         });
//     }
// }

// function handleRun() {
//     // Collect VM data from inputs
//     const demands = [];
//     const weights = [];
//     let totalWeight = 0;
//     let totalDemand = 0;

//     for (let i = 0; i < vmCount; i++) {
//         const demandInput = document.getElementById(`demand_${i}`);
//         const weightInput = document.getElementById(`weight_${i}`);

//         const demand = parseInt(demandInput.value);
//         const weight = parseInt(weightInput.value);

//         // Validate each VM
//         if (!demand || demand < 1) {
//             vmError.textContent = `VM ${i + 1}: Please enter a valid CPU demand (minimum 1).`;
//             vmError.hidden = false;
//             return;
//         }

//         if (!weight || weight < 1) {
//             vmError.textContent = `VM ${i + 1}: Please enter a valid weight (minimum 1).`;
//             vmError.hidden = false;
//             return;
//         }

//         demands.push(demand);
//         weights.push(weight);
//         totalWeight += weight;
//         totalDemand += demand;
//     }

//     vmError.hidden = true;

//     // Calculate allocation
//     const allocated = [];
//     let usedCPU = 0;

//     for (let i = 0; i < vmCount; i++) {
//         let alloc = Math.floor((weights[i] * totalCPU) / totalWeight);
//         if (alloc > demands[i]) {
//             alloc = demands[i];
//         }
//         allocated.push(alloc);
//         usedCPU += alloc;
//     }

//     // Display results
//     displayResults(totalCPU, totalWeight, totalDemand, demands, weights, allocated, usedCPU);
    
//     // Show results panel
//     resultsPanel.hidden = false;
    
//     // Scroll to results
//     setTimeout(() => {
//         resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }, 100);
// }

// // ============================================
// // DISPLAY RESULTS
// // ============================================

// function displayResults(totalCPU, totalWeight, totalDemand, demands, weights, allocated, usedCPU) {
//     // Table
//     resultBody.innerHTML = '';
    
//     const utilization = (usedCPU / totalCPU) * 100;
    
//     for (let i = 0; i < vmCount; i++) {
//         const alloc = allocated[i];
//         const demand = demands[i];
//         const isMet = alloc >= demand;
//         const statusClass = isMet ? 'status-badge--met' : 'status-badge--under';
//         const statusText = isMet ? '✓ Met' : '⚠ Under';
        
//         const row = document.createElement('tr');
//         row.style.animationDelay = `${i * 0.06}s`;
//         row.innerHTML = `
//             <td>VM ${i + 1}</td>
//             <td>${weights[i]}</td>
//             <td>${demand}</td>
//             <td>${alloc}</td>
//             <td><span class="status-badge ${statusClass}">${statusText}</span></td>
//         `;
//         resultBody.appendChild(row);
//     }

//     // Utilization bar
//     const utilPercentValue = Math.min(utilization, 100);
//     utilPercent.textContent = utilPercentValue.toFixed(1) + '%';
//     utilFill.style.width = utilPercentValue + '%';
    
//     // Color change for overload
//     if (utilization > 90) {
//         utilFill.classList.add('utilization__fill--overloaded');
//     } else {
//         utilFill.classList.remove('utilization__fill--overloaded');
//     }

//     // Summary cards
//     summaryGrid.innerHTML = `
//         <div class="summary-card">
//             <div class="summary-card__label">Total CPU</div>
//             <div class="summary-card__value">${totalCPU}</div>
//         </div>
//         <div class="summary-card">
//             <div class="summary-card__label">Total Weight</div>
//             <div class="summary-card__value">${totalWeight}</div>
//         </div>
//         <div class="summary-card">
//             <div class="summary-card__label">Total Demand</div>
//             <div class="summary-card__value">${totalDemand}</div>
//         </div>
//         <div class="summary-card">
//             <div class="summary-card__label">Used CPU</div>
//             <div class="summary-card__value">${usedCPU}</div>
//         </div>
//         <div class="summary-card">
//             <div class="summary-card__label">Unused CPU</div>
//             <div class="summary-card__value">${totalCPU - usedCPU}</div>
//         </div>
//     `;

//     // AI Analysis with animation
//     simulateAIAnalysis(totalDemand, totalCPU, usedCPU, totalCPU);
// }

// // ============================================
// // AI ANALYSIS (with animation)
// // ============================================

// function simulateAIAnalysis(totalDemand, totalCPU, usedCPU, capacity) {
//     // Show loading state
//     aiSpinner.hidden = false;
//     aiStatusText.textContent = 'AI Engine analyzing workload patterns...';
//     aiBody.hidden = true;
//     aiBox.className = 'ai-box';

//     // Simulate AI processing
//     setTimeout(() => {
//         aiSpinner.hidden = true;
//         aiStatusText.textContent = 'Analysis complete.';
//         aiBody.hidden = false;

//         const utilization = (usedCPU / capacity) * 100;
//         const isOverloaded = totalDemand > totalCPU;

//         if (isOverloaded) {
//             aiBox.className = 'ai-box ai-box--warn';
//             aiTitle.textContent = '⚠️ High CPU Load Detected';
//             aiMessage.innerHTML = `
//                 <strong>Issue:</strong> Total demand (${totalDemand}) exceeds capacity (${totalCPU}) by ${totalDemand - totalCPU} units.<br>
//                 <strong>Recommendation:</strong> Increase CPU capacity or reduce active VMs.
//             `;
//         } else if (utilization > 85) {
//             aiBox.className = 'ai-box ai-box--warn';
//             aiTitle.textContent = '⚠️ High Utilization Warning';
//             aiMessage.innerHTML = `
//                 <strong>Status:</strong> CPU utilization at ${utilization.toFixed(1)}%<br>
//                 <strong>Recommendation:</strong> Consider scaling up capacity soon for optimal performance.
//             `;
//         } else {
//             aiBox.className = 'ai-box ai-box--ok';
//             aiTitle.textContent = '✅ System Running Optimally';
//             aiMessage.innerHTML = `
//                 <strong>Status:</strong> All resources allocated efficiently.<br>
//                 Remaining capacity: ${(capacity - usedCPU)} units (${((capacity - usedCPU) / capacity * 100).toFixed(1)}% free)
//             `;
//         }
//     }, 1200);
// }

// // ============================================
// // RESET FUNCTION
// // ============================================

// function resetScheduler() {
//     vmCountInput.value = '';
//     totalCPUInput.value = '';
//     vmPanel.hidden = true;
//     resultsPanel.hidden = true;
//     configError.hidden = true;
//     vmError.hidden = true;
//     vmGrid.innerHTML = '';
//     resultBody.innerHTML = '';
//     utilPercent.textContent = '0.0%';
//     utilFill.style.width = '0%';
//     summaryGrid.innerHTML = '';
//     aiBody.hidden = true;
//     aiBox.className = 'ai-box';
//     aiSpinner.hidden = true;
//     aiStatusText.textContent = 'AI Engine ready.';
    
//     // Scroll to top
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// }

// // Expose reset function to global scope
// window.resetScheduler = resetScheduler;

// // ============================================
// // KEYBOARD SHORTCUTS
// // ============================================

// document.addEventListener('keydown', (e) => {
//     // Ctrl+Enter to run
//     if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
//         e.preventDefault();
//         if (!vmPanel.hidden) {
//             handleRun();
//         } else {
//             handleGenerate();
//         }
//     }
// });

// console.log('%c✦ PRISM Hypervisor Scheduler Loaded ✦', 
//     'color: #9b5cff; font-size: 16px; font-weight: bold;');
// console.log('%cInfovative Technology Solutions', 
//     'color: #7d9bff; font-size: 12px;');
