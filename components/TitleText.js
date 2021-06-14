import React from 'react';
import { StyleSheet, Text } from 'react-native';

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  body: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
});
