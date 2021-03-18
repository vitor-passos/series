import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const FormRow = props => {
    const { children } = props;

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        elevation: 1,
        backgroundColor: 'white'
    }
})

export default FormRow;