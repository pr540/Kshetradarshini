import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronLeft, Calendar } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

const NOTIFICATIONS = [
  { id: '1', title: 'Booking Confirmed!', msg: 'Your Go Seva is scheduled for tomorrow.', time: '2 mins ago' },
  { id: '2', title: 'Divine Offering', msg: 'New Maha Rudrabhishekam slots are now open.', time: '1 hour ago' },
  { id: '3', title: 'Namaste!', msg: 'Thank you for joining Kshetradarshini.', time: '1 day ago' },
];

const NotificationScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 28 }} />
      </View>
      
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.notiCard}>
            <View style={styles.iconBg}>
              <Bell size={20} color={COLORS.primary} />
            </View>
            <View style={styles.notiInfo}>
              <Text style={styles.notiTitle}>{item.title}</Text>
              <Text style={styles.notiMsg}>{item.msg}</Text>
              <Text style={styles.notiTime}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: 'white' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  notiCard: { flexDirection: 'row', backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 2 },
  iconBg: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  notiInfo: { flex: 1 },
  notiTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  notiMsg: { fontSize: 14, color: '#666', marginTop: 4 },
  notiTime: { fontSize: 12, color: '#999', marginTop: 8 },
});

export default NotificationScreen;
