import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import Colors from "../constants/Colors";

const RoundImage = props => {
    return (
        <View>
            <Image style={{
                ...{
                    width: props.width,
                    height: props.height,
                    borderRadius: props.width / 2
                }, ...props.styles
            }} source={props.source}/>
        </View>

    )

};

const styles = StyleSheet.create({
    main: {
        borderBottomColor: Colors.lightBorder,
        borderBottomWidth: 1,
        width: '90%'
    },
});

export default RoundImage;
