import React from "react";
import {Alert, Linking, Platform, SafeAreaView, ScrollView, Share, StatusBar, StyleSheet, View} from "react-native";
import {Headline, List} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {loggingOut} from "../api/firebaseAPI";

const SettingScreen = () => {
    const navigation = useNavigation();

    const handlePressLogOut = () => {
        loggingOut().then(r => navigation.replace('OnBoardingScreen'));
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'ProductExplore | 🚀  Find your next favourite product 🔍 Launch your product here',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            // alert(error.message);
            alert('ProductExplore | 🚀  Find your next favourite product 🔍 Launch your product here')
        }
    };


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <SafeAreaView/>
            <View style={{marginTop: 20}}/>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"/>
            <Headline style={{fontWeight: 'bold'}}>Settings</Headline>
            <List.Item
                onPress={() => {
                    Platform.OS === "web" ? alert('Our product brings the best new items to our users. It\'s a place for tech enthusiasts to share and know about the latest mobile apps, websites, hardware projects, tech inventions, and innovations.') : Alert.alert("About Us", "Our product brings the best new items to our users. It's a place for tech enthusiasts to share and know about the latest mobile apps, websites, hardware projects, tech inventions, and innovations.")
                }}
                title="About Us"
                description="Who we are"
                left={props => <List.Icon {...props} icon="information"/>}
            />
            <List.Item
                title="Share Us"
                onPress={onShare}
                description="Share our product"
                left={props => <List.Icon {...props} icon="share"/>}
            />
            <List.Item
                onPress={() => Linking.openURL('mailto:rajakaleemlab@gmail.com?subject=ProductExplore | Feedback&body=Hello!')}
                title="Feedback"
                description="Give us feedback"
                left={props => <List.Icon {...props} icon="mail"/>}
            />
            <List.Item
                onPress={() =>
                    Platform.OS === "web" ? alert("It's simple and quick, with few steps process to share your product or explore other products!") :
                        Alert.alert("FAQs", "It's simple and quick, with few steps process to share your product or explore other products!")}
                title="FAQs"
                description="Frequently asked questions"
                left={props => <List.Icon {...props} icon="newspaper"/>}
            />
            <List.Item
                title="Advertise"
                onPress={() => Linking.openURL('mailto:rajakaleemlab@gmail.com?subject=ProductExplore | Advertise&body=Hello!')}
                description="Advertise your product"
                left={props => <List.Icon {...props} icon="cash"/>}
            />
            <List.Item
                onPress={() => navigation.navigate('Add')}
                title="New Product"
                description="Launch your product"
                left={props => <List.Icon {...props} icon="rocket"/>}
            />
            <List.Item
                onPress={handlePressLogOut}
                title="Sign Out"
                description="See you soon, Bye bye"
                left={props => <List.Icon {...props} icon="door"/>}
            />
            <View style={{height: 30}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#fff",
    },
});

export default SettingScreen;
