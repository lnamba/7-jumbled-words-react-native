import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

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

  const renderWordChunk = ({ item }) => {
    const { chunk, index } = item;
    const correct = usedChunks.includes(index);

    return (
      <Pressable style={styles.pressable} onPress={() => onTileClick(chunk, index)}>
        {({ pressed }) => (
          <View
            style={[
              styles.tile,
              { backgroundColor: pressed ? '#DDD' : '#FFF' },
              correct ? styles.correct : {},
          ]}>
            <Text style={styles.tileText}>{chunk}</Text>
          </View>
        )}
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        renderItem={renderWordChunk}
        numColumns={5}
        data={wordChunks}
        keyExtractor={(item) => item.index}
        columnWrapperStyle={{ justifyContent: 'center'}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  pressable: {
    flex: 1 / 5,
  },
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
    height: 50,
    marginBottom: 4,
    marginHorizontal: 1,
    borderRadius: 10
  },
  correct: {
    backgroundColor: 'darkgrey'
  },
  tileText: {
    fontSize: 18,
  }
})

export default SelectableTiles;