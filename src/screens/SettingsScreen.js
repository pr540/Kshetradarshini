import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Bell, Lock, Eye, Languages, HelpCircle } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

const SettingsScreen = ({ navigation }) => {
  const [notiEnabled, setNotiEnabled] = React.useState(true);

  const SettingItem = ({ icon: Icon, label, value, type = 'chevron' }) => (
    <TouchableOpacity style={styles.item}>
       <View style={styles.iconContainer}><Icon size={20} color={COLORS.primary} /></View>
       <Text style={styles.label}>{label}</Text>
       {type === 'switch' ? (
         <Switch value={value} onValueChange={setNotiEnabled} trackColor={{ true: COLORS.primary }} />
       ) : (
         <ChevronLeft size={20} color="#CCC" style={{ transform: [{ rotate: '180deg'}] }} />
       )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>
      
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <SettingItem icon={Bell} label="Push Notifications" value={notiEnabled} type="switch" />
        <SettingItem icon={Languages} label="App Language" />
        
        <Text style={styles.sectionTitle}>Security</Text>
        <SettingItem icon={Lock} label="Change Password" />
        <SettingItem icon={Eye} label="Privacy Policy" />
        
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingItem icon={HelpCircle} label="Help Center" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: 'white' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', marginTop: 20, marginBottom: 10, marginLeft: 5 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 10 },
  iconContainer: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  label: { flex: 1, fontSize: 16, color: COLORS.text },
});

export default SettingsScreen;
