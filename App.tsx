import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import GameBoard from './components/GameBoard.component';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GameBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
