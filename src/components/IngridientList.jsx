export default function Ingredient(props) {
    
    let renderIngredient = props.ingredient.map((element, index) => {
        return <li key={index} className='list-disc'> {element} </li>
    })

    return (
        <section className='space-y-5'>
            <h2 className='text-3xl font-semibold self-start'> Ingredients on hand: </h2>
            <ul className='pl-10 text-lg text-gray-600 space-y-2'>
                {renderIngredient}
            </ul>
            {!props.loading && props.ingredient.length > 2 && 
                <div ref={props.ref} className='bg-[#f0efeb] flex items-center justify-between p-5 rounded-xl'>
                    <div className='space-y-3'>
                        <h3 className='text-xl font-semibold'> Ready for recipe? </h3>
                        <p className='text-gray-500'> Generate a recipe from your list of ingredients. </p>
                    </div>
                    <button onClick={props.getRecipe} className='bg-[#d17557] text-white px-10 py-2 rounded-md cursor-pointer'> Get recipe</button>
                </div>
            }
        </section>
    )
}