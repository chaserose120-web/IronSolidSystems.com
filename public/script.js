const pageShell = document.querySelector(".app-shell");
const siteNav = document.getElementById("site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const authSection = document.getElementById("auth-panel");
const appSections = document.getElementById("app-sections");
const sidebarUser = document.getElementById("sidebar-user");
const currentUserName = document.getElementById("current-user-name");
const currentUserEmail = document.getElementById("current-user-email");
const topbarUser = document.getElementById("topbar-user");
const topbarUserName = document.getElementById("topbar-user-name");
const topbarUserEmail = document.getElementById("topbar-user-email");
const openSettingsButton = document.getElementById("open-settings-button");
const dashboardGreeting = document.getElementById("dashboard-greeting");
const jobCount = document.getElementById("job-count");
const dashboardSection = document.getElementById("dashboard");
const createJobSection = document.getElementById("create-job");
const jobsListSection = document.getElementById("jobs-list");
const settingsPanel = document.getElementById("settings-panel");
const openSettingsNavButton = document.getElementById("open-settings-nav");
const closeSettingsButton = document.getElementById("close-settings-button");
const themeColorSelect = document.getElementById("theme-color-select");
const textColorSelect = document.getElementById("text-color-select");
const installHelper = document.getElementById("install-helper");
const installAppButton = document.getElementById("install-app-button");
const installHelperMessage = document.getElementById("install-helper-message");
const landingSignInButton = document.getElementById("landing-sign-in");
const landingCreateAccountButton = document.getElementById("landing-create-account");
const signInPanel = document.getElementById("sign-in-panel");
const createAccountPanel = document.getElementById("create-account-panel");

const signUpForm = document.getElementById("sign-up-form");
const signUpFullNameInput = document.getElementById("sign-up-full-name");
const signUpEmailInput = document.getElementById("sign-up-email");
const signUpPasswordInput = document.getElementById("sign-up-password");
const signUpConfirmPasswordInput = document.getElementById("sign-up-confirm-password");
const signUpMessage = document.getElementById("sign-up-message");
const signUpButton = document.getElementById("sign-up-button");
const copyAccountButton = document.getElementById("copy-account-button");
const signInForm = document.getElementById("sign-in-form");
const signInEmailInput = document.getElementById("sign-in-email");
const signInPasswordInput = document.getElementById("sign-in-password");
const signInMessage = document.getElementById("sign-in-message");
const signInButton = document.getElementById("sign-in-button");
const logOutButton = document.getElementById("log-out-button");

const jobForm = document.getElementById("job-form");
const formMessage = document.getElementById("form-message");
const submitButton = document.getElementById("job-submit");
const jobsMessage = document.getElementById("jobs-message");
const refreshJobsButton = document.getElementById("refresh-jobs");
const showAllJobsButton = document.getElementById("show-all-jobs");
const jobsBrowser = document.getElementById("jobs-browser");
const closeJobsBrowserButton = document.getElementById("close-jobs-browser");
const jobsSummaryList = document.getElementById("jobs-summary-list");
const jobDetailView = document.getElementById("job-detail-view");
const jobDetailTitle = document.getElementById("job-detail-title");
const jobDetailContent = document.getElementById("job-detail-content");
const closeJobDetailButton = document.getElementById("close-job-detail");
const reportPreview = document.getElementById("report-preview");
const reportPreviewTitle = document.getElementById("report-preview-title");
const reportPreviewContent = document.getElementById("report-preview-content");
const closeReportPreviewButton = document.getElementById("close-report-preview");
const joinCrewForm = document.getElementById("join-crew-form");
const joinCrewCodeInput = document.getElementById("join-crew-code");
const joinCrewRoleSelect = document.getElementById("join-crew-role");
const joinCrewMessage = document.getElementById("join-crew-message");
const joinCrewButton = document.getElementById("join-crew-button");
const photoModal = document.getElementById("photo-modal");
const photoModalBackdrop = document.getElementById("photo-modal-backdrop");
const photoModalImage = document.getElementById("photo-modal-image");
const closePhotoModalButton = document.getElementById("close-photo-modal");

const jobIndustrySelect = jobForm?.elements.namedItem("industry");
const jobTitleField = jobForm?.elements.namedItem("title");
const jobWorkOrderField = jobForm?.elements.namedItem("work_order");
const jobCustomerField = jobForm?.elements.namedItem("customer");
const jobMachineField = jobForm?.elements.namedItem("machine");
const jobSerialField = jobForm?.elements.namedItem("serial");
const jobPartNumbersField = jobForm?.elements.namedItem("part_numbers");
const jobTorqueValuesField = jobForm?.elements.namedItem("torque_values");
const jobComplaintField = jobForm?.elements.namedItem("complaint");
const jobCauseField = jobForm?.elements.namedItem("cause");
const jobCorrectionField = jobForm?.elements.namedItem("correction");
const jobTitleLabel = document.getElementById("label-title");
const jobWorkOrderLabel = document.getElementById("label-work-order");
const jobCustomerLabel = document.getElementById("label-customer");
const jobMachineLabel = document.getElementById("label-machine");
const jobSerialLabel = document.getElementById("label-serial");

let currentUser = null;
let currentView = "main";
let visibleJobs = [];
let selectedJobId = null;
let deferredInstallPrompt = null;

const THEME_STORAGE_KEY = "ironsolidsystems-theme-settings";
const DEFAULT_THEME_SETTINGS = {
  themeColor: "cat-yellow",
  textColor: "white"
};

const JOB_FIELDS_SELECT = [
  "id",
  "user_id",
  "title",
  "status",
  "work_order",
  "customer",
  "machine",
  "serial",
  "industry",
  "complaint",
  "cause",
  "correction",
  "part_numbers",
  "torque_values",
  "created_at",
  "crew_code",
  "crew_enabled"
].join(", ");

const THEME_PRESETS = {
  red: {
    bg: "#0b090a",
    bgAlt: "#141012",
    panel: "rgba(22, 13, 15, 0.94)",
    panelStrong: "#221114",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(255, 0, 0, 0.34)",
    accent: "#b10f2e",
    accentStrong: "#ff3458",
    accentSecondary: "#6e0018",
    accentShadow: "rgba(177, 15, 46, 0.26)",
    bodyGlow: "rgba(177, 15, 46, 0.14)",
    bodyGlowAlt: "rgba(90, 0, 16, 0.12)",
    bodyStart: "#060607",
    bodyEnd: "#120b0d",
    buttonText: "#f6f4ef"
  },
  blue: {
    bg: "#08101f",
    bgAlt: "#0d1830",
    panel: "rgba(13, 24, 47, 0.94)",
    panelStrong: "#152447",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(0, 40, 255, 0.3)",
    accent: "#0028FF",
    accentStrong: "#4f72ff",
    accentSecondary: "#00157d",
    accentShadow: "rgba(0, 40, 255, 0.22)",
    bodyGlow: "rgba(0, 40, 255, 0.16)",
    bodyGlowAlt: "rgba(9, 20, 56, 0.18)",
    bodyStart: "#050913",
    bodyEnd: "#0c1730",
    buttonText: "#f5f7ff"
  },
  black: {
    bg: "#060606",
    bgAlt: "#101010",
    panel: "rgba(18, 18, 18, 0.92)",
    panelStrong: "#181818",
    panelSoft: "rgba(255, 255, 255, 0.025)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(160, 160, 160, 0.2)",
    accent: "#9d9d9d",
    accentStrong: "#cbcbcb",
    accentSecondary: "#5c5c5c",
    accentShadow: "rgba(160, 160, 160, 0.16)",
    bodyGlow: "rgba(180, 180, 180, 0.08)",
    bodyGlowAlt: "rgba(80, 80, 80, 0.08)",
    bodyStart: "#050505",
    bodyEnd: "#0d0d0d",
    buttonText: "#111111"
  },
  white: {
    bg: "#0b0d10",
    bgAlt: "#14171a",
    panel: "rgba(25, 27, 29, 0.94)",
    panelStrong: "#202427",
    panelSoft: "rgba(0, 0, 0, 0.035)",
    border: "rgba(0, 0, 0, 0.08)",
    borderStrong: "rgba(255, 255, 255, 0.24)",
    accent: "#d8dbdf",
    accentStrong: "#ffffff",
    accentSecondary: "#8f959b",
    accentShadow: "rgba(255, 255, 255, 0.16)",
    bodyGlow: "rgba(255, 255, 255, 0.12)",
    bodyGlowAlt: "rgba(150, 160, 172, 0.1)",
    bodyStart: "#08090b",
    bodyEnd: "#121418",
    buttonText: "#0d0f12"
  },
  tan: {
    bg: "#0f0b08",
    bgAlt: "#17110d",
    panel: "rgba(33, 24, 18, 0.94)",
    panelStrong: "#2b2118",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(193, 151, 93, 0.24)",
    accent: "#c1975d",
    accentStrong: "#dfba82",
    accentSecondary: "#8e6530",
    accentShadow: "rgba(193, 151, 93, 0.2)",
    bodyGlow: "rgba(193, 151, 93, 0.14)",
    bodyGlowAlt: "rgba(110, 72, 30, 0.1)",
    bodyStart: "#0d0a08",
    bodyEnd: "#18120d",
    buttonText: "#17110d"
  },
  "cat-yellow": {
    bg: "#0b0b0b",
    bgAlt: "#141414",
    panel: "rgba(21, 21, 21, 0.95)",
    panelStrong: "#1b1b1b",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(245, 190, 39, 0.34)",
    accent: "#F5BE27",
    accentStrong: "#ffd76a",
    accentSecondary: "#820000",
    accentShadow: "rgba(245, 190, 39, 0.22)",
    bodyGlow: "rgba(245, 190, 39, 0.12)",
    bodyGlowAlt: "rgba(130, 0, 0, 0.1)",
    bodyStart: "#080808",
    bodyEnd: "#121212",
    buttonText: "#111111"
  },
  "john-deere-green": {
    bg: "#09100a",
    bgAlt: "#111812",
    panel: "rgba(17, 28, 18, 0.95)",
    panelStrong: "#1b311d",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(255, 237, 5, 0.28)",
    accent: "#318822",
    accentStrong: "#FFED05",
    accentSecondary: "#1f4f16",
    accentShadow: "rgba(49, 136, 34, 0.22)",
    bodyGlow: "rgba(49, 136, 34, 0.16)",
    bodyGlowAlt: "rgba(255, 237, 5, 0.08)",
    bodyStart: "#070a08",
    bodyEnd: "#101812",
    buttonText: "#0f140d"
  },
  "usa-theme": {
    bg: "#07101c",
    bgAlt: "#0d1730",
    panel: "rgba(15, 23, 42, 0.94)",
    panelStrong: "#172746",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(220, 74, 74, 0.22)",
    accent: "#c8505b",
    accentStrong: "#87a8d9",
    accentSecondary: "#f1f3f7",
    accentShadow: "rgba(200, 80, 91, 0.18)",
    bodyGlow: "rgba(135, 168, 217, 0.12)",
    bodyGlowAlt: "rgba(200, 80, 91, 0.12)",
    bodyStart: "#06101c",
    bodyEnd: "#0a1630",
    buttonText: "#f4f6f8"
  }
};

const TEXT_PRESETS = {
  white: {
    text: "#f2f2ec",
    textSoft: "#afb5af"
  },
  black: {
    text: "#111111",
    textSoft: "#3f3f3f"
  },
  yellow: {
    text: "#f2cf5b",
    textSoft: "#d7bb64"
  }
};

const JOB_PLACEHOLDERS = {
  default: {
    title: "",
    work_order: "",
    customer: "",
    machine: "",
    serial: "",
    part_numbers: "",
    torque_values: "",
    complaint: "",
    cause: "",
    correction: ""
  },
  "Heavy Equipment": {
    title: "Loader cooling issue",
    work_order: "HE-10428",
    customer: "River Rock Excavation",
    machine: "Komatsu WA380 Loader",
    serial: "KMTWA103CPF81247",
    part_numbers: "",
    torque_values: "",
    complaint: "Machine overheating under load",
    cause: "Radiator packed with debris, low airflow",
    correction: "Cleaned cooling package, verified temps"
  },
  Automotive: {
    title: "Truck rough idle diagnosis",
    work_order: "AUTO-8821",
    customer: "Fleet Service LLC",
    machine: "Ford F-250 6.2L",
    serial: "1FT7W2B67NEA18455",
    part_numbers: "",
    torque_values: "",
    complaint: "Customer states truck has rough idle",
    cause: "Vacuum leak found at intake hose",
    correction: "Replaced hose and cleared codes"
  },
  "Industrial Maintenance": {
    title: "Conveyor line stop issue",
    work_order: "IM-5579",
    customer: "Midwest Packaging",
    machine: "South conveyor drive",
    serial: "CVR-PLT-2047",
    part_numbers: "",
    torque_values: "",
    complaint: "Conveyor intermittently stops",
    cause: "Failed proximity sensor",
    correction: "Replaced sensor and tested operation"
  },
  "Welding & Fabrication": {
    title: "Attachment bracket repair",
    work_order: "WF-3316",
    customer: "Summit Earthworks",
    machine: "Grapple attachment",
    serial: "ATT-GRP-7784",
    part_numbers: "",
    torque_values: "",
    complaint: "Cracked bracket on attachment",
    cause: "Fatigue crack at weld toe",
    correction: "Ground crack, welded repair, painted area"
  }
};

const JOB_LABELS = {
  default: {
    title: "Job Name / Log Name",
    workOrder: "Work Order",
    customer: "Customer",
    machine: "Machine",
    serial: "Serial Number"
  },
  "Heavy Equipment": {
    title: "Job Name / Log Name",
    workOrder: "Work Order",
    customer: "Customer",
    machine: "Machine",
    serial: "Serial Number"
  },
  Automotive: {
    title: "Job Name / Log Name",
    workOrder: "Work Order",
    customer: "Customer",
    machine: "Vehicle",
    serial: "VIN"
  },
  "Industrial Maintenance": {
    title: "Job Name / Log Name",
    workOrder: "Work Order",
    customer: "Customer / Facility",
    machine: "Equipment / Line",
    serial: "Asset ID / Identification Number"
  },
  "Welding & Fabrication": {
    title: "Job Name / Log Name",
    workOrder: "Work Order",
    customer: "Customer",
    machine: "Part / Vehicle / Attachment",
    serial: "Serial / ID Number"
  }
};

if (menuToggle && pageShell) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    pageShell.classList.toggle("menu-open", !isOpen);

    if (!isOpen) {
      siteNav?.querySelector("a, button")?.focus();
    }
  });
}

