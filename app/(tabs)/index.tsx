import FeedList from '@/components/FeedList';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '@/constants';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
