import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useAuthStore from '../../store/useAuthStore';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);

  const userName = user?.fullName?.split(' ')[0] || 'Utilisateur';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      <View style={styles.topHeader}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>L'ÉLITE</Text>
        <View style={styles.onlineDot} />
      </View>

      <Animated.View 
        style={styles.content}
        entering={FadeInDown.duration(600).delay(200)}
      >
        <Text style={styles.welcomeText}>Marhba,</Text>
        <Text style={styles.nameText}>{userName} 👋</Text>

        <Text style={styles.subtitle}>Votre espace exclusif est prêt.</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
  },
  nameText: {
    color: '#A855F7',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 40,
  }
});