window.addEventListener("load", () => {
  document.body.classList.add("is-ready");
});

function setMessage(element, message, type = "") {
  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.remove("is-success", "is-error");

  if (type === "success") {
    element.classList.add("is-success");
  }

  if (type === "error") {
    element.classList.add("is-error");
  }
}

function getSignUpFields() {
  return {
    fullName: signUpFullNameInput?.value.trim() || "",
    email: signUpEmailInput?.value.trim() || "",
    password: signUpPasswordInput?.value || "",
    confirmPassword: signUpConfirmPasswordInput?.value || ""
  };
}

function getSignInFields() {
  return {
    email: signInEmailInput?.value.trim() || "",
    password: signInPasswordInput?.value || ""
  };
}

function setButtonsDisabled(buttons, isDisabled) {
  buttons.forEach((button) => {
    if (button) {
      button.disabled = isDisabled;
    }
  });
}

function getDisplayName(user) {
  const fullName = user?.user_metadata?.full_name?.trim();
  return fullName || "Technician";
}

function shortUserId(userId) {
  if (!userId) {
    return "Unknown";
  }

  return `${userId.slice(0, 6)}...${userId.slice(-4)}`;
}

function generateCrewCode() {
  return String(Math.floor(10000000 + Math.random() * 90000000));
}

async function getUniqueCrewCode() {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const candidate = generateCrewCode();
    const { data, error } = await supabaseClient
      .from("jobs")
      .select("id")
      .eq("crew_code", candidate)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return candidate;
    }
  }

  throw new Error("Unable to generate a unique crew code. Please try again.");
}

function isJobLead(job) {
  return Boolean(job?.isOwner || job?.accessRole === "Job Lead");
}

function canEditJob(job) {
  return Boolean(isJobLead(job) || job?.accessRole === "Job Worker");
}

function canDeleteJob(job) {
  return Boolean(job?.isOwner);
}

function canManageCrew(job) {
  return Boolean(isJobLead(job));
}

function canUploadPhotos(job) {
  return Boolean(isJobLead(job) || job?.accessRole === "Job Worker");
}

function canDeletePhoto(job, photo) {
  return Boolean(isJobLead(job) || (job?.accessRole === "Job Worker" && photo?.uploaded_by === currentUser?.id));
}

