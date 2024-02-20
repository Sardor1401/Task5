const regions = {
    uzbekistan: { language: 'Uzbek', phoneCodes: ['+998'], zipCodes: ['100000'] },
    belarus: { language: 'Belarusian', phoneCodes: ['+375'], zipCodes: ['220000'] },
    russia: { language: 'Russian', phoneCodes: ['+7'], zipCodes: ['101000'] }
};

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomName(region) {
    // Implement your logic for generating random names based on the region
    // For simplicity, returning a placeholder name
    return ['Sardor','Pavel','Ivan'];
}

function generateRandomAddress(region) {
    // Implement your logic for generating random addresses based on the region
    // For simplicity, returning a placeholder address
    return 'Tashkent','Moskva','Minsk';
}

function generateRandomPhone(region) {
    const phoneCode = regions[region].phoneCodes[0];
    // Implement your logic for generating random phone numbers based on the region
    // For simplicity, returning a placeholder phone number
    return `${phoneCode} 901-999-1401`;
}

function generateUserData(region, errorCount) {
    const userData = [];
    for (let i = 1; i <= 20; i++) {
        const name = generateRandomName(region);
        const address = generateRandomAddress(region);
        const phone = generateRandomPhone(region);

        // Simulate errors
        for (let j = 0; j < errorCount; j++) {
            const randomIndex = Math.floor(Math.random() * 3); // 3 fields to introduce errors
            if (randomIndex === 0) name += generateRandomString(5); // Error in Name
            else if (randomIndex === 1) address += generateRandomString(5); // Error in Address
            else phone += generateRandomString(5); // Error in Phone
        }

        userData.push({
            index: i,
            randomIdentifier: generateRandomString(8),
            name,
            address,
            phone
        });
    }
    return userData;
}

function updateErrorCount() {
    const sliderValue = document.getElementById('error-slider').value;
    document.getElementById('error-count').value = sliderValue;
    generateData();
}

function updateErrorSlider() {
    const inputFieldValue = document.getElementById('error-count').value;
    document.getElementById('error-slider').value = inputFieldValue;
    generateData();
}

function generateSeed() {
    const seed = generateRandomString(10);
    document.getElementById('seed').value = seed;
    generateData();
}

function generateData() {
    const region = document.getElementById('region').value;
    const errorCount = parseInt(document.getElementById('error-slider').value, 10);
    const userData = generateUserData(region, errorCount);

    const tbody = document.getElementById('user-table-body');
    tbody.innerHTML = '';

    userData.forEach(user => {
        const row = document.createElement('tr');
        Object.values(user).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

// Infinite scrolling logic
const userTableBody = document.getElementById('user-table-body');
userTableBody.addEventListener('scroll', function () {
    if (userTableBody.scrollHeight - userTableBody.scrollTop === userTableBody.clientHeight) {
        // User has scrolled to the bottom
        const region = document.getElementById('region').value;
        const errorCount = parseInt(document.getElementById('error-slider').value, 10);
        const userData = generateUserData(region, errorCount);

        userData.forEach(user => {
            const row = document.createElement('tr');
            Object.values(user).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            userTableBody.appendChild(row);
        });
    }
});

generateData();  // Initial data generation on page load
