import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

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

const GameScreen = (props) => {
  const low = useRef(1);
  const high = useRef(100);

  const { userChoice, onGameOver } = props;

  const [currentGuess, setCurrentGuess] = useState(
    () => generateRandomBetween(low.current, high.current, userChoice) // Lazy initial state
  );
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (currentGuess === userChoice) {
      // Alert.alert(`Game Over! The number is ${currentGuess}`);
      onGameOver(rounds);
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
    setRounds((rounds) => rounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, 'greater')}
        />
      </Card>
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
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});
