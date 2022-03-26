import React, {useEffect, useState} from "react";
import {Alert, Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View} from "react-native";
import {Button, TextInput} from 'react-native-paper';
import * as firebase from "firebase";
import Firebase from "firebase";
import {updateProfile} from "../api/firebaseAPI";
import {useNavigation} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';
import RoundImage from "../components/RoundImage";

const auth = Firebase.auth();

const ProfileScreen = () => {
    const navigation = useNavigation();
    const currentUser = auth.currentUser;

    const [name, setName] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [profileImage, setProfileImage] = useState('');
    const [finalImageUrl, setFinalImageUrl] = useState('');

    const imageUri = profileImage != null ? profileImage : "";
    const [isLoading, setLoading] = useState(false);
    const [check, setCheck] = useState(true);


    const onHandleUpdateProfile = async () => {
        if (name !== "" && phoneNumber !== "" && bio !== "" && website !== "") {
            alert('Profile Updated')
            updateProfile(name, phoneNumber, bio, website)
                .then(
                    setTimeout(() => {
                        navigation.navigate('Home')
                    }, 1500));
        } else {
            alert('Please fill the empty fields.')
        }
    };


    useEffect(async () => {
        try {
            setLoading(true);

            let doc = await firebase
                .firestore()
                .collection('users')
                .doc(currentUser.uid)
                .get();

            if (!doc.exists) {
                alert('No user data found!')
            } else {
                let dataObj = doc.data();
                setName(dataObj.name);
                setBio(dataObj.bio);
                setPassword(dataObj.password);
                setEmail(dataObj.email);
                setWebsite(dataObj.website);
                setProfileImage(dataObj.profileImage);
                setPhoneNumber(dataObj.phoneNumber);
                setLoading(false);
            }

        } catch (error) {
            throw error;
        }
    }, [false]);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 0
        });
        const manipResult = await manipulateAsync(
            result.localUri || result.uri,
            [
                {
                    resize:
                        {
                            height: 320,
                            width: 320
                        }
                }
            ],
            {compress: 0.1, format: SaveFormat.PNG}
        );
        uploadImage(manipResult.uri)
            .then(r => Alert.alert(
                'Updated!',
                'Profile image updated!',
                [{text: "OK", onPress: () => navigation.goBack()}],
                {cancelable: true}
            ))
            .catch(error => {
                Alert.alert('Error!', 'Error in uploading!')
            });
    };


    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const db = firebase.firestore();
        const blob = await response.blob();
        let ref =
            firebase
                .storage()
                .ref()
                .child("users/" + currentUser.uid + '/' + 'image-1');
        ref.getDownloadURL().then((url) =>
            db.collection("users")
                .doc(currentUser.uid)
                .update({
                    profileImage: url
                }).then(r =>
                setProfileImage(url))
        )

        return ref.put(blob);
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <SafeAreaView>
                <View style={{height: 4}}/>
                <StatusBar
                    animated={true}
                    backgroundColor="#61dafb"/>
                <TouchableOpacity
                    onPress={pickImage}
                    style={{flex: 1, marginTop: 10, alignItems: 'center'}}>
                    <RoundImage
                        width={Dimensions.get('window').width / 4}
                        height={Dimensions.get('window').width / 4}
                        source={profileImage.length !== 0 ? {uri: imageUri} : require('../../assets/favicon.png')}/>
                </TouchableOpacity>
                <View style={{height: 10}}/>
                <TextInput
                    style={{
                        backgroundColor: "#fff"
                    }}
                    mode="outlined"
                    label="Name"
                    placeholder="Type your name"
                    autoCapitalize='none'
                    textContentType='name'
                    autoFocus={true}
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <View style={{height: 10}}/>
                <TextInput
                    style={{
                        backgroundColor: "#fff"
                    }}
                    mode="outlined"
                    label="Email"
                    editable={false}
                    selectTextOnFocus={false}
                    placeholder="Type your email"
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <View style={{height: 10}}/>
                <TextInput
                    style={{
                        backgroundColor: "#fff"
                    }}
                    mode="outlined"
                    label="Phone Number"
                    placeholder="Type your phone number"
                    autoCapitalize='none'
                    textContentType='telephoneNumber'
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
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
                    editable={false}
                    selectTextOnFocus={false}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Type your password"
                />
                <View style={{height: 10}}/>
                <TextInput
                    style={{
                        backgroundColor: "#fff"
                    }}
                    mode="outlined"
                    label="Bio"
                    placeholder="Type your bio"
                    autoCapitalize='none'
                    textContentType='none'
                    value={bio}
                    onChangeText={text => setBio(text)}
                />
                <View style={{height: 10}}/>
                <TextInput
                    style={{
                        backgroundColor: "#fff"
                    }}
                    mode="outlined"
                    label="Website"
                    placeholder="Type your website link"
                    textContentType='URL'
                    value={website}
                    onChangeText={text => setWebsite(text)}
                />
                <View style={{height: 20}}/>
                <Button icon="account" mode="contained" onPress={onHandleUpdateProfile}>
                    Update
                </Button>
                <View style={{height: 30}}/>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 20,
        paddingBottom: 15,
        backgroundColor: "#fff",
    },
});

export default ProfileScreen;
