import React, {useState} from "react";
import {Linking, Platform, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Avatar, Button, Card, Chip, Paragraph, Snackbar, Subheading, Title, TouchableRipple} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import {useStoreActions} from "easy-peasy";
import {Ionicons} from "@expo/vector-icons";
import firebase from "firebase";

const HomeDetailScreen = ({route}) => {
    const navigation = useNavigation();
    const {postItem} = route.params.postObject;

    const add = useStoreActions((actions) => actions.addExpense);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedVariant, setSelectedVariant] = useState();
    const [selectedPrice, setSelectedPrice] = useState();

    const [visible, setVisible] = React.useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const onToggleSnackBar = () => {
        const db = firebase.firestore();
        const increment = firebase.firestore.FieldValue.increment(1);
        db.collection("posts")
            .doc(route.params.postObject.key)
            .update({
                totalVote: increment
            })
        setVisible(!visible);
        setTimeout(() => {
            navigation.navigate('Home')
        }, 1500);

    }


    let periods = {
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
    };

    function formatTime(timeCreated) {
        let diff = Date.now() - timeCreated;

        if (diff > periods.month) {
            // it was at least a month ago
            return Math.floor(diff / periods.month) + " months ago";
        } else if (diff > periods.week) {
            return Math.floor(diff / periods.week) + " weeks ago";
        } else if (diff > periods.day) {
            return Math.floor(diff / periods.day) + " days ago";
        } else if (diff > periods.hour) {
            return Math.floor(diff / periods.hour) + " hours ago";
        } else if (diff > periods.minute) {
            return Math.floor(diff / periods.minute) + " minutes ago";
        }
        return "Just now";
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <SafeAreaView>
                <View style={{flex: 1, marginTop: 10, alignItems: 'center'}}>
                    <Avatar.Image
                        size={100}
                        source={route.params.postObject.logo.length !== 0 ? {uri: route.params.postObject.logo} : require('../../assets/favicon.png')}
                    />
                </View>
                <Card style={{padding: 10}}>
                    <Card.Content>
                        <Title>{route.params.postObject.name}</Title>
                        <Paragraph>{route.params.postObject.description}</Paragraph>
                    </Card.Content>
                    <View style={{height: 10}}/>
                    <View style={styles.row}>
                        <Chip icon="cash" onPress={() => {
                            alert("Product has " + (route.params.postObject.selectedPrice).toLowerCase() + " pricing options.")
                        }} style={styles.chip}>
                            {route.params.postObject.selectedPrice} Options
                        </Chip>
                        <Chip icon="apps" onPress={() => {
                            alert("Product is for " + (route.params.postObject.selectedVariant).toLowerCase() + " users.")
                        }} style={styles.chip}>
                            {route.params.postObject.selectedVariant}
                        </Chip>
                    </View>
                    <View style={{height: 10}}/>
                    <View style={styles.row}>
                        <Chip icon="shape" onPress={() => {
                            alert("Product belongs to " + (route.params.postObject.selectedCategory).toLowerCase() + " category.")
                        }} style={{...styles.chip, flex: 1}}>
                            {route.params.postObject.selectedCategory}
                        </Chip>
                    </View>
                    <View style={{height: 10}}/>
                    <View style={styles.row}>
                        <Chip icon="account" onPress={() => {
                            alert("Product is shared by " + (route.params.postObject.userName).toLowerCase() + ".")
                        }} style={styles.chip}>
                            {(route.params.postObject.userName).split(" ")[0]}
                        </Chip>
                        <Chip icon="clock" onPress={() => {
                            alert("Product was posted " + formatTime(route.params.postObject.time) + ".")
                        }} style={styles.chip}>
                            {formatTime(route.params.postObject.time)}
                        </Chip>
                    </View>
                    <View style={{height: 20}}/>
                    <TouchableRipple
                        onPress={onToggleSnackBar}>
                        <View style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: 'lightgray',
                            borderRadius: 10,
                            padding: 5,
                            marginTop: 5,
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <Ionicons name="caret-up" size={25}/>
                            <Subheading>{route.params.postObject.totalVote}</Subheading>
                        </View>
                    </TouchableRipple>
                    <View style={{height: 25}}/>
                    <Button icon="account" mode="text"
                            onPress={() => Linking.openURL('mailto:' + route.params.postObject.email + '?subject=ProductExplore | ' + route.params.postObject.name + '&body=Hello!')}>
                        CONTACT OWNER
                    </Button>
                    <View style={{height: 20}}/>
                    <Button icon="link" mode="contained"
                            onPress={() =>
                                Platform.OS === 'web' ?
                                    window.open(route.params.postObject.website, '_blank')
                                    :
                                    Linking.openURL(route.params.postObject.website)}>
                        VISIT PRODUCT WEBSITE
                    </Button>
                    <View style={{height: 20}}/>
                </Card>
                <View style={{height: 30}}/>
            </SafeAreaView>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Undo',
                    onPress: () => {
                        // Do something
                    },
                }}>
                Your vote has been counted!
            </Snackbar>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
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
        flex: 0.50,
        backgroundColor: 'lightgray'
    },
});

export default HomeDetailScreen;
