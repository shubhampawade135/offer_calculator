const API_KEY = '70ea5e49a2317eaacab231c2'; // Replace with your ExchangeRate-API key

async function calculate() {
    const amount = document.getElementById('amount').value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    let options = [];
    let prices = [];

    if (amount < 30) {
        options = [['Not enough to get any service.']];
        prices = [[]];
    } else if (amount >= 30 && amount <= 50) {
        options = [['Domain Registration']];
        prices = [[30]];
    } else if (amount > 50 && amount <= 100) {
        options = [['Domain Registration', '1 GB Hosting']];
        prices = [[30, 60]];
    } else if (amount > 100 && amount <= 200) {
        options = [
            ['Domain Registration', '1 GB Hosting', 'Basic Website'],
            ['Logo Design', 'Brochures'],
            ['One Month SEO Service'],
            ['5 Custom Web Pages Design']
        ];
        prices = [[30, 60, 80], [60, 80], [170], [180]];
    } else if (amount > 200 && amount <= 500) {
        options = [
            ['Domain Registration', '5 GB Hosting', 'Basic Website', 'SEO Services'],
            ['Advanced Website', 'SEO Services'],
            ['Digital Marketing Services'],
            ['Custom Web Application Development']
        ];
        prices = [[30, 220, 80, 170], [300, 170], [400], [500]];
    } else if (amount > 500 && amount <= 1000) {
        options = [
            ['Domain Registration', '10 GB Hosting', 'Advanced Website', 'SEO Services', 'Digital Marketing'],
            ['E-commerce Website', 'SEO Services'],
            ['Custom Web Application', 'Digital Marketing'],
            ['Complete Branding Package']
        ];
        prices = [[50, 100, 200, 150, 499], [300, 200], [400, 300], [999]];
    } else {
        options = [
            ['Domain Registration', 'Unlimited Hosting', 'Advanced Website', 'SEO Services', 'Digital Marketing', 'Premium Support'],
            ['Full Web Development and Marketing Package'],
            ['Custom Software Development'],
            ['Long-term SEO and Digital Marketing Services']
        ];
        prices = [[50, 150, 300, 200, 400, 500], [1000], [1500], [2000]];
    }

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    if (amount < 30) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = options[0][0];
        resultContainer.appendChild(messageDiv);

        const backButton = document.createElement('button');
        backButton.textContent = 'Back to Website';
        backButton.addEventListener('click', function() {
            window.location.href = 'https://www.neelnetworks.com'; // Replace with your website URL
        });
        resultContainer.appendChild(backButton);
    } else {
        options.forEach((optionSet, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option-set';
            optionSet.forEach((service, serviceIndex) => {
                const serviceLabel = document.createElement('label');
                const serviceCheckbox = document.createElement('input');
                serviceCheckbox.type = 'checkbox';
                serviceCheckbox.value = service;
                serviceCheckbox.dataset.cost = prices[index][serviceIndex]; // Assign cost to each service
                serviceLabel.appendChild(serviceCheckbox);
                serviceLabel.appendChild(document.createTextNode(`${service} ($${prices[index][serviceIndex]})`));
                optionDiv.appendChild(serviceLabel);
            });
            resultContainer.appendChild(optionDiv);

            if (index < options.length - 1) {
                const orSeparator = document.createElement('div');
                orSeparator.className = 'or-separator';
                orSeparator.textContent = 'OR';
                resultContainer.appendChild(orSeparator);
            }
        });

            // Add event listener for checkboxes
            document.querySelectorAll('.option-set input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', updateSelectionSummary);
            });
        }
    }


function updateSelectionSummary() {
    const selectedServices = [];
    let totalCost = 0;

    document.querySelectorAll('.option-set input[type="checkbox"]:checked').forEach(checkbox => {
        selectedServices.push(checkbox.value);
        totalCost += parseInt(checkbox.dataset.cost);
    });

    const selectionSummary = document.getElementById('selectionSummary');
    selectionSummary.innerHTML = `
        <h2>Selected Services</h2>
        <ul>${selectedServices.map(service => `<li>${service}</li>`).join('')}</ul>
        <p><strong>Total Cost:</strong> ${totalCost} USD</p>
        <button id="continueBtn">Continue</button>
        <button id="resetBtn">Reset</button>
        <button id="goBack">Back To website</button>
    `;

    // Add event listener for continue button
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.addEventListener('click', function() {
        openModal();
    });

    // Add event listener for reset button
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', function() {
        resetSelection();
    });

    // Add event listener for back to website button
    const goBackBtn = document.getElementById('goBack');
    goBackBtn.addEventListener('click', function() {
        window.location.href = 'https://www.neelnetworks.com'; // Replace with your website URL
    });
}

function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Close modal when the close button (x) is clicked
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside the modal content
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Handle form submission
    const modalForm = document.getElementById('modalForm');
    modalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const submitbtn = document.getElementById('submitBtn');
        submitbtn.innerHTML = 'Submitting...';
       
        // You can handle form submission here (e.g., send data to server)
        // closeModal();
    });
}

// function closeModal() {
//     const modal = document.getElementById('modal');
//     // modal.style.display = 'none';
//     const submitbtn = document.getElementById('submitBtn');
//     submitbtn.innerHTML = 'Submit';

// }

function resetSelection() {
    // Clear selected checkboxes
    document.querySelectorAll('.option-set input[type="checkbox"]:checked').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset the selection summary and total cost
    const selectionSummary = document.getElementById('selectionSummary');
    selectionSummary.innerHTML = '';
}
