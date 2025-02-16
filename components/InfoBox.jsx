import { View, Text, StyleSheet } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View style={[containerStyles || {}]}>
      <Text style={[styles.textWhite, styles.textCenter, styles.fontPsemibold, titleStyles]}>
        {title}
      </Text>
      <Text style={[styles.textSm, styles.textGray100, styles.textCenter, styles.fontPregular]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textWhite: {
    color: 'white',
  },
  textCenter: {
    textAlign: 'center',
  },
  fontPsemibold: {
    fontFamily: 'Poppins-SemiBold',
  },
  textSm: {
    fontSize: 14,
  },
  textGray100: {
    color: '#6B7280',
  },
  fontPregular: {
    fontFamily: 'Poppins-Regular',
  },
});

export default InfoBox;
