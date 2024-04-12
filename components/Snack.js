import React from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';

const Snack = ({ visible, onDismiss, message }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={3000} 
    >
      {message}
    </Snackbar>
  );
};

export default Snack;
