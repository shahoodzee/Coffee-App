import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          underlineColorAndroid={"transparent"}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIconContainer}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#2B2B2B",
    backgroundColor: "#1B1B1B", // Optional: Add background color for the input container
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 5,     // Add padding to prevent text from overlapping the eye icon
    color: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#2B2B2B",
    backgroundColor: "#1B1B1B", // Optional: Add background color for the input container
  },
  eyeIconContainer: {
    position: "absolute",   // Position the eye icon absolutely within the container
    right: 12,              // Adjust the position to align with the padding
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
});

export default FormField;