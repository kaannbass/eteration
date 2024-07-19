import React from 'react';

const FastImage = (props) => {
  return React.createElement('Image', props, props.children);
};

FastImage.resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center',
};

FastImage.priority = {
  low: 'low',
  normal: 'normal',
  high: 'high',
};

export default FastImage;
