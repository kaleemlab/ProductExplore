import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {ActivityIndicator, Button, Card, Colors, Headline, TextInput} from "react-native-paper";
import {Alert, Platform, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import Firebase from '../../firebase';
import {registration} from "../api/firebaseAPI";

const auth = Firebase.auth();

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const onHandleSignup = async () => {
        try {
            if (name !== "" && phoneNumber !== "" && email !== '' && password !== '') {
                registration(
                    name,
                    email,
                    phoneNumber,
                    password
                ).then(r => {
                    Platform.OS === "web" ? alert('Signed Up Successfully!') : setLoading(true)
                })
                {
                    Platform.OS === "web" ?
                        navigation.replace('SignIn')
                        :
                        Alert.alert(
                            "Signed Up Successfully",
                            "Please verify your email before Sign In!",
                            [
                                {text: "OK", onPress: () => navigation.replace('SignIn')}
                            ]
                        )
                }
            } else {
                alert('Please fill the empty fields.')
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        <ActivityIndicator animating={true} color={Colors.blue500}/>
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <SafeAreaView/>
            <Card.Cover source={require("../../assets/signup-img-online.jpeg")}/>
            <View style={{height: 5}}></View>
            <Headline style={{fontWeight: 'bold'}}>Sign Up</Headline>
            <View style={{height: 10}}></View>
            <TextInput
                style={{
                    backgroundColor: "#fff"
                }}
                mode="outlined"
                label="Name"
                autoCapitalize='none'
                textContentType='name'
                value={name}
                autoFocus={true}
                onChangeText={text => setName(text)}
                placeholder="Type your name"
            />
            <View style={{height: 10}}/>
            <TextInput
                style={{
                    backgroundColor: "#fff"
                }}
                mode="outlined"
                label="Email"
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Type your email"
            />
            <View style={{height: 10}}/>
            <TextInput
                style={{
                    backgroundColor: "#fff"
                }}
                mode="outlined"
                label="Phone Number"
                autoCapitalize='none'
                textContentType='telephoneNumber'
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
                placeholder="Type your phone number"
            />
            <View style={{height: 10}}/>
            <TextInput
                style={{
                    backgroundColor: "#fff"
                }}
                mode="outlined"
                label="Password"
                placeholder="Type your password"
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <View style={{height: 15}}/>
            <Button mode="contained" onPress={onHandleSignup}>
                SIGN UP
            </Button>
            <View style={{height: 10}}/>
            <Button mode="text" onPress={() => navigation.navigate('SignIn')}>
                Already Signed Up? Sign In here
            </Button>
            <View style={{height: 30}}/>
            <View style={{height: 20}}/>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 35,
        paddingBottom: 15,
    },
});
export default SignUpScreen;
