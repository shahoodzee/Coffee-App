import { router } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Image
        source={images.empty}
        resizeMode="contain"
        style={styles.image}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  image: {
    width: 270,
    height: 216,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#D1D5DB",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginTop: 8,
  },
  button: {
    width: "100%",
    marginVertical: 20,
  },
});

export default EmptyState;