function truncateText(value, maxLength = 96) {
  const text = value?.toString().trim() || "";

  if (!text) {
    return "No summary available.";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function getJobSummary(job) {
  return truncateText(job.summary || job.complaint || "");
}

function openJobsBrowser() {
  jobsBrowser.hidden = false;
  jobDetailView.hidden = true;
  reportPreview.hidden = true;
  selectedJobId = null;
  jobsBrowser.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeJobsBrowser() {
  jobsBrowser.hidden = true;
  jobDetailView.hidden = true;
  reportPreview.hidden = true;
  selectedJobId = null;
}

function openPhotoModal(url) {
  photoModalImage.src = url;
  photoModal.hidden = false;
}

function closePhotoModal() {
  photoModal.hidden = true;
  photoModalImage.removeAttribute("src");
}

function setMainView(view) {
  currentView = view;

  const showSettings = view === "settings";
  dashboardSection.hidden = showSettings;
  createJobSection.hidden = showSettings;
  jobsListSection.hidden = showSettings;
  settingsPanel.hidden = !showSettings;
}

function applyThemeSettings(settings) {
  const root = document.documentElement;
  const theme = THEME_PRESETS[settings.themeColor] || THEME_PRESETS["cat-yellow"];
  const text = TEXT_PRESETS[settings.textColor] || TEXT_PRESETS.white;
  const isBlackText = settings.textColor === "black";
  const isYellowText = settings.textColor === "yellow";

  const surfaces = isBlackText
    ? {
        panel: "rgba(244, 240, 231, 0.95)",
        panelStrong: "#efe9db",
        panelSoft: "rgba(255, 249, 235, 0.78)",
        border: "rgba(0, 0, 0, 0.12)",
        borderStrong: theme.borderStrong,
        fieldBg: "rgba(255, 252, 245, 0.92)",
        fieldBgFocus: "#ffffff",
        fieldBorder: "rgba(0, 0, 0, 0.14)",
        sectionBg: "rgba(255, 249, 236, 0.84)",
        noteBg: "rgba(255, 255, 255, 0.92)",
        reportBg: "rgba(255, 255, 255, 0.95)",
        mutedBg: "rgba(255, 250, 240, 0.72)",
        hoverBg: "rgba(0, 0, 0, 0.06)",
        ghostBg: "rgba(255, 255, 255, 0.84)",
        ghostBorder: "rgba(0, 0, 0, 0.12)",
        placeholder: "#5b5b5b",
        buttonText: "#111111"
      }
    : {
        panel: theme.panel,
        panelStrong: theme.panelStrong,
        panelSoft: theme.panelSoft,
        border: theme.border,
        borderStrong: theme.borderStrong,
        fieldBg: isYellowText ? "rgba(8, 10, 12, 0.88)" : "rgba(255, 255, 255, 0.05)",
        fieldBgFocus: isYellowText ? "rgba(12, 15, 18, 0.96)" : "rgba(255, 255, 255, 0.07)",
        fieldBorder: isYellowText ? "rgba(242, 207, 91, 0.24)" : "rgba(255, 255, 255, 0.12)",
        sectionBg: isYellowText ? "rgba(255, 255, 255, 0.035)" : "rgba(255, 255, 255, 0.025)",
        noteBg: isYellowText ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.03)",
        reportBg: isYellowText ? "rgba(4, 6, 8, 0.82)" : "rgba(0, 0, 0, 0.2)",
        mutedBg: isYellowText ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.04)",
        hoverBg: isYellowText ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.05)",
        ghostBg: isYellowText ? "rgba(255, 255, 255, 0.045)" : "rgba(255, 255, 255, 0.03)",
        ghostBorder: isYellowText ? "rgba(242, 207, 91, 0.16)" : "rgba(255, 255, 255, 0.12)",
        placeholder: isYellowText ? "#c8b261" : "#8b938d",
        buttonText: theme.buttonText || text.text
      };

  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--bg-alt", theme.bgAlt);
  root.style.setProperty("--panel", surfaces.panel);
  root.style.setProperty("--panel-strong", surfaces.panelStrong);
  root.style.setProperty("--panel-soft", surfaces.panelSoft);
  root.style.setProperty("--border", surfaces.border);
  root.style.setProperty("--border-strong", surfaces.borderStrong);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-strong", theme.accentStrong);
  root.style.setProperty("--accent-secondary", theme.accentSecondary || theme.accentStrong);
  root.style.setProperty("--accent-shadow", theme.accentShadow);
  root.style.setProperty("--body-glow", theme.bodyGlow);
  root.style.setProperty("--body-glow-alt", theme.bodyGlowAlt);
  root.style.setProperty("--body-start", theme.bodyStart);
  root.style.setProperty("--body-end", theme.bodyEnd);
  root.style.setProperty("--text", text.text);
  root.style.setProperty("--text-soft", text.textSoft);
  root.style.setProperty("--field-bg", surfaces.fieldBg);
  root.style.setProperty("--field-bg-focus", surfaces.fieldBgFocus);
  root.style.setProperty("--field-border", surfaces.fieldBorder);
  root.style.setProperty("--section-bg", surfaces.sectionBg);
  root.style.setProperty("--note-bg", surfaces.noteBg);
  root.style.setProperty("--report-bg", surfaces.reportBg);
  root.style.setProperty("--muted-bg", surfaces.mutedBg);
  root.style.setProperty("--hover-bg", surfaces.hoverBg);
  root.style.setProperty("--ghost-bg", surfaces.ghostBg);
  root.style.setProperty("--ghost-border", surfaces.ghostBorder);
  root.style.setProperty("--placeholder", surfaces.placeholder);
  root.style.setProperty("--button-text", surfaces.buttonText);
}

function saveThemeSettings(settings) {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(settings));
}

function isRunningStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function updateInstallHelperVisibility() {
  if (!installHelper) {
    return;
  }

  installHelper.hidden = !deferredInstallPrompt || isRunningStandalone();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch((error) => {
      console.error("Service worker registration failed", error);
    });
  });
}

function setupInstallPrompt() {
  if (!installHelper || !installAppButton) {
    return;
  }

  installHelper.hidden = true;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    setMessage(installHelperMessage, "");
    updateInstallHelperVisibility();
  });

  installAppButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      return;
    }

    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;

    if (choice.outcome === "accepted") {
      deferredInstallPrompt = null;
      setMessage(installHelperMessage, "Install started.");
      updateInstallHelperVisibility();
    }
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    updateInstallHelperVisibility();
  });
}

function scrollToAuthPanel(target, field) {
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });

  window.setTimeout(() => {
    field?.focus();
  }, 180);
}

function getSavedThemeSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "");
    return {
      themeColor: saved.themeColor || DEFAULT_THEME_SETTINGS.themeColor,
      textColor: saved.textColor || DEFAULT_THEME_SETTINGS.textColor
    };
  } catch {
    return { ...DEFAULT_THEME_SETTINGS };
  }
}

function updateThemeFromInputs() {
  const settings = {
    themeColor: themeColorSelect?.value || DEFAULT_THEME_SETTINGS.themeColor,
    textColor: textColorSelect?.value || DEFAULT_THEME_SETTINGS.textColor
  };

  applyThemeSettings(settings);
  saveThemeSettings(settings);
}

function loadThemeSettings() {
  const saved = getSavedThemeSettings();

  if (themeColorSelect) {
    themeColorSelect.value = saved.themeColor;
  }

  if (textColorSelect) {
    textColorSelect.value = saved.textColor;
  }

  applyThemeSettings(saved);
}

function updateAuthUI(user) {
  const email = user?.email || "Not signed in";
  const isLoggedIn = Boolean(user);
  const displayName = getDisplayName(user);

  authSection.hidden = isLoggedIn;
  siteNav.hidden = !isLoggedIn;
  menuToggle.hidden = !isLoggedIn;
  sidebarUser.hidden = !isLoggedIn;
  topbarUser.hidden = !isLoggedIn;
  openSettingsButton.hidden = !isLoggedIn;
  currentUserName.textContent = displayName;
  currentUserEmail.textContent = email;
  topbarUserName.textContent = displayName;
  topbarUserEmail.textContent = email;
  dashboardGreeting.textContent = `Hello, ${displayName}`;
  appSections.hidden = !isLoggedIn;
  logOutButton.disabled = !isLoggedIn;

  if (!isLoggedIn) {
    setMainView("main");
    jobsSummaryList.innerHTML = "";
    jobDetailContent.innerHTML = "";
    jobsBrowser.hidden = true;
    jobDetailView.hidden = true;
    reportPreview.hidden = true;
    visibleJobs = [];
    selectedJobId = null;
    jobCount.textContent = "0";
    setMessage(jobsMessage, "Sign in to load jobs.");
    setMessage(formMessage, "");
    setMessage(signInMessage, "Sign in to access your app workspace.");
    setMessage(joinCrewMessage, "");
  }
}

