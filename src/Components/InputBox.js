import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

class InputBox extends Component {
    render() {
        return (
            <TextInput
                placeholder={this.props.placeholder}
                onChangeText={this.props.onChangeText}
                secureTextEntry={this.props.secureTextEntry}
                style={[styles.textAreaStyle, this.props.textAreaStyle]}
                value={this.props.value} />
        );
    }
}

const styles = StyleSheet.create({
    textAreaStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        height:40,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10
    },
});

export default InputBox;