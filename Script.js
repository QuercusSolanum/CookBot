// Recipe database mapping 58 recipe names to their required ingredients
const cookbook = {
    "Pasta Salad": ["pasta", "tomato", "olive oil"],
    "Omelette": ["eggs", "cheese", "milk", "butter"],
    "Chicken and Rice": ["chicken", "rice", "vegetables"],
    "Garlic Bread": ["bread", "butter", "garlic"],
    "Greek Salad": ["cucumber", "tomato", "olive oil", "feta"],
    "Grilled Cheese": ["bread", "cheese", "butter"],
    "Scrambled Eggs": ["eggs", "milk", "butter"],
    "Rice Bowl": ["rice", "vegetables", "soy sauce"],
    "Yogurt Bowl": ["yogurt", "blueberries", "honey"],
    "Avocado Toast": ["bread", "avocado", "salt", "pepper"],
    "Caesar Salad": ["romaine lettuce", "parmesan", "croutons", "caesar dressing"],
    "Spaghetti Bolognese": ["spaghetti", "ground beef", "tomato sauce"],
    "Tuna Sandwich": ["bread", "tuna", "mayonnaise"],
    "Quinoa Salad": ["quinoa", "cucumber", "tomato", "feta", "olive oil"],
    "Fish Tacos": ["tortillas", "fish", "cabbage", "lime", "sour cream"],
    "Beef Stir-Fry": ["beef", "vegetables", "soy sauce", "ginger"],
    "Pancakes": ["flour", "eggs", "milk", "syrup"],
    "Chicken Caesar Wrap": ["tortilla", "chicken", "lettuce", "caesar dressing"],
    "Stuffed Peppers": ["bell peppers", "rice", "ground beef", "tomato sauce"],
    "Vegetable Soup": ["carrots", "celery", "onion", "broth", "potatoes"],
    "Mac and Cheese": ["macaroni", "cheese", "milk", "butter"],
    "Shrimp Scampi": ["shrimp", "garlic", "butter", "lemon", "pasta"],
    "French Toast": ["bread", "eggs", "milk", "syrup"],
    "BBQ Chicken": ["chicken", "bbq sauce", "corn"],
    "Fruit Salad": ["apple", "orange", "grapes", "banana"],
    "Egg Salad": ["eggs", "mayonnaise", "mustard"],
    "Turkey Sandwich": ["bread", "turkey", "lettuce", "tomato"],
    "Beef Tacos": ["ground beef", "taco shells", "lettuce", "cheese"],
    "Vegetable Stir-Fry": ["vegetables", "soy sauce", "garlic", "ginger"],
    "Lentil Soup": ["lentils", "carrots", "celery", "onion", "broth"],
    "Chicken Curry": ["chicken", "curry powder", "coconut milk", "rice"],
    "Falafel Wrap": ["falafel", "tortilla", "lettuce", "hummus"],
    "Eggplant Parmesan": ["eggplant", "tomato sauce", "cheese"],
    "Beef Burrito": ["tortilla", "ground beef", "beans", "cheese", "sour cream"],
    "Mango Smoothie": ["mango", "yogurt", "honey"],
    "Steak Fajitas": ["steak", "bell peppers", "onions", "tortillas"],
    "Vegetable Quiche": ["eggs", "milk", "vegetables", "cheese"],
    "Chili": ["ground beef", "beans", "tomato", "chili powder"],
    "Caprese Salad": ["tomato", "mozzarella", "basil", "olive oil"],
    "Chicken Alfredo": ["chicken", "pasta", "alfredo sauce"],
    "Pumpkin Soup": ["pumpkin", "cream", "onion", "broth"],
    "Veggie Burger": ["vegetable patty", "bread", "lettuce", "tomato"],
    "Couscous Salad": ["couscous", "cucumber", "tomato", "feta"],
    "Spinach Dip": ["spinach", "cream cheese", "sour cream"],
    "Sushi Rolls": ["rice", "nori", "fish", "vegetables"],
    "Potato Salad": ["potatoes", "mayonnaise", "mustard", "celery"],
    "Fried Rice": ["rice", "eggs", "soy sauce", "vegetables"],
    "Greek Yogurt Parfait": ["greek yogurt", "granola", "berries", "honey"],
    "Shakshuka": ["eggs", "tomato", "onion", "peppers"],
    "Tuna Salad": ["tuna", "mayonnaise", "celery", "onion"],
    "Chicken Quesadilla": ["tortilla", "chicken", "cheese", "sour cream"],
    "Tomato Soup": ["tomatoes", "broth", "cream", "garlic"],
    "Lamb Gyro": ["pita", "lamb", "tzatziki", "lettuce", "tomato"],
    "Ratatouille": ["zucchini", "eggplant", "tomato", "bell peppers"],
    "Fettuccine Alfredo": ["fettuccine", "alfredo sauce", "parmesan"],
    "BLT Sandwich": ["bread", "bacon", "lettuce", "tomato", "mayonnaise"],
    "Chicken Noodle Soup": ["chicken", "noodles", "carrots", "celery", "broth"],
    "Vegetable Tacos": ["taco shells", "vegetables", "avocado", "sour cream"]
};

