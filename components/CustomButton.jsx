import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.ButtonTouchableOpacity, containerStyles, { opacity: isLoading ? 0.5 : 1 }]}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonTouchableOpacity: {
    justifyContent: "center",
    marginTop: 30,
    alignItems: "center",
    borderRadius: '12px',
    minHeight: '32px',
    padding: '10px',
    width: '100%',
    backgroundColor: '#FF9C01',
    flexDirection: 'row',
  },

})

export default CustomButton;
