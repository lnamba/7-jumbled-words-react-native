import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface WordChunk {
  chunk: string;
  index: number;
}

interface Props {
  usedChunks: string[];
  wordChunks: WordChunk[];
  onTileClick: (chunk: string, index: number) => void;
}

function SelectableTiles(props: Props) {
  const { onTileClick, usedChunks, wordChunks } = props;

  const renderWordChunk = ({ chunk, index }) => {
    const correct = usedChunks.includes(index);

    return (
      <Pressable style={{...styles.tile, ...correct ? styles.correct : {}}} key={index} onPress={() => onTileClick(chunk, index)}>
        <Text style={{fontSize: 18}}>{chunk}</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      {wordChunks.map(renderWordChunk)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
  },
  tile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
    minWidth: 70,
    height: 50,
    marginBottom: 6,
    marginRight: 6,
    borderRadius: 10
  },
  correct: {
    backgroundColor: 'darkgrey'
  }
})

export default SelectableTiles;