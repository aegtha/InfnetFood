import React, { useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const [quantidade, setQuantidade] = useState(1);
  const { addToCart } = useContext(CartContext);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const diminuir = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const aumentar = () => {
    setQuantidade(quantidade + 1);
  };

  const adicionarAoCarrinho = () => {
    addToCart(product, quantidade);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setTimeout(() => {
        opacityAnim.setValue(0);
        navigation.navigate('Cart');
      }, 600);
    });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imagem }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.nome}</Text>
        <Text style={styles.price}>R$ {(product.preco * quantidade).toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={diminuir} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantidade}</Text>
          <TouchableOpacity onPress={aumentar} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.addButton} onPress={adicionarAoCarrinho}>
            <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text style={[styles.successText, { opacity: opacityAnim }]}>
          Adicionado com sucesso!
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: '#ff5c5c',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ff5c5c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  }
});