import React from 'react';
import {
    View, TextInput, StyleSheet,
    Button, ActivityIndicator
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
        this.setState({ isLoading: true });
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log('Autenticado ', user)
            })
            .catch((error) => {
                console.log('Erro Login ', error)
            }).then(() => {
                this.setState({ isLoading: false });
            });

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