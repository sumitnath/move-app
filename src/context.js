import React, { useContext, useEffect, useState } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState()
    const [isError, setError] = useState({ show: false, msg: '' })
    const [query, setQuery] = useState("titanic")
    const getMovies = async(url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === "True") {
                setIsLoading(false);
                setMovie(data.Search);
                setError({ show: false, msg: '' })
                console.log(data)
            } else {
                setError({ show: true, msg: data.Error })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let timeOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`)
        }, 800)
        return (() => clearTimeout(timeOut))
    }, [query])

    return <AppContext.Provider value = {
            { movie, isLoading, isError, query, setQuery }
        } > { children } <
        /AppContext.Provider>
}

// CREATING CUSTOM HOOKS
const useGloblContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider, useGloblContext }