function formatCreatedAt(value) {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function getJobFieldLabels(industry) {
  const labels = JOB_LABELS[industry] || JOB_LABELS.default;

  return {
    jobName: labels.title,
    machine: labels.machine,
    serial: labels.serial
  };
}

function updateJobPlaceholders() {
  const industry =
    jobIndustrySelect instanceof HTMLSelectElement ? jobIndustrySelect.value : "";
  const placeholders = JOB_PLACEHOLDERS[industry] || JOB_PLACEHOLDERS.default;
  const labels = JOB_LABELS[industry] || JOB_LABELS.default;

  if (jobTitleLabel) {
    jobTitleLabel.textContent = labels.title;
  }

  if (jobWorkOrderLabel) {
    jobWorkOrderLabel.textContent = labels.workOrder;
  }

  if (jobCustomerLabel) {
    jobCustomerLabel.textContent = labels.customer;
  }

  if (jobMachineLabel) {
    jobMachineLabel.textContent = labels.machine;
  }

  if (jobSerialLabel) {
    jobSerialLabel.textContent = labels.serial;
  }

  const fieldMap = [
    [jobTitleField, placeholders.title],
    [jobWorkOrderField, placeholders.work_order],
    [jobCustomerField, placeholders.customer],
    [jobMachineField, placeholders.machine],
    [jobSerialField, placeholders.serial],
    [jobPartNumbersField, placeholders.part_numbers],
    [jobTorqueValuesField, placeholders.torque_values],
    [jobComplaintField, placeholders.complaint],
    [jobCauseField, placeholders.cause],
    [jobCorrectionField, placeholders.correction]
  ];

  fieldMap.forEach(([field, placeholder]) => {
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement
    ) {
      field.placeholder = placeholder;
    }
  });
}

function createMetaItem(labelText, valueText) {
  const wrapper = document.createElement("div");
  wrapper.className = "job-meta";

  const label = document.createElement("span");
  label.className = "job-meta__label";
  label.textContent = labelText;

  const value = document.createElement("strong");
  value.textContent = valueText;

  wrapper.append(label, value);
  return wrapper;
}

function formatReportValue(value) {
  const normalized = value?.toString().trim();
  return normalized ? normalized : "Not provided";
}

function getJobSummaryMachineLabel(job) {
  return getJobFieldLabels(job.industry).machine;
}

function buildJobReport(job) {
  const labels = getJobFieldLabels(job.industry);

  return [
    "IronSolidSystems",
    "",
    `${labels.jobName}: ${formatReportValue(job.title)}`,
    `Status: ${formatReportValue(job.status)}`,
    `Work Order: ${formatReportValue(job.work_order)}`,
    `Customer: ${formatReportValue(job.customer)}`,
    `Industry: ${formatReportValue(job.industry)}`,
    `${labels.machine}: ${formatReportValue(job.machine)}`,
    `${labels.serial}: ${formatReportValue(job.serial)}`,
    `Complaint: ${formatReportValue(job.complaint)}`,
    `Cause: ${formatReportValue(job.cause)}`,
    `Correction: ${formatReportValue(job.correction)}`,
    `Part Numbers: ${formatReportValue(job.part_numbers)}`,
    `Torque Values: ${formatReportValue(job.torque_values)}`,
    `Created Date: ${formatCreatedAt(job.created_at)}`
  ].join("\n");
}

