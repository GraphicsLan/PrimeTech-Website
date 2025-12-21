// African countries with phone codes and placeholders
const africanCountries = [
    { name: "Algeria", code: "+213", placeholder: "XX XXX XXXX" },
    { name: "Angola", code: "+244", placeholder: "XXX XXX XXX" },
    { name: "Benin", code: "+229", placeholder: "XX XX XXXX" },
    { name: "Botswana", code: "+267", placeholder: "XX XXX XXX" },
    { name: "Burkina Faso", code: "+226", placeholder: "XX XX XXXX" },
    { name: "Burundi", code: "+257", placeholder: "XX XX XXXX" },
    { name: "Cabo Verde", code: "+238", placeholder: "XXX XX XX" },
    { name: "Cameroon", code: "+237", placeholder: "XX XX XX XX" },
    { name: "Central African Republic", code: "+236", placeholder: "XX XX XX XX" },
    { name: "Chad", code: "+235", placeholder: "XX XX XX XX" },
    { name: "Comoros", code: "+269", placeholder: "XXX XX XX" },
    { name: "Congo", code: "+242", placeholder: "XX XXX XXX" },
    { name: "Côte d'Ivoire", code: "+225", placeholder: "XX XX XX XX" },
    { name: "Djibouti", code: "+253", placeholder: "XX XX XX XX" },
    { name: "DR Congo", code: "+243", placeholder: "XX XXX XXXX" },
    { name: "Egypt", code: "+20", placeholder: "XX XXXX XXXX" },
    { name: "Equatorial Guinea", code: "+240", placeholder: "XX XXX XXXX" },
    { name: "Eritrea", code: "+291", placeholder: "XX XXX XXX" },
    { name: "Eswatini", code: "+268", placeholder: "XX XX XXXX" },
    { name: "Ethiopia", code: "+251", placeholder: "XX XXX XXXX" },
    { name: "Gabon", code: "+241", placeholder: "XX XX XX XX" },
    { name: "Gambia", code: "+220", placeholder: "XXX XXXX" },
    { name: "Ghana", code: "+233", placeholder: "XX XXX XXXX" },
    { name: "Guinea", code: "+224", placeholder: "XX XXX XXXX" },
    { name: "Guinea-Bissau", code: "+245", placeholder: "XXX XXXX" },
    { name: "Kenya", code: "+254", placeholder: "7XXXXXXXX" },
    { name: "Lesotho", code: "+266", placeholder: "XX XXX XXX" },
    { name: "Liberia", code: "+231", placeholder: "XX XXX XXXX" },
    { name: "Libya", code: "+218", placeholder: "XX XXX XXXX" },
    { name: "Madagascar", code: "+261", placeholder: "XX XX XXX XX" },
    { name: "Malawi", code: "+265", placeholder: "XX XXX XXX" },
    { name: "Mali", code: "+223", placeholder: "XX XX XX XX" },
    { name: "Mauritania", code: "+222", placeholder: "XX XX XX XX" },
    { name: "Mauritius", code: "+230", placeholder: "XXX XXXX" },
    { name: "Morocco", code: "+212", placeholder: "XX XX XX XX" },
    { name: "Mozambique", code: "+258", placeholder: "XX XXX XXX" },
    { name: "Namibia", code: "+264", placeholder: "XX XXX XXXX" },
    { name: "Niger", code: "+227", placeholder: "XX XX XX XX" },
    { name: "Nigeria", code: "+234", placeholder: "XXX XXX XXXX" },
    { name: "Rwanda", code: "+250", placeholder: "7XX XXX XXX" },
    { name: "Sao Tome and Principe", code: "+239", placeholder: "XX XXXXX" },
    { name: "Senegal", code: "+221", placeholder: "XX XXX XX XX" },
    { name: "Seychelles", code: "+248", placeholder: "X XXX XXX" },
    { name: "Sierra Leone", code: "+232", placeholder: "XX XXX XXX" },
    { name: "Somalia", code: "+252", placeholder: "XX XXX XXXX" },
    { name: "South Africa", code: "+27", placeholder: "XX XXX XXXX" },
    { name: "South Sudan", code: "+211", placeholder: "XX XXX XXXX" },
    { name: "Sudan", code: "+249", placeholder: "XX XXX XXXX" },
    { name: "Tanzania", code: "+255", placeholder: "XX XXX XXXX" },
    { name: "Togo", code: "+228", placeholder: "XX XXX XXX" },
    { name: "Tunisia", code: "+216", placeholder: "XX XXX XXX" },
    { name: "Uganda", code: "+256", placeholder: "XXX XXX XXX" },
    { name: "Zambia", code: "+260", placeholder: "XX XXX XXXX" },
    { name: "Zimbabwe", code: "+263", placeholder: "XX XXX XXXX" }
];

