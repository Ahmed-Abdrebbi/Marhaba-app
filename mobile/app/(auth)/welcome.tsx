import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Diamond icon */}
      <View style={styles.iconContainer}>
        <Ionicons name="diamond-outline" size={40} color="#A855F7" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Marhaba-app</Text>
      <Text style={styles.subtitle}>✨ L'élégance de la connexion ✨</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.connectButtonText}>SE CONNECTER</Text>
          <Text style={styles.connectButtonEmoji}>👋</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.8}
        >
          <Text style={styles.registerButtonText}>S'INSCRIRE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#151923',
    borderWidth: 1,
    borderColor: '#2A2E3D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  connectButton: {
    backgroundColor: '#A855F7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  connectButtonEmoji: {
    fontSize: 16,
  },
  registerButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2A2E3D',
    backgroundColor: 'transparent',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
