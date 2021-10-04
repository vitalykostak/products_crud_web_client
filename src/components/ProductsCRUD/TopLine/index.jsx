import React from 'react';
import { useDispatch } from 'react-redux';
import { setVisibleProductAdd } from '../../../store/actionsCreators/products.js';
import './topline.scss';

const Topline = React.memo(() => {
  const dispatch = useDispatch();
  const showAddProductForm = () => dispatch(setVisibleProductAdd());
  return (
    <div className='top-line'>
      <div className='top-line__logo-box'>
        <img className='top-line__logo-img' src='images/logo.png' alt='logo' />
        <p className='top-line__logo-tagline'>Crud</p>
      </div>
      <div className='top-line__button-box'>
        <button className='top-line__button' onClick={showAddProductForm}>
          Add hot-dog
        </button>
      </div>
    </div>
  );
});
export default Topline;
