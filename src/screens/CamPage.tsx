import { View, Text, TouchableOpacity, Linking, Animated } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useRef } from "react";
import { StatusBar } from 'expo-status-bar';

export default function CamPage({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [qrData, setQrData] = useState(null); // okunan link
  const slideAnim = useRef(new Animated.Value(200)).current; // banner animasyonu

  const showBanner = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => hideBanner(), 6000);
  };

  const hideBanner = () => {
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setQrData(null));
  };

  const handleScan = ({ data }) => {
    if (!qrData) {
      setQrData(data);
      showBanner();
    }
  };

  if (!permission || !permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <StatusBar style="dark" />
        <Text>Kamera izni gerekli!</Text>
        <Text onPress={requestPermission} style={{ marginTop: 20, color: "blue" }}>
          İzin Ver
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", top: 50, right: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={handleScan}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />
      {qrData && (
        <Animated.View
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            padding: 15,
            backgroundColor: "white",
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            elevation: 10,
            shadowColor: "#000",
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Ionicons name="qr-code-outline" size={26} color="black" />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text numberOfLines={1} style={{ fontWeight: "600", fontSize: 14 }}>
              QR Kod Bulundu
            </Text>
            <Text numberOfLines={1} style={{ color: "gray", fontSize: 13 }}>
              {qrData}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => Linking.openURL(qrData)}
            style={{
              backgroundColor: "#007AFF",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Aç</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
