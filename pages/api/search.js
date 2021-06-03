import pokemon from "../../pokedex.json";

const Search = (req, res) => {
  let result = [];
  if (!req.query.type) {
    result = pokemon.filter((pokemon) =>
      pokemon.name.english.toLowerCase().includes(req.query.name)
    );
  } else {
    result = pokemon.filter(
      (pokemon) =>
        pokemon.name.english.toLowerCase().includes(req.query.name) &&
        pokemon.type.includes(req.query.type)
    );
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (result.length === 0) res.end(JSON.stringify(pokemon));
  else res.end(JSON.stringify(result));
};

export default Search;
