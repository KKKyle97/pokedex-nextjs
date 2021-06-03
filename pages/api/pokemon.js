import allPokemon from "../../pokedex.json";

export default (req, res) => {
  if (!req.query.name) {
    res.statusCode = 400;
    res.end("Must have a Name");
  } else {
    if (req.query.name) {
      const pokemon = allPokemon.filter(({ name: { english } }) =>
        english.match(req.query.name)
      );
      if (pokemon.length === 0) {
        res.statusCode = 404;
        res.end("Pokemon not found");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(pokemon[0]));
      }
    }
  }
};
