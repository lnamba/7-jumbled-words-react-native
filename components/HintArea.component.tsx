import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  correctAnswers: string[];
  definitions: string[];
  wordLengths: string[]
}

function HintArea(props: Props) {
  const { correctAnswers, definitions, wordLengths } = props;

  const renderHintRow = (definition: string, i: number) => {
    console.log({correctAnswers})
    return (
      <View style={styles.hintRow} key={i}>
        <View style={{flexGrow:1, flexDirection:'column'}} key={i}>
          <Text style={{fontSize:12}}>{`${definition} (${wordLengths[i]})`}</Text>
        </View>
        <View style={{flex:1, borderLeftColor: '#000'}} key={i}>
          <Text style={{fontSize:12}}>{`${correctAnswers[i].toUpperCase()}`}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {definitions.map(renderHintRow)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 16,
},
  hintRow: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#000',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderRadius: 10
  },
  // definition: {
  //   flexDirection: 'row',
  //   backgroundColor: 'red',
  //   padding: 0,
  // },
  // correctAnswer: {
  //   flex: 1,
  //   backgroundColor: 'blue'
  // }
});

export default HintArea;