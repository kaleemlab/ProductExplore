import React, {useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {HomeScreenList, MainContainer} from "../components";
import {Chip} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

const HomeScreen = ({route}) => {
    let [selectedColor, setSelectedColor] = useState("");
    const navigation = useNavigation();


    const chipFilter = [
        {
            icon: 'party-popper',
            title: 'Featured Products',
            id: 1
        },
        {
            icon: 'history',
            title: 'Most Recent',
            id: 2
        },
        {
            icon: 'trending-up',
            title: 'Trending',
            id: 3
        },
        {
            icon: 'ballot',
            title: 'Top Voted',
            id: 4
        },
        {
            icon: 'cash-100',
            title: 'Top 100',
            id: 5
        },
        {
            icon: 'cash-remove',
            title: 'Free Products',
            id: 6
        },
        {
            icon: 'cash',
            title: 'Paid Products',
            id: 7
        },
        {
            icon: 'tune',
            title: 'Mix Products',
            id: 8
        },


    ];


    return (
        <View style={styles.container}>
            <SafeAreaView/>
            <MainContainer>
                <FlatList
                    style={{
                        marginTop: 30,
                        height: 50,
                        flexGrow: 0
                    }}
                    data={chipFilter}
                    horizontal
                    keyExtractor={(item, index) => {
                        return item.id;
                    }}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    renderItem={
                        ({item}) => (
                            <TouchableOpacity
                                // onPress={() => alert("Filters will be available in next update:- " + item.title)}
                                style={styles.item}>
                                <Chip
                                    style={{
                                        backgroundColor: 'lightgray',
                                        margin: 7
                                    }} icon={item.icon}>{item.title}</Chip>
                            </TouchableOpacity>)}
                    keyExtractor={item => item.id}
                />
                <HomeScreenList/>
            </MainContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeScreen;
