import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RenderButtons from './RenderButtons';

export default function CategoryButton({ clickCategory, foodOrDrink, setState,
  clickAll, path }) { // Desestruturação de props
  const [minWidth, setMinWidth] = useState(false);
  const [iconActive, setActive] = useState(true);

  const checkWidthScreen = () => {
    const MIN_WIDTH = 576;
    const screenWidth = window.innerWidth;
    // https://cursos.alura.com.br/forum/topico-como-executar-uma-funcao-do-javascript-se-a-janela-do-browser-diminuir-de-800px-41605

    if (screenWidth >= MIN_WIDTH) {
      setMinWidth(true);
    } else {
      setMinWidth(false);
    }
  };

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA
  useEffect(checkWidthScreen, []);
  window.addEventListener('resize', () => checkWidthScreen());

  // ---------------------------------------------------------------------------------------------
  if (path) {
    return (
      <div className={ (!minWidth) ? 'categoriesBtnsDone' : 'categoriesBtns' }>
        <RenderButtons
          clickCategory={ clickCategory }
          foodOrDrink={ foodOrDrink }
          setState={ setState }
          clickAll={ clickAll }
          path={ path }
        />
      </div>
    );
  }
  return (
    <section>
      <div className={ (iconActive) ? 'icon iconActive' : 'icon' }>
        <button
          type="button"
          onClick={ () => setActive(!iconActive) }
          className="hamburguer"
        >
          <div />
        </button>
      </div>
      <div className={ (iconActive || minWidth) ? 'containerBtns' : 'menuClose' }>
        <div
          className={ (iconActive || minWidth) ? (
            'categoriesBtns') : ('menuClose') }
        >
          <RenderButtons
            clickCategory={ clickCategory }
            foodOrDrink={ foodOrDrink }
            setState={ setState }
            clickAll={ clickAll }
            path={ path }
          />
        </div>
      </div>
    </section>
  );
}

CategoryButton.propTypes = {
  clickCategory: PropTypes.func,
  clickAll: PropTypes.func.isRequired,
  foodOrDrink: PropTypes.func,
  setState: PropTypes.func,
  path: PropTypes.string,
};

CategoryButton.defaultProps = {
  clickCategory: undefined,
  foodOrDrink: () => console.log('nothing to do!'),
  setState: () => console.log('no state to set'),
  path: '',
};