function showReportPreview(job) {
  const reportText = buildJobReport(job);
  reportPreviewTitle.textContent = `Copy Ready Report: ${job.title || "Untitled job"}`;
  reportPreviewContent.textContent = reportText;
  reportPreview.hidden = false;
  reportPreview.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copyReport(job) {
  const reportText = buildJobReport(job);

  try {
    await navigator.clipboard.writeText(reportText);
    setMessage(jobsMessage, "Copied to clipboard.", "success");
  } catch {
    setMessage(jobsMessage, "Unable to copy report to clipboard.", "error");
  }
}

async function copyCrewCode(crewCode) {
  try {
    await navigator.clipboard.writeText(crewCode);
    setMessage(jobsMessage, "Crew code copied to clipboard.", "success");
  } catch {
    setMessage(jobsMessage, "Unable to copy crew code.", "error");
  }
}

async function enableCrewAccess(job) {
  let crewCode = job.crew_code || "";

  if (!crewCode) {
    try {
      crewCode = await getUniqueCrewCode();
    } catch (error) {
      setMessage(
        jobsMessage,
        error instanceof Error ? error.message : "Unable to generate crew code.",
        "error"
      );
      return;
    }
  }

  const { error } = await supabaseClient
    .from("jobs")
    .update({
      crew_enabled: true,
      crew_code: crewCode
    })
    .eq("id", job.id)
    .eq("user_id", currentUser.id);

  if (error) {
    setMessage(jobsMessage, `Unable to enable crew access: ${error.message}`, "error");
    return;
  }

  setMessage(jobsMessage, "Crew access enabled.", "success");
  await loadJobs();
}

async function removeCrewMember(job, member) {
  const { error } = await supabaseClient
    .from("job_crew")
    .delete()
    .eq("job_id", job.id)
    .eq("user_id", member.user_id);

  if (error) {
    setMessage(jobsMessage, `Unable to remove crew member: ${error.message}`, "error");
    return;
  }

  setMessage(jobsMessage, "Crew member removed.", "success");
  await loadJobs();
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

async function createSignedPhotoUrls(photos) {
  if (!photos.length) {
    return [];
  }

  const { data, error } = await supabaseClient.storage
    .from("job_photos")
    .createSignedUrls(
      photos.map((photo) => photo.file_path),
      3600
    );

  if (error) {
    throw error;
  }

  return photos.map((photo, index) => ({
    ...photo,
    signed_url: data[index]?.signedUrl || ""
  }));
}

async function fetchJobPhotos(jobId) {
  const { data, error } = await supabaseClient
    .from("photos")
    .select("id, job_id, image_url, file_path, description, uploaded_by, created_at")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return createSignedPhotoUrls(data || []);
}

function renderPhotoGallery(job, photos, galleryGrid, searchValue = "") {
  galleryGrid.innerHTML = "";

  const filteredPhotos = photos.filter((photo) => {
    const text = photo.description?.toLowerCase() || "";
    return text.includes(searchValue.toLowerCase());
  });

  if (filteredPhotos.length === 0) {
    const empty = document.createElement("p");
    empty.className = "list-message";
    empty.textContent = searchValue
      ? "No photos match that description search."
      : "No photos uploaded for this job yet.";
    galleryGrid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  filteredPhotos.forEach((photo) => {
    const card = document.createElement("article");
    card.className = "photo-card";

    const thumb = document.createElement("img");
    thumb.className = "photo-card__thumb";
    thumb.src = photo.signed_url;
    thumb.alt = photo.description || "Job photo";
    thumb.addEventListener("click", () => {
      openPhotoModal(photo.signed_url);
    });

    const description = document.createElement("p");
    description.className = "photo-card__description";
    description.textContent = photo.description || "No description provided.";

    const uploadedDate = document.createElement("span");
    uploadedDate.className = "photo-card__date";
    uploadedDate.textContent = `Uploaded ${formatCreatedAt(photo.created_at)}`;

    card.append(thumb, description, uploadedDate);

    if (canDeletePhoto(job, photo)) {
      const actions = document.createElement("div");
      actions.className = "photo-card__actions";

      const deleteButton = document.createElement("button");
      deleteButton.className = "button button--ghost button--small";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete Photo";
      deleteButton.addEventListener("click", async () => {
        const confirmed = window.confirm("Are you sure? This will permanently delete the photo.");
        if (!confirmed) {
          return;
        }

        const { error: storageError } = await supabaseClient.storage
          .from("job_photos")
          .remove([photo.file_path]);

        if (storageError) {
          setMessage(jobsMessage, `Unable to delete photo file: ${storageError.message}`, "error");
          return;
        }

        const { error: rowError } = await supabaseClient
          .from("photos")
          .delete()
          .eq("id", photo.id);

        if (rowError) {
          setMessage(jobsMessage, `Unable to delete photo record: ${rowError.message}`, "error");
          return;
        }

        setMessage(jobsMessage, "Photo deleted successfully.", "success");
        const refreshedPhotos = await fetchJobPhotos(job.id);
        renderPhotoGallery(job, refreshedPhotos, galleryGrid, searchValue);
      });

      actions.appendChild(deleteButton);
      card.appendChild(actions);
    }

    fragment.appendChild(card);
  });

  galleryGrid.appendChild(fragment);
}

function createPhotoSection(job) {
  const wrapper = document.createElement("section");
  wrapper.className = "job-detail-grid";

  const dropbox = document.createElement("section");
  dropbox.className = "photo-dropbox";
  const dropboxTitle = document.createElement("h6");
  dropboxTitle.textContent = "Photo Drop Box";
  dropbox.appendChild(dropboxTitle);

  const gallery = document.createElement("section");
  gallery.className = "photo-gallery";
  const galleryTitle = document.createElement("h6");
  galleryTitle.textContent = "Job Photos";
  gallery.appendChild(galleryTitle);

  const uploadMessage = document.createElement("p");
  uploadMessage.className = "form-message";

  if (canUploadPhotos(job)) {
    const uploadGrid = document.createElement("div");
    uploadGrid.className = "form-grid";

    const helperText = document.createElement("div");
    helperText.className = "photo-dropbox__helper field--full";
    helperText.innerHTML = `
      <p>Photos can only be added after a job has been created and saved.</p>
      <p>Photo upload works best from mobile using JPG or PNG images.
      Some browsers may not fully support HEIC/HEIF iPhone photo formats.
      If upload issues occur, take a screenshot or export the image as JPG.</p>
    `;

    const fileField = document.createElement("label");
    fileField.className = "field";
    const fileLabel = document.createElement("span");
    fileLabel.textContent = "Select Photos";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg,image/png,image/webp";
    fileInput.multiple = true;
    fileField.append(fileLabel, fileInput);

    const descriptionField = document.createElement("label");
    descriptionField.className = "field";
    const descriptionLabel = document.createElement("span");
    descriptionLabel.textContent = "Description";
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Applies to selected photos";
    descriptionField.append(descriptionLabel, descriptionInput);

    uploadGrid.append(helperText, fileField, descriptionField);
    dropbox.append(uploadGrid);

    const uploadActions = document.createElement("div");
    uploadActions.className = "photo-dropbox__actions";

    const uploadButton = document.createElement("button");
    uploadButton.className = "button button--primary button--small";
    uploadButton.type = "button";
    uploadButton.textContent = "Upload Photos";

    uploadActions.append(uploadMessage, uploadButton);
    dropbox.append(uploadActions);

    uploadButton.addEventListener("click", async () => {
      const files = Array.from(fileInput.files || []);
      const description = descriptionInput.value.trim();

      if (files.length === 0) {
        setMessage(uploadMessage, "Select one or more photos to upload.", "error");
        return;
      }

      const unsupportedFiles = files.filter((file) => {
        return !["image/jpeg", "image/png", "image/webp"].includes(file.type);
      });

      if (unsupportedFiles.length > 0) {
        setMessage(
          uploadMessage,
          "This file format is not supported here. JPG, PNG, or WEBP is recommended. If you are using iPhone HEIC/HEIF photos, export them as JPG or take a screenshot first.",
          "error"
        );
        return;
      }

      uploadButton.disabled = true;
      uploadButton.textContent = "Uploading...";

      try {
        for (let index = 0; index < files.length; index += 1) {
          const file = files[index];
          setMessage(uploadMessage, `Uploading ${index + 1} of ${files.length}...`);

          const filePath = `${job.id}/${currentUser.id}/${Date.now()}-${sanitizeFileName(file.name)}`;

          const { error: uploadError } = await supabaseClient.storage
            .from("job_photos")
            .upload(filePath, file);

          if (uploadError) {
            console.error("Photo upload error", uploadError);
            setMessage(
              uploadMessage,
              `Storage upload failed: ${uploadError.message}`,
              "error"
            );
            throw uploadError;
          }

          const { error: insertError } = await supabaseClient.from("photos").insert({
            job_id: job.id,
            image_url: "",
            file_path: filePath,
            description,
            uploaded_by: currentUser.id
          });

          if (insertError) {
            console.error("Photo upload error", insertError);
            setMessage(
              uploadMessage,
              `Photo record failed: ${insertError.message}`,
              "error"
            );
            throw insertError;
          }
        }

        fileInput.value = "";
        descriptionInput.value = "";
        setMessage(uploadMessage, "Photos uploaded successfully.", "success");
        const refreshedPhotos = await fetchJobPhotos(job.id);
        renderPhotoGallery(job, refreshedPhotos, galleryGridBody, searchInput.value);
      } catch (error) {
        console.error("Photo upload error", error);
        const message = error instanceof Error ? error.message : "Photo upload failed.";
        if (!uploadMessage.classList.contains("is-error")) {
          setMessage(uploadMessage, `Unable to upload photos: ${message}`, "error");
        }
      } finally {
        uploadButton.disabled = false;
        uploadButton.textContent = "Upload Photos";
      }
    });
  } else {
    setMessage(uploadMessage, "You can view and search photos for this job.");
    dropbox.appendChild(uploadMessage);
  }

  const toolbar = document.createElement("div");
  toolbar.className = "photo-gallery__toolbar";

  const searchField = document.createElement("label");
  searchField.className = "field";
  const searchLabel = document.createElement("span");
  searchLabel.textContent = "Search photo descriptions";
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search photo descriptions";
  searchField.append(searchLabel, searchInput);
  toolbar.appendChild(searchField);

  const galleryGridBody = document.createElement("div");
  galleryGridBody.className = "photo-gallery__grid";

  const galleryMessage = document.createElement("p");
  galleryMessage.className = "form-message";
  gallery.append(toolbar, galleryMessage, galleryGridBody);

  let cachedPhotos = [];

  searchInput.addEventListener("input", () => {
    renderPhotoGallery(job, cachedPhotos, galleryGridBody, searchInput.value);
  });

  fetchJobPhotos(job.id)
    .then((photos) => {
      cachedPhotos = photos;
      setMessage(galleryMessage, `${photos.length} photo${photos.length === 1 ? "" : "s"} loaded.`, photos.length ? "success" : "");
      renderPhotoGallery(job, photos, galleryGridBody, "");
    })
    .catch((error) => {
      const message = error instanceof Error ? error.message : "Unable to load photos.";
      setMessage(galleryMessage, `Unable to load photos: ${message}`, "error");
    });

  wrapper.append(dropbox, gallery);
  return wrapper;
}

function createInputField(labelText, name, value = "") {
  const label = document.createElement("label");
  label.className = "field";

  const span = document.createElement("span");
  span.textContent = labelText;

  const input = document.createElement("input");
  input.type = "text";
  input.name = name;
  input.value = value;

  label.append(span, input);
  return label;
}

function createSelectField(labelText, name, value, options) {
  const label = document.createElement("label");
  label.className = "field";

  const span = document.createElement("span");
  span.textContent = labelText;

  const select = document.createElement("select");
  select.name = name;

  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    if (optionValue === value) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  label.append(span, select);
  return label;
}

function createTextareaField(labelText, name, value = "", rows = 5) {
  const label = document.createElement("label");
  label.className = "field field--full";

  const span = document.createElement("span");
  span.textContent = labelText;

  const textarea = document.createElement("textarea");
  textarea.name = name;
  textarea.rows = rows;
  textarea.value = value;

  label.append(span, textarea);
  return label;
}

async function saveJobEdits(job, form, saveButton, statusMessage) {
  const formData = new FormData(form);
  const payload = {
    title: formData.get("title")?.toString().trim() || "",
    status: formData.get("status")?.toString().trim() || "",
    work_order: formData.get("work_order")?.toString().trim() || "",
    customer: formData.get("customer")?.toString().trim() || "",
    machine: formData.get("machine")?.toString().trim() || "",
    serial: formData.get("serial")?.toString().trim() || "",
    industry: formData.get("industry")?.toString().trim() || "",
    complaint: formData.get("complaint")?.toString().trim() || "",
    cause: formData.get("cause")?.toString().trim() || "",
    correction: formData.get("correction")?.toString().trim() || "",
    part_numbers: formData.get("part_numbers")?.toString().trim() || "",
    torque_values: formData.get("torque_values")?.toString().trim() || ""
  };

  saveButton.disabled = true;
  saveButton.textContent = "Saving...";
  setMessage(statusMessage, "Saving changes...");

  const { error } = await supabaseClient.from("jobs").update(payload).eq("id", job.id);

  saveButton.disabled = false;
  saveButton.textContent = "Save Changes";

  if (error) {
    setMessage(statusMessage, `Unable to save changes: ${error.message}`, "error");
    return;
  }

  setMessage(statusMessage, "Job updated successfully.", "success");
  await loadJobs();
}

async function deleteJobForever(job, confirmationBox) {
  const { error } = await supabaseClient
    .from("jobs")
    .delete()
    .eq("id", job.id)
    .eq("user_id", currentUser.id);

  if (error) {
    setMessage(jobsMessage, `Unable to delete job: ${error.message}`, "error");
    return;
  }

  confirmationBox.hidden = true;
  reportPreview.hidden = true;
  setMessage(jobsMessage, "Job deleted permanently.", "success");
  await loadJobs();
}

function createCrewMembersList(job) {
  const list = document.createElement("div");
  list.className = "crew-list";

  const ownerRow = document.createElement("div");
  ownerRow.className = "crew-member";
  ownerRow.append(
    createMetaItem("Job Lead", job.isOwner ? "You" : shortUserId(job.user_id)),
    createMetaItem("Role", "Job Lead")
  );
  list.appendChild(ownerRow);

  (job.crewMembers || []).forEach((member) => {
    if (member.user_id === job.user_id) {
      return;
    }

    const row = document.createElement("div");
    row.className = "crew-member";
    row.append(
      createMetaItem(
        "Crew Member",
        member.user_id === currentUser.id ? "You" : shortUserId(member.user_id)
      ),
      createMetaItem("Role", member.role || "Crew")
    );

    if (canManageCrew(job)) {
      const removeButton = document.createElement("button");
      removeButton.className = "button button--ghost button--small";
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        removeCrewMember(job, member);
      });
      row.appendChild(removeButton);
    }

    list.appendChild(row);
  });

  return list;
}

function createCrewSection(job) {
  const section = document.createElement("section");
  section.className = "crew-section";

  const header = document.createElement("div");
  header.className = "crew-section__header";

  const title = document.createElement("h4");
  title.textContent = "Crew Access";

  const badge = document.createElement("span");
  badge.className = "panel__badge";
  badge.textContent = job.accessRole || "Supervisor";

  header.append(title, badge);
  section.appendChild(header);

  if (canManageCrew(job) && !job.crew_enabled) {
    const enableButton = document.createElement("button");
    enableButton.className = "button button--secondary button--small";
    enableButton.type = "button";
    enableButton.textContent = "Enable Crew Access";
    enableButton.addEventListener("click", () => {
      enableCrewAccess(job);
    });
    section.appendChild(enableButton);
  }

  if (job.crew_enabled) {
    const details = document.createElement("details");
    details.className = "crew-details";

    const summary = document.createElement("summary");
    summary.textContent = "Show Crew Access Details";

    const codeBox = document.createElement("div");
    codeBox.className = "crew-code-box";

    const codeText = document.createElement("strong");
    codeText.textContent = `Crew Code: ${job.crew_code || "Not set"}`;

    const copyButton = document.createElement("button");
    copyButton.className = "button button--ghost button--small";
    copyButton.type = "button";
    copyButton.textContent = "Copy Crew Code";
    copyButton.addEventListener("click", () => {
      copyCrewCode(job.crew_code || "");
    });

    codeBox.append(codeText, copyButton);
    details.append(summary, codeBox, createCrewMembersList(job));
    section.appendChild(details);
  } else if (!canManageCrew(job)) {
    const note = document.createElement("p");
    note.className = "crew-section__note";
    note.textContent = "Crew access has not been enabled for this job.";
    section.appendChild(note);
  }

  return section;
}

function createEditSection(job) {
  if (!canEditJob(job)) {
    return null;
  }

  const labels = getJobFieldLabels(job.industry);
  const wrapper = document.createElement("section");
  wrapper.className = "job-editor";
  wrapper.hidden = true;

  const form = document.createElement("form");
  form.className = "job-editor__form";

  const grid = document.createElement("div");
  grid.className = "form-grid";

  grid.append(
    createInputField(labels.jobName, "title", job.title || ""),
    createSelectField("Status", "status", job.status || "Open", [
      "Open",
      "In Progress",
      "Waiting on Parts",
      "Completed"
    ]),
    createInputField("Work Order", "work_order", job.work_order || ""),
    createInputField("Customer", "customer", job.customer || ""),
    createInputField(labels.machine, "machine", job.machine || ""),
    createInputField(labels.serial, "serial", job.serial || ""),
    createSelectField("Industry", "industry", job.industry || "", [
      "",
      "Heavy Equipment",
      "Automotive",
      "Industrial Maintenance",
      "Welding & Fabrication"
    ]),
    createTextareaField("Complaint", "complaint", job.complaint || ""),
    createTextareaField("Cause", "cause", job.cause || ""),
    createTextareaField("Correction", "correction", job.correction || ""),
    createTextareaField("Part Numbers", "part_numbers", job.part_numbers || "", 4),
    createTextareaField("Torque Values", "torque_values", job.torque_values || "", 4)
  );

  const industryField = grid.querySelector('select[name="industry"]');
  if (industryField instanceof HTMLSelectElement) {
    industryField.options[0].textContent = "Select Industry";
  }

  const footer = document.createElement("div");
  footer.className = "job-editor__footer";

  const statusMessage = document.createElement("p");
  statusMessage.className = "form-message";

  const buttonRow = document.createElement("div");
  buttonRow.className = "job-editor__buttons";

  const cancelButton = document.createElement("button");
  cancelButton.className = "button button--ghost button--small";
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    wrapper.hidden = true;
  });

  const saveButton = document.createElement("button");
  saveButton.className = "button button--primary button--small";
  saveButton.type = "submit";
  saveButton.textContent = "Save Changes";

  buttonRow.append(cancelButton, saveButton);
  footer.append(statusMessage, buttonRow);
  form.append(grid, footer);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveJobEdits(job, form, saveButton, statusMessage);
  });

  wrapper.appendChild(form);
  return wrapper;
}

