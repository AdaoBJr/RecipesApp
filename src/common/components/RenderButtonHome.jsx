import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import store, { setFetchOnDone } from '../../context/store';

export default function RenderButtonHome() {
  const { recipes: { foods }, setRecipes } = useContext(store);
  return (
    <Link
      to={ (foods) ? '/comidas' : '/bebidas' }
    >
      <button
        type="button"
        className="btnHome"
        onClick={ () => setRecipes(setFetchOnDone(true)) }
      >
        <FaHome />
      </button>
    </Link>
  );
}