document.addEventListener('DOMContentLoaded', function() {
    initNationalityDropdown();
    initForms();
    detectCountry(); // Auto-detect user's country
    // Add keyboard support for password toggle icons
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

function initNationalityDropdown() {
    const select = document.getElementById('nationality');
    // render all country options
    function renderOptions(list) {
        // remove existing (but keep the first placeholder)
        select.innerHTML = '';
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Select country';
        select.appendChild(placeholder);

        list.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = country.name;
            option.dataset.code = country.code;
            option.dataset.placeholder = country.placeholder;
            select.appendChild(option);
        });
    }

    renderOptions(africanCountries);

    // wire up the combobox input and datalist to provide inline search in the dropdown
    const input = document.getElementById('nationalityInput');
    const datalist = document.getElementById('countryList');
    const status = document.getElementById('countrySearchStatus');

    function renderDatalist(list) {
        if (!datalist) return;
        datalist.innerHTML = '';
        list.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.name;
            datalist.appendChild(opt);
        });
    }

    renderDatalist(africanCountries);

    if (input) {
        input.addEventListener('input', function() {
            const q = this.value.trim().toLowerCase();
            if (!q) {
                renderDatalist(africanCountries);
                if (status) status.textContent = '';
                return;
            }

            const filtered = africanCountries.filter(c => c.name.toLowerCase().includes(q));
            renderDatalist(filtered.length ? filtered : []);
            if (status) status.textContent = filtered.length ? filtered.length + ' matches found' : 'No matches found';

            // if exact match exists, auto-select it and update phone code
            const exact = africanCountries.find(c => c.name.toLowerCase() === q);
            if (exact) {
                select.value = exact.name;
                updatePhoneCode();
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = this.value.trim();
                const match = africanCountries.find(c => c.name.toLowerCase() === val.toLowerCase()) || africanCountries.find(c => c.name.toLowerCase().includes(val.toLowerCase()));
                if (match) {
                    this.value = match.name;
                    select.value = match.name;
                    updatePhoneCode();
                    const phone = document.getElementById('phoneNumber');
                    if (phone) phone.focus();
                }
            }
        });
    }

    // when a country is selected/changed programmatically, clear the input and restore the full datalist
    select.addEventListener('change', function() {
        if (input) {
            input.value = this.value || '';
            renderDatalist(africanCountries);
            if (status) status.textContent = '';
        }
    });

   
}

// Backwards-compatible wrapper used by HTML onchange handlers
function updateCountryCode() {
    updatePhoneCode();
}

function updatePhoneCode() {
    const select = document.getElementById('nationality');
    const selectedOption = select.options[select.selectedIndex];
    const phoneInput = document.getElementById('phoneNumber');
    const countryCodeDisplay = document.getElementById('countryCodeDisplay');
    
    if (selectedOption.value) {
        // Prefer dataset.code; if missing, try to find code from the countries list
        const code = selectedOption.dataset.code || (africanCountries.find(c => c.name.toLowerCase() === selectedOption.value.toLowerCase()) || {}).code;
        countryCodeDisplay.textContent = code || '+';
        phoneInput.placeholder = selectedOption.dataset.placeholder || 'Phone number';
        phoneInput.value = '';
        
        // Show example placeholder based on country
        if (selectedOption.value === "Kenya") {
            phoneInput.placeholder = "7XXXXXXXX";
        }
        
        // Focus on phone input
        setTimeout(() => phoneInput.focus(), 100);
    }
}

// Try IP-based geolocation as a stronger fallback to set country code and nationality
async function detectCountryByIP() {
    try {
        const resp = await fetch('https://ipapi.co/json/');
        if (!resp.ok) return;
        const data = await resp.json();
        const select = document.getElementById('nationality');
        const countryName = data.country_name;
        const countryCodeAlpha2 = data.country; // e.g., 'KE'

        if (countryName) {
            const option = Array.from(select.options).find(o => o.value.toLowerCase() === countryName.toLowerCase() || o.textContent.toLowerCase().includes(countryName.toLowerCase()));
            if (option) {
                select.value = option.value;
                updatePhoneCode();
                return true;
            }
        }

        // map alpha2 to calling code fallback
        const regionToCallingCode = {
            KE: '+254', NG: '+234', ZA: '+27', EG: '+20', GH: '+233', TZ: '+255', UG: '+256'
        };
        if (countryCodeAlpha2 && regionToCallingCode[countryCodeAlpha2]) {
            const countryCodeDisplay = document.getElementById('countryCodeDisplay');
            if (countryCodeDisplay) countryCodeDisplay.textContent = regionToCallingCode[countryCodeAlpha2];
            return true;
        }
    } catch (e) {
        // ignore network errors
    }
    return false;
}

