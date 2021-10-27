import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaWeightHanging, FaSearch } from 'react-icons/fa';
import { GiBodyHeight } from 'react-icons/gi';
import logo from '../../assets/pokemon-logo.png'

const Pokemon = () => {

    const [pokemon, setPokemon] = useState('')
    const [pokeData, setPokeData] = useState(null)
    const [err, setErr] = useState('')

    const baseUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/`;
    
    function handleClick(){
        if(pokemon){
            axios.get(baseUrl)
            .then((response) => {
                setPokeData(response.data)
                setErr('')
            })
            .catch((error) => {
                setErr(error.response.data)
                setPokemon('')
            })
        }
    }

    function handleChange(event){
        setPokemon(event.target.value)
    }

    return(
        <>
        <Container>
            <Logo src={logo} alt="polkemon logo" />
        <Form>
            <input type="text" onChange={handleChange} placeholder="Type here pokemon name" />
            <button onClick={handleClick}><FaSearch /> Search</button>
        </Form>

        {(err) ? (
            <Alert>{err}</Alert>
        ) : '' }
        
        
        { (pokemon !== '' && pokeData?.name !== undefined) ? (
            <Poke>
                <Card>
                    <img src={pokeData?.sprites.front_default} alt={pokeData?.name} />
                    <h2 id="pokeName">
                        {`#${pokeData?.id} `}
                        {`${pokeData?.name.charAt(0).toUpperCase()}${pokeData?.name.slice(1)}`}
                    </h2>
                    <p id="pokeType" className={pokeData?.types[0].type.name} >{pokeData?.types[0].type.name}</p>
                    <h2 className="pokeMoveTitle">Moves</h2>
                    <p className="pokeMove">{pokeData?.moves[0].move.name}</p>
                    <p className="pokeMove">{pokeData?.moves[1].move.name}</p>
                    <p className="pokeMove">{pokeData?.moves[2].move.name}</p>
                    <p className="pokeMove">{pokeData?.moves[3].move.name}</p>
                    <div className="pokeInfo">
                        <span><GiBodyHeight /> {pokeData?.height}cm</span>
                        <span><FaWeightHanging /> {pokeData?.weight}Kg</span>
                    </div>                   
                </Card>
            </Poke>
        ) : '' }
        </Container>
        </>
    )
}

const Container = styled.div`
    margin: 0 auto;
    max-width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Logo = styled.img`
    width: 50%;
    margin: 15px auto;
`;

const Form = styled.div`
    background: #fff;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
    border-radius: 7px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    input {
        padding: 12px;
        border: 1px solid #c5c5c5;
        border-radius: 5px;
        width: 70%;
        color: #424242;

        &:focus {
            outline: none;
        }

        &::placeholder {
            filter: brightness(1.5);
        }
    }

    button {
        border: 0;
        padding: 12px;
        border-radius: 5px;
        width: 20%;
        background: #f14668;
        color: #fff;
        cursor: pointer;

        &:hover {
            filter: brightness(0.95);
        }
    }
`;

const Alert = styled.span`
    background: tomato;
    padding: 7px 14px;
    text-align: center;
    border-radius: 5px;
    margin: 15px 0;
    font-weight: bold;
    color: #fff;
    border: 1px solid pink;
`;

const Poke = styled.section`
    padding: 7px;
    /* background: #fafafa; */
    font-weight: bold;
    margin: 35px auto;
`;

const Card = styled.div`
    width: 320px;
    height: 420px;
    padding: 15px;
    border-radius: 15px;
    background: #f3f0f0;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);

    display: flex;
    flex-direction: column;
    align-items: center;

    #pokeName {
        padding: 5px;
        border-radius: 7px;
        text-align: center;
        font-size: 32px;
    }

    #pokeType {
        text-transform: uppercase;
        font-size: 14px;
        margin: 7px 0;
        padding: 5px 7px;
        border-radius: 10px;
    }

    .pokeMoveTitle {
        font-size: 24px;
        margin: 20px 0 5px;
    }

    .pokeMove {
        line-height: 22px;
        text-transform: uppercase;
        font-size: 16px;
    }

    .normal { background: brown; color: #f3f0f0;}
    .grass { background: green; color: #f3f0f0;}
    .electric { background: yellow; }
    .psychic { background: navy; color: #f3f0f0;}
    .water { background: cyan; }
    .ghost { background: purple; color: #f3f0f0;}
    .poison { background: pink; }
    .fairy { background: salmon; }
    .bug { background: #77ec77; }
    .ground { background: #420404; color: #f3f0f0; }
    .fire { background: tomato; }
    .fighting { background: gray; }
    .rock { background: #4b4a4a; color: #f3f0f0; }

    .pokeInfo {
        margin-top: 30px;
        display: flex;
        align-items: center;

        span {
            margin: 5px;
        }
    }

`;

export default Pokemon;