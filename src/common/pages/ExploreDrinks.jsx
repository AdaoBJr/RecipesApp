import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { fetchAPI, SUPRISE_ME_DRINKS } from '../../services/index';
import store, { addRecDetails, setFetchOnDone } from '../../context/store';
import Footer from '../components/Footer';

export default function ExploreMeals() {
  const history = useHistory();
  const { setRecipes } = useContext(store);
  async function handleClic() {
    setRecipes(setFetchOnDone(true));
    const drinksDetails = await fetchAPI(SUPRISE_ME_DRINKS);
    setRecipes(addRecDetails(drinksDetails.drinks[0]));
    history.push(`/bebidas/${drinksDetails.drinks[0].idDrink}`);
  }
  return (
    <div>
      <Header pageName="Explorar Bebidas" />
      <div className="explorerDrinksContent">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => handleClic() }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}