function createDeleteConfirmation(job) {
  const box = document.createElement("div");
  box.className = "delete-confirmation";
  box.hidden = true;

  const message = document.createElement("p");
  message.textContent = "Are you sure? This will permanently delete the job.";

  const actions = document.createElement("div");
  actions.className = "delete-confirmation__actions";

  const cancelButton = document.createElement("button");
  cancelButton.className = "button button--ghost button--small";
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    box.hidden = true;
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "button button--primary button--small";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete Forever";
  deleteButton.addEventListener("click", () => {
    deleteJobForever(job, box);
  });

  actions.append(cancelButton, deleteButton);
  box.append(message, actions);
  return box;
}

function createJobDetail(job) {
  const article = document.createElement("section");
  article.className = "job-detail-content";

  const top = document.createElement("div");
  top.className = "job-detail-header";

  const titleGroup = document.createElement("div");
  const titleElement = document.createElement("h5");
  titleElement.textContent = job.title || "Untitled job";

  const customerElement = document.createElement("p");
  customerElement.textContent = job.customer || "No customer listed";
  titleGroup.append(titleElement, customerElement);

  const statusElement = document.createElement("span");
  statusElement.className = "status-tag";
  statusElement.textContent = job.status || "Unknown";

  top.append(titleGroup, statusElement);

  const meta = document.createElement("div");
  meta.className = "job-detail-grid";
  meta.append(
    createMetaItem(getJobSummaryMachineLabel(job), job.machine || "Not provided"),
    createMetaItem("Industry", job.industry || "Not provided"),
    createMetaItem("Work Order", job.work_order || "Not assigned"),
    createMetaItem("Created", formatCreatedAt(job.created_at)),
    createMetaItem("Your Role", job.accessRole || "Supervisor"),
    createMetaItem(getJobFieldLabels(job.industry).serial, job.serial || "Not provided")
  );

  const detailSections = document.createElement("div");
  detailSections.className = "job-detail-grid";

  const detailsSection = document.createElement("section");
  detailsSection.className = "job-detail-section";
  const detailsTitle = document.createElement("h6");
  detailsTitle.textContent = "Job Details";
  detailsSection.append(
    detailsTitle,
    createMetaItem("Customer", job.customer || "Not provided"),
    createMetaItem("Part Numbers", job.part_numbers || "Not provided"),
    createMetaItem("Torque Values", job.torque_values || "Not provided")
  );

  const threeCSection = document.createElement("section");
  threeCSection.className = "job-detail-section";
  const threeCTitle = document.createElement("h6");
  threeCTitle.textContent = "Complaint, Cause, and Correction";
  const threeCContent = document.createElement("div");
  threeCContent.className = "job-detail-three-c";
  [
    ["Complaint", job.complaint],
    ["Cause", job.cause],
    ["Correction", job.correction]
  ].forEach(([label, value]) => {
    const note = document.createElement("div");
    note.className = "job-detail-note";
    const strong = document.createElement("strong");
    strong.textContent = label;
    const text = document.createElement("p");
    text.textContent = formatReportValue(value);
    note.append(strong, text);
    threeCContent.appendChild(note);
  });
  threeCSection.append(threeCTitle, threeCContent);

  const partsSection = document.createElement("section");
  partsSection.className = "job-detail-section";
  const partsTitle = document.createElement("h6");
  partsTitle.textContent = "Parts & Torque Information";
  const partsContent = document.createElement("div");
  partsContent.className = "job-detail-three-c";
  [
    ["Part Numbers", job.part_numbers],
    ["Torque Values", job.torque_values]
  ].forEach(([label, value]) => {
    const note = document.createElement("div");
    note.className = "job-detail-note";
    const strong = document.createElement("strong");
    strong.textContent = label;
    const text = document.createElement("p");
    text.textContent = formatReportValue(value);
    note.append(strong, text);
    partsContent.appendChild(note);
  });
  partsSection.append(partsTitle, partsContent);

  detailSections.append(detailsSection, threeCSection, partsSection);

  const actions = document.createElement("div");
  actions.className = "job-item__actions";

  const viewButton = document.createElement("button");
  viewButton.className = "button button--secondary button--small";
  viewButton.type = "button";
  viewButton.textContent = "View Copy Ready Report";
  viewButton.addEventListener("click", () => {
    showReportPreview(job);
  });

  const copyButton = document.createElement("button");
  copyButton.className = "button button--ghost button--small";
  copyButton.type = "button";
  copyButton.textContent = "Copy Report";
  copyButton.addEventListener("click", () => {
    copyReport(job);
  });

  actions.append(viewButton, copyButton);

  const editSection = createEditSection(job);
  if (editSection) {
    const editButton = document.createElement("button");
    editButton.className = "button button--ghost button--small";
    editButton.type = "button";
    editButton.textContent = "Edit Job";
    editButton.addEventListener("click", () => {
      editSection.hidden = !editSection.hidden;
    });
    actions.appendChild(editButton);
  }

  const deleteConfirmation = createDeleteConfirmation(job);
  if (canDeleteJob(job)) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "button button--ghost button--small";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete Job";
    deleteButton.addEventListener("click", () => {
      deleteConfirmation.hidden = false;
    });
    actions.appendChild(deleteButton);
  }

  article.append(top, meta, detailSections, createPhotoSection(job), actions, createCrewSection(job));

  if (editSection) {
    article.appendChild(editSection);
  }

  if (canDeleteJob(job)) {
    article.appendChild(deleteConfirmation);
  }

  return article;
}

