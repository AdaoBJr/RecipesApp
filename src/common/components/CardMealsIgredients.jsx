import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import store, { addRecipes, setDoneLoading, setFetchOnDone } from '../../context/store';
import { fetchAPI, EXPLORER_ING_MEALS, INGREDIENT_MEALS } from '../../services';

export default function CardMealsIgredients() {
  const history = useHistory();
  const { recipes, setRecipes } = useContext(store);
  const [dataCadsIgredientMeals, setDataCadsIgredientMeals] = useState([]);

  useEffect(() => {
    fetchAPI(EXPLORER_ING_MEALS)
      .then((response) => setDataCadsIgredientMeals(response.meals));
  }, []);

  const getIngredients = async (id) => {
    const { drinks, categoriesMeals, categoriesDrinks } = recipes;
    const LOADING_TIME = 2500;
    const DONE_TIME = 1500;
    const Meals = await fetchAPI(`${INGREDIENT_MEALS}${id}`);
    setRecipes(setFetchOnDone(false));
    setTimeout(() => {
      setRecipes(
        addRecipes(Meals.meals, drinks, categoriesMeals, categoriesDrinks),
      );
      setRecipes(setDoneLoading(undefined, true));
      setTimeout(() => {
        setRecipes(setDoneLoading(true));
      }, DONE_TIME);
    }, LOADING_TIME);
    history.push('/comidas');
    setRecipes(setFetchOnDone(false, undefined));
  };

  const handleClick = ({ target: { id } }) => {
    getIngredients(id);
  };

  return (
    dataCadsIgredientMeals
      ? (
        <div>
          {dataCadsIgredientMeals.slice(0, '12')
            .map(({ idIngredient, strIngredient }, index) => (
              <button
                type="button"
                data-testid={ `${index}-ingredient-card` }
                id={ strIngredient }
                key={ idIngredient }
                className="recipe"
                onClick={ handleClick }
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt={ strIngredient }
                  data-testid={ `${index}-card-img` }
                  id={ strIngredient }
                  className="recipeImg"
                />
                <h4
                  data-testid={ `${index}-card-name` }
                  id={ strIngredient }
                  className="recipeTitle"
                >
                  {strIngredient}
                </h4>
              </button>
            ))}
        </div>) : <h5>Loading...</h5>
  );
}
