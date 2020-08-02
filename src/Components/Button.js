import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

class Button extends Component {
    render() {
        return (
            <View style={styles.buttonStyle}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.innerButtonView}>
                        <Text style={styles.buttonText}>{this.props.label}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        marginHorizontal: 40,
        marginVertical: 15
    },

    innerButtonView: {
        backgroundColor: 'skyblue',
        borderRadius: 15,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
});

export default Button;