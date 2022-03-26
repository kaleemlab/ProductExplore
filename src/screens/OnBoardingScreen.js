import React, {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {Button, Card, Headline, Title} from "react-native-paper";
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import Firebase from '../../firebase';
import firebase from "firebase";

const auth = Firebase.auth();

const OnBoardingScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(
        () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    navigation.replace('Main');
                }
            });
        }
    );

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <SafeAreaView/>
            <Card elevation={1}>
                <Card.Cover source={require("../../assets/say-hello-to-new-people.png")}/>
            </Card>
            <Headline style={{marginTop: 15, fontWeight: 'bold'}}>Welcome!</Headline>
            <Title style={{marginTop: 5}}>🚀 Find your next favourite product</Title>
            <Title style={{marginTop: 5}}>🔍 Launch your product here </Title>
            <View style={{height: 40}}></View>
            <Button mode="contained" onPress={() => navigation.navigate("SignIn")}>
                <Headline style={{color: "#fff"}}>SIGN IN</Headline>
            </Button>
            <View style={{height: 5}}/>
            <Headline style={{color: "#000", fontWeight: 'bold', textAlign: 'center'}}>OR</Headline>
            <View style={{height: 5}}/>
            <Button mode="contained" onPress={() => navigation.navigate("SignUp")}>
                <Headline style={{color: "#fff"}}>SIGN UP</Headline>
            </Button>
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
export default OnBoardingScreen;
