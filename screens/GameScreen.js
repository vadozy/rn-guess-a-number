import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rnd = Math.random(); // in the interval [ 0, 1 )
  const rndInt = Math.floor(rnd * (max - min)) + min;

  if (rndInt === exclude) {
    return exclude + 1 < max ? exclude + 1 : exclude - 1;
  } else {
    return rndInt;
  }
};

const renderListItem = (value, round) => {
  return (
    <View key={value} style={styles.listItem}>
      <BodyText>#{round}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  );
};

let initialGuess = null;

const GameScreen = (props) => {
  const low = useRef(1);
  const high = useRef(100);

  const { userChoice, onGameOver } = props;

  if (initialGuess === null) {
    initialGuess = generateRandomBetween(low.current, high.current, userChoice);
  }

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userChoice) {
      // Alert.alert(`Game Over! The number is ${currentGuess}`);
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess <= userChoice) ||
      (direction === 'greater' && currentGuess >= userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      high.current = currentGuess;
    } else {
      low.current = currentGuess + 1;
    }
    const nextGuess = generateRandomBetween(low.current, high.current);
    setCurrentGuess(nextGuess);
    setPastGuesses((previousGuesses) => [nextGuess, ...previousGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, i) =>
            renderListItem(guess, pastGuesses.length - i)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 350,
    maxWidth: '90%',
  },
  listItem: {
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  list: {
    alignItems: 'center',
    //marginTop: 10,
  },
});
