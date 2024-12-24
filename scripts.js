const barcodeElement = document.getElementById('barcode');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatHistory = document.getElementById('chat-history');

const twitterPosts = [
    "https://twitter.com/elonmusk/status/1234567890", 
    "https://twitter.com/nasa/status/2345678901", 
    "https://twitter.com/cryptomoon/status/3456789012"
];

// Function to update barcode every 5 seconds with a new tweet link
function updateBarcode() {
    const randomIndex = Math.floor(Math.random() * twitterPosts.length);
    barcodeElement.style.backgroundImage = `url('https://api.qrserver.com/v1/create-qr-code/?data=${twitterPosts[randomIndex]}&size=250x250')`;
}

// Set interval to change the barcode every 5 seconds
setInterval(updateBarcode, 5000);

// Send message to chatbot
sendBtn.addEventListener('click', async () => {
    const message = userInput.value;
    if (message) {
        // Display the user's message
        chatHistory.innerHTML += `<div>User: ${message}</div>`;

        // Get chatbot response
        const response = await getChatbotResponse(message);
        chatHistory.innerHTML += `<div>Bot: ${response}</div>`;
        userInput.value = ''; // Clear input field
        chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to bottom
    }
});

// Fetch chatbot response from OpenAI API
async function getChatbotResponse(message) {
    const apiKey = 'your-openai-api-key';
    const url = 'https://api.openai.com/v1/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
    const body = JSON.stringify({
        model: 'text-davinci-003', // or any other OpenAI model you prefer
        prompt: message,
        max_tokens: 150,
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });
        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        return "Sorry, something went wrong!";
    }
}

// Initial call to update barcode
updateBarcode();
