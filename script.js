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
    bg: "#FF0000",
    bgAlt: "#FF0000",
    panel: "#FF0000",
    panelStrong: "#FF0000",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(0, 0, 0, 0.28)",
    accent: "#000000",
    accentStrong: "#000000",
    accentSecondary: "#000000",
    accentShadow: "rgba(0, 0, 0, 0.18)",
    bodyGlow: "rgba(0, 0, 0, 0.12)",
    bodyGlowAlt: "rgba(0, 0, 0, 0.08)",
    bodyStart: "#FF0000",
    bodyEnd: "#FF0000"
  },
  blue: {
    bg: "#0033A0",
    bgAlt: "#0033A0",
    panel: "#FFFFFF",
    panelStrong: "#FFFFFF",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(0, 51, 160, 0.28)",
    accent: "#0033A0",
    accentStrong: "#0033A0",
    accentSecondary: "#FFFFFF",
    accentShadow: "rgba(0, 51, 160, 0.18)",
    bodyGlow: "rgba(255, 255, 255, 0.14)",
    bodyGlowAlt: "rgba(255, 255, 255, 0.1)",
    bodyStart: "#0033A0",
    bodyEnd: "#0033A0"
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
    accentShadow: "rgba(160, 160, 160, 0.16)",
    bodyGlow: "rgba(180, 180, 180, 0.08)",
    bodyGlowAlt: "rgba(80, 80, 80, 0.08)",
    bodyStart: "#050505",
    bodyEnd: "#0d0d0d"
  },
  white: {
    bg: "#e8ecef",
    bgAlt: "#d8dde0",
    panel: "rgba(255, 255, 255, 0.88)",
    panelStrong: "#ffffff",
    panelSoft: "rgba(0, 0, 0, 0.035)",
    border: "rgba(0, 0, 0, 0.08)",
    borderStrong: "rgba(90, 90, 90, 0.22)",
    accent: "#636363",
    accentStrong: "#2e2e2e",
    accentShadow: "rgba(80, 80, 80, 0.14)",
    bodyGlow: "rgba(255, 255, 255, 0.3)",
    bodyGlowAlt: "rgba(170, 170, 170, 0.16)",
    bodyStart: "#eef2f4",
    bodyEnd: "#d7dde0"
  },
  tan: {
    bg: "#17120d",
    bgAlt: "#211911",
    panel: "rgba(35, 28, 20, 0.92)",
    panelStrong: "#2e2419",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(193, 151, 93, 0.24)",
    accent: "#c1975d",
    accentStrong: "#dfba82",
    accentShadow: "rgba(193, 151, 93, 0.2)",
    bodyGlow: "rgba(193, 151, 93, 0.14)",
    bodyGlowAlt: "rgba(110, 72, 30, 0.1)",
    bodyStart: "#0d0a08",
    bodyEnd: "#18120d"
  },
  "cat-yellow": {
    bg: "#FFCC00",
    bgAlt: "#FFCC00",
    panel: "#FFCC00",
    panelStrong: "#FFCC00",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(0, 0, 0, 0.3)",
    accent: "#000000",
    accentStrong: "#000000",
    accentSecondary: "#B00000",
    accentShadow: "rgba(176, 0, 0, 0.18)",
    bodyGlow: "rgba(176, 0, 0, 0.14)",
    bodyGlowAlt: "rgba(0, 0, 0, 0.08)",
    bodyStart: "#FFCC00",
    bodyEnd: "#FFCC00"
  },
  "john-deere-green": {
    bg: "#46A138",
    bgAlt: "#46A138",
    panel: "#46A138",
    panelStrong: "#46A138",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(0, 0, 0, 0.28)",
    accent: "#FFDE00",
    accentStrong: "#FFDE00",
    accentSecondary: "#000000",
    accentShadow: "rgba(0, 0, 0, 0.18)",
    bodyGlow: "rgba(255, 222, 0, 0.12)",
    bodyGlowAlt: "rgba(0, 0, 0, 0.08)",
    bodyStart: "#46A138",
    bodyEnd: "#46A138"
  },
  "usa-theme": {
    bg: "#08111c",
    bgAlt: "#0f1930",
    panel: "rgba(16, 24, 43, 0.92)",
    panelStrong: "#172746",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(220, 74, 74, 0.22)",
    accent: "#d44343",
    accentStrong: "#f2f2f2",
    accentShadow: "rgba(212, 67, 67, 0.18)",
    bodyGlow: "rgba(62, 111, 190, 0.14)",
    bodyGlowAlt: "rgba(212, 67, 67, 0.12)",
    bodyStart: "#06101c",
    bodyEnd: "#0a1630"
  }
};

const TEXT_PRESETS = {
  white: {
    text: "#f2f2ec",
    textSoft: "#afb5af"
  },
  black: {
    text: "#000000",
    textSoft: "#000000"
  },
  yellow: {
    text: "#f2c230",
    textSoft: "#d0b25d"
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

  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--bg-alt", theme.bgAlt);
  root.style.setProperty("--panel", theme.panel);
  root.style.setProperty("--panel-strong", theme.panelStrong);
  root.style.setProperty("--panel-soft", theme.panelSoft);
  root.style.setProperty("--border", theme.border);
  root.style.setProperty("--border-strong", theme.borderStrong);
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
}

function saveThemeSettings(settings) {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(settings));
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

  article.append(top, meta, detailSections, actions, createCrewSection(job));

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

if (signUpButton) {
  signUpButton.addEventListener("click", signUpUser);
}

if (copyAccountButton) {
  copyAccountButton.addEventListener("click", copyAccountInfo);
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
checkCurrentUser();
