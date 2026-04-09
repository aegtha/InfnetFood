import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { userEmail } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.name}>Usuário Logado</Text>
        <Text style={styles.email}>{userEmail}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Voltar" 
          color="#666" 
          onPress={() => navigation.goBack()} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#ff5c5c',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  }
});