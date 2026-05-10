const list = document.getElementById("inquiriesList");
const statusMessage = document.getElementById("statusMessage");
const totalCount = document.getElementById("totalCount");
const latestDate = document.getElementById("latestDate");
const refreshBtn = document.getElementById("refreshBtn");

function formatDate(value) {
    if (!value) return "-";
    return new Date(value).toLocaleString();
}

function eventLabel(value) {
    if (!value) return "Not specified";
    return value
        .replace("-", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderInquiries(inquiries) {
    totalCount.textContent = inquiries.length;
    latestDate.textContent = inquiries.length ? formatDate(inquiries[0].submittedAt) : "-";
    list.innerHTML = "";

    if (!inquiries.length) {
        statusMessage.textContent = "No enquiries yet.";
        statusMessage.style.display = "block";
        return;
    }

    statusMessage.style.display = "none";

    inquiries.forEach((inquiry) => {
        const firstName = escapeHtml(inquiry.firstName);
        const lastName = escapeHtml(inquiry.lastName);
        const email = escapeHtml(inquiry.email);
        const phone = escapeHtml(inquiry.phone);
        const eventType = escapeHtml(eventLabel(inquiry.eventType));
        const eventDate = escapeHtml(inquiry.eventDate || "Not decided");
        const message = escapeHtml(inquiry.message || "-");
        const card = document.createElement("article");
        card.className = "inquiry-card";
        card.innerHTML = `
            <div class="inquiry-head">
                <div>
                    <p class="name">${firstName} ${lastName}</p>
                    <p class="meta">Submitted ${formatDate(inquiry.submittedAt)}</p>
                </div>
                <span class="badge">${eventType}</span>
            </div>
            <div class="details">
                <div class="detail">
                    <strong>Email</strong>
                    <a href="mailto:${email}">${email || "-"}</a>
                </div>
                <div class="detail">
                    <strong>Phone</strong>
                    <a href="tel:${phone}">${phone || "-"}</a>
                </div>
                <div class="detail">
                    <strong>Event Date</strong>
                    <span>${eventDate}</span>
                </div>
            </div>
            <div>
                <span class="message-label">Message</span>
                <p class="message">${message}</p>
            </div>
        `;
        list.appendChild(card);
    });
}

async function loadInquiries() {
    statusMessage.textContent = "Loading enquiries...";
    statusMessage.style.display = "block";

    try {
        const response = await fetch("/api/contact");
        if (!response.ok) {
            throw new Error("Unable to load enquiries");
        }

        renderInquiries(await response.json());
    } catch (error) {
        statusMessage.textContent = "Could not load enquiries. Please refresh again.";
        statusMessage.style.display = "block";
    }
}

refreshBtn.addEventListener("click", loadInquiries);
loadInquiries();
