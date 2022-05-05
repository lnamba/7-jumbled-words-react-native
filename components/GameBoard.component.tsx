import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';

import HintArea from './HintArea.component';
import SelectableTiles from './SelectableTiles.component';
import ActionBar from './ActionBar.component';
import jsonData from '../assets/word-list.json';

function GameBoard() {
  const [words, setWords] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [wordChunks, setWordChunks] = useState([]);
  const [wordLengths, setWordLengths] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [answerChunks, setAnswerChunks] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(['','','','','','','']);
  const [usedChunks, setUsedChunks] = useState([]);
  const [wordObject, setWordObject] = useState({});
  const answer = answerChunks.join('');

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    const { wordList } = jsonData;
    const wordsToUse = [];
    let count = 0;

    while (count < 7) {
      const index = Math.floor(Math.random() * wordList.length);
      wordsToUse.push(wordList[index]);
      count++;
    } 
    setWords(wordsToUse);
  }

  useEffect(() => {
    if (words?.length) {
      define();
      const chunks = [];
      const lengths = [];
      const obj = {};
      words.forEach((word) => {
        console.log({word})
        lengths.push(word?.length);
        const splitted = word.match(/.{1,3}/g);
        obj[word] = splitted;
        setWordObject(obj);
        splitted.forEach((chunk) => {
          chunks.push(chunk);
        });
      });
      setWordLengths(lengths);
      const shuffledWordChunks = shuffleWordChunks(chunks);
      const shuffledWordChunksWithIndex = shuffledWordChunks.map((chunk, index) => ({ chunk, index }))
      setWordChunks(shuffledWordChunksWithIndex);
    }
  }, [words]);

  const shuffleWordChunks = (arr) => {
    let index = arr.length;
    let value;
    let random;
    while (0 !== index) { 
      random = Math.floor(Math.random() * index);
      index -= 1;
      value = arr[index];
      arr[index] = arr[random];
      arr[random] = value;
    }
      return arr;
  }

  const define = async () => {
    const wordDefinitions = await getDefinitions();
  
    setDefinitions(wordDefinitions);
  }

  const getDefinitions = useCallback(async () => {
    return Promise.all(words.map(async (word) => {
      console.log({word})
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      // const url = `http://api.wordnik.com:80/v4/word.json/${word}/definitions?limit=5&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=da315e3cd6b9d073f722503e4d2015774237e56c91d0acc29`;
      const response = await fetch(url);
      const json = await response.json();
      const definition = json?.[0]?.meanings?.[0]?.definitions?.[0]?.definition;
      console.log({definition})
      return definition;
    }));
  });

  const onTileClick = (value, index) => {
    if (selectedTiles.indexOf(index) === -1) {
      setSelectedTiles([...selectedTiles, index]);

      if (usedChunks.indexOf(index) === -1) {
        setAnswerChunks([...answerChunks, value]);
      }
    }
  }

  const handleGuess = () => {
    setAnswerChunks([]);
    words.forEach((word, i) => {
      if (word === answer) {
        const updatedAnswers = [...correctAnswers];
        updatedAnswers[i] = word;
        setCorrectAnswers(updatedAnswers);

        for(let key in wordObject) {
          if (key === word) {
            const newUsedChunks = [...usedChunks];
            wordChunks.forEach((_chunk, index) => {
              if (selectedTiles.indexOf(index) > -1 && newUsedChunks.indexOf(index) === -1) {
                newUsedChunks.push(index);
              }
            });
            setUsedChunks(newUsedChunks);
          }
        }
      }
    });
    setSelectedTiles([]);
  }

  const shuffle = () => {
    setSelectedTiles([]);
    setAnswerChunks([]);
    let i = 0;
    const chunksToShuffle = wordChunks.filter(({ index }) => !usedChunks.includes(index));
    const shuffledChunks = shuffleWordChunks(chunksToShuffle);
    const shuffledAndOrderedWordChunks = wordChunks.map((item) => {
      if (!usedChunks.includes(item.index)) {  
        let returnThis = shuffledChunks[i];
        i++;
        return returnThis;
      }
      return item;
    });
    setWordChunks(shuffledAndOrderedWordChunks);
  }
  console.log({correctAnswers, usedChunks,selectedTiles, wordObject, answerChunks})

  const handleBackspace = () => {
    const tiles = [...selectedTiles];
    const updatedAnswer = [...answerChunks];
    tiles.pop();
    updatedAnswer.pop()
    setSelectedTiles(tiles);
    setAnswerChunks(updatedAnswer);
  }

  return (
    <SafeAreaView>
    {wordChunks.length && definitions.length ? (
      <>
        <Text style={styles.header}>7 Jumbled Words</Text>
        <HintArea 
          definitions={definitions} 
          correctAnswers={correctAnswers}
          wordLengths={wordLengths} 
        />
        <ActionBar 
          answer={answer} 
          handleBackspace={handleBackspace}
          handleGuess={handleGuess} 
          shuffle={shuffle} 
        />
        <SelectableTiles 
          onTileClick={onTileClick}
          usedChunks={usedChunks}
          wordChunks={wordChunks} 
        />
      </>
    ) : <ActivityIndicator />}
    <Text style={styles.footerText}>Lauren Namba 2022</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 14, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 8,
  },
  footerText: {
    textAlign: 'center',
  }
});

export default GameBoard;