import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

// --- Mock Data and Helpers (No changes here) ---
const punjabVillages = [
  { name: 'Nabha', pincode: '147201' },
  { name: 'Badal', pincode: '152113' },
  { name: 'Kila Raipur', pincode: '141202' },
  { name: 'Khant Maanpur', pincode: '140406' },
  { name: 'Sansarpur', pincode: '144024' },
  { name: 'Longowal', pincode: '148106'},
  { name: 'Abhepur', pincode: '147201' },
  { name: 'Achal', pincode: '147201' },
  { name: 'Agaul', pincode: '147201' },
  { name: 'Ageta', pincode: '147201' },
  { name: 'Ageti', pincode: '147201' },
  { name: 'Ajnoda Kalan', pincode: '147201' },
  { name: 'Ajnoda Khurd', pincode: '147201' },
  { name: 'Akalgarh', pincode: '147201' },
  { name: 'Alampur', pincode: '147201' },
  { name: 'Alhoran', pincode: '147201' },
  { name: 'Alipur', pincode: '147201' },
  { name: 'Allowal', pincode: '147201' },
  { name: 'Babarpur', pincode: '147201' },
  { name: 'Banera Kalan', pincode: '147201' },
  { name: 'Banera Khurd', pincode: '147201' },
  { name: 'Barhe', pincode: '147201' },
  { name: 'Bauran Kalan', pincode: '147201' },
  { name: 'Bauran Khurd', pincode: '147201' },
  { name: 'Bazidri', pincode: '147201' },
  { name: 'Bazidpur', pincode: '147201' },
  { name: 'Behbalpur', pincode: '147201' },
  { name: 'Bhadson', pincode: '147201' },
  { name: 'Bhari Panechan', pincode: '147201' },
  { name: 'Bhilowal', pincode: '147201' },
  { name: 'Bhojo Majri', pincode: '147201' },
  { name: 'Bhore', pincode: '147201' },
  { name: 'Bina Heri', pincode: '147201' },
  { name: 'Bir Agaul', pincode: '147201' },
  { name: 'Bir Bauran', pincode: '147201' },
  { name: 'Bir Bhadson', pincode: '147201' },
  { name: 'Bir Dosanjhan', pincode: '147201' },
  { name: 'Birarhwal', pincode: '147201' },
  { name: 'Birdhano', pincode: '147201' },
  { name: 'Bishangarh', pincode: '147201' },
  { name: 'Bishanpura', pincode: '147201' },
  { name: 'Bugga Khurd', pincode: '147201' },
  { name: 'Chahal', pincode: '147201' },
  { name: 'Chaswal', pincode: '147201' },
  { name: 'Chathe', pincode: '147201' },
  { name: 'Chhaju Bhatt', pincode: '147201' },
  { name: 'Chhana Nathuwali', pincode: '147201' },
  { name: 'Choudhri Majra', pincode: '147201' },
  { name: 'Dakaunda', pincode: '147201' },
  { name: 'Dandrala Dhindsa', pincode: '147201' },
  { name: 'Dandrala Kharaur', pincode: '147201' },
  { name: 'Dargapur', pincode: '147201' },
  { name: 'Dewangarh', pincode: '147201' },
  { name: 'Dhanaura', pincode: '147201' },
  { name: 'Dhangera', pincode: '147201' },
  { name: 'Dharoki', pincode: '147201' },
  { name: 'Dhingi', pincode: '147201' },
  { name: 'Dhundewal', pincode: '147201' },
  { name: 'Dittupur Jattan', pincode: '147201' },
  { name: 'Doda', pincode: '147201' },
  { name: 'Duladi', pincode: '147201' },
  { name: 'Faizgarh', pincode: '147201' },
  { name: 'Faridpur', pincode: '147201' },
  { name: 'Fatehpur', pincode: '147201' },
  { name: 'Gadaya', pincode: '147201' },
  { name: 'Galwati', pincode: '147201' },
  { name: 'Ghamrouda', pincode: '147201' },
  { name: 'Ghaniawal', pincode: '147201' },
  { name: 'Ghanurki', pincode: '147201' },
  { name: 'Ghunder', pincode: '147201' },
  { name: 'Gobindgarh Chhanna', pincode: '147201' },
  { name: 'Gobindpura', pincode: '147201' },
  { name: 'Gujarheri', pincode: '147201' },
  { name: 'Gunike', pincode: '147201' },
  { name: 'Gurditpura', pincode: '147201' },
  { name: 'Hakimpur', pincode: '147201' },
  { name: 'Halla', pincode: '147201' },
  { name: 'Halotali', pincode: '147201' },
  { name: 'Hari Nagar', pincode: '147201' },
  { name: 'Harigarh', pincode: '147201' },
  { name: 'Hassanpur', pincode: '147201' },
  { name: 'Hiana Kalan', pincode: '147201' },
  { name: 'Hiana Khurd', pincode: '147201' },
  { name: 'Ichhewal', pincode: '147201' },
  { name: 'Jasso Majra', pincode: '147201' },
  { name: 'Jatiwal', pincode: '147201' },
  { name: 'Jhambali Khas', pincode: '147201' },
  { name: 'Jhambali Sahni', pincode: '147201' },
  { name: 'Jindalpur', pincode: '147201' },
  { name: 'Kaidupur', pincode: '147201' },
  { name: 'Kakrala', pincode: '147201' },
  { name: 'Kalar Majri', pincode: '147201' },
  { name: 'Kalhana', pincode: '147201' },
  { name: 'Kalhe Majra', pincode: '147201' },
  { name: 'Kalsana', pincode: '147201' },
  { name: 'Kameli', pincode: '147201' },
  { name: 'Kansuha Kalan', pincode: '147201' },
  { name: 'Kansuha Khurd', pincode: '147201' },
  { name: 'Kaul', pincode: '147201' },
  { name: 'Khanora', pincode: '147201' },
  { name: 'Kheri Jattan', pincode: '147201' },
  { name: 'Khizerpur', pincode: '147201' },
  { name: 'Khokh', pincode: '147201' },
  { name: 'Kishangarh', pincode: '147201' },
  { name: 'Kot Kalan', pincode: '147201' },
  { name: 'Kot Khurd', pincode: '147201' },
  { name: 'Kotli', pincode: '147201' },
  { name: 'Kularan', pincode: '147201' },
  { name: 'Labana Karmoo', pincode: '147201' },
  { name: 'Labana Teku', pincode: '147201' },
  { name: 'Ladha Heri', pincode: '147201' },
  { name: 'Lalauda', pincode: '147201' },
  { name: 'Lohar Majra', pincode: '147201' },
  { name: 'Lopa', pincode: '147201' },
  { name: 'Lout', pincode: '147201' },
  { name: 'Malewal', pincode: '147201' },
  { name: 'Malkon', pincode: '147201' },
  { name: 'Mandaur', pincode: '147201' },
  { name: 'Mangewal', pincode: '147201' },
  { name: 'Mansurpur', pincode: '147201' },
  { name: 'Matourda', pincode: '147201' },
  { name: 'Mehas', pincode: '147201' },
  { name: 'Mohal Gawara', pincode: '147201' },
  { name: 'Mungo', pincode: '147201' },
  { name: 'Nanoki', pincode: '147201' },
  { name: 'Nanowal', pincode: '147201' },
  { name: 'Naraingarh', pincode: '147201' },
  { name: 'Narmana', pincode: '147201' },
  { name: 'Nauhra', pincode: '147201' },
  { name: 'Paharpur', pincode: '147201' },
  { name: 'Pahlia Kalan', pincode: '147201' },
  { name: 'Pahlia Khurd', pincode: '147201' },
  { name: 'Paidan', pincode: '147201' },
  { name: 'Pednni Khurd', pincode: '147201' },
  { name: 'Raimal Majri', pincode: '147201' },
  { name: 'Raisal', pincode: '147201' },
  { name: 'Raj Garh', pincode: '147201' },
  { name: 'Rajpura', pincode: '147201' },
  { name: 'Ramgarh', pincode: '147201' },
  { name: 'Ramgarh Chhanna', pincode: '147201' },
  { name: 'Ram Singh Nau', pincode: '147201' },
  { name: 'Rampur Sahiewal', pincode: '147201' },
  { name: 'Ranjitgarh', pincode: '147201' },
  { name: 'Ranno', pincode: '147201' },
  { name: 'Rohta', pincode: '147201' },
  { name: 'Rohti Basta Singh', pincode: '147201' },
  { name: 'Rohti Chhanna', pincode: '147201' },
  { name: 'Rohti Khas', pincode: '147201' },
  { name: 'Rohti Mouran', pincode: '147201' },
  { name: 'Sadhnauli', pincode: '147201' },
  { name: 'Sadho Heri', pincode: '147201' },
  { name: 'Sahauli', pincode: '147201' },
  { name: 'Sakohan', pincode: '147201' },
  { name: 'Sakrali', pincode: '147201' },
  { name: 'Saluwala', pincode: '147201' },
  { name: 'Sangatpura', pincode: '147201' },
  { name: 'Sauja', pincode: '147201' },
  { name: 'Shahpur', pincode: '147201' },
  { name: 'Shamaspur', pincode: '147201' },
  { name: 'Shamla', pincode: '147201' },
  { name: 'Sheikhpura', pincode: '147201' },
  { name: 'Shivgarh', pincode: '147201' },
  { name: 'Simbhron', pincode: '147201' },
  { name: 'Siri Nagar', pincode: '147201' },
  { name: 'Sudhewal', pincode: '147201' },
  { name: 'Sukhewal', pincode: '147201' },
  { name: 'Suraajpur', pincode: '147201' },
  { name: 'Tarkheri Kalan', pincode: '147201' },
  { name: 'Tarkheri Khurd', pincode: '147201' },
  { name: 'Thuhi', pincode: '147201' },
  { name: 'Todarwal', pincode: '147201' },
  { name: 'Tohra', pincode: '147201' },
  { name: 'Tungan', pincode: '147201' },
  { name: 'Udha', pincode: '147201' },
  { name: 'Uplan', pincode: '147201' }
];
const translations = {
  en: { title: "Create Your Account", subtitle: "Join Sehat Saathi to access rural healthcare.", firstName: "First Name", lastName: "Last Name", phone: "Phone Number", village: "Village Name", searchVillage: "Search your village...", gender: "Gender", male: "Male", female: "Female", other: "Other", email: "Email Address", password: "Password", confirmPassword: "Confirm Password", register: "Register", otpTitle: "Verify Your Phone Number", otpSubtitle: "Enter the 4-digit code sent to your phone.", verify: "Verify OTP", haveAccount: "Already have an account?", login: "Login here", },
  hi: { title: "अपना खाता बनाएं", subtitle: "ग्रामीण स्वास्थ्य सेवाओं तक पहुंचने के लिए सेहत साथी से जुड़ें।", firstName: "पहला नाम", lastName: "अंतिम नाम", phone: "फ़ोन नंबर", village: "गाँव का नाम", searchVillage: "अपना गाँव खोजें...", gender: "लिंग", male: "पुरुष", female: "महिला", other: "अन्य", email: "ईमेल पता", password: "पासवर्ड", confirmPassword: "पासवर्ड की पुष्टि करें", register: "पंजीकरण करें", otpTitle: "अपना फ़ोन नंबर सत्यापित करें", otpSubtitle: "अपने फ़ोन पर भेजा गया 4-अंकीय कोड दर्ज करें।", verify: "ओटीपी सत्यापित करें", haveAccount: "क्या आपका खाता पहले से है?", login: "यहां लॉगिन करें", },
  pa: { title: "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ", subtitle: "ਪੇਂਡੂ ਸਿਹਤ ਸੇਵਾਵਾਂ ਤੱਕ ਪਹੁੰਚ ਕਰਨ ਲਈ ਸਿਹਤ ਸਾਥੀ ਨਾਲ ਜੁੜੋ।", firstName: "ਪਹਿਲਾ ਨਾਂ", lastName: "ਆਖਰੀ ਨਾਂ", phone: "ਫੋਨ ਨੰਬਰ", village: "ਪਿੰਡ ਦਾ ਨਾਮ", searchVillage: "ਆਪਣਾ ਪਿੰਡ ਲੱਭੋ...", gender: "ਲਿੰਗ", male: "ਮਰਦ", female: "ਔਰਤ", other: "ਹੋਰ", email: "ਈਮੇਲ ਪਤਾ", password: "ਪਾਸਵਰਡ", confirmPassword: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ", register: "ਰਜਿਸਟਰ ਕਰੋ", otpTitle: "ਆਪਣਾ ਫ਼ੋਨ ਨੰਬਰ ਤਸਦੀਕ ਕਰੋ", otpSubtitle: "ਤੁਹਾਡੇ ਫ਼ੋਨ 'ਤੇ ਭੇਜਿਆ ਗਿਆ 4-ਅੰਕਾਂ ਦਾ ਕੋਡ ਦਾਖਲ ਕਰੋ।", verify: "OTP ਤਸਦੀਕ ਕਰੋ", haveAccount: "ਕੀ ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?", login: "ਇੱਥੇ ਲੌਗਇਨ ਕਰੋ", }
};
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;

const RegisterPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  // State and handlers (no changes needed here)
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', village: '', gender: '', email: '', password: '', confirmPassword: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVillages, setFilteredVillages] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleVillageSearch = (e) => { const term = e.target.value; setSearchTerm(term); if (term) { setFilteredVillages(punjabVillages.filter(v => v.name.toLowerCase().includes(term.toLowerCase()) || v.pincode.includes(term))); } else { setFilteredVillages([]); } };
  const selectVillage = (village) => { setFormData({ ...formData, village: `${village.name} (${village.pincode})` }); setSearchTerm(`${village.name} (${village.pincode})`); setFilteredVillages([]); };
  const handleRegisterSubmit = (e) => { e.preventDefault(); if (formData.password !== formData.confirmPassword) { alert("Passwords do not match!"); return; } console.log("Form Data Submitted:", formData); setStep(2); };
  const handleOtpSubmit = (e) => { e.preventDefault(); alert("Registration Successful! Please log in."); navigate('/login'); };

  // --- THIS IS THE UPDATED STYLING FOR THE INPUT FIELDS ---
  const inputClasses = "w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 transition-colors">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-1">
          <button onClick={() => setLang('en')} className={`px-3 py-1 text-sm rounded ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}>EN</button>
          <button onClick={() => setLang('hi')} className={`px-3 py-1 text-sm rounded ${lang === 'hi' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}>HI</button>
          <button onClick={() => setLang('pa')} className={`px-3 py-1 text-sm rounded ${lang === 'pa' ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}>PA</button>
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>

      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-colors">
        {step === 1 ? (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">{t.title}</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">{t.subtitle}</p>
            <form onSubmit={handleRegisterSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Fields now use the new `inputClasses` variable */}
              <div className="md:col-span-1"><input name="firstName" onChange={handleInputChange} placeholder={t.firstName} required className={inputClasses} /></div>
              <div className="md:col-span-1"><input name="lastName" onChange={handleInputChange} placeholder={t.lastName} required className={inputClasses} /></div>
              <div className="md:col-span-2"><input name="phone" type="tel" onChange={handleInputChange} placeholder={t.phone} required className={inputClasses} /></div>
              
              <div className="md:col-span-2 relative">
                <input type="text" value={searchTerm} onChange={handleVillageSearch} placeholder={t.searchVillage} className={inputClasses} />
                {filteredVillages.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredVillages.map((v, i) => (
                      <li key={i} onClick={() => selectVillage(v)} className="p-3 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">{v.name} - {v.pincode}</li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="md:col-span-2"><select name="gender" onChange={handleInputChange} required className={inputClasses}><option value="">{t.gender}</option><option value="male">{t.male}</option><option value="female">{t.female}</option><option value="other">{t.other}</option></select></div>
              <div className="md:col-span-2"><input name="email" type="email" onChange={handleInputChange} placeholder={t.email} required className={inputClasses} /></div>
              <div className="md:col-span-1"><input name="password" type="password" onChange={handleInputChange} placeholder={t.password} required className={inputClasses} /></div>
              <div className="md:col-span-1"><input name="confirmPassword" type="password" onChange={handleInputChange} placeholder={t.confirmPassword} required className={inputClasses} /></div>
              
              <button type="submit" className="md:col-span-2 w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">{t.register}</button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t.otpTitle}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">{t.otpSubtitle}</p>
            <form onSubmit={handleOtpSubmit} className="flex flex-col items-center space-y-6">
                <input type="text" maxLength="4" placeholder="----" required className="p-4 text-3xl tracking-[1em] text-center w-40 border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"/>
                <button type="submit" className="w-full max-w-xs py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">{t.verify}</button>
            </form>
          </div>
        )}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          {t.haveAccount} <Link to="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">{t.login}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

