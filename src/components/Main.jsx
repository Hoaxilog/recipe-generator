import { Plus } from 'lucide-react'
import { useState } from 'react'
import Recipe from "./Recipe.jsx"
import Ingridient from "./IngridientList.jsx"
import {getRecipeFromMistral, getRecipeFromGemini} from '../ai.js'

export function Main() {
    
    const [ingredient, setIngredient] = useState([])
    const [recipeShown, setRecipeShown] = useState(false)
    const [recipe, setRecipe] = useState("")
    const [loading, setLoading] = useState(false)// <-- Add this

    async function getRecipe() {
        setLoading(true)
        let result = await getRecipeFromGemini(ingredient)
        setRecipe(result)
        setRecipeShown(true)
        setLoading(false) 

    }

    function toggleShow() {
        setRecipeShown(prev => !prev)
    }

    function handleSubmit(formData) {
        if (formData.get("ingredient") && formData.get("ingredient") != " ") {
            setIngredient(prev => {
                return [...prev, formData.get("ingredient")] 
            })
        }
    }

    return (
        <main className='px-10 py-20 flex justify-center '>
            <div className='space-y-10 max-w-3xl'>
                <form action={handleSubmit} className='max-md:flex-col flex justify-between gap-5 '>    
                    <input  
                        aria-label='Add ingredient' 
                        className='border-2 border-gray-400 w-96 rounded-lg px-7 py-3' 
                        type="text" placeholder="e.g oregano"
                        name="ingredient"
                    />

                    <button type='submit' className="cursor-pointer flex items-center gap-2 border-2 bg-black py-3 px-7 rounded-lg text-white"> 
                        <Plus size={15} />
                        Add ingredient 
                    </button>
                </form>
                    {ingredient.length > 0 && 
                        <Ingridient 
                            ingredient={ingredient}
                            toggleShow={toggleShow} 
                            getRecipe={getRecipe}
                            loading={loading}
                        />
                    }
                    {loading && (
                    <div className="flex justify-center items-center py-10">
                        <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black-600"></span>
                        <span className="ml-4 text-lg text-black font-semibold">Generating recipe...</span>
                    </div>
                    )}
                    {!loading && recipeShown && 
                        <Recipe recipe={recipe}/>
                    }
            </div>
        </main>
    )
}