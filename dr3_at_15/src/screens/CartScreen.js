import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, totalDoCarrinho } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.quantidade}x {item.nome}</Text>
        <Text style={styles.itemPrice}>R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: R$ {totalDoCarrinho.toFixed(2)}</Text>
            <Button 
              title="Avançar para Checkout" 
              color="#ff5c5c" 
              onPress={() => navigation.navigate('Checkout')} 
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  list: {
    paddingBottom: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5c5c',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 15,
    marginTop: 10,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'right',
  }
});