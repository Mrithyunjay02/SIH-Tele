import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Alert,
} from 'react-native';

// --- Language Translations ---
const translations = {
  en: {
    title: 'Sehat Saathi',
    login: 'Login',
    register: 'Register',
    email: 'Email Address',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    village: 'Village Name',
    confirmPassword: 'Confirm Password',
    householdArea: 'Household Area',
    houseNo: 'House No.',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    getOTP: 'Get OTP',
    verifyOTP: 'Verify OTP',
    enterOTP: 'Enter the 4-digit OTP sent to your phone.',
    searchVillage: 'Search for your village...',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
  },
  hi: {
    title: 'सेहत साथी',
    login: 'लॉग इन करें',
    register: 'पंजीकरण करें',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    phone: 'फ़ोन नंबर',
    village: 'गाँव का नाम',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    householdArea: 'घर का क्षेत्र',
    houseNo: 'घर का नंबर',
    gender: 'लिंग',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    getOTP: 'ओटीपी प्राप्त करें',
    verifyOTP: 'ओटीपी सत्यापित करें',
    enterOTP: 'अपने फोन पर भेजा गया 4 अंकों का ओटीपी दर्ज करें।',
    searchVillage: 'अपने गांव की खोज करें...',
    noAccount: 'खाता नहीं है?',
    haveAccount: 'पहले से ही एक खाता है?',
  },
  pa: {
    title: 'ਸਿਹਤ ਸਾਥੀ',
    login: 'ਲਾਗਿਨ ਕਰੋ',
    register: 'ਰਜਿਸਟਰ ਕਰੋ',
    email: 'ਈਮੇਲ ਪਤਾ',
    password: 'ਪਾਸਵਰਡ',
    firstName: 'ਪਹਿਲਾ ਨਾਂ',
    lastName: 'ਆਖਰੀ ਨਾਂ',
    phone: 'ਫੋਨ ਨੰਬਰ',
    village: 'ਪਿੰਡ ਦਾ ਨਾਮ',
    confirmPassword: 'ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    householdArea: 'ਘਰ ਦਾ ਖੇਤਰ',
    houseNo: 'ਮਕਾਨ ਨੰਬਰ',
    gender: 'ਲਿੰਗ',
    male: 'ਮਰਦ',
    female: 'ਔਰਤ',
    other: 'ਹੋਰ',
    getOTP: 'OTP ਪ੍ਰਾਪਤ ਕਰੋ',
    verifyOTP: 'OTP ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    enterOTP: 'ਆਪਣੇ ਫ਼ੋਨ ਤੇ ਭੇਜਿਆ 4-ਅੰਕਾਂ ਦਾ OTP ਦਾਖਲ ਕਰੋ।',
    searchVillage: 'ਆਪਣੇ ਪਿੰਡ ਦੀ ਖੋਜ ਕਰੋ...',
    noAccount: 'ਖਾਤਾ ਨਹੀਂ ਹੈ?',
    haveAccount: 'ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਖਾਤਾ ਹੈ?',
  },
};

// --- Mock Village Data (for hackathon demo) ---
const punjabVillages = [
  { id: '1', name: 'Nabha', pincode: '147201' },
  { id: '2', name: 'Alhoran', pincode: '147201' },
  { id: '3', name: 'Thuhi', pincode: '147201' },
  { id: '4', name: 'Kakrala', pincode: '147022' },
  { id: '5', name: 'Bhawanigarh', pincode: '148026' },
  { id: '6', name: 'Sangrur', pincode: '148001' },
  { id: '7', name: 'Patiala', pincode: '147001' },
  // Add more villages as needed for the demo
];

