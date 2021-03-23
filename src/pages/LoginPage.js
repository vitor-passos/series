import React from 'react';
import {
    View, TextInput, StyleSheet, Button, ActivityIndicator,
    Text, Alert
} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }

    componentDidMount() {
        const firebaseConfig = {
            apiKey: "AIzaSyDqs-dnuly5TorI5rprIDh7QZeiFE4YB7Y",
            authDomain: "series-68b78.firebaseapp.com",
            projectId: "series-68b78",
            storageBucket: "series-68b78.appspot.com",
            messagingSenderId: "762145942008",
            appId: "1:762145942008:web:ec3eaabb91943b96f88e0d"
        };
        // Initialize Firebase
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    onChangeHandlerInput(key, value) {
        this.setState({
            [key]: value
        });
    }

    tryLogin() {
        this.setState({ isLoading: true, message: '' });
        const { email, password } = this.state;
        const loginUserSuccess = user => {
            this.setState({ message: "Sucesso" });
        }
        const loginUserFailed = error => {
            this.setState({ message: this.getMessageByErrorCode(error.code) })
        }
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                loginUserSuccess(user)
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('Usuário não encontrado', 'Deseja criar um cadastro com as informções inseridas?',
                        [{
                            text: 'Não',
                            onPress: () => {
                                console.log('Usuário não criado');
                            }
                        }, {
                            text: 'Sim',
                            onPress: () => {
                                firebase.auth()
                                    .createUserWithEmailAndPassword(email, password)
                                    .then((user) => { loginUserSuccess(user) })
                                    .catch((error) => { loginUserFailed(error) })
                            }
                        }], { cancelable: false })
                    return;
                }
                loginUserFailed(error);
            }).then(() => {
                this.setState({ isLoading: false });
            });

    }

    getMessageByErrorCode(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Senha Incorreta';
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/weak-password':
                return 'Senha Fraca';
            default:
                return 'Erro desconhecido';
        }
    }

    renderMessage() {
        const { message } = this.state;
        if (!message) {
            return null;
        }
        return (<View>
            <Text>{message}</Text>
        </View>);
    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator size="large" color="#348feb" />;
        }
        return (<Button title="Entrar" onPress={() => this.tryLogin()} />);
    }

    render() {
        return (
            <View style={styles.container}>
                <FormRow first>
                    <TextInput placeholder="Email"
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={value => this.onChangeHandlerInput('email', value)} />
                </FormRow>
                <FormRow last>
                    <TextInput secureTextEntry={true}
                        placeholder="Senha"
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandlerInput('password', value)} />
                </FormRow>
                {this.renderButton()}
                {this.renderMessage()}
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        paddingLeft: 12,
    },
});