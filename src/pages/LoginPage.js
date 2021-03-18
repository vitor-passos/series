import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
    render() {
        return (
            <View>
                <FormRow>
                    <TextInput placeholder="Usuário" style={styles.input} />
                </FormRow>
                <FormRow>
                    <TextInput secureTextEntry={true} placeholder="Senha" style={styles.input} />
                </FormRow>
            </View>);
    }
}

const styles = StyleSheet.create({
    input: {
        marginLeft: 12,
    },
});