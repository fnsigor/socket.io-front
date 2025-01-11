'use server'

interface Pokemon {
  name: string;
  url: string;
}



export const getPokemons = async (limit: number, offset: number) => {
  try {

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json() as {
      count: number;
      results: Pokemon[];
    };


    return data



  } catch (error) {
    console.log('getPokemons error', error)

    return {
      error,
      count: 0,
      results: []
    }
  }
}