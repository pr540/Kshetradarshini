import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    User,
    Settings,
    CreditCard,
    Bell,
    LogOut,
    ChevronRight,
    Github,
    Instagram,
    MessageCircle,
} from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

const ProfileScreen = ({ route, navigation }) => {
    const { email } = route.params || { email: 'devotee@temple.com' };
    const user = {
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        phone: '+91 98765 43210',
        location: 'Hitec City, Hyderabad',
        profilePic: 'https://api.a0.dev/assets/image?text=spiritual%20devotee%20avatar&aspect=1:1',
    };

    const handleMenuPress = (label) => {
        if (label === 'My Bookings') {
            navigation.navigate('PreviousPurchasesScreen');
        } else if (label === 'Notifications') {
            navigation.navigate('NotificationScreen');
        } else if (label === 'Settings') {
            navigation.navigate('SettingsScreen');
        } else if (label === 'Personal Information') {
            Alert.alert('Personal Info', `Name: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nLocation: ${user.location}`);
        } else {
            Alert.alert(
                label,
                `This section (${label}) will be available in the next update.`,
                [{ text: 'Namaste' }]
            );
        }
    };

    const menuItems = [
        { icon: <User size={22} color={COLORS.primary} />, label: 'Personal Information' },
        { icon: <CreditCard size={22} color={COLORS.primary} />, label: 'My Bookings' },
        { icon: <Bell size={22} color={COLORS.primary} />, label: 'Notifications' },
        { icon: <Settings size={22} color={COLORS.primary} />, label: 'Settings' },
    ];

    const socialLinks = [
        { icon: <MessageCircle size={24} color="#25D366" />, url: 'whatsapp://send?text=Namaste!', name: 'WhatsApp' },
        { icon: <Instagram size={24} color="#E4405F" />, url: 'https://instagram.com', name: 'Instagram' },
        { icon: <Github size={24} color="#333" />, url: 'https://github.com', name: 'GitHub' },
    ];

    const handleSocialLink = (url) => {
        Linking.openURL(url).catch(() => Alert.alert('Error', 'Could not open link'));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                <View style={styles.profileCard}>
                    <Image source={{ uri: user.profilePic }} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Devotee</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => handleMenuPress(item.label)}
                        >
                            <View style={styles.menuIconContainer}>
                                {item.icon}
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <ChevronRight size={20} color="#ADB5BD" />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Connect with Community</Text>
                <View style={styles.socialContainer}>
                    {socialLinks.map((link, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.socialIcon}
                            onPress={() => handleSocialLink(link.url)}
                        >
                            {link.icon}
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => navigation.navigate('LoginScreen')}
                >
                    <LogOut size={22} color={COLORS.primary} />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.versionText}>Spiritually Made In India • v1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingHorizontal: SIZES.padding,
        paddingTop: 30,
        paddingBottom: 50,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.padding,
        marginTop: -30,
        padding: 20,
        borderRadius: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: COLORS.secondary,
    },
    profileInfo: {
        marginLeft: 20,
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    userEmail: {
        fontSize: 13,
        color: '#6C757D',
        marginTop: 4,
    },
    tag: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 6,
        alignSelf: 'flex-start',
    },
    tagText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.secondaryDark,
        textTransform: 'uppercase',
    },
    menuContainer: {
        paddingHorizontal: SIZES.padding,
        marginTop: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    menuIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginHorizontal: SIZES.padding,
        marginTop: 15,
        marginBottom: 20,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    socialIcon: {
        width: 54,
        height: 54,
        backgroundColor: COLORS.white,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginHorizontal: SIZES.padding,
        backgroundColor: 'rgba(198, 40, 40, 0.05)',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginBottom: 30,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginLeft: 10,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    versionText: {
        color: '#ADB5BD',
        fontSize: 12,
    },
});

export default ProfileScreen;
