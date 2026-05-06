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
const dashboardUserEmail = document.getElementById("dashboard-user-email");
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
const jobsContainer = document.getElementById("jobs-container");
const jobsMessage = document.getElementById("jobs-message");
const refreshJobsButton = document.getElementById("refresh-jobs");
const reportPreview = document.getElementById("report-preview");
const reportPreviewTitle = document.getElementById("report-preview-title");
const reportPreviewContent = document.getElementById("report-preview-content");
const closeReportPreviewButton = document.getElementById("close-report-preview");
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

const THEME_STORAGE_KEY = "ironsolidsystems-theme-settings";
const DEFAULT_THEME_SETTINGS = {
  themeColor: "cat-yellow",
  textColor: "white"
};

const THEME_PRESETS = {
  red: {
    bg: "#080607",
    bgAlt: "#120b0d",
    panel: "rgba(24, 14, 16, 0.92)",
    panelStrong: "#221214",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(158, 30, 52, 0.32)",
    accent: "#9e1e34",
    accentStrong: "#c7354f",
    accentShadow: "rgba(158, 30, 52, 0.24)",
    bodyGlow: "rgba(158, 30, 52, 0.18)",
    bodyGlowAlt: "rgba(88, 8, 24, 0.14)",
    bodyStart: "#050405",
    bodyEnd: "#0d0708"
  },
  blue: {
    bg: "#07101d",
    bgAlt: "#0d1830",
    panel: "rgba(15, 24, 46, 0.92)",
    panelStrong: "#16284d",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(0, 82, 155, 0.32)",
    accent: "#0052a5",
    accentStrong: "#3f7fda",
    accentShadow: "rgba(0, 82, 165, 0.22)",
    bodyGlow: "rgba(0, 82, 165, 0.16)",
    bodyGlowAlt: "rgba(11, 32, 74, 0.18)",
    bodyStart: "#050914",
    bodyEnd: "#091327"
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
    bg: "#060707",
    bgAlt: "#111315",
    panel: "rgba(19, 21, 23, 0.92)",
    panelStrong: "#181b1d",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(201, 55, 34, 0.3)",
    accent: "#f2c230",
    accentStrong: "#ffd54a",
    accentShadow: "rgba(201, 55, 34, 0.18)",
    bodyGlow: "rgba(242, 194, 48, 0.16)",
    bodyGlowAlt: "rgba(201, 55, 34, 0.14)",
    bodyStart: "#060707",
    bodyEnd: "#0f1113"
  },
  "john-deere-green": {
    bg: "#070909",
    bgAlt: "#111515",
    panel: "rgba(18, 24, 20, 0.92)",
    panelStrong: "#18201b",
    panelSoft: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(54, 170, 66, 0.32)",
    accent: "#36aa42",
    accentStrong: "#f5c842",
    accentShadow: "rgba(54, 170, 66, 0.24)",
    bodyGlow: "rgba(54, 170, 66, 0.16)",
    bodyGlowAlt: "rgba(245, 200, 66, 0.1)",
    bodyStart: "#050606",
    bodyEnd: "#0c100f"
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
    text: "#141414",
    textSoft: "#353535"
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

function updateJobPlaceholders() {
  const industry =
    jobIndustrySelect instanceof HTMLSelectElement ? jobIndustrySelect.value : "";
  const placeholders =
    JOB_PLACEHOLDERS[industry] || JOB_PLACEHOLDERS.default;
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

function getDisplayName(user) {
  const fullName = user?.user_metadata?.full_name?.trim();
  return fullName || "Technician";
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
  dashboardUserEmail.textContent = email;
  appSections.hidden = !isLoggedIn;
  logOutButton.disabled = !isLoggedIn;

  if (!isLoggedIn) {
    setMainView("main");
    jobsContainer.innerHTML = "";
    reportPreview.hidden = true;
    jobCount.textContent = "0";
    setMessage(jobsMessage, "Sign in to load jobs.");
    setMessage(formMessage, "");
    setMessage(signInMessage, "Sign in to access your app workspace.");
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

function getJobFieldLabels(industry) {
  const labels = JOB_LABELS[industry] || JOB_LABELS.default;

  return {
    jobName: labels.title,
    machine: labels.machine,
    serial: labels.serial
  };
}

function formatReportValue(value) {
  const normalized = value?.toString().trim();
  return normalized ? normalized : "Not provided";
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

function createJobCard(job) {
  const article = document.createElement("article");
  article.className = "job-item";

  const top = document.createElement("div");
  top.className = "job-item__top";

  const titleGroup = document.createElement("div");
  const titleElement = document.createElement("strong");
  titleElement.className = "job-item__title";
  titleElement.textContent = job.title || "Untitled job";

  const customerElement = document.createElement("p");
  customerElement.textContent = job.customer || "No customer listed";
  titleGroup.append(titleElement, customerElement);

  const statusElement = document.createElement("span");
  statusElement.className = "status-tag";
  statusElement.textContent = job.status || "Unknown";

  top.append(titleGroup, statusElement);

  const meta = document.createElement("div");
  meta.className = "job-item__meta";
  meta.append(
    createMetaItem("Machine", job.machine || "Not provided"),
    createMetaItem("Industry", job.industry || "Not provided"),
    createMetaItem("Work Order", job.work_order || "Not assigned"),
    createMetaItem("Created", formatCreatedAt(job.created_at))
  );

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
  article.append(top, meta, actions);
  return article;
}

async function loadJobs() {
  if (!currentUser) {
    jobsContainer.innerHTML = "";
    reportPreview.hidden = true;
    jobCount.textContent = "0";
    setMessage(jobsMessage, "Sign in to load jobs.");
    return;
  }

  setMessage(jobsMessage, "Loading jobs...");
  jobsContainer.innerHTML = "";
  reportPreview.hidden = true;

  const { data, error } = await supabaseClient
    .from("jobs")
    .select(
      "title, customer, machine, industry, status, created_at, work_order, serial, complaint, cause, correction, part_numbers, torque_values"
    )
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    jobCount.textContent = "0";
    setMessage(jobsMessage, `Unable to load jobs: ${error.message}`, "error");
    return;
  }

  if (!data || data.length === 0) {
    jobCount.textContent = "0";
    setMessage(jobsMessage, "No jobs found yet. Create your first job.");
    return;
  }

  jobCount.textContent = String(data.length);
  setMessage(
    jobsMessage,
    `Showing ${data.length} job${data.length === 1 ? "" : "s"}.`,
    "success"
  );

  const fragment = document.createDocumentFragment();
  data.forEach((job) => {
    fragment.appendChild(createJobCard(job));
  });
  jobsContainer.appendChild(fragment);
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

  setMessage(formMessage, "Job saved successfully.", "success");
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

if (jobIndustrySelect instanceof HTMLSelectElement) {
  jobIndustrySelect.addEventListener("change", updateJobPlaceholders);
}

if (refreshJobsButton) {
  refreshJobsButton.addEventListener("click", loadJobs);
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
