import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{restaurant.nome}</Text>
        <Text style={styles.subtitle}>{restaurant.culinaria}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.label}>Endereço:</Text>
        <Text style={styles.text}>{restaurant.endereco}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.label}>Exemplo do Cardápio:</Text>
        <Text style={styles.text}>{restaurant.itemCardapio}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Voltar ao Mapa" 
          color="#ff5c5c" 
          onPress={() => navigation.goBack()} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
    width: '100%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#ff5c5c',
    fontWeight: '600',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    maxWidth: 600,
  }
});