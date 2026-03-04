import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, ChevronRight, Home, Calendar, User as UserIcon } from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';
import { getSevas, getLineage } from '../services/api';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

const LINEAGE_DATA = [
  { id: '1', name: 'Acharya 1', image: 'https://api.a0.dev/assets/image?text=hindu%20acharya%20portrait&aspect=1:1' },
  { id: '2', name: 'Acharya 2', image: 'https://api.a0.dev/assets/image?text=spiritual%20guru%20portrait&aspect=1:1' },
  { id: '3', name: 'Acharya 3', image: 'https://api.a0.dev/assets/image?text=monk%20portrait&aspect=1:1' },
  { id: '4', name: 'Acharya 4', image: 'https://api.a0.dev/assets/image?text=vedic%20scholar%20portrait&aspect=1:1' },
  { id: '5', name: 'Acharya 5', image: 'https://api.a0.dev/assets/image?text=sanyasi%20portrait&aspect=1:1' },
];

const SEVAS_DATA = [
  { id: '1', name: 'Go Seva', location: 'Kanchipeetam Temple', price: '₹500', time: 'Morning', icon: '🐄' },
  { id: '2', name: 'Veda Rakshana', location: 'Kanchipeetam Temple', price: '₹1,000', time: 'Evening', icon: '📿' },
  { id: '3', name: 'Aalya Seva', location: 'Kanchipeetam Temple', price: '₹750', time: 'All Day', icon: '🏛️' },
  { id: '4', name: 'Maha Rudrabhishekam', location: 'Kanchipeetam Temple', price: '₹1,500', time: 'Weekend', icon: '🔱' },
];

const HomeScreen = ({ route, navigation }) => {
  const { userEmail } = route.params || { userEmail: 'devotee@temple.com' };
  const [sevas, setSevas] = useState(SEVAS_DATA);
  const [lineage, setLineage] = useState(LINEAGE_DATA);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [locationName, setLocationName] = useState('Fetching location...');

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      getCurrentLocation();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationName('Hitec City, Hyderabad');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        let address = reverseGeocode[0];
        const displayLoc = address.city || address.region || address.district || 'Hyderabad';
        setLocationName(`${displayLoc}, ${address.region || 'TS'}`);
      } else {
        setLocationName('Hyderabad, TS');
      }
    } catch (error) {
      console.log('Location Error:', error.message);
      setLocationName('Temple Proximity... (HYD)');
    }
  };

  const fetchData = async () => {
    try {
      const [sevasData, lineageData] = await Promise.all([
        getSevas().catch(() => null),
        getLineage().catch(() => null)
      ]);

      if (sevasData) setSevas(Array.isArray(sevasData) ? sevasData : sevasData.sevas || SEVAS_DATA);
      if (lineageData) setLineage(Array.isArray(lineageData) ? lineageData : lineageData.lineage || LINEAGE_DATA);
    } catch (err) {
      console.log('Fetch Data Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderLineageItem = ({ item }) => (
    <View style={styles.lineageItem}>
      <Image source={{ uri: item.image }} style={styles.lineageImage} />
    </View>
  );

  const renderSevaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.sevaCard}
      onPress={() => navigation.navigate('BookingScreen', { seva: item })}
    >
      <View style={styles.sevaIconBg}>
        <Text style={styles.sevaEmoji}>{item.icon}</Text>
      </View>
      <View style={styles.sevaInfo}>
        <Text style={styles.sevaName}>{item.name}</Text>
        <Text style={styles.sevaLoc}>{item.location}</Text>
      </View>
      <View style={styles.priceTag}>
        <Text style={styles.priceTxt}>{item.price}</Text>
        <Text style={styles.timeTxt}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>Kshetradarshini</Text>
          <View style={styles.locRow}>
            <MapPin size={14} color={COLORS.secondary} />
            <Text style={styles.locText}>{locationName}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.pfp} onPress={() => navigation.navigate('ProfileScreen', { email: userEmail })}>
          <UserIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
      >
        <View style={styles.content}>
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>Spiritual Lineage</Text>
            <FlatList
              horizontal
              data={lineage}
              renderItem={renderLineageItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={styles.sectionTitle}>Available Sevas</Text>
          {loading && !refreshing ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
          ) : (
            sevas.map(item => <View key={item.id}>{renderSevaItem({ item })}</View>)
          )}
        </View>
      </ScrollView>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab} onPress={() => { }}>
          <Home size={24} color={COLORS.primary} />
          <Text style={[styles.tabText, { color: COLORS.primary }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('PreviousPurchasesScreen')}>
          <Calendar size={24} color="#757575" />
          <Text style={styles.tabText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ProfileScreen', { email: userEmail })}>
          <UserIcon size={24} color="#757575" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: COLORS.primary, padding: 20, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locText: { color: COLORS.secondary, fontSize: 13, marginLeft: 4, fontWeight: '500' },
  pfp: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20 },
  banner: { backgroundColor: COLORS.cardBg, borderRadius: 20, padding: 15, marginBottom: 25 },
  bannerTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  lineageItem: { marginRight: 12 },
  lineageImage: { width: 70, height: 90, borderRadius: 10, borderWeight: 2, borderColor: COLORS.secondary },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 15 },
  sevaCard: { flexDirection: 'row', backgroundColor: 'white', padding: 12, borderRadius: 16, marginBottom: 15, alignItems: 'center', elevation: 2 },
  sevaIconBg: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  sevaEmoji: { fontSize: 24 },
  sevaInfo: { flex: 1 },
  sevaName: { fontSize: 16, fontWeight: 'bold' },
  sevaLoc: { fontSize: 12, color: '#666', marginTop: 2 },
  priceTag: { alignItems: 'flex-end' },
  priceTxt: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  timeTxt: { fontSize: 10, color: '#999', marginTop: 4 },
  tabs: { flexDirection: 'row', backgroundColor: 'white', padding: 10, borderTopWidth: 1, borderTopColor: '#EEE', justifyContent: 'space-around' },
  tab: { alignItems: 'center' },
  tabText: { fontSize: 11, marginTop: 4, color: '#757575' },
});

export default HomeScreen;
