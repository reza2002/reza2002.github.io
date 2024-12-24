const barcodeElement = document.getElementById('barcode');
const userInput = document.getElementById('user-input');
const chatHistory = document.getElementById('chat-history');

// آرایه لینک‌های توییتر (مثال)
const twitterPosts = [
    "https://twitter.com/elonmusk/status/1234567890", 
    "https://twitter.com/nasa/status/2345678901", 
    "https://twitter.com/cryptomoon/status/3456789012"
];

// به‌روزرسانی بارکد هر 5 ثانیه
function updateBarcode() {
    const randomIndex = Math.floor(Math.random() * twitterPosts.length);
    barcodeElement.style.backgroundImage = `url('https://api.qrserver.com/v1/create-qr-code/?data=${twitterPosts[randomIndex]}&size=250x250')`;
}

// تغییر بارکد هر 5 ثانیه
setInterval(updateBarcode, 5000);

// ارسال پیام با زدن Enter
userInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        const message = userInput.value;
        if (message) {
            // نمایش پیام کاربر
            chatHistory.innerHTML += `<div>User: ${message}</div>`;

            // دریافت پاسخ از چت‌بات
            const response = await getChatbotResponse(message);
            chatHistory.innerHTML += `<div>Bot: ${response}</div>`;
            userInput.value = ''; // پاک کردن فیلد ورودی
            chatHistory.scrollTop = chatHistory.scrollHeight; // اسکرول به پایین
        }
    }
});

// دریافت پاسخ چت‌بات از API OpenAI
async function getChatbotResponse(message) {
    const apiKey = 'your-openai-api-key'; // کلید API خودتون رو وارد کنید
    const url = 'https://api.openai.com/v1/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
    const body = JSON.stringify({
        model: 'text-davinci-003', // یا هر مدل دیگه‌ای که بخواهید
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

// به‌روزرسانی اولیه بارکد
updateBarcode();
