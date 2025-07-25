
import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import "./index.css";

export const Pokemonn =()=>{
const [pokemon,setPokemon]= useState([]);

const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

const fetchPokemon = async()=>{
    try {
        const res =  await fetch(API);
        const data = await res.json();

        const detailedPokemonData = data.results.map(async(curPokemon) =>{
            const res = await fetch(curPokemon.url);
            const data = await res.json();
            return data;
        });
        const detailedResponse = await Promise.all(detailedPokemonData);
        setPokemon(detailedResponse);

    } catch (error) {
        console.log(error)
    }
 };

 useEffect(()=>{
    fetchPokemon();
 },[]);

return (
  <>
    <section className="container">
      <header>
        <h1>Lets Get Pokemon</h1>
      </header>
      <div>
        <ul className="cards">
          {pokemon.map((curPokemon) => {
            return (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            );
          })}
        </ul>
      </div>
    </section>
  </>
);

}