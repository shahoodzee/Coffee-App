import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ paddingHorizontal: 20}}>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={"Search items"}
        onChangeText={handleChangeText}
        underlineColorAndroid={"transparent"}
        secureTextEntry={title === "Password" && !showPassword}
        {...props}
      />
      <TouchableOpacity style={styles.eyeIconContainer}>
        <Image 
          source={icons.search}
          style={styles.eyeIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#2B2B2B",
    backgroundColor: "#1B1B1B",
    position: "relative",
    borderRadius: 8,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 12,
    marginTop: 0.5,
    fontFamily: "Poppins-Regular",
    color: "grey",
    paddingLeft: 5,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 12,
    top: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
});

export default SearchInput;