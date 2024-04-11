import { StyleSheet, Text, View, Pressable, Image, ImageSourcePropType, Animated, Easing } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { PropsWithChildren } from 'react'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import DiceOne from '../assets/One.png'
import DiceTwo from '../assets/Two.png'
import DiceThree from '../assets/Three.png'
import DiceFour from '../assets/Four.png'
import DiceFive from '../assets/Five.png'
import DiceSix from '../assets/Six.png'

type DiceProp = PropsWithChildren<{
  imageUrl : ImageSourcePropType
}>

const Dice = ({imageUrl} : DiceProp):JSX.Element => {
  return(
    <View>
      <Image source={imageUrl} style={styles.diceImage}/>
    </View>
  )
}
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App(): JSX.Element {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);
  const [bouncingValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // Roll the dice when the component mounts
    rollTheDice();
  }, []);

  const rollTheDice = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne);
        break;
      case 2:
        setDiceImage(DiceTwo);
        break;
      case 3:
        setDiceImage(DiceThree);
        break;
      case 4:
        setDiceImage(DiceFour);
        break;
      case 5:
        setDiceImage(DiceFive);
        break;
      case 6:
        setDiceImage(DiceSix);
        break;
      default:
        setDiceImage(DiceOne);
        break;
    }
    ReactNativeHapticFeedback.trigger("impactLight", options);

    // Start the bouncing animation
    Animated.sequence([
      Animated.timing(bouncingValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bouncingValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[styles.diceContainer, { transform: [{ scale: bouncingValue }] }]}>
          <Dice imageUrl={diceImage} />
        </Animated.View>
        <Pressable onPress={rollTheDice}>
          <Text style={styles.rollDiceBtnText}>Roll The Dice</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
