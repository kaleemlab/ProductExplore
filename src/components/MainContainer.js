import React from "react";
import {StyleSheet, View} from "react-native";

const MainContainer = ({children}) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
});

export default MainContainer;
