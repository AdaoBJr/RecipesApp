import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

import store, { setFetchOnDone } from '../../context/store';
import { getStorage, setStorage } from '../../functions';
import RecipeIngredients from './RecipeIngredients';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';
import RecommendedRecipes from './RecommendedRecipes';
import RenderButtonHome from './RenderButtonHome';

export default function RenderDetails({ btnFinish, id }) {
  const [inProgress] = useState(() => getStorage('inProgressRecipes'));
  const { recipes: { foods, recipeDetail }, setRecipes } = useContext(store);

  const setRecipeInLS = () => {
    setRecipes(setFetchOnDone(true));
    const inProgressInLS = getStorage('inProgressRecipes');

    const checkinProgress = inProgressInLS[id];

    if (!checkinProgress) {
      setStorage('inProgressRecipes', { ...inProgress,
        [recipeDetail.idMeal || recipeDetail.idDrink]: [] });
    }
  };

  const renderRecipe = () => (
    <div data-aos="fade-up" className="recipeDetails">
      {/* -------------------------------------------------------------------------- */}
      <div className="box topDetails">
        <div className="titleDetails">
          <RenderButtonHome />
          <div className="titleCategory">
            <h1 data-testid="recipe-title">
              { recipeDetail.strMeal || recipeDetail.strDrink }
            </h1>
            <h5 data-testid="recipe-category">
              Categoria:
              { (foods) ? recipeDetail.strCategory : (
                recipeDetail.strAlcoholic
              ) }
            </h5>
          </div>
          <div className="ingredients">
            <h3>Ingredientes</h3>
            <RecipeIngredients Details />
          </div>
        </div>
        <div className="imageButtons">
          <img
            data-testid="recipe-photo"
            src={ recipeDetail.strMealThumb || recipeDetail.strDrinkThumb }
            alt="recipe-img"
            className="recipeImage"
          />
          <span className="likeShareBtns">
            <ShareButton />
            <LikeButton recipe={ recipeDetail } />
          </span>
        </div>
      </div>
      {/* -------------------------------------------------------------------------- */}
      <div data-aos="fade-up" className="box instrDetails">
        <h3>Instruções</h3>
        <p data-testid="instructions">{ recipeDetail.strInstructions }</p>
      </div>
      {/* -------------------------------------------------------------------------- */}
      {(foods) ? (
        <div data-aos="fade-up" className="box videoDetails">
          <h3>Vídeo</h3>
          <iframe
            title="recipeVideo"
            data-testid="video"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media"
            src={ recipeDetail.strYoutube.replace('watch?v=', 'embed/') }
          />
        </div>
      ) : ('')}
      {/* -------------------------------------------------------------------------- */}
      <div data-aos="zoom-out-down" className="box bottomDetails">
        <div className="recommendedRecipes">
          <h3>Receitas Recomendadas</h3>
          <RecommendedRecipes />
        </div>
        <Link
          to={ (foods) ? (
            `/comidas/${recipeDetail.idMeal}/in-progress`) : (
            `/bebidas/${recipeDetail.idDrink}/in-progress`) }
        >
          <button
            type="button"
            data-testid="start-recipe-btn"
            className={ (btnFinish === null) ? 'btnFinishNone' : 'btnFinish' }
            onClick={ setRecipeInLS }
          >
            {(btnFinish) ? 'Continuar Receita' : 'Iniciar Receita'}
          </button>
        </Link>
      </div>
      {/* -------------------------------------------------------------------------- */}
    </div>
  );

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => { Aos.init({ duration: 2000 }); }, []);

  // ---------------------------------------------------------------------------------------------

  return (
    renderRecipe()
  );
}