function createJobSummaryRow(job) {
  const row = document.createElement("article");
  row.className = "job-summary-row";

  const date = document.createElement("div");
  date.className = "job-summary-row__date";
  date.textContent = formatCreatedAt(job.created_at);

  const title = document.createElement("div");
  title.className = "job-summary-row__title";
  const strong = document.createElement("strong");
  strong.textContent = job.title || "Untitled job";
  const subtitle = document.createElement("span");
  subtitle.textContent = job.customer || "No customer listed";
  title.append(strong, subtitle);

  const summary = document.createElement("div");
  summary.className = "job-summary-row__summary";
  summary.textContent = getJobSummary(job);

  const actionWrap = document.createElement("div");
  const viewButton = document.createElement("button");
  viewButton.className = "button button--secondary button--small";
  viewButton.type = "button";
  viewButton.textContent = "View Job";
  viewButton.addEventListener("click", () => {
    selectedJobId = job.id;
    jobDetailTitle.textContent = job.title || "Job Details";
    jobDetailContent.innerHTML = "";
    jobDetailContent.appendChild(createJobDetail(job));
    jobDetailView.hidden = false;
    reportPreview.hidden = true;
    jobDetailView.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  actionWrap.appendChild(viewButton);

  row.append(date, title, summary, actionWrap);
  return row;
}

async function loadJobs() {
  if (!currentUser) {
    jobsSummaryList.innerHTML = "";
    jobDetailContent.innerHTML = "";
    jobDetailView.hidden = true;
    reportPreview.hidden = true;
    visibleJobs = [];
    jobCount.textContent = "0";
    setMessage(jobsMessage, "Sign in to load jobs.");
    return;
  }

  setMessage(jobsMessage, "Loading jobs...");
  jobsSummaryList.innerHTML = "";
  jobDetailContent.innerHTML = "";
  jobDetailView.hidden = true;
  reportPreview.hidden = true;
  visibleJobs = [];

  const { data: ownedJobs, error: ownedError } = await supabaseClient
    .from("jobs")
    .select(JOB_FIELDS_SELECT)
    .eq("user_id", currentUser.id);

  if (ownedError) {
    jobCount.textContent = "0";
    setMessage(jobsMessage, `Unable to load jobs: ${ownedError.message}`, "error");
    return;
  }

  const { data: membershipRows, error: membershipError } = await supabaseClient
    .from("job_crew")
    .select("job_id, user_id, role")
    .eq("user_id", currentUser.id);

  if (membershipError) {
    jobCount.textContent = "0";
    setMessage(jobsMessage, `Unable to load crew jobs: ${membershipError.message}`, "error");
    return;
  }

  const jobsById = new Map();
  const membershipByJobId = new Map();

  (membershipRows || []).forEach((membership) => {
    membershipByJobId.set(membership.job_id, membership);
  });

  (ownedJobs || []).forEach((job) => {
    jobsById.set(job.id, {
      ...job,
      accessRole: "Job Lead",
      isOwner: true
    });
  });

  const crewJobIds = (membershipRows || [])
    .map((membership) => membership.job_id)
    .filter((jobId) => !jobsById.has(jobId));

  if (crewJobIds.length > 0) {
    const { data: crewJobs, error: crewJobsError } = await supabaseClient
      .from("jobs")
      .select(JOB_FIELDS_SELECT)
      .in("id", crewJobIds);

    if (crewJobsError) {
      jobCount.textContent = "0";
      setMessage(jobsMessage, `Unable to load crew jobs: ${crewJobsError.message}`, "error");
      return;
    }

    (crewJobs || []).forEach((job) => {
      const membership = membershipByJobId.get(job.id);
      jobsById.set(job.id, {
        ...job,
        accessRole: membership?.role || "Job Worker",
        isOwner: false
      });
    });
  }

  const jobs = Array.from(jobsById.values());

  if (jobs.length === 0) {
    jobCount.textContent = "0";
    setMessage(jobsMessage, "No jobs found yet. Create your first job or join a crew.");
    return;
  }

  const jobIds = jobs.map((job) => job.id);
  const { data: crewRows, error: crewRowsError } = await supabaseClient
    .from("job_crew")
    .select("job_id, user_id, role")
    .in("job_id", jobIds);

  if (crewRowsError) {
    jobCount.textContent = "0";
    setMessage(jobsMessage, `Unable to load crew details: ${crewRowsError.message}`, "error");
    return;
  }

  const crewMembersByJobId = new Map();
  (crewRows || []).forEach((row) => {
    const rows = crewMembersByJobId.get(row.job_id) || [];
    rows.push(row);
    crewMembersByJobId.set(row.job_id, rows);
  });

  jobs.forEach((job) => {
    job.crewMembers = crewMembersByJobId.get(job.id) || [];
  });

  jobs.sort((left, right) => {
    return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
  });

  visibleJobs = jobs;
  jobCount.textContent = String(jobs.length);
  setMessage(
    jobsMessage,
    `Showing ${jobs.length} job${jobs.length === 1 ? "" : "s"}.`,
    "success"
  );

  const fragment = document.createDocumentFragment();
  jobs.forEach((job) => {
    fragment.appendChild(createJobSummaryRow(job));
  });
  jobsSummaryList.appendChild(fragment);
}

async function signUpUser() {
  const { fullName, email, password, confirmPassword } = getSignUpFields();

  if (!fullName || !email || !password || !confirmPassword) {
    setMessage(
      signUpMessage,
      "Full name, email, password, and confirm password are required.",
      "error"
    );
    return;
  }

  if (password !== confirmPassword) {
    setMessage(signUpMessage, "Password and Confirm Password must match.", "error");
    return;
  }

  setButtonsDisabled([signUpButton, copyAccountButton], true);
  setMessage(signUpMessage, "Creating account...");

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });

  setButtonsDisabled([signUpButton, copyAccountButton], false);

  if (error) {
    setMessage(signUpMessage, `Sign up failed: ${error.message}`, "error");
    return;
  }

  setMessage(
    signUpMessage,
    "Sign up successful. Check your email if confirmation is enabled, then sign in.",
    "success"
  );
}

async function signInUser() {
  const { email, password } = getSignInFields();

  if (!email || !password) {
    setMessage(signInMessage, "Enter an email and password to sign in.", "error");
    return;
  }

  setButtonsDisabled([signInButton], true);
  setMessage(signInMessage, "Signing in...");

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  setButtonsDisabled([signInButton], false);

  if (error) {
    setMessage(signInMessage, `Sign in failed: ${error.message}`, "error");
    return;
  }

  currentUser = data.user || null;
  updateAuthUI(currentUser);
  setMainView("main");
  setMessage(signInMessage, "Signed in successfully.", "success");
  await loadJobs();
}

async function signOutUser() {
  setButtonsDisabled([signInButton, logOutButton], true);
  setMessage(signInMessage, "Signing out...");

  const { error } = await supabaseClient.auth.signOut();

  setButtonsDisabled([signInButton, logOutButton], false);

  if (error) {
    setMessage(signInMessage, `Sign out failed: ${error.message}`, "error");
    return;
  }

  currentUser = null;
  updateAuthUI(currentUser);
  setMessage(signInMessage, "Signed out.", "success");
}

