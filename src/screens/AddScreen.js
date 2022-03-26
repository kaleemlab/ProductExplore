import React, {useEffect, useState} from "react";
import {Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View} from "react-native";
import {Avatar, Button, Caption, Chip, List, RadioButton, TextInput} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {useStoreActions} from "easy-peasy";
import {Picker} from "@react-native-picker/picker";
import {submitPost} from "../api/firebaseAPI";
import firebase from "../../firebase";
import * as ImagePicker from "expo-image-picker";
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import uuidv4 from "uuid";

const AddScreen = () => {
    const navigation = useNavigation();
    let currentUserUID = firebase.auth().currentUser.uid;

    const add = useStoreActions((actions) => actions.addExpense);

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [userName, setUserName] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [description, setDescription] = useState("");
    let [website, setWebsite] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedVariant, setSelectedVariant] = useState();
    let [selectedPrice, setSelectedPrice] = useState();
    const [visible, setVisible] = useState(false);

    const [profileImage, setProfileImage] = useState('');
    const [finalImageUrl, setFinalImageUrl] = useState('');

    const imageUri = profileImage != null ? profileImage : "";
    const [isLoading, setLoading] = useState(false);
    const [check, setCheck] = useState(true);

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
            .then(r => console.log('Product Logo Added!'
            ))
            .catch(error => {
                Alert.alert('Error!', 'Error in uploading!')
            });
    };


    const uploadImage = async (uri) => {
        const value = uuidv4();
        const response = await fetch(uri);
        const blob = await response.blob();
        let ref =
            firebase
                .storage()
                .ref()
                .child("posts/" + value + '/' + 'product-logo');

        setTimeout(() => {
            ref.getDownloadURL().then((url) =>
                setFinalImageUrl(url)
            )
        }, 1500);


        return ref.put(blob);
    }


    const addPost = () => {
        if (name !== "" && phoneNumber !== "" && website !== "" && description !== "" && selectedPrice !== "" && selectedCategory !== "" && userName !== "" && finalImageUrl !== "" && email !== "") {
            submitPost(
                name,
                phoneNumber,
                website,
                description,
                selectedPrice,
                selectedVariant,
                selectedCategory,
                userName,
                0,
                finalImageUrl,
                email
            ).then(r => alert('Your product has been posted!'));

            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                });
            }, 1500);
        } else {
            alert('Please fill all the fields...')
        }
    };

    useEffect(() => {
        async function getUserInfo() {
            let doc = await firebase
                .firestore()
                .collection('users')
                .doc(currentUserUID)
                .get();
            if (!doc.exists) {
                alert('No user data found!')
            } else {
                let dataObj = doc.data();
                setUserName(dataObj.name);
                setEmail(dataObj.email);
                setPhoneNumber(dataObj.phoneNumber);
            }
        }

        getUserInfo();
    })

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
                    <Avatar.Image size={100}
                                  source={finalImageUrl.length !== 0 ? {uri: finalImageUrl} : require('../../assets/favicon.png')}/>
                    <Caption style={{marginTop: 5}}>Product Logo</Caption>
                </TouchableOpacity>
                <View style={{height: 10}}/>
                <TextInput
                    style={{
                        backgroundColor: "#fff"
                    }}
                    mode="outlined"
                    label="Product Name"
                    placeholder="Type your product name"
                    autoCapitalize='none'
                    textContentType='name'
                    value={name}
                    autoFocus={true}
                    onChangeText={text => setName(text)}
                />
                <View style={{height: 10}}/>
                <TextInput
                    style={{
                        backgroundColor: "#fff"
                    }}
                    mode="outlined"
                    label="Product Description"
                    placeholder="Type your product description"
                    autoCapitalize='none'
                    textContentType='name'
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
                <View style={{height: 10}}/>
                <TextInput
                    style={{
                        backgroundColor: "#fff"
                    }}
                    mode="outlined"
                    label="Product Website"
                    placeholder="Type your product website"
                    autoCapitalize='none'
                    textContentType='name'
                    value={website}
                    onChangeText={text => setWebsite(text)}
                />
                <List.Section title="Product Pricing Model">
                    <View style={styles.row}>
                        <Chip
                            selectedColor={selectedPrice == "Free" ? '#6202ED' : 'black'}
                            icon="information" onPress={() => {
                            setSelectedPrice('Free')
                        }} style={styles.chip}>
                            Free
                        </Chip>
                        <Chip
                            selectedColor={selectedPrice == "Mix" ? '#6202ED' : 'black'}
                            icon="information" onPress={() => {
                            setSelectedPrice('Mix')
                        }} style={styles.chip}>
                            Mix
                        </Chip>
                        <Chip
                            selectedColor={selectedPrice == "Paid" ? '#6202ED' : 'black'}
                            icon="information" onPress={() => {
                            setSelectedPrice('Paid')
                        }} style={styles.chip}>
                            Paid
                        </Chip>
                    </View>
                </List.Section>
                <List.Section title="Product Operating System">
                    <RadioButton.Group
                        style={{
                            color: 'black',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            flex: 1,
                        }}
                        onValueChange={newValue => setSelectedVariant(newValue)} value={selectedVariant}>
                        <RadioButton.Item style={{
                            flexWrap: 'wrap',
                            flex: 0.25,
                            margin: 3,
                            backgroundColor: 'lightgray'
                        }} label="Android" value="Android"
                        />
                        <RadioButton.Item
                            style={{
                                flexWrap: 'wrap',
                                flex: 0.25,
                                margin: 3,
                                backgroundColor: 'lightgray'
                            }}
                            label="iOS" value="iOS"/>
                        <RadioButton.Item
                            style={{
                                flexWrap: 'wrap',
                                flex: 0.25,
                                margin: 3,
                                backgroundColor: 'lightgray'
                            }} label="Website" value="Website"/>
                        <RadioButton.Item
                            style={{
                                flexWrap: 'wrap',
                                flex: 0.25,
                                margin: 3,
                                backgroundColor: 'lightgray'
                            }}
                            label="Other" value="Other"/>
                    </RadioButton.Group>
                </List.Section>
                <List.Section title="Product Category">
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCategory(itemValue)
                        }>
                        <Picker.Item label="Select Category" value="Other"/>
                        <Picker.Item label="Productivity" value="Productivity"/>
                        <Picker.Item label="Tech" value="Tech"/>
                        <Picker.Item label="Crypto" value="Crypto"/>
                        <Picker.Item label="Metaverse" value="Metaverse"/>
                        <Picker.Item label="Tools" value="Tools"/>
                        <Picker.Item label="Games" value="Games"/>
                        <Picker.Item label="Freelance" value="Freelance"/>
                        <Picker.Item label="Investing" value="Investing"/>
                        <Picker.Item label="Art" value="Art"/>
                        <Picker.Item label="Fashion" value="Fashion"/>
                        <Picker.Item label="Entertainment" value="Entertainment"/>
                        <Picker.Item label="Sports" value="Sports"/>
                        <Picker.Item label="Artificial Intelligence" value="Artificial Intelligence"/>
                        <Picker.Item label="Marketing" value="Marketing"/>
                        <Picker.Item label="User Experience" value="User Experience"/>
                        <Picker.Item label="Internet of Things" value="Internet of Things"/>
                        <Picker.Item label="Photography" value="Photography"/>
                        <Picker.Item label="Growth Hacking" value="Growth Hacking"/>
                        <Picker.Item label="Writing" value="Books / Writing"/>
                        <Picker.Item label="Android App" value="Android App"/>
                        <Picker.Item label="API" value="API"/>
                        <Picker.Item label="Web App" value="Web App"/>
                        <Picker.Item label="Fitness" value="Health and Fitness"/>
                        <Picker.Item label="iOS App" value="iOS App"/>
                        <Picker.Item label="Weather" value="Weather"/>
                        <Picker.Item label="FinTech" value="FinTech"/>
                        <Picker.Item label="Productivity" value="Productivity"/>
                        <Picker.Item label="Science" value="Science"/>
                        <Picker.Item label="Charity" value="Charity"/>
                        <Picker.Item label="Politics" value="Politics"/>
                        <Picker.Item label="Cooking" value="Cooking"/>
                        <Picker.Item label="Music" value="Music"/>
                        <Picker.Item label="Other" value="Other"/>
                    </Picker>
                </List.Section>
                <View style={{height: 20}}/>
                <Button icon="rocket" mode="contained" onPress={addPost}>
                    SUBMIT PRODUCT FOR REVIEW
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
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    chip: {
        margin: 4,
        flex: 0.33,
        backgroundColor: 'lightgray'
    },
});

export default AddScreen;
