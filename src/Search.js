import React from 'react'
import { useGloblContext } from './context'

const Search = () => {
  const {query, setQuery, isError} = useGloblContext()
  return (
    <>
    <section className='search-section'>
    <h1>Search your movie</h1>
    <form action='#' onSubmit={(e)=>e.preventDefault()}>
    <input type='text' placeholder='search here' value={query} onChange={(e)=>
       setQuery(e.target.value)}>
    
    </input>
    </form>
    <div className='card-error'>
     <p>{isError.show && isError.msg}</p>
    </div>
        </section>
    
    </>
  )
}

export default Search