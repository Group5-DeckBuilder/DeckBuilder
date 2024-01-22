import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useParams } from 'react-router-dom';
import DeckBuilderDeck from '../components/DeckBuilderDeck';
import "../App.css";
import DeckComments from '../components/DeckComments';

function SingleDeck() {
	const {id} = useParams();
	const [deck, setDeck] = useState({})
	const [userDeck, setUserDeck] = useState([]);

	useEffect(()=> {
		const getDeck = async () => {
			try {
				const {data: foundDeck} = await axios.get(`/api/decks/${id}`)
				setDeck(foundDeck)
			} catch (err) {
				console.error(err);
			}
		}
		getDeck();
	}, [])

  //logged in users token and info
  const token = localStorage.getItem('token');
  let userId;
  let userName;

  if(token){
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
    userName = decodedToken.username;
  }
  
  // Fetches the cards of the selected deck and stores into userDeck
  const fetchDeckCards = (deckId) => {
    axios.get(`/api/deckcards/${deckId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserDeck(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
	fetchDeckCards(id);

	if (!deck.id) {
		return <div>Loading...</div>
	}

	return (
		<>
		<h1>PokeDeck</h1>
		<h1>{deck.name}</h1>
		<h3>Likes: {deck.Like.length}</h3>
		<DeckBuilderDeck 
        userDeck={userDeck} 
        token={token} 
        setUserDeck={setUserDeck} 
      />
			<DeckComments
				id={id} />
		</>
	)
}

export default SingleDeck