import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Button, Card, Headline, TextInput} from "react-native-paper";
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import Firebase from '../../firebase';
import {signIn} from "../api/firebaseAPI";

const auth = Firebase.auth();

const SignInScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                signIn(email, password).then(navigation.navigate('Main'));
            } else {
                alert('Please fill email and password fields.')
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <SafeAreaView/>
            <Card.Cover source={require("../../assets/signin-image.jpg")}/>
            <View style={{height: 15}}></View>
            <Headline style={{fontWeight: 'bold'}}>Sign In</Headline>
            <View style={{height: 10}}></View>
            <TextInput
                style={{
                    backgroundColor: "#fff"
                }}
                mode="outlined"
                label="Email"
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
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
                label="Password"
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Type your password"
            />
            <View style={{height: 20}}/>
            <Button mode="contained" onPress={onLogin}>
                SIGN IN
            </Button>
            <View style={{height: 20}}/>
            <Button mode="text" onPress={() => navigation.navigate('SignUp')}>
                New Here? Sign Up here
            </Button>
            <View style={{height: 30}}/>
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
export default SignInScreen;
