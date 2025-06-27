import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format the response as HTML using Tailwind CSS classes:

At the very top of the recipe card, add a small badge or tag (for example, "AI Recipe" or "Suggested Recipe") using a <span> with Tailwind classes like inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full mb-6>.

Wrap the entire recipe in a <div> with p-10 rounded-lg shadow bg-white space-y-8>.
Add an <h2> with the recipe name, using text-3xl font-bold mb-4>.
Add a short description below the title using text-gray-600 mb-8>.
Use a flex layout:
<div class="flex flex-col md:flex-row gap-12">
On the left, show a section titled "Ingredients" (text-lg font-semibold mb-4), then a <ul> with list-disc list-inside text-green-700 text-lg space-y-4 md:w-full w-[20%]>. Each <li> inside should use text-green-700, text-xl, and mb-2 for a larger, green look and extra spacing.
On the right, show a section titled "Instructions" (text-lg font-semibold mb-4), then an <ol> with list-decimal list-inside text-blue-700 text-lg space-y-3 w-full w-[75%]>. Each <li> inside should use text-blue-700 and text-xl for a larger, blue look.
Both columns should stack vertically on mobile and be side-by-side on medium screens and up.
Add extra margin and padding so the content does not look crowded. Use mb-4, mb-6, mb-8, gap-12, and space-y-8 where appropriate.
Output only the full HTML. Do not include any JSX, JavaScript, or import statements.
`

const hf = new HfInference(import.meta.env.VITE_RECIPE_API_KEY)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
        return `Sorry my website already generate 20 recipe already Please try again later thank you:` 
    }
}

export async function getRecipeFromGemini(ingredientsArr) {
    const apiKey = import.meta.env.VITE_RECIPE_GEMINI_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // Combine SYSTEM_PROMPT and user prompt, and clarify output
    const prompt = `${SYSTEM_PROMPT}
    User ingredients: ${ingredientsArr.join(", ")}.
    Only output the recipe as HTML. Do not include any explanations, suggestions, or extra commentary. Do not wrap the output in triple backticks or add any language tags.`;

    const body = {
        contents: [
            {
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        console.log("Gemini API response:", data);

        if (data.error) {
            console.error("Gemini API error:", data.error);
            return `Error: ${data.error.message || "Unknown error from Gemini API."}`;
        }

        let html = data.candidates?.[0]?.content?.parts?.[0]?.text || "No recipe generated.";

        // Remove triple backticks and optional 'html' after them (beginning and end)
        html = html.trim()
            .replace(/^```html\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/```$/i, '')
            .trim();

        return html;
        
    } catch (err) {
        console.error("Fetch error:", err.message);
        return "Sorry, there was an error generating your recipe.";
    }
}
