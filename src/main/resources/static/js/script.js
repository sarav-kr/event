document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    const mobileClose = document.getElementById("mobileClose");
    const galleryItems = [...document.querySelectorAll(".gallery-item")];
    const filterButtons = [...document.querySelectorAll(".filter-btn")];
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");

    function closeMobileNav() {
        mobileNav?.classList.remove("open");
    }

    hamburger?.addEventListener("click", () => {
        mobileNav?.classList.toggle("open");
    });

    mobileClose?.addEventListener("click", closeMobileNav);
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
        link.addEventListener("click", closeMobileNav);
    });

    window.addEventListener("scroll", () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 20);
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            galleryItems.forEach((item) => {
                const shouldShow = filter === "all" || item.dataset.category === filter;
                item.classList.toggle("hidden", !shouldShow);
            });
        });
    });

    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            const image = item.querySelector("img");
            if (!image || !lightbox || !lightboxImg) return;

            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            lightbox.classList.add("open");
        });
    });

    lightboxClose?.addEventListener("click", () => lightbox?.classList.remove("open"));
    lightbox?.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.classList.remove("open");
        }
    });

    contactForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const submitButton = document.getElementById("submitBtn");
        const buttonText = submitButton?.querySelector(".btn-text");
        const buttonLoader = submitButton?.querySelector(".btn-loader");

        const inquiry = {
            firstName: document.getElementById("fname").value,
            lastName: document.getElementById("lname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            eventType: document.getElementById("eventType").value,
            eventDate: document.getElementById("eventDate").value,
            message: document.getElementById("message").value
        };

        submitButton.disabled = true;
        buttonText.style.display = "none";
        buttonLoader.style.display = "inline";

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inquiry)
            });

            if (!response.ok) {
                throw new Error("Unable to submit enquiry");
            }

            formSuccess.textContent = "✦ Thank you! We'll be in touch within 24 hours.";
            formSuccess.style.display = "block";
            contactForm.reset();
        } catch (error) {
            formSuccess.textContent = "We could not send your enquiry. Please try again.";
            formSuccess.style.display = "block";
        } finally {
            submitButton.disabled = false;
            buttonText.style.display = "inline";
            buttonLoader.style.display = "none";

            window.setTimeout(() => {
                formSuccess.style.display = "none";
            }, 4000);
        }
    });

    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const stat = entry.target;
            const target = Number(stat.dataset.target || 0);
            const duration = 1100;
            const start = performance.now();

            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                stat.textContent = Math.floor(progress * target);
                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            }

            requestAnimationFrame(tick);
            observer.unobserve(stat);
        });
    }, { threshold: 0.6 });

    document.querySelectorAll(".stat-num").forEach((stat) => statObserver.observe(stat));
});
