import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const CATEGORIAS = [
  { id: '1', titulo: 'Lanches' },
  { id: '2', titulo: 'Bebidas' },
  { id: '3', titulo: 'Sobremesas' },
];

export default function HomeScreen({ navigation }) {
  const { setUserEmail } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const renderCategoria = ({ item }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={() => navigation.navigate('Products', { categoryId: item.id, categoryName: item.titulo })}
    >
      <Text style={[styles.cardTitle, { color: theme.text }]}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.title}>InfnetFood</Text>

      <View style={styles.quickAccessContainer}>
        <TouchableOpacity style={styles.quickAccessButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.quickAccessText}>Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickAccessButton} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.quickAccessText}>Mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAccessButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.quickAccessText}>Ajustes</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={CATEGORIAS}
        keyExtractor={item => item.id}
        renderItem={renderCategoria}
        contentContainerStyle={styles.list}
      />

      <Button title="Sair" color="#333" onPress={() => setUserEmail('')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ff5c5c', textAlign: 'center', marginVertical: 20 },
  quickAccessContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  quickAccessButton: { flex: 1, backgroundColor: '#e0e0e0', paddingVertical: 12, marginHorizontal: 4, borderRadius: 8, alignItems: 'center' },
  quickAccessText: { color: '#333', fontWeight: 'bold' },
  list: { paddingBottom: 20 },
  card: { padding: 20, borderRadius: 10, marginBottom: 15, alignItems: 'center', elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
});