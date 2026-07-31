import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {

    router.replace('/(app)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>

        {/* En-tête / Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="diamond-outline" size={32} color="#A855F7" />
          </View>
          <Text style={styles.brandTitle}>L'ÉLITE</Text>
        </View>

        {/* Formulaire */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Se connecter</Text>
            <Ionicons name="arrow-forward-outline" size={20} color="#FFF" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>

        {/* Lien d'inscription */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Pas de compte ? </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Créer un compte</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 48 },
  logoContainer: { backgroundColor: '#1A1D2D', padding: 16, borderRadius: 16, marginBottom: 16 },
  brandTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', letterSpacing: 2 },
  form: { width: '100%' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151923', borderRadius: 12, marginBottom: 16, paddingHorizontal: 16, height: 56, borderWidth: 1, borderColor: '#2A2E3D' },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: '#FFFFFF', fontSize: 16 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 32 },
  forgotPasswordText: { color: '#A855F7', fontSize: 14, fontWeight: '600' },
  primaryButton: { backgroundColor: '#A855F7', borderRadius: 12, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  buttonIcon: { marginLeft: 8 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 48 },
  footerText: { color: '#9CA3AF', fontSize: 14 },
  footerLink: { color: '#A855F7', fontSize: 14, fontWeight: 'bold' },
});