import React from 'react';
import ToastManager from 'toastify-react-native';
import {TextStyle, ViewStyle} from 'react-native';
import { fontFamilies } from '../../../../constants/fontFamilies';

const ToastComponent = (props : any) => {
  const customTextStyle: TextStyle = {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: 'black',
  };

  const customStyle: ViewStyle = {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  return (
    <ToastManager
      {...props}
      textStyle={{ ...customTextStyle, ...props.textStyle }} // Gộp customTextStyle và textStyle từ props
      style={{...customStyle, ...props.style} }
    />
  );
};

export default ToastComponent;
