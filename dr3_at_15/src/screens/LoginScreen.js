import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserEmail } = useContext(AuthContext);

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Por favor, preencha e-mail e senha.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Por favor, insira um e-mail válido com @.');
      return;
    }

    setErrorMessage('');
    setUserEmail(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InfnetFood</Text>
      <Text style={styles.subtitle}>Faça login para pedir seu lanche</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage !== '' ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          title="Entrar"
          color="#ff5c5c"
          onPress={handleLogin}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff5c5c',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 5,
  }
});