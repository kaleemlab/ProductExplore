import React, {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {ActivityIndicator, Avatar, Caption, Card, Subheading, Title, TouchableRipple} from 'react-native-paper';
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import firebase from "firebase";

const HomeScreenList = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [postView, setPostView] = useState([]); // Initial empty array of users

    useEffect(() => {
        const subscriber = firebase.firestore()
            .collection('posts')
            .orderBy("time", "desc")
            .onSnapshot(querySnapshot => {
                const posts = [];

                querySnapshot.forEach(documentSnapshot => {
                    posts.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setPostView(posts);
                setLoading(false);
            });

        return () => subscriber();
    }, []);

    if (loading) {
        return <View style={{
            flex: 1,
            flexDirection: "column",
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            textAlign: 'center',
        }}>
            <ActivityIndicator
                color={"#6202ED"}
                size={"large"}
                style={{
                    flex: 0.7, width: '100%'
                }}/>
            <Title style={{
                marginTop: 5,
                flex: 0.2, width: '100%',
                alignItems: 'center',
                fontSize: 15,
                justifyContent: 'center',
                textAlignVertical: 'center',
                textAlign: 'center'
            }}>🚀 Loading your next favourite product 🔍</Title>
        </View>;
    }

    return (
        <FlatList
            style={{flex: 1, width: '100%', paddingHorizontal: 10}}
            data={postView}
            keyExtractor={(item, index) => {
                return item.key;
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
                <Card
                    onPress={() => navigation.navigate("HomeDetail", {
                        postObject: item
                    })}
                    elevation={1}
                    mode={"elevated"}
                    style={{marginVertical: 5, borderRadius: 4}}>
                    <Card.Title
                        title={item.name}
                        subtitle={item.description}
                        left={(props) =>
                            <Avatar.Image {...props}
                                          size={45}
                                          source={item.logo.length !== 0 ? {uri: item.logo} : require('../../assets/favicon.png')}/>
                        }
                        rightStyle={{marginRight: 10}}
                        right={(props) =>
                            <TouchableRipple>
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
                                    <Subheading>{item.totalVote}</Subheading>
                                </View>
                            </TouchableRipple>
                        }
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center',
                            flex: 3,
                            flexWrap: 'wrap',
                            paddingHorizontal: 10,
                            marginTop: 5,
                            alignItems: 'center'
                        }}>
                        <Caption style={{
                            justifyContent: 'center', alignItems: 'center',
                            flex: 1, textAlignVertical: "center"
                        }}>by {(item.userName).split(" ")[0]}</Caption>
                        <Caption style={{
                            justifyContent: 'center', alignItems: 'center',
                            flex: 1, textAlignVertical: "center"
                        }}>{item.selectedPrice} Options</Caption>
                        <Caption style={{
                            justifyContent: 'center', alignItems: 'center',
                            flex: 1, textAlignVertical: "center"
                        }}>{item.selectedCategory}</Caption>
                    </View>
                </Card>

            )}
            keyExtractor={(item) => item.id}
        />
    );
};

export default HomeScreenList;
