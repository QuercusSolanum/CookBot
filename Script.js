function sendMessage() {
    // Get the user input
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return; // Don't allow empty messages

    // Create a new user message element
    var userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user-message");
    userMessage.innerHTML = `<p>${userInput}</p>`;

    // Append the user message to the chat window
    document.getElementById("chat-window").appendChild(userMessage);

    // Clear the input box after sending the message
    document.getElementById("user-input").value = "";

    // Scroll to the bottom of the chat window
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;

    // Simulate chatbot response after a short delay
    setTimeout(function () {
        botResponse(userInput);
    }, 500);
}

function botResponse(userInput) {
    // Chatbot logic - respond based on user input
    let response = "I'm just a simple bot, but I will learn!";
    
    // Create a new bot message element
    var botMessage = document.createElement("div");
    botMessage.classList.add("chat-message", "bot-message");
    botMessage.innerHTML = `
        <img src="bot-image.png" alt="Bot" class="bot-image">
        <p>${response}</p>
    `;

    // Append the bot message to the chat window
    document.getElementById("chat-window").appendChild(botMessage);

    // Scroll to the bottom of the chat window
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
}
