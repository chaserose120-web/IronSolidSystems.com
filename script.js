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
const howToPanel = document.getElementById("how-to-panel");
const supportPanel = document.getElementById("support-panel");
const openHowToNavButton = document.getElementById("open-how-to-nav");
const openSupportNavButton = document.getElementById("open-support-nav");
const openSettingsNavButton = document.getElementById("open-settings-nav");
const closeSettingsButton = document.getElementById("close-settings-button");
const closeHowToButton = document.getElementById("close-how-to-button");
const closeSupportButton = document.getElementById("close-support-button");
const copySupportEmailButton = document.getElementById("copy-support-email-button");
const supportEmail = document.getElementById("support-email");
const supportMessage = document.getElementById("support-message");
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
const jobServiceDateField = jobForm?.elements.namedItem("service_date");
const jobWorkOrderField = jobForm?.elements.namedItem("work_order");
const jobCustomerField = jobForm?.elements.namedItem("customer");
const jobMachineField = jobForm?.elements.namedItem("machine");
const jobSerialField = jobForm?.elements.namedItem("serial");
const jobMeterHoursField = jobForm?.elements.namedItem("meter_hours");
const jobVehicleMilesField = jobForm?.elements.namedItem("vehicle_miles");
const jobQuickNotesField = jobForm?.elements.namedItem("quick_notes");
const jobComplaintField = jobForm?.elements.namedItem("complaint");
const jobCauseField = jobForm?.elements.namedItem("cause");
const jobCorrectionField = jobForm?.elements.namedItem("correction");
const jobTitleLabel = document.getElementById("label-title");
const jobWorkOrderLabel = document.getElementById("label-work-order");
const jobCustomerLabel = document.getElementById("label-customer");
const jobMachineLabel = document.getElementById("label-machine");
const jobSerialLabel = document.getElementById("label-serial");
const jobMeterHoursLabel = document.getElementById("label-meter-hours");
const jobVehicleMilesLabel = document.getElementById("label-vehicle-miles");
const jobMeterHoursWrapper = document.getElementById("field-meter-hours");
const jobVehicleMilesWrapper = document.getElementById("field-vehicle-miles");

let currentUser = null;
let currentView = "main";
let visibleJobs = [];
let selectedJobId = null;
let deferredInstallPrompt = null;
let jobsLoadRequestId = 0;

const THEME_STORAGE_KEY = "ironsolidsystems-theme-settings";
const DEFAULT_THEME_SETTINGS = {
  themeColor: "black",
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
  "service_date",
  "meter_hours",
  "vehicle_miles",
  "complaint",
  "cause",
  "correction",
  "quick_notes",
  "created_at",
  "crew_code",
  "crew_enabled"
].join(", ");

const THEME_PRESETS = {
  red: {
    bg: "#0F0708",
    sidebar: "#13090B",
    header: "#13090B",
    panel: "#1A0C0F",
    panelSoft: "#241116",
    panelElevated: "#30171D",
    border: "#52242D",
    accent: "#9B111E",
    accent2: "#FFFFFF",
    text: "#FFFFFF",
    mutedText: "#D6C5C8",
    buttonText: "#FFFFFF",
    danger: "#EF4444"
  },
  blue: {
    bg: "#050B16",
    sidebar: "#07111F",
    header: "#07111F",
    panel: "#0C1A2E",
    panelSoft: "#112544",
    panelElevated: "#17335F",
    border: "#284E86",
    accent: "#0033A0",
    accent2: "#FFFFFF",
    text: "#FFFFFF",
    mutedText: "#C8D4E8",
    buttonText: "#FFFFFF",
    danger: "#EF4444"
  },
  black: {
    bg: "#0B0D10",
    sidebar: "#101318",
    header: "#111418",
    panel: "#15191F",
    panelSoft: "#1B2028",
    panelElevated: "#202632",
    border: "#303744",
    accent: "#C8A24A",
    accent2: "#6B7280",
    text: "#F4F4F5",
    mutedText: "#A1A1AA",
    buttonText: "#111111",
    danger: "#DC2626"
  },
  white: {
    bg: "#0B0D10",
    sidebar: "#101318",
    header: "#111418",
    panel: "#15191F",
    panelSoft: "#1B2028",
    panelElevated: "#202632",
    border: "#303744",
    accent: "#C8A24A",
    accent2: "#6B7280",
    text: "#F4F4F5",
    mutedText: "#A1A1AA",
    buttonText: "#111111",
    danger: "#DC2626"
  },
  tan: {
    bg: "#E8D8BD",
    sidebar: "#2A2118",
    header: "#2A2118",
    panel: "#F3E7D0",
    panelSoft: "#E6D2AD",
    panelElevated: "#FFF3DB",
    border: "#8A6F4D",
    accent: "#6B4F2A",
    accent2: "#C7A66A",
    text: "#1F160E",
    mutedText: "#5C4B38",
    buttonText: "#FFFFFF",
    danger: "#B91C1C"
  },
  "cat-yellow": {
    bg: "#0A0A0A",
    sidebar: "#111111",
    header: "#111111",
    panel: "#181818",
    panelSoft: "#222222",
    panelElevated: "#2A2A2A",
    border: "#3A3A3A",
    accent: "#FFCD11",
    accent2: "#D71920",
    text: "#FFFFFF",
    mutedText: "#C7C7C7",
    buttonText: "#111111",
    danger: "#D71920"
  },
  "john-deere-green": {
    bg: "#071007",
    sidebar: "#0B160B",
    header: "#0B160B",
    panel: "#102010",
    panelSoft: "#172B17",
    panelElevated: "#1D361D",
    border: "#2F4F2F",
    accent: "#367C2B",
    accent2: "#FFDE00",
    text: "#F7F7F2",
    mutedText: "#C9D0C3",
    buttonText: "#FFFFFF",
    danger: "#D71920"
  },
  "usa-theme": {
    bg: "#061A33",
    sidebar: "#071426",
    header: "#071426",
    panel: "#0B2545",
    panelSoft: "#12345C",
    panelElevated: "#163E70",
    border: "#355C8C",
    accent: "#B31942",
    accent2: "#FFFFFF",
    text: "#FFFFFF",
    mutedText: "#D8E2F0",
    buttonText: "#FFFFFF",
    danger: "#EF4444"
  }
};