function detectCountry() {
    // In a real application, use IP geolocation API
    // For demo, try to guess based on browser language
    const userLang = navigator.language || navigator.userLanguage;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const select = document.getElementById('nationality');

    // Region -> country mappings for common locales (fallback if Intl.DisplayNames unavailable)
    const regionToCountry = {
        KE: 'Kenya', NG: 'Nigeria', ZA: 'South Africa', EG: 'Egypt', GH: 'Ghana', TZ: 'Tanzania', UG: 'Uganda', ZM: 'Zambia', RW: 'Rwanda'
    };

    // Region -> calling code mapping (used if select doesn't contain the user's country)
    const regionToCallingCode = {
        US: '+1', GB: '+44', IN: '+91', AU: '+61', CA: '+1', KE: '+254', NG: '+234', ZA: '+27', EG: '+20'
    };

    // 1) Try region from navigator.language (e.g., en-KE -> KE)
    let detectedName = null;
    let detectedRegion = null;
    if (userLang && userLang.indexOf('-') !== -1) {
        const region = userLang.split('-')[1].toUpperCase();
        detectedRegion = region;
        try {
            const dn = new Intl.DisplayNames([navigator.language], { type: 'region' });
            const regionName = dn.of(region);
            if (regionName) detectedName = regionName;
        } catch (e) {
            // Use fallback map
            if (regionToCountry[region]) detectedName = regionToCountry[region];
        }
    }

    // 2) Fallback to timezone heuristics if language didn't give a match
    if (!detectedName) {
        if (timezone && timezone.includes('Cairo')) detectedName = 'Egypt';
        else if (timezone && timezone.includes('Johannesburg')) detectedName = 'South Africa';
        else if (timezone && timezone.includes('Lagos')) detectedName = 'Nigeria';
        else if (timezone && timezone.includes('Nairobi')) detectedName = 'Kenya';
    }

    // 3) If we detected a region/country name, try to select it
    if (detectedName) {
        const option = Array.from(select.options).find(o => o.value.toLowerCase() === detectedName.toLowerCase() || o.textContent.toLowerCase().includes(detectedName.toLowerCase()));
        if (option) {
            select.value = option.value;
            updatePhoneCode();
            return;
        }
    }

    // If we couldn't match a country option, but we know the region, set the calling code directly
    if (detectedRegion && regionToCallingCode[detectedRegion]) {
        const countryCodeDisplay = document.getElementById('countryCodeDisplay');
        if (countryCodeDisplay) countryCodeDisplay.textContent = regionToCallingCode[detectedRegion];
        // Also set a reasonable placeholder on phone input if possible
        const phoneInput = document.getElementById('phoneNumber');
        if (phoneInput) phoneInput.placeholder = 'Phone number';
        return;
    }

    // Final fallback: pick Kenya if present, otherwise first available
    const kenyaOption = select.querySelector('option[value="Kenya"]');
    if (kenyaOption) {
        select.value = 'Kenya';
        updatePhoneCode();
    } else if (select.options.length > 1) {
        select.selectedIndex = 1;
        updatePhoneCode();
    }

    // If heuristics didn't set anything meaningful, attempt IP-based detection
    detectCountryByIP();
}



function initForms() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        if (!validateEmail(email)) {
            showError('loginEmail', 'Please enter a valid email address');
            return;
        }
        
        if (password.length < 6) {
            showError('loginPassword', 'Password must be at least 6 characters');
            return;
        }
        
        const btn = this.querySelector('.btn');
        btn.classList.add('loading');
        btn.disabled = true;
        
        // Simulate login
        setTimeout(() => {
            btn.classList.remove('loading');
            btn.disabled = false;
            
            if (email === "demo@example.com" && password === "password123") {
                showToast('Welcome back! Redirecting to dashboard...', 'success');
                this.reset();
            } else {
                showToast('Invalid email or password. Try "demo@example.com" / "password123"', 'error');
            }
        }, 1500);
    });
    
    // Signup form
    document.getElementById('signupForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const phone = document.getElementById('phoneNumber').value.trim();
        const terms = document.getElementById('terms').checked;
        
        // Reset errors
        resetFormErrors();
        
        if (!validateEmail(email)) {
            showError('signupEmail', 'Please enter a valid email address');
            return;
        }
        
        const strength = checkPasswordStrength();
        if (strength === 'Weak' || strength === 'Too short') {
            const msg = strength === 'Too short' ? 'Password is too short — minimum 6 characters' : 'Please choose a stronger password';
            showError('signupPassword', msg);
            return;
        }
        
        if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match');
            return;
        }
        
        if (!validatePhoneNumber(phone)) {
            showError('phoneNumber', 'Please enter a valid phone number');
            return;
        }
        
        if (!terms) {
            showToast('Please agree to the Terms & Conditions', 'error');
            return;
        }
        
        const btn = this.querySelector('.btn');
        btn.classList.add('loading');
        btn.disabled = true;
        
        // Simulate signup
        setTimeout(() => {
            btn.classList.remove('loading');
            btn.disabled = false;
            
            document.getElementById('userEmail').textContent = email;
            showVerificationModal();
            showToast('Account created successfully!', 'success');
            
            // Reset form but keep country selection
            const selectedCountry = document.getElementById('nationality').value;
            this.reset();
            document.getElementById('nationality').value = selectedCountry;
            updatePhoneCode();
        }, 2000);
    });
}

