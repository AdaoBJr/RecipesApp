import React from 'react';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

import * as loadingLottie from '../../loading.json';
import * as doneLottie from '../../done.json';

const loadingAnimation = {
  loop: true,
  autoplay: true,
  animationData: loadingLottie.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const doneAnimation = {
  loop: false,
  autoplay: true,
  animationData: doneLottie.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Loading({ loading }) {
  return (
    <div>
      {!loading ? (
        <Lottie
          options={ loadingAnimation }
          height={ 420 }
          width={ 420 }
          style={ { marginTop: '8rem' } }
        />
      ) : (
        <Lottie
          options={ doneAnimation }
          height={ 120 }
          width={ 120 }
          style={ { marginTop: '16rem' } }
        />
      )}
    </div>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: undefined,
};
