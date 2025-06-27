// import './recipe.css'
import React from 'react'
import ReactMarkdown from 'react-markdown'
export default function ClaudeRecipe(props) {
    console.log(props.recipe)
    return (
        // <section className='suggested-recipe-container space-y-5 text-[#475467] text-[1.125rem] font-[400]'>
        <section>
            {/* <h2 className='text-3xl text-black'>Mistral AI Recommends: </h2> */}
            <div dangerouslySetInnerHTML={{ __html: props.recipe }} />
            {/* <ReactMarkdown 
            components={{
                ul: ({node, ...props}) => <ul {...props} className="list-disc pl-6 my-2" />,
                ol: ({node, ...props}) => <ol {...props} className="list-decimal pl-6 my-2" />,
                li: ({node, ...props}) => <li {...props} className="mb-1" />,
            }}
            children={props.recipe}
            />   */}
        </section>
    )
}