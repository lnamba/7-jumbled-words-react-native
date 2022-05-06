import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props { 
  answer: string;
  handleBackspace: () => void;
  handleGuess: () => void;
  shuffle: () => void;
}

function UserActions(props: Props) {
  const { answer, handleBackspace, handleGuess, shuffle } = props;

  const pressableStyle = ({ pressed }) => ({
    opacity: pressed ? .5 : 1,
  })

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Pressable onPress={shuffle} style={pressableStyle}>
          <View style={styles.button}>
            <Text style={styles.text}>Shuffle</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.flex}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>
      <View style={styles.rightButtons}>
        <Pressable onPress={handleBackspace} style={pressableStyle}>
          <View style={{...styles.button, ...{marginRight: 4}}}>
            <Text style={styles.text}>Back</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleGuess} style={pressableStyle}>
          <View style={styles.button}>
            <Text style={styles.text}>Guess</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 40,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  rightButtons: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  flex: {
    flex:1
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'black',
    maxWidth: 80,
  },
  text: {
    textAlign: 'center', 
    color: '#FFF',
  },
  answerText: {
    fontSize: 20
  }
})

export default UserActions;