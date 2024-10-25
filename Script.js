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
            const recipeIngredients = cookbook[recipe]; // Get ingredients for the found recipe
            const additionalIngredients = recipeIngredients.filter(ing => 
                !ingredients.includes(ing.toLowerCase())
            );

            if (additionalIngredients.length === 0) {
                return `Perfect! You can make ${recipe} using those ingredients.`;
            } else {
                return `You might be able to make ${recipe}, but you'll need additional ingredients: ${additionalIngredients.join(', ')}.`;
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