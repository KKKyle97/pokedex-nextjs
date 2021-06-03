import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import styles from "../../components/name.module.css";
import gStyles from "../../styles/Home.module.css";

export default function pokemon() {
  const router = useRouter();

  const [pokemon, setPokemon] = useState({});

  const handlePokemon = (pokemon) => {
    setPokemon({
      ...pokemon,
      image: `/images/${calculateNumber(pokemon.id)}.png`,
    });
  };

  const getPokemon = async (pokemonName) => {
    const response = await axios.get(
      `http://localhost:3000/api/pokemon?name=${pokemonName}`
    );

    handlePokemon(response.data);
  };

  const calculateNumber = (number) => {
    let convertedNumber = 0;
    if (number / 10 < 1) convertedNumber = `00${number}`;
    else if (number / 10 >= 10) convertedNumber = number;
    else convertedNumber = `0${number}`;

    return convertedNumber;
  };

  useEffect(() => {
    if (router.isReady) {
      getPokemon(router.query.name);
    }
  }, [router]);

  return (
    <div className="container">
      <Head>
        <title>{pokemon.name?.english}</title>
      </Head>
      {pokemon === {} ? (
        ""
      ) : (
        <Container>
          <Row className={`${styles.container} ${gStyles.container}`}>
            <Row>
              <Image
                src={pokemon.image ?? "/images/undefined.png"}
                width="300"
                height="300"
              ></Image>
              <Col>
                <p className={styles.name}>{pokemon.name?.english}</p>
                {pokemon.type && (
                  <div>
                    <Badge variant="primary">{pokemon.type[0]}</Badge>
                    {` `}
                    <Badge variant="danger">{pokemon.type[1]}</Badge>
                  </div>
                )}
                <div className={styles.dataContainer}>
                  {pokemon.base &&
                    Object.entries(pokemon.base).map(([key, value]) => (
                      <Row key={key}>
                        <Col>{key}:</Col>
                        <Col>{value}</Col>
                      </Row>
                    ))}
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      )}
    </div>
  );
}
