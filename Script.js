const cookbook = {
    "Pasta Salad": ["pasta", "tomato", "olive oil"],
    "Omelette": ["eggs", "cheese", "milk", "butter"],
    "Chicken and Rice": ["chicken", "rice", "vegetables"],
    "Garlic Bread": ["bread", "butter", "garlic"],
    "Greek Salad": ["cucumber", "tomato", "olive oil", "feta"],
    "Grilled Cheese": ["bread", "cheese", "butter"],
    "Scrambled Eggs": ["eggs", "milk", "butter"],
    "Rice Bowl": ["rice", "vegetables", "soy sauce"],
    "Yogurt Bowl": ["yogurt", "blueberries", "honey"]
};

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user-message");
    userMessage.innerHTML = `<p>${userInput}</p>`;
    document.getElementById("chat-window").appendChild(userMessage);

    document.getElementById("user-input").value = "";
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;

    setTimeout(() => botResponse(userInput), 500);
}

function botResponse(userInput) {
    const response = getResponse(userInput);
    
    const botMessage = document.createElement("div");
    botMessage.classList.add("chat-message", "bot-message");
    botMessage.innerHTML = `
        <img src="bot-image.png" alt="Bot" class="bot-image">
        <p>${response}</p>
    `;

    document.getElementById("chat-window").appendChild(botMessage);
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;
}

function extractIngredients(userInput) {
    // Convert input to lowercase
    let processedInput = userInput.toLowerCase();
    
    // Remove punctuation at the end
    processedInput = processedInput.replace(/[.!?]+$/, '');
    
    // Remove common phrases
    const phrasesToRemove = [
        "what can i make with",
        "i want a recipe using",
        "i want a recipe with",
        "can i make something with",
        "what can i cook with",
        "i have",
        "recipe for",
        "recipe using",
        "recipe with",
        "using",
        "with"
    ];
    
    for (const phrase of phrasesToRemove) {
        processedInput = processedInput.replace(phrase, "");
    }
    
    // Replace ", and " with just ","
    processedInput = processedInput.replace(/, and /g, ',');
    processedInput = processedInput.replace(/ and /g, ',');
    
    // Split by commas and clean up
    const ingredients = processedInput
        .split(',')
        .map(ingredient => ingredient.trim())
        .filter(ingredient => ingredient.length > 0);
    
    console.log("Extracted ingredients:", ingredients);
    return ingredients;
}

function findRecipesByIngredientCount(ingredients, targetCount) {
    for (const [recipe, recipeIngredients] of Object.entries(cookbook)) {
        const normalizedRecipeIngredients = recipeIngredients.map(ing => ing.toLowerCase());
        let matchCount = 0;
        
        for (const userIngredient of ingredients) {
            if (normalizedRecipeIngredients.some(recipeIng => 
                userIngredient.includes(recipeIng) || recipeIng.includes(userIngredient))) {
                matchCount++;
            }
        }
        
        if (matchCount >= targetCount) {
            return recipe; // Return the first matching recipe
        }
    }
    return null;
}

function getResponse(userInput) {
    const ingredients = extractIngredients(userInput);
    
    if (ingredients.length === 0) {
        return "I couldn't find any ingredients in your message. Please specify ingredients for me to check.";
    }
    
    // Try to find recipes with decreasing number of ingredient matches
    for (let targetMatches = ingredients.length; targetMatches > 0; targetMatches--) {
        const recipe = findRecipesByIngredientCount(ingredients, targetMatches);
        if (recipe) {
            if (targetMatches === ingredients.length) {
                return `Perfect! You can make ${recipe} using those ingredients.`;
            } else {
                return `I found a recipe that uses ${targetMatches} of your ingredients: ${recipe}`;
            }
        }
    }
    
    return "Sorry, I couldn't find any recipes with those ingredients.";
}

// Add enter key support
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});