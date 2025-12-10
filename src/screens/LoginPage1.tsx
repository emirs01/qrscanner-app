import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function LoginPage1({ navigation }) {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(50)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Animated.Image
        source={require('../../')}
        style={[styles.logo, { transform: [{ scale: pulse }] }]}
      />
      <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
        <Text style={styles.title}>Merhaba 👋</Text>
        <Text style={styles.subtitle}>
          QR Kod Okutucu Uygulamasına Hoşgeldiniz!{"\n"}
          Hızlı ve kolay QR taramaya başlamak için devam edin.
        </Text>
      </Animated.View>
      <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage2')}>
          <Text style={styles.buttonText}>Devam Et</Text>
          <Ionicons name="arrow-forward" size={22} color="white" style={{ marginLeft: 8, left: 10, }} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
    justifyContent: "center",
    alignItems: "center",
  },
  topShape: {
    position: "absolute",
    top: -150,
    width: 400,
    height: 400,
    backgroundColor: "#6200ee",
    borderRadius: 200,
    transform: [{ rotate: "45deg" }],
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
    zIndex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#6200ee",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginHorizontal: 30,
    lineHeight: 22,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6200ee",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 18,
    marginTop: 50,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
