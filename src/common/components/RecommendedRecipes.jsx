import React, { useContext, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import store, { } from '../../context/store';

export default function RecommendedRecipes() {
  const initialImgs = { firstImg: 0, secondImg: 1 };
  const [show, setShow] = useState(initialImgs);

  const {
    recipes: { recommendedRecipes, recommendedLimit },
  } = useContext(store);

  const renderRecommended = () => {
    const { firstImg, secondImg } = show;
    const newRecipes = recommendedRecipes.slice(0, recommendedLimit);

    const nextSlide = () => {
      if (secondImg === newRecipes.length - 1) {
        setShow(initialImgs);
      } else {
        setShow((prevState) => ({
          firstImg: prevState.firstImg + 2,
          secondImg: prevState.secondImg + 2,
        }));
      }
    };

    const prevSlide = () => {
      if (firstImg === 0) {
        setShow({
          firstImg: newRecipes.length - 2,
          secondImg: newRecipes.length - 1,
        });
      } else {
        setShow((prevState) => ({
          firstImg: prevState.firstImg - 2,
          secondImg: prevState.secondImg - 2,
        }));
      }
    };

    const showRecommend = (index) => {
      let NameClass = '';
      if (index === firstImg) {
        NameClass = 'activeLeft';
      }
      if (index === secondImg) {
        NameClass = 'activeRight';
      }
      if (index !== firstImg && index !== secondImg) {
        NameClass = 'hidden';
      }
      return NameClass;
    };

    return (
      <div className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={ prevSlide } />
        {newRecipes.map((recipe, index) => (
          <div
            key={ index }
            className={ showRecommend(index) }
            data-testid={ `${index}-recomendation-card` }
          >
            <div
              className="imgTitle"
            >
              <img
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt="recipe-img"
                className="recommendedImg"
              />
              <h4
                data-testid={ `${index}-recomendation-title` }
                className="recommendedTitle"
              >
                {
                  recipe.strMeal || recipe.strDrink
                }
              </h4>
            </div>
          </div>
        ))}
        <FaArrowAltCircleRight className="right-arrow" onClick={ nextSlide } />
      </div>
    );
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  // ---------------------------------------------------------------------------------------------

  return (
    renderRecommended()
  );
}