/**
 * Handles the send message button click event
 * Displays user message in chat window
 */

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user-message");
    userMessage.innerHTML = `<p>${userInput}</p>`;
    document.getElementById("chat-window").appendChild(userMessage);

    // Clear user input and scroll to the bottom
    document.getElementById("user-input").value = "";
    document.getElementById("chat-window").scrollTop = document.getElementById("chat-window").scrollHeight;

    // Have a delayed bot response to simulate thinking
    setTimeout(() => botResponse(userInput), 500);
}

/**
 * Displays bot's response message
 * @param {string} userInput user's original input
 */
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

/**
 * Extracts out ingredients from user input by cleaning up the text
 * @param {string} userInput raw user input text
 * @returns {string[]} array of identified ingredient names
 */
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

/**
 * Finds recipes that match the given ingredients with specified match count
 * if only one ingredient was mentioned, it must give back a recipe with the ingredient or null
 * if 2+ ingredients were mentioned, partially matching recipes are allowed
 * @param {string[]} ingredients array of ingredients mentioned in user's input
 * @param {number} targetCount minimum number of matching ingredients required
 * @returns {Object|null} object containing matched recipe answer or null if no match
 */
function findRecipesByIngredientCount(ingredients, targetCount) {
    for (const [recipe, recipeIngredients] of Object.entries(cookbook)) {
        const normalizedRecipeIngredients = recipeIngredients.map(ing => ing.toLowerCase());
        let matchCount = 0;
        const unmatchedIngredients = new Set(normalizedRecipeIngredients);
        
        for (const userIngredient of ingredients) {
            // Split user ingredient by spaces to handle multiple words
            const userIngredientWords = userIngredient.trim().split(/\s+/);
            
            for (const recipeIng of normalizedRecipeIngredients) {
                // Check if any word in user ingredient matches the recipe ingredient
                if (userIngredientWords.some(word => 
                    word === recipeIng || // Exact match
                    recipeIng.includes(word) && word.length > 2 // If more 2+ ingredients were mentioned, partial match is valid
                )) {
                    matchCount++;
                    unmatchedIngredients.delete(recipeIng);
                    break;
                }
            }
        }
        
        if (matchCount >= targetCount) {
            return {
                recipe,
                additionalIngredients: Array.from(unmatchedIngredients)
            };
        }
    }
    return null;
}

/**
 * Generates a response based on user input and available recipes
 * @param {string} userInput raw user input
 * @returns {string} response message with recipe match and additional ingredients needed (if applicable)
 */
function getResponse(userInput) {
    const ingredients = extractIngredients(userInput);
    
    if (ingredients.length === 0) {
        return "I couldn't find any ingredients in your message. Please specify ingredients for me to check.";
    }
    
    // Try decreasing numbers of required matches until a recipe is found
    for (let targetMatches = ingredients.length; targetMatches > 0; targetMatches--) {
        const result = findRecipesByIngredientCount(ingredients, targetMatches);
        
        if (result) {
            const { recipe, additionalIngredients } = result;

            if (additionalIngredients.length === 0) {
                return `Perfect! You can make ${recipe} using those ingredients.`;
            } else {
                return `You might be able to make ${recipe}, but you'll need additional ingredients: ${additionalIngredients.join(', ')}.`;
            }
        }
    }
    
    return "Sorry, I couldn't find any recipes with those ingredients.";
}

// Allows sending messages by pressing enter key
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});