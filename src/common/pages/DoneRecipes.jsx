import React, { useState } from 'react';

import Header from '../components/Header';
import CategoryButton from '../components/CategoryButton';
import { getStorage, handleClickType } from '../../functions';
import DoneRecipeCard from '../components/DoneRecipeCard';

const DONE_RECIPES = 'doneRecipes';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(() => getStorage(DONE_RECIPES));

  const handleClickAll = () => setDoneRecipes(getStorage(DONE_RECIPES));

  return (
    <>
      <Header pageName="Receitas Feitas" />
      <div className="done-recipes">
        <div className="done-buttons">
          <CategoryButton
            foodOrDrink={ handleClickType }
            setState={ setDoneRecipes }
            clickAll={ handleClickAll }
            path={ DONE_RECIPES }
          />
        </div>
        <section className="done-cards">
          { doneRecipes.map((recipe, i) => (
            <DoneRecipeCard
              recipe={ recipe }
              index={ i }
              key={ i }
            />
          )) }
        </section>
      </div>
    </>
  );
}
