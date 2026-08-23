const WHATSAPP = "201030943475";

window.addEventListener("load", function(){
    setTimeout(function(){
        const loader = document.getElementById("loader");
        if(loader) loader.classList.add("hide");
    }, 700);
});

const navbar = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function(){
    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if(window.scrollY > 500){
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }
});

function openMenu(){
    document.getElementById("mobileMenu").classList.add("open");
    document.getElementById("menuOverlay").classList.add("show");
}

function closeMenu(){
    document.getElementById("mobileMenu").classList.remove("open");
    document.getElementById("menuOverlay").classList.remove("show");
}

const revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(function(el){
    revealObserver.observe(el);
});

let counterStarted = false;
function startCounters(){
    if(counterStarted) return;
    counterStarted = true;
    document.querySelectorAll(".counter").forEach(function(counter){
        const target = Number(counter.dataset.target);
        let current = 0;
        const duration = 1300;
        const start = performance.now();
        function update(now){
            const progress = Math.min((now - start) / duration, 1);
            current = Math.floor(progress * target);
            counter.textContent = "+" + current.toLocaleString("en-US");
            if(progress < 1){
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    });
}

const statsSection = document.querySelector(".stats");
if(statsSection){
    const statsObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                startCounters();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
}

const services = {
    truck: {
        icon: "fa-truck-moving",
        title: "سيارات نقل عفش مقفلة",
        description: "خدمة نقل الأثاث والموبيليا بواسطة سيارات وعربيات مقفلة ومجهزة بأعلى معايير الأمان لمنع تعرض العفش للغبار أو الأمطار في القاهرة والمحافظات.",
        items: [
            "سيارات نقل عفش مقفلة بجميع الأحجام",
            "عمال نقل اثاث مدربين للتحميل والتنزيل",
            "حماية تامة للأجهزة الكهربائية والزجاج",
            "نقل عفش بين المحافظات وسيارات سريعة"
        ]
    },
    crane: {
        icon: "fa-elevator",
        title: "ونش رفع اثاث هيدروليك",
        description: "أفضل اوناش هيدروليكية لرفع وتنزيل الأثاث والعفش للأدوار المرتفعة مع ضمان الحفاظ على المنقولات من ضيق المداخل والسلالم.",
        items: [
            "رفع الاثاث بالونش حتى الأدوار المرتفعة",
            "أفضل اسعار ونش رفع الاثاث في مصر",
            "أمان كامل للقطع الثقيلة والموبيليا الزجاجية",
            "توفير ونش هيدروليك وونش كهربائي"
        ]
    },
    packing: {
        icon: "fa-box-open",
        title: "تغليف الاثاث بالبابلز والكراتين",
        description: "تغليف العفش والموبيليا بخامات مستوردة تشمل البابلز المقوى، الفوم، والاستريتش وكراتين نقل العفش المخصصة للأواني والتحف.",
        items: [
            "تغليف الاثاث بالبابلز والكرتون المقوى",
            "تغليف الأجهزة الكهربائية والشاشات",
            "تغليف أطقم الصيني والزجاج الحساس",
            "كراتين نقل عفش مخصصة ومقسمة"
        ]
    },
    assembly: {
        icon: "fa-screwdriver-wrench",
        title: "نجار فك وتركيب غرف ومطابخ",
        description: "فريق متخصص من النجارين وفنيي التكييف لفك وتركيب كافة أنواع الأثاث، غرف النوم المستوردة والمحلية، والمطابخ والستائر والتكييفات.",
        items: [
            "نجار فك وتركيب غرف نوم ومطابخ",
            "فك وتركيب التكييفات والشاشات والستائر",
            "ترقيم وتجهيز القطع لسهولة إعادة تركيبها",
            "تسليم الأثاث مركب وجاهز للاستخدام مباشرة"
        ]
    }
};

function openService(type){
    const data = services[type];
    if(!data) return;
    const list = data.items.map(function(item){
        return `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`;
    }).join("");

    document.getElementById("serviceContent").innerHTML = `
        <div class="modal-icon"><i class="fa-solid ${data.icon}"></i></div>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <ul class="modal-list">${list}</ul>
        <button class="btn btn-wa" style="width:100%;" onclick="openQuote();closeModal('serviceModal')">
            <i class="fa-brands fa-whatsapp"></i> اطلب عرض سعر لهذه الخدمة
        </button>
    `;
    document.getElementById("serviceModal").classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeModal(id){
    document.getElementById(id).classList.remove("show");
    document.body.style.overflow = "";
}

function openQuote(){
    document.getElementById("quoteModal").classList.add("show");
    document.body.style.overflow = "hidden";
}

function openImage(src){
    document.getElementById("viewerImage").src = src;
    document.getElementById("imageModal").classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeImage(event){
    if(event.target.id === "imageModal"){
        closeModal("imageModal");
    }
}

document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        document.querySelectorAll(".modal.show").forEach(function(modal){
            modal.classList.remove("show");
        });
        document.body.style.overflow = "";
    }
});

const quoteForm = document.getElementById("quoteForm");
if(quoteForm){
    quoteForm.addEventListener("submit", function(event){
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const from = document.getElementById("from").value.trim();
        const to = document.getElementById("to").value.trim();
        const floor = document.getElementById("floor").value;
        const rooms = document.getElementById("rooms").value;
        const details = document.getElementById("details").value.trim();

        if(!name || !phone || !service){
            showToast("يرجى إكمال البيانات المطلوبة");
            return;
        }

        const message = `
السلام عليكم ورحمة الله وبركاته
طلب عرض سعر نقل عفش من موقع ترحال TRHAL
━━━━━━━━━━━━━━
👤 الاسم: ${name}
📞 الهاتف: ${phone}
🛠️ الخدمة: ${service}
📅 الموعد: ${date || "غير محدد"}
📍 مكان التحميل: ${from || "غير محدد"}
📍 مكان التسليم: ${to || "غير محدد"}
🏢 الدور: ${floor}
🏠 عدد الغرف: ${rooms}
📝 تفاصيل: ${details || "لا توجد تفاصيل إضافية"}
━━━━━━━━━━━━━━
أرجو إفادتي بالتكلفة المتاحة والونش المناسب.
`.trim();

        const url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message);
        window.open(url, "_blank");
        closeModal("quoteModal");
        showToast("تم تحويل طلبك للواتساب");
    });

    const phoneInput = document.getElementById("phone");
    if(phoneInput){
        phoneInput.addEventListener("input", function(){
            this.value = this.value.replace(/[^0-9+ ]/g, "");
        });
    }

    const dateInput = document.getElementById("date");
    if(dateInput){
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }
}

let toastTimer;
function showToast(message){
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){
        toast.classList.remove("show");
    }, 3000);
}

document.querySelectorAll(".modal").forEach(function(modal){
    modal.addEventListener("click", function(event){
        if(event.target === modal){
            modal.classList.remove("show");
            document.body.style.overflow = "";
        }
    });
});
