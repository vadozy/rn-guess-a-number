import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    elevation: 5, // for android
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
