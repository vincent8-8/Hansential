
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

export default function LoginScreen() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    console.log('Login button pressed');
    console.log('Student ID:', studentId);
    console.log('Password:', password);

    // Validate inputs
    if (!studentId.trim()) {
      Alert.alert('알림', '학번을 입력해주세요.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('알림', '비밀번호를 입력해주세요.');
      return;
    }

    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    setIsLoading(true);

    // Simulate server request
    // In a real app, you would send studentId and password to your server here
    setTimeout(() => {
      console.log('Navigating to main screen...');
      setIsLoading(false);
      
      // Navigate to the main tabs screen
      router.replace('/(tabs)/(home)/');
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/Hansential-icon-dark.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>

          {/* Student ID Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              학번
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  color: theme.colors.text,
                  borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                },
              ]}
              placeholder="학번을 입력하세요"
              placeholderTextColor={colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'}
              value={studentId}
              onChangeText={setStudentId}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              비밀번호
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  color: theme.colors.text,
                  borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                },
              ]}
              placeholder="비밀번호를 입력하세요"
              placeholderTextColor={colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
          </View>

          {/* Login Button */}
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              {
                backgroundColor: theme.colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Text>
          </Pressable>

          {/* Additional Info */}
          <View style={styles.infoContainer}>
            <Text style={[styles.infoText, { color: theme.colors.text }]}>
              학교 계정으로 로그인하세요
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    opacity: 0.6,
  },
});
