import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import store, { directPage, setFetchOnDone } from '../../context/store';

import { mealInfo, drinkInfo } from '../../functions';

export default function DoneRecipeCard({ recipe, index }) { // Desestruturação de props
  const { setRecipes } = useContext(store);
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipe;

  const handleClickCard = () => {
    setRecipes(directPage(null));
    setRecipes(setFetchOnDone(true));
  };

  return (
    <div className="done-card">
      <Link to={ `/${type}s/${id}` } onClick={ handleClickCard }>
        <img
          className="done-img"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <div className="done-card-text">
          {type === 'bebida'
            ? drinkInfo(index, alcoholicOrNot) : mealInfo(index, area, category)}
          <div
            className="done-name"
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </div>
          <div data-testid={ `${index}-horizontal-done-date` }>{doneDate}</div>
          <section className="tags">
            { tags.map((tag) => (
              <div
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {tag}
              </div>)) }
          </section>
        </div>
      </Link>
      <ShareButton id={ id } type={ type } index={ index } path className="share-done" />
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
