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
    const isFirst = i === 0;
    const isLast = i === wordLengths.length - 1;
    const correct = !!correctAnswers[i];

    return (
      <View 
        style={{
          ...styles.hintRow, 
          ...isFirst ? { borderTopRightRadius: 10, borderTopLeftRadius: 10, borderTopWidth: 4 } : {}, 
          ...isLast ? { borderBottomRightRadius: 10, borderBottomLeftRadius: 10, borderBottomWidth: 4 } : {},
          ...correct ? styles.correct : {},
        }}
        key={i}>
        <View>
          <Text style={styles.text}>{`${definition} (${wordLengths[i]})`}</Text>
          <Text style={{
            ...styles.text,
            fontWeight: 'bold'
          }}>
            {`${correctAnswers[i].toUpperCase()}`}
          </Text>
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
    flexDirection: 'column',
    marginHorizontal: 16,
},
  hintRow: {
    flexDirection: 'row',
    borderColor: '#000',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    padding: 4,
  },
  correct: {
    backgroundColor: 'darkgrey'
  },
  text: {
    fontSize: 12,
  }
});

export default HintArea;