import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.settingRow}>
          <View>
            <Text style={[styles.label, { color: theme.text }]}>Tema Escuro</Text>
            <Text style={[styles.subLabel, { color: theme.subtitle }]}>
              {isDarkMode ? 'Ativado' : 'Desativado'}
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: theme.accent }}
            thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={[styles.label, { color: theme.text }]}>Notificações</Text>
          <Text style={{ color: theme.accent }}>Configurar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subLabel: {
    fontSize: 14,
    marginTop: 4,
  },
});