import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, StyleSheet } from "react-native";
import { images } from '../../constants';
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
// import { useGlobalContext } from "../../context";

const SignIn = () => {
  // const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      // await signIn(form.email, form.password);
      // const result = await getCurrentUser();
      // setUser(result);
      // setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      //Alert.alert("Error", error.message);
    } finally {
      //setSubmitting(false);
    }
  };

  return(     
  <SafeAreaView style={styles.SignInContainer}>
    <ScrollView>
      <View style={styles.SignInView}>
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{ width: 115, height: 34 }}
        />

        <Text style={styles.SignInText}>
          Log in to Aora
        </Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles={{ marginTop: 28, width: '100%' }}
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles={{ marginTop: 28, width: '100%'  }}
        />

        <CustomButton
          title="Sign In"
          handlePress={submit}
          containerStyles={{ marginTop: 28 }}
          isLoading={isSubmitting}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 8 }}>
          <Text style={{ fontSize: 18, color: '#6B7280', fontFamily: 'Poppins-Regular' }}>
            Don't have an account?
          </Text>
          <Link
            href="/sign-up"
            style={{ fontSize: 18, fontWeight: 'bold', color: '#FF9C01', fontFamily: 'Poppins-SemiBold' }}
          >
            Signup
          </Link>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
)};
const styles = StyleSheet.create({
  SignInContainer: {
    backgroundColor: '#161622',
    height: '100%',
  },
  SignInView:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginVertical: 24,
    minHeight: '85vh',
  },
  SignInText:{
    fontSize: 24, 
    fontWeight: 'bold', 
    color: 'white', 
    marginTop: 30, 
    fontFamily: 'Poppins-SemiBold' 
  }
})
export default SignIn