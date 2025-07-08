// import {initUserProfile} from './StudentProfile.js'
// import { getUserData } from './StudentProfile.js';

const container = document.querySelector('.container');
const registerbtn = document.querySelector('.register-btn');
const loginbtn = document.querySelector('.login-btn');

registerbtn.addEventListener('click', ()=>{
    container.classList.add('active');
});

loginbtn.addEventListener('click', ()=>{
    container.classList.remove('active');
});

function closeRegFailedPopup() {
document.getElementById("reg-failed-popup").style.display = "none";
}

function registration_failed() {
document.getElementById("reg-failed-popup").style.display = "flex";
}


function selectRole(role) {
    document.getElementById("studentBtn").classList.remove("active");
    document.getElementById("doctorBtn").classList.remove("active");
    document.querySelector('#roleInput').value = role;
    
    if (role === "Student") {
    document.getElementById("studentBtn").classList.add("active");
    } else {
    document.getElementById("doctorBtn").classList.add("active");
    }
}

//------------------------------------------------Registration-----------------------------------

const form = document.querySelector('.formReg');
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    
    
    try{
        
        const response = await fetch('https://autogradkareem-efdhcqesekaab8fm.polandcentral-01.azurewebsites.net/api/Auth/Register', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(userData)
        });
        
        if(response.ok){
        container.classList.remove('active');
        } else {
        registration_failed();
        }
    } catch(err) {
        console.log("Network error: ", err);
    }
});


// ------------------------------------  Login  --------------------------------------




//-----------------------------------
// تسجيل دخول الأدمن (الجزء الخاص بالـ admin login)
//const adminForm = document.querySelector('.formReg');

//adminForm.addEventListener("submit", function (e) {
//    e.preventDefault();

//   const username = adminForm.querySelector('input[name="firstName"]').value.trim();
//    const password = adminForm.querySelector('input[name="password"]').value;
//
//    // تحقق من البيانات
//    if (username === "admin" && password === "admin123") {
//        // إعادة توجيه لصفحة الأدمن
//        window.location.href = "admin.html";
//    } else {
//        // عرض رسالة الخطأ
//        alert("اسم المستخدم أو كلمة المرور غير صحيحة");
//    }
//});




// تسجيل دخول الأدمن
const adminForm = document.querySelector('.formReg');

adminForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = adminForm.querySelector('input[name="firstName"]').value.trim();
    const password = adminForm.querySelector('input[name="password"]').value;

    if (username === "admin" && password === "1234") {
        // تخزين جلسة الدخول
        localStorage.setItem('isAdmin', 'true');

        // التوجيه لصفحة الأدمن
        window.location.href = "admin.html";
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
});

//---------------------------------------
document.querySelector('.login form').addEventListener('submit', function (e) {
    e.preventDefault();

    const serial = document.querySelectorAll('.login input')[0].value.trim();
    const plate = document.querySelectorAll('.login input')[1].value.trim();
    const phone = document.querySelectorAll('.login input')[2].value.trim();
    const role = document.getElementById("roleInput").value.trim();
    const date = new Date().toLocaleDateString();
    const status = "مفعل";

    if (!serial || !plate || !phone || !role) {
        showToast("يرجى ملء جميع الحقول", "error");
        return;
    }

    let warranties = JSON.parse(localStorage.getItem('warranties')) || [];

    // منع التكرار
    if (warranties.some(w => w.serial === serial)) {
        showToast("تم استخدام هذا الرقم التسلسلي من قبل!", "error");
        return;
    }

    const newWarranty = { serial, plate, phone, role, status, date };
    warranties.push(newWarranty);
    localStorage.setItem('warranties', JSON.stringify(warranties));

    showToast("تم تفعيل الضمان بنجاح!", "success");

    // رسالة SMS وهمية
    setTimeout(() => {
        alert(`تم إرسال رسالة تأكيد على الرقم ${phone}`);
    }, 1000);

    // إعادة تعيين القيم
    document.querySelector('.login form').reset();
    document.getElementById("studentBtn").classList.remove("active");
    document.getElementById("doctorBtn").classList.remove("active");
});

// Toast Notification
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
