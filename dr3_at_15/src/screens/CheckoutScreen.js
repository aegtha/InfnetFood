import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { buscaEnderecoPorCep } from '../services/CepService';
import { sendOrderNotification } from '../services/NotificationService';

export default function CheckoutScreen({ navigation }) {
  const { cart, totalDoCarrinho } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [carregandoCep, setCarregandoCep] = useState(false);
  const [erro, setErro] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.5)).current;

  const handleCepChange = async (text) => {
    setCep(text);
    if (text.length === 8) {
      setCarregandoCep(true);
      const resultado = await buscaEnderecoPorCep(text);
      if (resultado) {
        setEndereco(resultado);
        setErro('');
      } else {
        setErro('CEP não encontrado.');
      }
      setCarregandoCep(false);
    }
  };

  const handleFinalizar = async () => {
    if (endereco.trim() === '' || metodoPagamento === '') {
      setErro('Por favor, valide o endereço e escolha o pagamento.');
      return;
    }
    
    setIsSuccess(true);
    await sendOrderNotification("Pedido Confirmado!", "Já estamos preparando seu lanche.");

    Animated.parallel([
      Animated.timing(overlayOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(modalScale, { toValue: 1, friction: 5, useNativeDriver: true })
    ]).start(() => {
      setTimeout(() => {
        setIsSuccess(false);
        navigation.navigate('Home');
      }, 2500);
    });
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Resumo</Text>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold' }}>
            Total: R$ {totalDoCarrinho.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Entrega (ViaCEP API)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.inputBorder }]}
            placeholder="Digite o CEP (apenas números)"
            placeholderTextColor={theme.subtitle}
            value={cep}
            onChangeText={handleCepChange}
            keyboardType="numeric"
            maxLength={8}
          />
          {carregandoCep && <ActivityIndicator size="small" color="#ff5c5c" style={{ marginTop: 10 }} />}
          <TextInput
            style={[styles.input, { marginTop: 10, backgroundColor: theme.input, color: theme.text, borderColor: theme.inputBorder }]}
            placeholder="Endereço completo"
            placeholderTextColor={theme.subtitle}
            value={endereco}
            onChangeText={setEndereco}
            multiline
          />
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Pagamento</Text>
          <View style={styles.paymentContainer}>
            {['Pix', 'Cartão', 'Dinheiro'].map((metodo) => (
              <TouchableOpacity 
                key={metodo}
                style={[styles.paymentButton, metodoPagamento === metodo && styles.paymentSelected]}
                onPress={() => setMetodoPagamento(metodo)}
              >
                <Text style={[styles.paymentText, metodoPagamento === metodo && styles.paymentTextSelected]}>
                  {metodo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

        <TouchableOpacity style={styles.confirmButton} onPress={handleFinalizar}>
          <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </ScrollView>

      {isSuccess && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <Animated.View style={[styles.successModal, { transform: [{ scale: modalScale }] }]}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successModalText}>Sucesso!</Text>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: { padding: 20, alignItems: 'center' },
  card: { padding: 20, borderRadius: 12, marginBottom: 20, width: '100%', maxWidth: 600, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  paymentContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  paymentButton: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  paymentSelected: { backgroundColor: '#ff5c5c', borderColor: '#ff5c5c' },
  paymentText: { fontSize: 14, color: '#555' },
  paymentTextSelected: { color: '#fff' },
  errorText: { color: 'red', marginBottom: 20, fontWeight: 'bold' },
  confirmButton: { backgroundColor: '#ff5c5c', padding: 15, borderRadius: 8, width: '100%', maxWidth: 600, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  successModal: { backgroundColor: '#fff', padding: 30, borderRadius: 20, alignItems: 'center', width: '80%' },
  successIcon: { fontSize: 50, marginBottom: 10 },
  successModalText: { fontSize: 20, fontWeight: 'bold' }
});