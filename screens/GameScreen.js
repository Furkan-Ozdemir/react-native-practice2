import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userChoice, onGameOver }) => {
  const initGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initGuess);
  const [guessRounds, setGuessRounds] = useState([initGuess]);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
    setGuessRounds((currentRounds) => [newRandomNumber, ...currentRounds]);
  };

  const guessRoundslength = guessRounds.length;
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler("greater")}>
            <Ionicons name="md-add" size={24} color={"#fff"} />
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={24} color={"#fff"} />
          </PrimaryButton>
        </View>
      </View>
      <ScrollView>
        {guessRounds.map((guess, index) => (
          <GuessLogItem
            key={guess}
            roundNumber={guessRoundslength - index}
            guess={guess}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ddb52f",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#ddb52f",
    padding: 12,
  },
  buttonContainer: {
    // justifyContent: "space-around",
    // marginTop: 24,
    // width: 300,
    // maxWidth: "80%",
  },
});
