//Snack.js
import React from 'react';
import { Snackbar } from 'react-native-paper';

const Snack = ({ visible, onDismiss, message, backgroundColor = '#6200EE', textColor = '#FFFFFF' }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={2000}
      style={{ backgroundColor: backgroundColor }} 
      theme={{ colors: { surface: textColor } }}
    >
      {message}
    </Snackbar>
  );
};

export default Snack;