const TEXT_PRESETS = {
  white: {
    text: null,
    textSoft: null
  },
  yellow: {
    text: "#E2C15A",
    textSoft: "#C7B06A"
  }
};

const INDUSTRY_OPTIONS = [
  "Heavy Equipment",
  "Automotive",
  "Industrial Maintenance",
  "Welding & Fabrication",
  "Rental Equipment",
  "Agriculture / Ag Equipment"
];

const INDUSTRY_CONFIG = {
  default: {
    labels: {
      title: "Job Name / Log Name",
      workOrder: "Work Order",
      customer: "Customer",
      machine: "Machine",
      serial: "Serial Number",
      meterHours: "Meter Hours",
      vehicleMiles: "Vehicle Miles"
    },
    placeholders: {
      title: "",
      work_order: "",
      customer: "",
      machine: "",
      serial: "",
      meter_hours: "",
      vehicle_miles: "",
      quick_notes: "",
      complaint: "",
      cause: "",
      correction: ""
    },
    visibility: {
      meterHours: false,
      vehicleMiles: false
    }
  },
  "Heavy Equipment": {
    labels: {
      title: "Job Name / Log Name",
      workOrder: "Work Order",
      customer: "Customer",
      machine: "Machine",
      serial: "Serial Number",
      meterHours: "Meter Hours",
      vehicleMiles: "Vehicle Miles"
    },
    placeholders: {
      title: "Loader cooling issue",
      work_order: "HE-10428",
      customer: "River Rock Excavation",
      machine: "Komatsu WA380 Loader",
      serial: "KMTWA103CPF81247",
      meter_hours: "1245.6 hrs",
      vehicle_miles: "",
      quick_notes: "Coolant level checked, fan belt inspected, temps verified after repair",
      complaint: "Machine overheating under load",
      cause: "Radiator packed with debris, low airflow",
      correction: "Cleaned cooling package, verified temps"
    },
    visibility: {
      meterHours: true,
      vehicleMiles: false
    }
  },
  Automotive: {
    labels: {
      title: "Job Name / Log Name",
      workOrder: "Work Order",
      customer: "Customer",
      machine: "Vehicle",
      serial: "VIN",
      meterHours: "Meter Hours",
      vehicleMiles: "Vehicle Miles"
    },
    placeholders: {
      title: "Truck rough idle diagnosis",
      work_order: "AUTO-8821",
      customer: "Fleet Service LLC",
      machine: "Ford F-250 6.2L",
      serial: "1FT7W2B67NEA18455",
      meter_hours: "",
      vehicle_miles: "152,340 miles",
      quick_notes: "Mileage verified, freeze-frame data saved, parts ordered for follow-up",
      complaint: "Customer states truck has rough idle",
      cause: "Vacuum leak found at intake hose",
      correction: "Replaced hose and cleared codes"
    },
    visibility: {
      meterHours: false,
      vehicleMiles: true
    }
  },
  "Industrial Maintenance": {
    labels: {
      title: "Job Name / Log Name",
      workOrder: "Work Order",
      customer: "Customer / Facility",
      machine: "Equipment / Line",
      serial: "Asset ID / Identification Number",
      meterHours: "Runtime / Hours",
      vehicleMiles: "Vehicle Miles"
    },
    placeholders: {
      title: "Conveyor line stop issue",
      work_order: "IM-5579",
      customer: "Midwest Packaging",
      machine: "South conveyor drive",
      serial: "CVR-PLT-2047",
      meter_hours: "Runtime hours or plant meter",
      vehicle_miles: "",
      quick_notes: "Lockout verified, sensor gap reset, amp draw checked after test run",
      complaint: "Conveyor intermittently stops",
      cause: "Failed proximity sensor",
      correction: "Replaced sensor and tested operation"
    },
    visibility: {
      meterHours: true,
      vehicleMiles: false
    }
  },
  "Welding & Fabrication": {
    labels: {
      title: "Job Name / Log Name",
      workOrder: "Work Order",
      customer: "Customer",
      machine: "Part / Vehicle / Attachment",
      serial: "Serial / ID Number",
      meterHours: "Meter Hours",
      vehicleMiles: "Vehicle Miles"
    },
    placeholders: {
      title: "Attachment bracket repair",
      work_order: "WF-3316",
      customer: "Summit Earthworks",
      machine: "Grapple attachment",
      serial: "ATT-GRP-7784",
      meter_hours: "",
      vehicle_miles: "",
      quick_notes: "Material thickness, rod used, prep work, paint match, and fit-up notes",
      complaint: "Cracked bracket on attachment",
      cause: "Fatigue crack at weld toe",
      correction: "Ground crack, welded repair, painted area"
    },
    visibility: {
      meterHours: false,
      vehicleMiles: false
    }
  },
  "Rental Equipment": {
    labels: {
      title: "Job Name / Log Name",
      workOrder: "Work Order",
      customer: "Customer",
      machine: "Rental Unit / Machine",
      serial: "Serial / Unit Number",
      meterHours: "Meter Hours",
      vehicleMiles: "Vehicle Miles"
    },
    placeholders: {
      title: "Rental return inspection",
      work_order: "RENT-2043",
      customer: "County Paving Crew",
      machine: "Bobcat T66 skid steer",
      serial: "UNIT-RENT-4418",
      meter_hours: "876.2 hrs",
      vehicle_miles: "",
      quick_notes: "Check-in damage notes, PM due at 1000 hrs, customer use review, fluid levels",
      complaint: "Unit returned with hydraulic leak after customer use",
      cause: "Aux hose rubbed through near coupler guard",
      correction: "Replaced hose, cleaned unit, completed return inspection"
    },
    visibility: {
      meterHours: true,
      vehicleMiles: false
    }
  },
  "Agriculture / Ag Equipment": {
    labels: {
      title: "Job Name / Log Name",
      workOrder: "Work Order",
      customer: "Customer",
      machine: "Tractor / Combine / Implement",
      serial: "Serial / PIN",
      meterHours: "Meter Hours",
      vehicleMiles: "Vehicle Miles"
    },
    placeholders: {
      title: "Tractor hydraulic service call",
      work_order: "AG-6127",
      customer: "North Field Farms",
      machine: "John Deere 8R 280 Tractor",
      serial: "PIN-8R280-55219",
      meter_hours: "3184.7 hrs",
      vehicle_miles: "Road miles if applicable",
      quick_notes: "Field service notes, pressure checks, seasonal parts needed, harvest readiness",
      complaint: "Hydraulics weak when operating planter in field",
      cause: "Charge pressure low from worn hydraulic pump",
      correction: "Confirmed low pressure, replaced pump, verified field operation"
    },
    visibility: {
      meterHours: true,
      vehicleMiles: true
    }
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

function canUploadDiagnosticFiles(job) {
  return Boolean(isJobLead(job) || job?.accessRole === "Job Worker");
}

function canDeleteDiagnosticFile(job, file) {
  return Boolean(
    isJobLead(job) || (job?.accessRole === "Job Worker" && file?.uploaded_by === currentUser?.id)
  );
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
  const showHowTo = view === "how-to";
  const showSupport = view === "support";
  dashboardSection.hidden = showSettings || showHowTo || showSupport;
  createJobSection.hidden = showSettings || showHowTo || showSupport;
  jobsListSection.hidden = showSettings || showHowTo || showSupport;
  settingsPanel.hidden = !showSettings;
  howToPanel.hidden = !showHowTo;
  supportPanel.hidden = !showSupport;
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");

  if (normalized.length !== 6) {
    return null;
  }

  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

function hexToRgba(hex, alpha) {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function applyThemeSettings(settings) {
  const root = document.documentElement;
  const theme = THEME_PRESETS[settings.themeColor] || THEME_PRESETS.black;
  const textOverride = TEXT_PRESETS[settings.textColor] || TEXT_PRESETS.white;
  const bodyText = textOverride.text || theme.text;
  const mutedText = textOverride.textSoft || theme.mutedText;

  const surfaces = {
    panel: theme.panel,
    panelSoft: theme.panelSoft,
    panelElevated: theme.panelElevated,
    border: theme.border,
    text: bodyText,
    mutedText,
    buttonText: theme.buttonText,
    fieldBg: theme.panelSoft,
    fieldBgFocus: theme.panelElevated,
    fieldBorder: theme.border,
    ghostBg: theme.panelSoft,
    ghostBorder: theme.border,
    placeholder: theme.mutedText
  };

  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--sidebar", theme.sidebar);
  root.style.setProperty("--header", theme.header);
  root.style.setProperty("--panel", surfaces.panel);
  root.style.setProperty("--panel-soft", surfaces.panelSoft);
  root.style.setProperty("--panel-elevated", surfaces.panelElevated);
  root.style.setProperty("--border", surfaces.border);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent-2", theme.accent2);
  root.style.setProperty("--accent-secondary", theme.accent2);
  root.style.setProperty("--text", surfaces.text);
  root.style.setProperty("--muted-text", surfaces.mutedText);
  root.style.setProperty("--text-soft", surfaces.mutedText);
  root.style.setProperty("--button-text", surfaces.buttonText);
  root.style.setProperty("--danger", theme.danger);
  root.style.setProperty("--border-strong", hexToRgba(theme.accent, 0.34));
  root.style.setProperty("--accent-shadow", hexToRgba(theme.accent, 0.26));
  root.style.setProperty("--body-glow", hexToRgba(theme.accent, 0.12));
  root.style.setProperty("--body-glow-alt", hexToRgba(theme.accent2, 0.1));
  root.style.setProperty("--body-start", theme.bg);
  root.style.setProperty("--body-end", theme.bg);
  root.style.setProperty("--field-bg", surfaces.fieldBg);
  root.style.setProperty("--field-bg-focus", surfaces.fieldBgFocus);
  root.style.setProperty("--field-border", surfaces.fieldBorder);
  root.style.setProperty("--section-bg", surfaces.panelSoft);
  root.style.setProperty("--note-bg", surfaces.panelElevated);
  root.style.setProperty("--report-bg", surfaces.panelElevated);
  root.style.setProperty("--muted-bg", surfaces.panelSoft);
  root.style.setProperty("--hover-bg", hexToRgba(theme.accent, 0.16));
  root.style.setProperty("--ghost-bg", surfaces.ghostBg);
  root.style.setProperty("--ghost-border", surfaces.ghostBorder);
  root.style.setProperty("--placeholder", surfaces.placeholder);
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
    const normalizedTextColor = saved.textColor === "black" ? "white" : saved.textColor;
    return {
      themeColor: saved.themeColor || DEFAULT_THEME_SETTINGS.themeColor,
      textColor: normalizedTextColor || DEFAULT_THEME_SETTINGS.textColor
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

function formatServiceDate(value) {
  if (!value) {
    return "Not provided";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium"
    }).format(new Date(year, month - 1, day));
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium"
  }).format(date);
}

function getTodayDateInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getIndustryConfig(industry) {
  return INDUSTRY_CONFIG[industry] || INDUSTRY_CONFIG.default;
}

function getJobFieldLabels(industry) {
  const labels = getIndustryConfig(industry).labels;

  return {
    jobName: labels.title,
    workOrder: labels.workOrder,
    customer: labels.customer,
    machine: labels.machine,
    serial: labels.serial,
    meterHours: labels.meterHours,
    vehicleMiles: labels.vehicleMiles
  };
}

function updateIndustryFormPresentation({
  industry,
  titleLabel,
  workOrderLabel,
  customerLabel,
  machineLabel,
  serialLabel,
  meterHoursLabel,
  vehicleMilesLabel,
  titleField,
  workOrderField,
  customerField,
  machineField,
  serialField,
  meterHoursField,
  vehicleMilesField,
  quickNotesField,
  complaintField,
  causeField,
  correctionField,
  meterHoursWrapper,
  vehicleMilesWrapper
}) {
  const { labels, placeholders, visibility } = getIndustryConfig(industry);

  if (titleLabel) {
    titleLabel.textContent = labels.title;
  }

  if (workOrderLabel) {
    workOrderLabel.textContent = labels.workOrder;
  }

  if (customerLabel) {
    customerLabel.textContent = labels.customer;
  }

  if (machineLabel) {
    machineLabel.textContent = labels.machine;
  }

  if (serialLabel) {
    serialLabel.textContent = labels.serial;
  }

  if (meterHoursLabel) {
    meterHoursLabel.textContent = labels.meterHours;
  }

  if (vehicleMilesLabel) {
    vehicleMilesLabel.textContent = labels.vehicleMiles;
  }

  const fieldMap = [
    [titleField, placeholders.title],
    [workOrderField, placeholders.work_order],
    [customerField, placeholders.customer],
    [machineField, placeholders.machine],
    [serialField, placeholders.serial],
    [meterHoursField, placeholders.meter_hours],
    [vehicleMilesField, placeholders.vehicle_miles],
    [quickNotesField, placeholders.quick_notes],
    [complaintField, placeholders.complaint],
    [causeField, placeholders.cause],
    [correctionField, placeholders.correction]
  ];

  fieldMap.forEach(([field, placeholder]) => {
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement
    ) {
      field.placeholder = placeholder;
    }
  });

  if (meterHoursWrapper) {
    const meterValue =
      meterHoursField instanceof HTMLInputElement ? meterHoursField.value.trim() : "";
    meterHoursWrapper.hidden = !(visibility.meterHours || meterValue);
  }

  if (vehicleMilesWrapper) {
    const milesValue =
      vehicleMilesField instanceof HTMLInputElement ? vehicleMilesField.value.trim() : "";
    vehicleMilesWrapper.hidden = !(visibility.vehicleMiles || milesValue);
  }
}

function updateJobPlaceholders() {
  const industry =
    jobIndustrySelect instanceof HTMLSelectElement ? jobIndustrySelect.value : "";

  updateIndustryFormPresentation({
    industry,
    titleLabel: jobTitleLabel,
    workOrderLabel: jobWorkOrderLabel,
    customerLabel: jobCustomerLabel,
    machineLabel: jobMachineLabel,
    serialLabel: jobSerialLabel,
    meterHoursLabel: jobMeterHoursLabel,
    vehicleMilesLabel: jobVehicleMilesLabel,
    titleField: jobTitleField,
    workOrderField: jobWorkOrderField,
    customerField: jobCustomerField,
    machineField: jobMachineField,
    serialField: jobSerialField,
    meterHoursField: jobMeterHoursField,
    vehicleMilesField: jobVehicleMilesField,
    quickNotesField: jobQuickNotesField,
    complaintField: jobComplaintField,
    causeField: jobCauseField,
    correctionField: jobCorrectionField,
    meterHoursWrapper: jobMeterHoursWrapper,
    vehicleMilesWrapper: jobVehicleMilesWrapper
  });
}

function getJobEffectiveDateValue(job) {
  return job.service_date || job.created_at || "";
}

function getJobEffectiveDateLabel(job) {
  return job.service_date ? formatServiceDate(job.service_date) : formatCreatedAt(job.created_at);
}

function getJobEffectiveDateHeading(job) {
  return job.service_date ? "Service Date" : "Created Date";
}

function getJobUsageItems(job) {
  const labels = getJobFieldLabels(job.industry);
  const config = getIndustryConfig(job.industry);
  const items = [];

  if (config.visibility.meterHours || job.meter_hours) {
    items.push([labels.meterHours, job.meter_hours || "Not provided"]);
  }

  if (config.visibility.vehicleMiles || job.vehicle_miles) {
    items.push([labels.vehicleMiles, job.vehicle_miles || "Not provided"]);
  }

  return items;
}

function ensureDefaultServiceDate() {
  if (jobServiceDateField instanceof HTMLInputElement && !jobServiceDateField.value) {
    jobServiceDateField.value = getTodayDateInputValue();
  }
}

function normalizeServiceDate(value, useTodayWhenBlank = false) {
  const normalized = value?.toString().trim() || "";
  if (normalized) {
    return normalized;
  }

  return useTodayWhenBlank ? getTodayDateInputValue() : null;
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
  const usageItems = getJobUsageItems(job);

  return [
    "IronSolidSystems",
    "",
    `${labels.jobName}: ${formatReportValue(job.title)}`,
    `Service Date: ${formatServiceDate(job.service_date)}`,
    `Status: ${formatReportValue(job.status)}`,
    `Work Order: ${formatReportValue(job.work_order)}`,
    `Customer: ${formatReportValue(job.customer)}`,
    `Industry: ${formatReportValue(job.industry)}`,
    `${labels.machine}: ${formatReportValue(job.machine)}`,
    `${labels.serial}: ${formatReportValue(job.serial)}`,
    ...usageItems.map(([label, value]) => `${label}: ${formatReportValue(value)}`),
    `Complaint: ${formatReportValue(job.complaint)}`,
    `Cause: ${formatReportValue(job.cause)}`,
    `Correction: ${formatReportValue(job.correction)}`,
    `Quick Notes (Torque Values, Parts, etc.): ${formatReportValue(job.quick_notes)}`,
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

function getFileExtension(fileName) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

const DIAGNOSTIC_ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "txt",
  "csv",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "doc",
  "docx"
]);

const DIAGNOSTIC_ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "text/csv",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

function isSupportedDiagnosticFile(file) {
  const extension = getFileExtension(file.name);
  if (!DIAGNOSTIC_ALLOWED_EXTENSIONS.has(extension)) {
    return false;
  }

  return !file.type || DIAGNOSTIC_ALLOWED_MIME_TYPES.has(file.type);
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

async function createSignedDiagnosticUrls(files) {
  if (!files.length) {
    return [];
  }

  const { data, error } = await supabaseClient.storage
    .from("diagnostic_files")
    .createSignedUrls(
      files.map((file) => file.file_path),
      3600
    );

  if (error) {
    throw error;
  }

  return files.map((file, index) => ({
    ...file,
    signed_url: data[index]?.signedUrl || ""
  }));
}

async function fetchDiagnosticFiles(jobId) {
  const { data, error } = await supabaseClient
    .from("diagnostic_files")
    .select("id, job_id, file_path, file_name, file_type, description, uploaded_by, created_at")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return createSignedDiagnosticUrls(data || []);
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

          const filePath = `${job.id}/${currentUser.id}/${Date.now()}-${index}-${sanitizeFileName(file.name)}`;

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

function renderDiagnosticFileList(job, files, listBody) {
  listBody.innerHTML = "";

  if (files.length === 0) {
    const empty = document.createElement("p");
    empty.className = "list-message";
    empty.textContent = "No diagnostic files uploaded for this job yet.";
    listBody.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  files.forEach((file) => {
    const card = document.createElement("article");
    card.className = "diagnostic-file-card";

    const top = document.createElement("div");
    top.className = "diagnostic-file-card__top";

    const name = document.createElement("strong");
    name.className = "diagnostic-file-card__name";
    name.textContent = file.file_name || "Unnamed file";

    const type = document.createElement("span");
    type.className = "diagnostic-file-card__type";
    type.textContent = file.file_type || "Unknown type";

    top.append(name, type);

    const description = document.createElement("p");
    description.className = "diagnostic-file-card__description";
    description.textContent = file.description || "No description provided.";

    const date = document.createElement("span");
    date.className = "diagnostic-file-card__date";
    date.textContent = `Uploaded ${formatCreatedAt(file.created_at)}`;

    const actions = document.createElement("div");
    actions.className = "diagnostic-file-card__actions";

    const openButton = document.createElement("button");
    openButton.className = "button button--secondary button--small";
    openButton.type = "button";
    openButton.textContent = "Open / View";
    openButton.addEventListener("click", () => {
      if (!file.signed_url) {
        setMessage(jobsMessage, "Unable to open this file right now. Try refreshing the job.", "error");
        return;
      }

      window.open(file.signed_url, "_blank", "noopener");
    });
    actions.appendChild(openButton);

    if (canDeleteDiagnosticFile(job, file)) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "button button--ghost button--small";
      deleteButton.type = "button";
      deleteButton.textContent = "Delete File";
      deleteButton.addEventListener("click", async () => {
        const confirmed = window.confirm("Are you sure? This will permanently delete the file.");
        if (!confirmed) {
          return;
        }

        const { error: storageError } = await supabaseClient.storage
          .from("diagnostic_files")
          .remove([file.file_path]);

        if (storageError) {
          setMessage(jobsMessage, `Unable to delete file storage: ${storageError.message}`, "error");
          return;
        }

        const { error: rowError } = await supabaseClient
          .from("diagnostic_files")
          .delete()
          .eq("id", file.id);

        if (rowError) {
          setMessage(jobsMessage, `Unable to delete file record: ${rowError.message}`, "error");
          return;
        }

        setMessage(jobsMessage, "Diagnostic file deleted successfully.", "success");
        const refreshedFiles = await fetchDiagnosticFiles(job.id);
        renderDiagnosticFileList(job, refreshedFiles, listBody);
      });
      actions.appendChild(deleteButton);
    }

    card.append(top, description, date, actions);
    fragment.appendChild(card);
  });

  listBody.appendChild(fragment);
}

function createDiagnosticSection(job) {
  const wrapper = document.createElement("section");
  wrapper.className = "job-detail-grid";

  const uploadSection = document.createElement("section");
  uploadSection.className = "diagnostic-section";

  const uploadTitle = document.createElement("h6");
  uploadTitle.textContent = "Diagnostic Uploads";
  uploadSection.appendChild(uploadTitle);

  const uploadMessage = document.createElement("p");
  uploadMessage.className = "form-message";

  if (canUploadDiagnosticFiles(job)) {
    const uploadGrid = document.createElement("div");
    uploadGrid.className = "form-grid";

    const helperText = document.createElement("div");
    helperText.className = "diagnostic-section__helper field--full";
    helperText.textContent =
      "Upload PSRs, ET reports, INSITE files, inspection sheets, screenshots, torque sheets, or other diagnostic documents.";

    const fileField = document.createElement("label");
    fileField.className = "field";
    const fileLabel = document.createElement("span");
    fileLabel.textContent = "Select Files";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.accept =
      ".pdf,.txt,.csv,.jpg,.jpeg,.png,.webp,.doc,.docx,application/pdf,text/plain,text/csv,image/jpeg,image/png,image/webp,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    fileField.append(fileLabel, fileInput);

    const descriptionField = document.createElement("label");
    descriptionField.className = "field";
    const descriptionLabel = document.createElement("span");
    descriptionLabel.textContent = "Description";
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Applies to selected files";
    descriptionField.append(descriptionLabel, descriptionInput);

    uploadGrid.append(helperText, fileField, descriptionField);
    uploadSection.appendChild(uploadGrid);

    const uploadActions = document.createElement("div");
    uploadActions.className = "diagnostic-section__actions";

    const uploadButton = document.createElement("button");
    uploadButton.className = "button button--primary button--small";
    uploadButton.type = "button";
    uploadButton.textContent = "Upload Diagnostic File";

    uploadActions.append(uploadMessage, uploadButton);
    uploadSection.appendChild(uploadActions);

    uploadButton.addEventListener("click", async () => {
      const files = Array.from(fileInput.files || []);
      const description = descriptionInput.value.trim();

      if (files.length === 0) {
        setMessage(uploadMessage, "Select one or more files to upload.", "error");
        return;
      }

      const unsupportedFiles = files.filter((file) => !isSupportedDiagnosticFile(file));
      if (unsupportedFiles.length > 0) {
        setMessage(
          uploadMessage,
          "This file format is not supported here. Use PDF, TXT, CSV, JPG, PNG, WEBP, DOC, or DOCX files.",
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

          const filePath = `${job.id}/${currentUser.id}/${Date.now()}-${index}-${sanitizeFileName(file.name)}`;

          const { error: uploadError } = await supabaseClient.storage
            .from("diagnostic_files")
            .upload(filePath, file);

          if (uploadError) {
            setMessage(uploadMessage, `Diagnostic upload failed: ${uploadError.message}`, "error");
            throw uploadError;
          }

          const {
            data: { user },
            error: userError
          } = await supabaseClient.auth.getUser();

          if (userError || !user) {
            setMessage(uploadMessage, "Unable to verify the signed-in user for diagnostic upload.", "error");
            throw userError || new Error("No authenticated user found.");
          }

          const { error: insertError } = await supabaseClient.from("diagnostic_files").insert({
            job_id: job.id,
            user_id: user.id,
            file_path: filePath,
            file_name: file.name,
            file_type: file.type || getFileExtension(file.name).toUpperCase(),
            description,
            uploaded_by: currentUser.id
          });

          if (insertError) {
            setMessage(uploadMessage, `Diagnostic record failed: ${insertError.message}`, "error");
            throw insertError;
          }
        }

        fileInput.value = "";
        descriptionInput.value = "";
        setMessage(uploadMessage, "Diagnostic files uploaded successfully.", "success");
        const refreshedFiles = await fetchDiagnosticFiles(job.id);
        setMessage(
          filesMessage,
          `${refreshedFiles.length} diagnostic file${refreshedFiles.length === 1 ? "" : "s"} loaded.`,
          refreshedFiles.length ? "success" : ""
        );
        renderDiagnosticFileList(job, refreshedFiles, fileListBody);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Diagnostic upload failed.";
        if (!uploadMessage.classList.contains("is-error")) {
          setMessage(uploadMessage, `Unable to upload files: ${message}`, "error");
        }
      } finally {
        uploadButton.disabled = false;
        uploadButton.textContent = "Upload Diagnostic File";
      }
    });
  } else {
    setMessage(uploadMessage, "You can view diagnostic files for this job.");
    uploadSection.appendChild(uploadMessage);
  }

  const filesSection = document.createElement("section");
  filesSection.className = "diagnostic-section";

  const filesTitle = document.createElement("h6");
  filesTitle.textContent = "Diagnostic Files";
  filesSection.appendChild(filesTitle);

  const fileListBody = document.createElement("div");
  fileListBody.className = "diagnostic-file-list";

  const filesMessage = document.createElement("p");
  filesMessage.className = "list-message";
  filesMessage.textContent = "Loading diagnostic files...";

  filesSection.append(filesMessage, fileListBody);

  fetchDiagnosticFiles(job.id)
    .then((files) => {
      setMessage(
        filesMessage,
        `${files.length} diagnostic file${files.length === 1 ? "" : "s"} loaded.`,
        files.length ? "success" : ""
      );
      renderDiagnosticFileList(job, files, fileListBody);
    })
    .catch((error) => {
      const message = error instanceof Error ? error.message : "Unable to load diagnostic files.";
      setMessage(filesMessage, `Unable to load diagnostic files: ${message}`, "error");
      renderDiagnosticFileList(job, [], fileListBody);
    });

  wrapper.append(uploadSection, filesSection);
  return wrapper;
}

function createInputField(labelText, name, value = "", type = "text", placeholder = "") {
  const label = document.createElement("label");
  label.className = "field";

  const span = document.createElement("span");
  span.textContent = labelText;

  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.value = value;
  input.placeholder = placeholder;

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

function createTextareaField(labelText, name, value = "", rows = 5, placeholder = "") {
  const label = document.createElement("label");
  label.className = "field field--full";

  const span = document.createElement("span");
  span.textContent = labelText;

  const textarea = document.createElement("textarea");
  textarea.name = name;
  textarea.rows = rows;
  textarea.value = value;
  textarea.placeholder = placeholder;

  label.append(span, textarea);
  return label;
}

async function saveJobEdits(job, form, saveButton, statusMessage) {
  const formData = new FormData(form);
  const payload = {
    title: formData.get("title")?.toString().trim() || "",
    status: formData.get("status")?.toString().trim() || "",
    service_date: normalizeServiceDate(formData.get("service_date")),
    work_order: formData.get("work_order")?.toString().trim() || "",
    customer: formData.get("customer")?.toString().trim() || "",
    machine: formData.get("machine")?.toString().trim() || "",
    serial: formData.get("serial")?.toString().trim() || "",
    industry: formData.get("industry")?.toString().trim() || "",
    meter_hours: formData.get("meter_hours")?.toString().trim() || "",
    vehicle_miles: formData.get("vehicle_miles")?.toString().trim() || "",
    complaint: formData.get("complaint")?.toString().trim() || "",
    cause: formData.get("cause")?.toString().trim() || "",
    correction: formData.get("correction")?.toString().trim() || "",
    quick_notes: formData.get("quick_notes")?.toString().trim() || ""
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
  const config = getIndustryConfig(job.industry);
  const wrapper = document.createElement("section");
  wrapper.className = "job-editor";
  wrapper.hidden = true;

  const form = document.createElement("form");
  form.className = "job-editor__form";

  const grid = document.createElement("div");
  grid.className = "form-grid";

  const titleField = createInputField(labels.jobName, "title", job.title || "", "text", config.placeholders.title);
  const statusField = createSelectField("Status", "status", job.status || "Open", [
    "Open",
    "In Progress",
    "Waiting on Parts",
    "Completed"
  ]);
  const serviceDateField = createInputField(
    "Service Date",
    "service_date",
    job.service_date || "",
    "date"
  );
  const workOrderField = createInputField(
    labels.workOrder,
    "work_order",
    job.work_order || "",
    "text",
    config.placeholders.work_order
  );
  const customerField = createInputField(
    labels.customer,
    "customer",
    job.customer || "",
    "text",
    config.placeholders.customer
  );
  const machineField = createInputField(
    labels.machine,
    "machine",
    job.machine || "",
    "text",
    config.placeholders.machine
  );
  const serialField = createInputField(
    labels.serial,
    "serial",
    job.serial || "",
    "text",
    config.placeholders.serial
  );
  const industryFieldWrapper = createSelectField("Industry", "industry", job.industry || "", [
    "",
    ...INDUSTRY_OPTIONS
  ]);
  const meterHoursField = createInputField(
    labels.meterHours,
    "meter_hours",
    job.meter_hours || "",
    "text",
    config.placeholders.meter_hours
  );
  const vehicleMilesField = createInputField(
    labels.vehicleMiles,
    "vehicle_miles",
    job.vehicle_miles || "",
    "text",
    config.placeholders.vehicle_miles
  );
  const complaintField = createTextareaField(
    "Complaint",
    "complaint",
    job.complaint || "",
    6,
    config.placeholders.complaint
  );
  const causeField = createTextareaField(
    "Cause",
    "cause",
    job.cause || "",
    6,
    config.placeholders.cause
  );
  const correctionField = createTextareaField(
    "Correction",
    "correction",
    job.correction || "",
    6,
    config.placeholders.correction
  );
  const quickNotesField = createTextareaField(
    "Quick Notes (Torque Values, Parts, etc.)",
    "quick_notes",
    job.quick_notes || "",
    6,
    config.placeholders.quick_notes
  );

  grid.append(
    titleField,
    statusField,
    serviceDateField,
    workOrderField,
    customerField,
    machineField,
    serialField,
    industryFieldWrapper,
    meterHoursField,
    vehicleMilesField,
    complaintField,
    causeField,
    correctionField,
    quickNotesField
  );

  const industryField = grid.querySelector('select[name="industry"]');
  if (industryField instanceof HTMLSelectElement) {
    industryField.options[0].textContent = "Select Industry";
  }

  const applyEditorIndustry = () => {
    updateIndustryFormPresentation({
      industry: industryField instanceof HTMLSelectElement ? industryField.value : "",
      titleLabel: titleField.querySelector("span"),
      workOrderLabel: workOrderField.querySelector("span"),
      customerLabel: customerField.querySelector("span"),
      machineLabel: machineField.querySelector("span"),
      serialLabel: serialField.querySelector("span"),
      meterHoursLabel: meterHoursField.querySelector("span"),
      vehicleMilesLabel: vehicleMilesField.querySelector("span"),
      titleField: titleField.querySelector("input"),
      workOrderField: workOrderField.querySelector("input"),
      customerField: customerField.querySelector("input"),
      machineField: machineField.querySelector("input"),
      serialField: serialField.querySelector("input"),
      meterHoursField: meterHoursField.querySelector("input"),
      vehicleMilesField: vehicleMilesField.querySelector("input"),
      quickNotesField: quickNotesField.querySelector("textarea"),
      complaintField: complaintField.querySelector("textarea"),
      causeField: causeField.querySelector("textarea"),
      correctionField: correctionField.querySelector("textarea"),
      meterHoursWrapper: meterHoursField,
      vehicleMilesWrapper: vehicleMilesField
    });
  };

  applyEditorIndustry();
  industryField?.addEventListener("change", applyEditorIndustry);

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
  deleteButton.className = "button button--danger button--small";
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
  const usageItems = getJobUsageItems(job).map(([label, value]) => createMetaItem(label, value));
  meta.append(
    createMetaItem(getJobSummaryMachineLabel(job), job.machine || "Not provided"),
    createMetaItem("Industry", job.industry || "Not provided"),
    createMetaItem("Service Date", formatServiceDate(job.service_date)),
    createMetaItem("Work Order", job.work_order || "Not assigned"),
    createMetaItem("Created", formatCreatedAt(job.created_at)),
    createMetaItem("Your Role", job.accessRole || "Supervisor"),
    createMetaItem(getJobFieldLabels(job.industry).serial, job.serial || "Not provided"),
    ...usageItems
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
    createMetaItem("Quick Notes", job.quick_notes || "Not provided")
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

  const quickNotesSection = document.createElement("section");
  quickNotesSection.className = "job-detail-section";
  const quickNotesTitle = document.createElement("h6");
  quickNotesTitle.textContent = "Quick Notes (Torque Values, Parts, etc.)";
  const quickNotesContent = document.createElement("div");
  quickNotesContent.className = "job-detail-three-c";
  const quickNotesNote = document.createElement("div");
  quickNotesNote.className = "job-detail-note";
  const quickNotesText = document.createElement("p");
  quickNotesText.textContent = formatReportValue(job.quick_notes);
  quickNotesNote.appendChild(quickNotesText);
  quickNotesContent.appendChild(quickNotesNote);
  quickNotesSection.append(quickNotesTitle, quickNotesContent);

  detailSections.append(detailsSection, threeCSection, quickNotesSection);

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

  article.append(
    top,
    meta,
    detailSections,
    createPhotoSection(job),
    createDiagnosticSection(job),
    actions,
    createCrewSection(job)
  );

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
  date.textContent = getJobEffectiveDateLabel(job);
  date.title = getJobEffectiveDateHeading(job);

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
  const requestId = ++jobsLoadRequestId;

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
  let ownedJobsCount = 0;
  let crewJobsCount = 0;

  const { data: ownedJobs, error: ownedError } = await supabaseClient
    .from("jobs")
    .select(JOB_FIELDS_SELECT)
    .eq("user_id", currentUser.id);

  if (ownedError) {
    if (requestId !== jobsLoadRequestId) {
      return;
    }
    jobCount.textContent = "0";
    setMessage(jobsMessage, `Unable to load jobs: ${ownedError.message}`, "error");
    return;
  }

  const { data: membershipRows, error: membershipError } = await supabaseClient
    .from("job_crew")
    .select("job_id, user_id, role")
    .eq("user_id", currentUser.id);

  if (membershipError) {
    if (requestId !== jobsLoadRequestId) {
      return;
    }
    jobCount.textContent = "0";
    setMessage(jobsMessage, `Unable to load crew jobs: ${membershipError.message}`, "error");
    return;
  }

  const jobsById = new Map();
  const membershipByJobId = new Map();
  const accessibleJobIds = new Set();

  (membershipRows || []).forEach((membership) => {
    membershipByJobId.set(membership.job_id, membership);
    accessibleJobIds.add(membership.job_id);
  });

  (ownedJobs || []).forEach((job) => {
    if (job.user_id !== currentUser.id) {
      return;
    }

    ownedJobsCount += 1;
    accessibleJobIds.add(job.id);
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
      if (requestId !== jobsLoadRequestId) {
        return;
      }
      jobCount.textContent = "0";
      setMessage(jobsMessage, `Unable to load crew jobs: ${crewJobsError.message}`, "error");
      return;
    }

    (crewJobs || []).forEach((job) => {
      const membership = membershipByJobId.get(job.id);
      if (!membership) {
        return;
      }

      crewJobsCount += 1;
      accessibleJobIds.add(job.id);
      jobsById.set(job.id, {
        ...job,
        accessRole: membership?.role || "Job Worker",
        isOwner: false
      });
    });
  }

  const jobs = Array.from(jobsById.values()).filter((job) => {
    return job.user_id === currentUser.id || accessibleJobIds.has(job.id);
  });

  console.log("IronSolidSystems job load", {
    currentUserId: currentUser.id,
    ownedJobs: ownedJobsCount,
    crewJobs: crewJobsCount,
    renderedJobs: jobs.length
  });

  if (requestId !== jobsLoadRequestId) {
    return;
  }

  if (jobs.length === 0) {
    jobCount.textContent = "0";
    jobsSummaryList.innerHTML = "";
    visibleJobs = [];
    setMessage(jobsMessage, "No jobs found yet. Create your first job or join a crew.");
    return;
  }

  const jobIds = jobs.map((job) => job.id);
  const { data: crewRows, error: crewRowsError } = await supabaseClient
    .from("job_crew")
    .select("job_id, user_id, role")
    .in("job_id", jobIds);

  if (crewRowsError) {
    if (requestId !== jobsLoadRequestId) {
      return;
    }
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
    return new Date(getJobEffectiveDateValue(right)).getTime() - new Date(getJobEffectiveDateValue(left)).getTime();
  });

  if (requestId !== jobsLoadRequestId) {
    return;
  }

  jobsSummaryList.innerHTML = "";
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

  if (selectedJobId && !jobs.some((job) => job.id === selectedJobId)) {
    selectedJobId = null;
    jobDetailContent.innerHTML = "";
    jobDetailView.hidden = true;
    reportPreview.hidden = true;
  }
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

async function copySupportEmail() {
  const email = supportEmail?.textContent?.trim() || "chaserose@ironproofservice.com";

  try {
    await navigator.clipboard.writeText(email);
    setMessage(supportMessage, "Support email copied to clipboard.", "success");
  } catch {
    setMessage(supportMessage, "Unable to copy support email.", "error");
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
    service_date: normalizeServiceDate(formData.get("service_date"), true),
    work_order: formData.get("work_order")?.toString().trim() || "",
    customer: formData.get("customer")?.toString().trim() || "",
    machine: formData.get("machine")?.toString().trim() || "",
    serial: formData.get("serial")?.toString().trim() || "",
    industry: formData.get("industry")?.toString().trim() || "",
    meter_hours: formData.get("meter_hours")?.toString().trim() || "",
    vehicle_miles: formData.get("vehicle_miles")?.toString().trim() || "",
    quick_notes: formData.get("quick_notes")?.toString().trim() || "",
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

  ensureDefaultServiceDate();
  updateJobPlaceholders();
  setMessage(formMessage, "Job saved successfully.", "success");
  await loadJobs();
}

async function handleJoinCrew(event) {
  event.preventDefault();

  if (!currentUser || !joinCrewCodeInput || !joinCrewRoleSelect) {
    return;
  }

  const enteredCode = joinCrewCodeInput.value;
  const cleanedCrewCode = enteredCode.trim().replace(/\D/g, "");
  const requestedRole = joinCrewRoleSelect.value;

  console.log("IronSolidSystems crew join input", {
    enteredCode,
    cleanedCode: cleanedCrewCode
  });

  if (!/^\d{8}$/.test(cleanedCrewCode)) {
    setMessage(joinCrewMessage, "Enter a valid 8-digit crew code.", "error");
    return;
  }

  joinCrewCodeInput.value = cleanedCrewCode;

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
    .eq("crew_code", cleanedCrewCode)
    .eq("crew_enabled", true)
    .maybeSingle();

  console.log("IronSolidSystems crew join query", {
    enteredCode,
    cleanedCode: cleanedCrewCode,
    queryResult: job,
    supabaseError: jobError
  });

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

if (openHowToNavButton) {
  openHowToNavButton.addEventListener("click", () => {
    setMainView("how-to");
    howToPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (openSupportNavButton) {
  openSupportNavButton.addEventListener("click", () => {
    setMainView("support");
    supportPanel.scrollIntoView({ behavior: "smooth", block: "start" });
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

if (closeHowToButton) {
  closeHowToButton.addEventListener("click", () => {
    setMainView("main");
    dashboardSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (closeSupportButton) {
  closeSupportButton.addEventListener("click", () => {
    setMainView("main");
    dashboardSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (copySupportEmailButton) {
  copySupportEmailButton.addEventListener("click", copySupportEmail);
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
ensureDefaultServiceDate();
updateJobPlaceholders();
registerServiceWorker();
setupInstallPrompt();
checkCurrentUser();
