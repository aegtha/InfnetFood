import React from 'react';
import { StyleSheet, View, Text, Platform, ScrollView } from 'react-native';

let MapView, Marker, Callout;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  Callout = Maps.Callout;
}

const RESTAURANTES = [
  { id: 1, nome: "Bistrô Carioca", culinaria: "Francesa", lat: -22.9050, lng: -43.1750, endereco: "Rua do Ouvidor, 50 - Centro", itemCardapio: "Croissant de Amêndoas" },
  { id: 2, nome: "Feijoada da Vovó", culinaria: "Brasileira", lat: -22.9070, lng: -43.1720, endereco: "Rua da Carioca, 12 - Centro", itemCardapio: "Feijoada Completa com Couve" },
  { id: 3, nome: "Sushi Centro", culinaria: "Japonesa", lat: -22.9030, lng: -43.1780, endereco: "Av. Rio Branco, 156 - Centro", itemCardapio: "Combo Salmão 20 peças" },
  { id: 4, nome: "Pizza do Porto", culinaria: "Italiana", lat: -22.9080, lng: -43.1700, endereco: "Praça Mauá, 1 - Centro", itemCardapio: "Pizza Margherita" },
  { id: 5, nome: "Tacos El Loko", culinaria: "Mexicana", lat: -22.9060, lng: -43.1760, endereco: "Rua Sete de Setembro, 88 - Centro", itemCardapio: "Taco Al Pastor" },
  { id: 6, nome: "Churrascaria Rio", culinaria: "Carnes", lat: -22.9040, lng: -43.1730, endereco: "Rua Buenos Aires, 200 - Centro", itemCardapio: "Picanha na Brasa" },
  { id: 7, nome: "Veggie Vida", culinaria: "Vegetariana", lat: -22.9090, lng: -43.1740, endereco: "Rua do Rosário, 114 - Centro", itemCardapio: "Hambúrguer de Grão de Bico" },
  { id: 8, nome: "Café Imperial", culinaria: "Cafeteria", lat: -22.9020, lng: -43.1710, endereco: "Rua da Assembleia, 10 - Centro", itemCardapio: "Cappuccino Italiano e Pão de Queijo" },
  { id: 9, nome: "Bacalhau do Gomes", culinaria: "Portuguesa", lat: -22.9010, lng: -43.1770, endereco: "Rua Primeiro de Março, 20 - Centro", itemCardapio: "Bacalhau à Gomes de Sá" },
  { id: 10, nome: "Burger Carioca", culinaria: "Fast Food", lat: -22.9000, lng: -43.1750, endereco: "Av. Presidente Vargas, 500 - Centro", itemCardapio: "Smash Burger Duplo com Bacon" }
];

export default function MapScreen({ navigation }) {
  const initialRegion = {
    latitude: -22.9050,
    longitude: -43.1740,
    latitudeDelta: 0.02, 
    longitudeDelta: 0.02,
  };

  if (Platform.OS === 'web') {
    return (
      <ScrollView contentContainerStyle={styles.webContainer}>
        <Text style={styles.webTitle}>Restaurantes - Centro do RJ</Text>
        <View style={styles.webList}>
          {RESTAURANTES.map((restaurante) => (
            <View key={restaurante.id} style={styles.webItem}>
              <Text style={styles.nome}>{restaurante.nome}</Text>
              <Text style={styles.culinaria}>{restaurante.culinaria}</Text>
              <Text 
                style={styles.dicaWeb} 
                onPress={() => navigation.navigate('RestaurantDetails', { restaurant: restaurante })}
              >
                Ver detalhes
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={initialRegion}
        showsUserLocation={true} 
      >
        {RESTAURANTES.map((restaurante) => (
          <Marker
            key={restaurante.id}
            coordinate={{ latitude: restaurante.lat, longitude: restaurante.lng }}
          >
            <Callout onPress={() => navigation.navigate('RestaurantDetails', { restaurant: restaurante })}>
              <View style={styles.calloutContainer}>
                <Text style={styles.nome}>{restaurante.nome}</Text>
                <Text style={styles.culinaria}>{restaurante.culinaria}</Text>
                <Text style={styles.dica}>Toque para ver detalhes</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    padding: 10,
    minWidth: 150,
    alignItems: 'center',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333'
  },
  culinaria: {
    fontSize: 14,
    color: '#ff5c5c',
    marginBottom: 6,
  },
  dica: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic'
  },
  webContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  webTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  webList: {
    width: '100%',
    maxWidth: 800,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  webItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 250,
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dicaWeb: {
    fontSize: 14,
    color: '#ff5c5c',
    fontWeight: 'bold',
    marginTop: 10,
    cursor: 'pointer',
  }
});