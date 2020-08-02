import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../config';

let itemsRef = db.ref('/items');

export default class GetData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: []
        };
    }

    componentDidMount() {
        itemsRef.on('value', snapshot => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({ allData: items });
            console.log('Get Data ', items)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatlistStyle}
                    data={this.state.allData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(index) => index}
                    renderItem={({ item }) => (
                        <View style={styles.mainViewStyle}>
                            <Text style={styles.titleText}>Name : <Text style={styles.descriptionText}>{item.name}</Text></Text>
                            <Text style={styles.titleText}>Email : <Text style={styles.descriptionText}>{item.email}</Text></Text>
                            <Text style={styles.titleText}>Password : <Text style={styles.descriptionText}>{item.password}</Text></Text>
                        </View>
                    )} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    flatlistStyle: {
        padding: 15
    },

    mainViewStyle: {
        backgroundColor: 'lightgray',
        marginBottom: 15,
        padding: 10,
        borderRadius: 15
    },

    titleText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black'
    },

    descriptionText: {
        fontSize: 13,
        color: 'gray',
        fontWeight: 'normal'
    },

});