const AuthScreen = () => {
  const [lang, setLang] = useState('en');
  const [isLogin, setIsLogin] = useState(true);
  const [otpScreen, setOtpScreen] = useState(false);
  const [villageModal, setVillageModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('male');

  const t = translations[lang];
  const filteredVillages = punjabVillages.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegister = async () => {
    // --- In a real app, this would call your backend's /register endpoint ---
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    // For the demo, we'll just show the OTP screen
    setOtpScreen(true);
  };

  const renderVillageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.villageItem}
      onPress={() => {
        setSelectedVillage(item);
        setVillageModal(false);
      }}>
      <Text style={styles.villageText}>{`${item.name}, ${item.pincode}`}</Text>
    </TouchableOpacity>
  );

  if (otpScreen) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{t.verifyOTP}</Text>
          <Text style={styles.subtitle}>{t.enterOTP}</Text>
          <TextInput
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={4}
          />
          <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Success", "Registration Complete!")}>
            <Text style={styles.buttonText}>{t.verifyOTP}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.langSelector}>
          <TouchableOpacity onPress={() => setLang('en')} style={[styles.langButton, lang === 'en' && styles.langButtonActive]}><Text style={styles.langText}>English</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setLang('hi')} style={[styles.langButton, lang === 'hi' && styles.langButtonActive]}><Text style={styles.langText}>हिन्दी</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setLang('pa')} style={[styles.langButton, lang === 'pa' && styles.langButtonActive]}><Text style={styles.langText}>ਪੰਜਾਬੀ</Text></TouchableOpacity>
        </View>

        <Text style={styles.title}>{t.title}</Text>

        {isLogin ? (
          // --- LOGIN FORM ---
          <>
            <TextInput style={styles.input} placeholder={t.email} placeholderTextColor="#9CA3AF" />
            <TextInput style={styles.input} placeholder={t.password} placeholderTextColor="#9CA3AF" secureTextEntry />
            <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>{t.login}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(false)}><Text style={styles.toggleText}>{t.noAccount} {t.register}</Text></TouchableOpacity>
          </>
        ) : (
          // --- REGISTER FORM ---
          <>
            <TextInput style={styles.input} placeholder={t.firstName} placeholderTextColor="#9CA3AF" onChangeText={setFirstName}/>
            <TextInput style={styles.input} placeholder={t.lastName} placeholderTextColor="#9CA3AF" onChangeText={setLastName}/>
            <TextInput style={styles.input} placeholder={t.phone} placeholderTextColor="#9CA3AF" keyboardType="phone-pad" onChangeText={setPhone}/>
            <TextInput style={styles.input} placeholder={t.email} placeholderTextColor="#9CA3AF" keyboardType="email-address" onChangeText={setEmail}/>

            <TouchableOpacity style={styles.input} onPress={() => setVillageModal(true)}>
              <Text style={{color: selectedVillage ? '#FFF' : '#9CA3AF'}}>{selectedVillage ? `${selectedVillage.name}, ${selectedVillage.pincode}` : t.village}</Text>
            </TouchableOpacity>

            <TextInput style={styles.input} placeholder={t.password} placeholderTextColor="#9CA3AF" secureTextEntry onChangeText={setPassword}/>
            <TextInput style={styles.input} placeholder={t.confirmPassword} placeholderTextColor="#9CA3AF" secureTextEntry onChangeText={setConfirmPassword}/>

            <Text style={styles.label}>{t.gender}</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity onPress={() => setGender('male')} style={[styles.genderButton, gender === 'male' && styles.genderActive]}><Text style={styles.langText}>{t.male}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setGender('female')} style={[styles.genderButton, gender === 'female' && styles.genderActive]}><Text style={styles.langText}>{t.female}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setGender('other')} style={[styles.genderButton, gender === 'other' && styles.genderActive]}><Text style={styles.langText}>{t.other}</Text></TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}><Text style={styles.buttonText}>{t.getOTP}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(true)}><Text style={styles.toggleText}>{t.haveAccount} {t.login}</Text></TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* Village Search Modal */}
      <Modal visible={villageModal} animationType="slide" onRequestClose={() => setVillageModal(false)}>
        <SafeAreaView style={styles.modalContainer}>
            <TextInput style={styles.searchInput} placeholder={t.searchVillage} placeholderTextColor="#9CA3AF" onChangeText={setSearchQuery} />
            <FlatList data={filteredVillages} renderItem={renderVillageItem} keyExtractor={item => item.id} />
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#111827' },
    scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
    content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    langSelector: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
    langButton: { paddingVertical: 8, paddingHorizontal: 16, marginHorizontal: 5, borderRadius: 20, backgroundColor: '#374151' },
    langButtonActive: { backgroundColor: '#2563EB' },
    langText: { color: '#FFF' },
    title: { fontSize: 36, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginBottom: 30 },
    subtitle: { fontSize: 16, color: '#9CA3AF', textAlign: 'center', marginBottom: 20, paddingHorizontal: 20 },
    input: { backgroundColor: '#1F2937', color: '#FFF', paddingHorizontal: 15, paddingVertical: 15, borderRadius: 10, marginBottom: 15, fontSize: 16 },
    button: { backgroundColor: '#2563EB', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    toggleText: { color: '#60A5FA', textAlign: 'center', marginTop: 20 },
    label: { color: '#D1D5DB', fontSize: 16, marginBottom: 10, marginLeft: 5 },
    genderContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
    genderButton: { padding: 15, borderRadius: 10, backgroundColor: '#374151', width: '30%', alignItems: 'center' },
    genderActive: { backgroundColor: '#2563EB' },
    otpInput: { backgroundColor: '#1F2937', color: '#FFF', padding: 20, borderRadius: 10, width: '60%', textAlign: 'center', fontSize: 24, letterSpacing: 10 },
    modalContainer: { flex: 1, backgroundColor: '#111827', paddingTop: 20 },
    searchInput: { backgroundColor: '#1F2937', color: '#FFF', padding: 15, borderRadius: 10, margin: 10, fontSize: 16 },
    villageItem: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#374151' },
    villageText: { color: '#FFF', fontSize: 18 },
});

export default AuthScreen;

