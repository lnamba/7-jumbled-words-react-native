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
  console.log({answer})

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Pressable onPress={shuffle}>
          <View style={styles.button}>
            <Text style={{textAlign: 'center', color: '#FFF'}}>Shuffle</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.flex}>
        <Text style={{ fontSize: 20 }}>{answer}</Text>
      </View>
      <View style={styles.rightButtons}>
        <Pressable onPress={handleBackspace}>
          <View style={{...styles.button, ...{marginRight: 4}}}>
            <Text style={{textAlign: 'center', color: '#FFF'}}>Back</Text>
          </View>
        </Pressable>
        <Pressable onPress={handleGuess}>
          <View style={styles.button}>
            <Text style={{textAlign: 'center', color: '#FFF'}}>Guess</Text>
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
  },
  flex: {
    flex:1
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: 'black',
    maxWidth: 80,
  }
})

export default UserActions;