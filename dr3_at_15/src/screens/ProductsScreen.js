import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const PRODUTOS = [
  { 
    id: '101', 
    categoryId: '1', 
    nome: 'Hambúrguer Clássico', 
    preco: 25.90, 
    imagem: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400' 
  },
  { 
    id: '102', 
    categoryId: '1', 
    nome: 'Cheeseburger Duplo', 
    preco: 32.50, 
    imagem: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400' 
  },
  { 
    id: '201', 
    categoryId: '2', 
    nome: 'Suco Natural', 
    preco: 12.00, 
    imagem: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=400' 
  },
  { 
    id: '301', 
    categoryId: '3', 
    nome: 'Bolo de Chocolate', 
    preco: 15.00, 
    imagem: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400' 
  },
];

export default function ProductsScreen({ route, navigation }) {
  const { categoryId } = route.params;
  const produtosFiltrados = PRODUTOS.filter(p => p.categoryId === categoryId);

  const renderProduto = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtosFiltrados}
        keyExtractor={item => item.id}
        renderItem={renderProduto}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#ff5c5c',
    fontWeight: '600',
  }
});