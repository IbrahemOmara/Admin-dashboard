
  const rows = document.querySelectorAll("tbody tr");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // تظهر مرة واحدة فقط
      }
    });
  }, {
    threshold: 0.6 // يبدأ الأنيميشن عند ظهور 10% من الصف
  });

  rows.forEach(row => {
    observer.observe(row);
  });



  // حماية الصفحة: التحقق من أن الأدمن مسجل دخول
if (localStorage.getItem('isAdmin') !== 'true') {
    window.location.href = 'index.html'; // رجّعه لصفحة الدخول
}

function logout(){
localStorage.removeItem('isAdmin');
window.location.href = 'index.html';
} // يرجّعه لصفحة تسجيل الدخول


//------------------------------------

window.onload = function () {
    const tableBody = document.getElementById("warrantyData");
    const warranties = JSON.parse(localStorage.getItem("warranties")) || [];

    warranties.forEach(w => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${w.serial}</td>
            <td>${w.plate}</td>
            <td>${w.phone}</td>
            <td>${w.role}</td>
            <td>${w.status}</td>
            <td>${w.date}</td>
        `;
        tableBody.appendChild(row);
    });
};


// بحث داخل الجدول
function filterTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#warrantyData tr");

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}