async function copyAccountInfo() {
  const { fullName, email, password, confirmPassword } = getSignUpFields();

  if (!fullName || !email || !password || !confirmPassword) {
    setMessage(
      signUpMessage,
      "Fill out full name, email, password, and confirm password before copying.",
      "error"
    );
    return;
  }

  if (password !== confirmPassword) {
    setMessage(signUpMessage, "Password and Confirm Password must match.", "error");
    return;
  }

  const accountInfo = [
    "IronSolidSystems Account",
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Password: ${password}`
  ].join("\n");

  try {
    await navigator.clipboard.writeText(accountInfo);
    setMessage(signUpMessage, "Account info copied. Save it somewhere safe.", "success");
  } catch {
    setMessage(signUpMessage, "Unable to copy account info to the clipboard.", "error");
  }
}

async function checkCurrentUser() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    currentUser = null;
    updateAuthUI(currentUser);
    setMessage(signInMessage, `Session check failed: ${error.message}`, "error");
    return;
  }

  currentUser = data.session?.user || null;
  updateAuthUI(currentUser);

  if (currentUser) {
    setMainView("main");
    setMessage(signInMessage, "Session restored.", "success");
    await loadJobs();
  } else {
    setMessage(signInMessage, "Sign in to access your app workspace.");
  }
}

async function handleJobSubmit(event) {
  event.preventDefault();

  if (!currentUser) {
    setMessage(formMessage, "You must be signed in to save a job.", "error");
    return;
  }

  setMessage(formMessage, "Saving job...");
  submitButton.disabled = true;
  submitButton.textContent = "Saving...";

  const formData = new FormData(jobForm);
  const payload = {
    user_id: currentUser.id,
    title: formData.get("title")?.toString().trim() || "",
    status: formData.get("status")?.toString().trim() || "",
    work_order: formData.get("work_order")?.toString().trim() || "",
    customer: formData.get("customer")?.toString().trim() || "",
    machine: formData.get("machine")?.toString().trim() || "",
    serial: formData.get("serial")?.toString().trim() || "",
    industry: formData.get("industry")?.toString().trim() || "",
    part_numbers: formData.get("part_numbers")?.toString().trim() || "",
    torque_values: formData.get("torque_values")?.toString().trim() || "",
    complaint: formData.get("complaint")?.toString().trim() || "",
    cause: formData.get("cause")?.toString().trim() || "",
    correction: formData.get("correction")?.toString().trim() || ""
  };

  const { error } = await supabaseClient.from("jobs").insert(payload);

  submitButton.disabled = false;
  submitButton.textContent = "Save Job";

  if (error) {
    setMessage(formMessage, `Failed to save job: ${error.message}`, "error");
    return;
  }

  jobForm.reset();

  const statusField = jobForm.elements.namedItem("status");
  if (statusField instanceof HTMLSelectElement) {
    statusField.value = "Open";
  }

  const industryField = jobForm.elements.namedItem("industry");
  if (industryField instanceof HTMLSelectElement) {
    industryField.value = "";
  }

  updateJobPlaceholders();
  setMessage(formMessage, "Job saved successfully.", "success");
  await loadJobs();
}

async function handleJoinCrew(event) {
  event.preventDefault();

  if (!currentUser || !joinCrewCodeInput || !joinCrewRoleSelect) {
    return;
  }

  const crewCode = joinCrewCodeInput.value.trim();
  const requestedRole = joinCrewRoleSelect.value;

  if (!/^\d{8}$/.test(crewCode)) {
    setMessage(joinCrewMessage, "Enter a valid 8-digit crew code.", "error");
    return;
  }

  if (requestedRole === "Job Lead") {
    setMessage(joinCrewMessage, "Job Lead access cannot be requested through crew join.", "error");
    return;
  }

  joinCrewButton.disabled = true;
  joinCrewButton.textContent = "Joining...";
  setMessage(joinCrewMessage, "Joining crew...");

  const { data: job, error: jobError } = await supabaseClient
    .from("jobs")
    .select("id, user_id, crew_code, crew_enabled")
    .eq("crew_code", crewCode)
    .eq("crew_enabled", true)
    .maybeSingle();

  if (jobError) {
    joinCrewButton.disabled = false;
    joinCrewButton.textContent = "Join Crew";
    setMessage(joinCrewMessage, `Unable to join crew: ${jobError.message}`, "error");
    return;
  }

  if (!job) {
    joinCrewButton.disabled = false;
    joinCrewButton.textContent = "Join Crew";
    setMessage(joinCrewMessage, "No active crew was found for that code.", "error");
    return;
  }

  if (job.user_id === currentUser.id) {
    joinCrewButton.disabled = false;
    joinCrewButton.textContent = "Join Crew";
    setMessage(joinCrewMessage, "You already lead this job.", "error");
    return;
  }

  const { data: existingMembership, error: existingError } = await supabaseClient
    .from("job_crew")
    .select("job_id, user_id, role")
    .eq("job_id", job.id)
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (existingError) {
    joinCrewButton.disabled = false;
    joinCrewButton.textContent = "Join Crew";
    setMessage(joinCrewMessage, `Unable to join crew: ${existingError.message}`, "error");
    return;
  }

  if (existingMembership) {
    const { error: updateError } = await supabaseClient
      .from("job_crew")
      .update({ role: requestedRole })
      .eq("job_id", job.id)
      .eq("user_id", currentUser.id);

    joinCrewButton.disabled = false;
    joinCrewButton.textContent = "Join Crew";

    if (updateError) {
      setMessage(joinCrewMessage, `Unable to update crew role: ${updateError.message}`, "error");
      return;
    }

    setMessage(joinCrewMessage, "Crew role updated successfully.", "success");
    await loadJobs();
    return;
  }

  const { error: insertError } = await supabaseClient.from("job_crew").insert({
    job_id: job.id,
    user_id: currentUser.id,
    role: requestedRole
  });

  joinCrewButton.disabled = false;
  joinCrewButton.textContent = "Join Crew";

  if (insertError) {
    setMessage(joinCrewMessage, `Unable to join crew: ${insertError.message}`, "error");
    return;
  }

  joinCrewForm.reset();
  setMessage(joinCrewMessage, "Crew joined successfully.", "success");
  await loadJobs();
}

if (signUpForm) {
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

if (signInForm) {
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

if (jobForm) {
  jobForm.addEventListener("submit", handleJobSubmit);
}

if (joinCrewForm) {
  joinCrewForm.addEventListener("submit", handleJoinCrew);
}

if (jobIndustrySelect instanceof HTMLSelectElement) {
  jobIndustrySelect.addEventListener("change", updateJobPlaceholders);
}

if (refreshJobsButton) {
  refreshJobsButton.addEventListener("click", loadJobs);
}

if (showAllJobsButton) {
  showAllJobsButton.addEventListener("click", () => {
    openJobsBrowser();
  });
}

if (closeJobsBrowserButton) {
  closeJobsBrowserButton.addEventListener("click", () => {
    closeJobsBrowser();
  });
}

if (closeJobDetailButton) {
  closeJobDetailButton.addEventListener("click", () => {
    jobDetailView.hidden = true;
    reportPreview.hidden = true;
    selectedJobId = null;
    jobsSummaryList.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (closeReportPreviewButton) {
  closeReportPreviewButton.addEventListener("click", () => {
    reportPreview.hidden = true;
  });
}

if (closePhotoModalButton) {
  closePhotoModalButton.addEventListener("click", closePhotoModal);
}

if (photoModalBackdrop) {
  photoModalBackdrop.addEventListener("click", closePhotoModal);
}

if (signUpButton) {
  signUpButton.addEventListener("click", signUpUser);
}

if (copyAccountButton) {
  copyAccountButton.addEventListener("click", copyAccountInfo);
}

if (landingSignInButton) {
  landingSignInButton.addEventListener("click", () => {
    scrollToAuthPanel(signInPanel, signInEmailInput);
  });
}

if (landingCreateAccountButton) {
  landingCreateAccountButton.addEventListener("click", () => {
    scrollToAuthPanel(createAccountPanel, signUpFullNameInput);
  });
}

if (signInButton) {
  signInButton.addEventListener("click", signInUser);
}

if (logOutButton) {
  logOutButton.addEventListener("click", signOutUser);
}

if (openSettingsNavButton) {
  openSettingsNavButton.addEventListener("click", () => {
    setMainView("settings");
    settingsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (openSettingsButton) {
  openSettingsButton.addEventListener("click", () => {
    setMainView("settings");
    settingsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (closeSettingsButton) {
  closeSettingsButton.addEventListener("click", () => {
    setMainView("main");
    dashboardSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (themeColorSelect) {
  themeColorSelect.addEventListener("change", updateThemeFromInputs);
}

if (textColorSelect) {
  textColorSelect.addEventListener("change", updateThemeFromInputs);
}

supabaseClient.auth.onAuthStateChange((_event, session) => {
  currentUser = session?.user || null;
  updateAuthUI(currentUser);

  if (currentUser) {
    setMainView(currentView);
    loadJobs();
  }
});

loadThemeSettings();
updateAuthUI(null);
setMainView("main");
updateJobPlaceholders();
registerServiceWorker();
setupInstallPrompt();
checkCurrentUser();
