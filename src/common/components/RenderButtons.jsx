import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import store from '../../context/store';

export default function RenderButtons({ clickCategory, foodOrDrink,
  setState, clickAll, path }) {
  const { recipes: { foods, categoriesMeals,
    categoriesDrinks, categoriesLimit } } = useContext(store);

  const renderBtnAll = () => (
    <button
      type="button"
      data-testid={ path ? 'filter-by-all-btn' : 'All-category-filter' }
      onClick={ clickAll }
    >
      All
    </button>
  );

  const renderButtons = () => {
    const foodDrinkButtons = [{ strCategory: 'Food' }, { strCategory: 'Drink' }];

    let newCategories;
    if (path) {
      newCategories = foodDrinkButtons;
    } else {
      newCategories = (foods) ? (
        categoriesMeals.slice(0, categoriesLimit)) : (
        categoriesDrinks.slice(0, categoriesLimit));
    }

    return (
      newCategories.map((category, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ path
            ? `filter-by-${category.strCategory.toLowerCase()}-btn`
            : `${category.strCategory}-category-filter` }
          onClick={ path
            ? (() => foodOrDrink(category.strCategory, path, setState))
            : (() => clickCategory(category)) }
        >
          {category.strCategory}
        </button>
      ))
    );
  };
  return (
    <>
      {renderBtnAll()}
      {renderButtons()}
    </>
  );
}

RenderButtons.propTypes = {
  clickCategory: PropTypes.func,
  clickAll: PropTypes.func.isRequired,
  foodOrDrink: PropTypes.func,
  setState: PropTypes.func,
  path: PropTypes.string,
};

RenderButtons.defaultProps = {
  clickCategory: undefined,
  foodOrDrink: () => console.log('nothing to do!'),
  setState: () => console.log('no state to set'),
  path: undefined,
};
