import CustomButton from '@/components/CustomButton';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/logo.svg')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="이메일 로그인" />
        <Link href={'/'} style={styles.signupText}>
          이메일로 가입하기
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  buttonContainer: {
    paddingHorizontal: 32,
    flex: 1,
  },
  logo: {
    width: 112,
    height: 112,
  },
  signupText: {
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
