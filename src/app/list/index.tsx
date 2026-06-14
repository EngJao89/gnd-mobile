import { Colors } from '@/constants/theme';
import HeaderList from '@/components/HeaderList';
import { StyleSheet, View } from 'react-native';

export default function List() {
  return (
    <View style={styles.container}>
      <HeaderList
        location="São Paulo, SP"
        userName="John Doe"
        logoSource={require('@/assets/images/header-logo.png')}
      />
      <View style={styles.content} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
