import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import store, { addRecipes, setDoneLoading, setFetchOnDone } from '../../context/store';
import {
  fetchAPI,
  EXPLORER_ING_DRINKS,
  IMG_INGR_DRINKS, INGREDIENT_DRINKS } from '../../services';

export default function CardDrinksIgredients() {
  const history = useHistory();
  const { recipes, setRecipes } = useContext(store);
  const [DataCadsIgredientDrinks, setDataCadsIgredientDrinks] = useState([]);

  useEffect(() => {
    fetchAPI(EXPLORER_ING_DRINKS)
      .then((response) => setDataCadsIgredientDrinks(response.drinks));
  }, []);

  const getIngredients = async (id) => {
    const { meals, categoriesMeals, categoriesDrinks } = recipes;
    const LOADING_TIME = 2500;
    const DONE_TIME = 1500;
    const Drinks = await fetchAPI(`${INGREDIENT_DRINKS}${id}`);
    setRecipes(setFetchOnDone(false));
    setTimeout(() => {
      setRecipes(
        addRecipes(meals, Drinks.drinks, categoriesMeals, categoriesDrinks),
      );
      setRecipes(setDoneLoading(undefined, true));
      setTimeout(() => {
        setRecipes(setDoneLoading(true));
      }, DONE_TIME);
    }, LOADING_TIME);
    history.push('/bebidas');
    setRecipes(setFetchOnDone(false, undefined));
  };

  const handleClick = ({ target: { id } }) => {
    getIngredients(id);
  };

  return (
    DataCadsIgredientDrinks
      ? (
        <div>
          {DataCadsIgredientDrinks.slice(0, '12').map(({ strIngredient1 }, index) => (
            <button
              type="button"
              data-testid={ `${index}-ingredient-card` }
              key={ strIngredient1 }
              id={ strIngredient1 }
              className="recipe"
              onClick={ handleClick }
            >
              <img
                src={ `${IMG_INGR_DRINKS}${strIngredient1}-Small.png` }
                alt={ strIngredient1 }
                id={ strIngredient1 }
                data-testid={ `${index}-card-img` }
                className="recipeImg"
              />
              <h4
                data-testid={ `${index}-card-name` }
                id={ strIngredient1 }
                className="recipeTitle"
              >
                {strIngredient1}
              </h4>
            </button>
          ))}
        </div>) : <h5>Loading...</h5>
  );
}
