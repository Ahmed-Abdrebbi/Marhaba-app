import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAuthStore from '../../store/useAuthStore';

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // Extract first name from fullName, fallback to "Utilisateur"
  const userName = user?.fullName?.split(' ')[0] || 'Utilisateur';

  const handleLogout = async () => {
    await logout();
    // Auth guard in root _layout.tsx will redirect to welcome
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>L'ÉLITE</Text>
        <View style={styles.onlineDot} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Marhba,</Text>
        <Text style={styles.nameText}>{userName} 👋</Text>

        <Text style={styles.subtitle}>Votre espace exclusif est prêt.</Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Se déconnecter</Text>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#A855F7" />
          <Text style={[styles.tabText, styles.tabTextActive]}>Accueil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="search-outline" size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Explorer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="star-outline" size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Favoris</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#9CA3AF" />
          <Text style={styles.tabText}>Profil</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  // Header
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
  // Content
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
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151923',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2A2E3D',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutIcon: {
    marginLeft: 8,
  },
  // Bottom Tab Bar
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0B0F19',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1A1D2D',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 10,
    marginTop: 4,
  },
  tabTextActive: {
    color: '#A855F7',
  },
});