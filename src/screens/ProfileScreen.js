import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Linking,
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
    Linkedin,
    Instagram,
    MessageCircle, // For WhatsApp
} from 'lucide-react-native';
import { COLORS, SIZES } from '../constants/theme';

const ProfileScreen = ({ route, navigation }) => {
    const { email } = route.params || { email: 'devotee@temple.com' };
    const user = {
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        phone: '+91 9988776655',
        profilePic: 'https://api.a0.dev/assets/image?text=spiritual%20person%20avatar&aspect=1:1',
    };

    const menuItems = [
        { icon: <User size={22} color={COLORS.primary} />, label: 'Personal Information', screen: 'Profile' },
        { icon: <CreditCard size={22} color={COLORS.primary} />, label: 'My Bookings', screen: 'PreviousPurchasesScreen' },
        { icon: <Bell size={22} color={COLORS.primary} />, label: 'Notifications', screen: 'Profile' },
        { icon: <Settings size={22} color={COLORS.primary} />, label: 'Settings', screen: 'Profile' },
    ];

    const socialLinks = [
        { icon: <MessageCircle size={24} color="#25D366" />, url: 'whatsapp://send?text=Namaste!', name: 'WhatsApp' },
        { icon: <Github size={24} color="#333" />, url: 'https://github.com', name: 'GitHub' },
        { icon: <Linkedin size={24} color="#0077B5" />, url: 'https://linkedin.com', name: 'LinkedIn' },
        { icon: <Instagram size={24} color="#E4405F" />, url: 'https://instagram.com', name: 'Instagram' },
    ];

    const handleSocialLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => item.screen && navigation.navigate(item.screen)}
                        >
                            <View style={styles.menuIconContainer}>
                                {item.icon}
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <ChevronRight size={20} color="#757575" />
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Connect with Us</Text>
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
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.versionText}>Version 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: 20,
        backgroundColor: COLORS.primary,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.padding,
        marginTop: -20,
        padding: 20,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.secondary,
    },
    profileInfo: {
        marginLeft: 20,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    userEmail: {
        fontSize: 14,
        color: '#757575',
        marginTop: 4,
    },
    menuContainer: {
        paddingHorizontal: SIZES.padding,
        marginTop: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginHorizontal: SIZES.padding,
        marginTop: 20,
        marginBottom: 15,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    socialIcon: {
        width: 60,
        height: 60,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginHorizontal: SIZES.padding,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: 12,
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
        marginBottom: 30,
    },
    versionText: {
        color: '#757575',
        fontSize: 12,
    },
});

export default ProfileScreen;