// View switching
function switchToSignup() {
    document.querySelector('.login-section').classList.remove('active');
    document.querySelector('.signup-section').classList.add('active');
    showToast('Create your PrimeTech account', 'info');
    // reset scroll inside form card and focus first input
    const signup = document.querySelector('.signup-section');
    if (signup) {
        signup.scrollTop = 0;
        const first = signup.querySelector('input, select, button');
        if (first) first.focus();
    }
}

function switchToLogin() {
    document.querySelector('.signup-section').classList.remove('active');
    document.querySelector('.login-section').classList.add('active');
    showToast('Sign in to continue learning', 'info');
    // reset scroll inside form card and focus first input
    const login = document.querySelector('.login-section');
    if (login) {
        login.scrollTop = 0;
        const first = login.querySelector('input, select, button');
        if (first) first.focus();
    }
}

// Password functions
function togglePassword(id, icon) {
    const input = document.getElementById(id);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}

function checkPasswordStrength(inputId = 'signupPassword', barSelector = '.strength-fill', textId = 'strengthText') {
    const input = document.getElementById(inputId);
    const password = input ? input.value : '';
    const bar = document.querySelector(barSelector);
    const text = document.getElementById(textId);
    // improved scoring: include extra weight for length and more descriptive states
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[\W_]/.test(password)) score++;

    let color = '#e74c3c';
    let width = '0%';
    let message = 'Weak';

    if (!password) {
        width = '0%';
        message = 'Weak';
        color = '#e74c3c';
    } else if (password.length < 6) {
        // too short to be acceptable
        width = '10%';
        message = 'Too short';
        color = '#e74c3c';
    } else if (score <= 2) {
        width = '25%';
        message = 'Weak';
        color = '#e74c3c';
    } else if (score <= 4) {
        width = '65%';
        message = 'Medium';
        color = '#f39c12';
    } else {
        width = '100%';
        message = 'Strong';
        color = '#2ecc71';
    }

    // Update display
    if (bar) {
        bar.style.width = width;
        bar.style.backgroundColor = color;
    }
    if (text) {
        text.textContent = message;
        text.style.color = color;
    }

    return message;
}

// ensure strength is evaluated on load (in case of prefilled values)
document.addEventListener('DOMContentLoaded', function() {
    // call once to initialize strength UI
    if (document.getElementById('signupPassword')) checkPasswordStrength();
});

// Validation helpers
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhoneNumber(phone) {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
}

function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + 'Error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        document.getElementById(fieldId).closest('.input-group').classList.add('error');
    }
}

function resetFormErrors() {
    document.querySelectorAll('.input-group').forEach(group => {
        group.classList.remove('error');
        const error = group.querySelector('.error-message');
        if (error) error.style.display = 'none';
    });
}

// Toast notification (safe — no-op if toast not present)
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) {
        // Page doesn't include toast UI — fall back to console to aid debugging
        console.warn(`[${type}] ${message}`);
        return;
    }
    const messageEl = toast.querySelector('.toast-message') || toast;
    messageEl.textContent = message;
    toast.className = `toast show ${type}`;
    // Auto hide
    setTimeout(() => { if (toast) toast.classList.remove('show'); }, 5000);
}

// Modal functions (guard existence)
function showVerificationModal() {
    const modal = document.getElementById('verificationModal');
    if (!modal) return;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('verificationModal');
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    switchToLogin();
}

function resendVerification() {
    showToast('Verification email resent! Check your inbox.', 'success');
    // Close modal after 2 seconds
    setTimeout(() => { closeModal(); }, 2000);
}

// Social login (stubs)
function loginWithGoogle() { showToast('Google login will be available soon!', 'info'); }
function loginWithGithub() { showToast('GitHub login will be available soon!', 'info'); }



// Close toast on click (guarded)
const _toastClose = document.querySelector('.toast-close');
if (_toastClose) {
    _toastClose.addEventListener('click', function() {
        const t = document.getElementById('toast');
        if (t) t.classList.remove('show');
    });
}

// Close modal on background click (guarded)
const _verificationModal = document.getElementById('verificationModal');
if (_verificationModal) {
    _verificationModal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}