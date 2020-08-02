/*This is th Example of google Sign in*/
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { db } from '../config';
import InputBox from '../Components/InputBox';
import Button from '../Components/Button';

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            gettingLoginStatus: true,
            name: '',
            email: '',
            password: '',
        };
    }

    addItem = (name, email, password) => {
        db.ref('/items').push({
            name: name,
            email: email,
            password: password
        });
    };


    handleSubmit = () => {
        if (this.state.name == '' || this.state.email == '' || this.state.password == '') {
            alert('Any of the data should not empty');
        } else {
            this.addItem(this.state.name, this.state.email, this.state.password);
            alert('Data saved successfully');
            this.setState({
                name: '',
                email: '',
                password: ''
            })
        }
    };

    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '114172997686-sll663vmdptkkhpgsr137s0qiv0e6a1q.apps.googleusercontent.com',
        });
        this._isSignedIn();
    }

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            alert('User is already signed in');
            this._getCurrentUserInfo();
        } else {
            console.log('Please Login');
        }
        this.setState({ gettingLoginStatus: false });
    };

    _getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in yet');
            } else {
                console.log("Something went wrong. Unable to get user's info");
            }
        }
    };

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };

    _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ userInfo: null });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        if (this.state.gettingLoginStatus) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            if (this.state.userInfo != null) {
                return (
                    <View style={styles.container}>
                        <Image
                            source={{ uri: this.state.userInfo.user.photo }}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.text}>
                            Name: {this.state.userInfo.user.name}{' '}
                        </Text>
                        <Text style={styles.text}>
                            Email: {this.state.userInfo.user.email}
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={this._signOut}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <GoogleSigninButton
                            style={styles.googleButtonStyle}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Light}
                            onPress={this._signIn}
                        />
                        <View>

                            <View style={styles.titleViewStyle}>
                                <Text style={styles.addDataTitle}>Add Data to Firebase</Text>
                            </View>

                            <InputBox
                                placeholder="name"
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name} />

                            <InputBox
                                placeholder="email"
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email} />

                            <InputBox
                                placeholder="password"
                                onChangeText={(text) => this.setState({ password: text })}
                                secureTextEntry={true}
                                value={this.state.password} />

                            <Button
                                onPress={this.handleSubmit}
                                label="Save Data" />

                            <Button
                                onPress={() => this.props.navigation.navigate('Second')}
                                label="Get Data" />

                        </View>
                    </View>
                );
            }
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 30,
    },

    googleButtonStyle: {
        width: 312,
        height: 48,
        alignSelf: 'center',
        marginTop: 20
    },

    titleViewStyle: {
        marginVertical: 20
    },

    addDataTitle: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: 'gray'
    },
});