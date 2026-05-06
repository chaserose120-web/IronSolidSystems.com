const pageShell = document.querySelector(".app-shell");
const menuToggle = document.querySelector(".menu-toggle");
const appSections = document.getElementById("app-sections");
const currentUserEmail = document.getElementById("current-user-email");
const dashboardGreeting = document.getElementById("dashboard-greeting");
const dashboardUserEmail = document.getElementById("dashboard-user-email");
const jobCount = document.getElementById("job-count");

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
const signOutButton = document.getElementById("sign-out-button");

const jobForm = document.getElementById("job-form");
const formMessage = document.getElementById("form-message");
const submitButton = document.getElementById("job-submit");
const jobsContainer = document.getElementById("jobs-container");
const jobsMessage = document.getElementById("jobs-message");
const refreshJobsButton = document.getElementById("refresh-jobs");

let currentUser = null;

if (menuToggle && pageShell) {
  const nav = document.getElementById("site-nav");

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    pageShell.classList.toggle("menu-open", !isOpen);

    if (!isOpen && nav) {
      nav.querySelector("a")?.focus();
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

function updateAuthUI(user) {
  const email = user?.email || "Not signed in";
  const isLoggedIn = Boolean(user);
  const displayName = getDisplayName(user);

  currentUserEmail.textContent = email;
  dashboardGreeting.textContent = `Hello, ${displayName}`;
  dashboardUserEmail.textContent = email;
  appSections.hidden = !isLoggedIn;
  signOutButton.disabled = !isLoggedIn;

  if (!isLoggedIn) {
    jobsContainer.innerHTML = "";
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

  article.append(top, meta);
  return article;
}

async function loadJobs() {
  if (!jobsContainer || !jobsMessage) {
    return;
  }

  if (!currentUser) {
    jobsContainer.innerHTML = "";
    jobCount.textContent = "0";
    setMessage(jobsMessage, "Sign in to load jobs.");
    return;
  }

  setMessage(jobsMessage, "Loading jobs...");
  jobsContainer.innerHTML = "";

  const { data, error } = await supabaseClient
    .from("jobs")
    .select("title, customer, machine, industry, status, created_at, work_order")
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
  setMessage(jobsMessage, `Showing ${data.length} job${data.length === 1 ? "" : "s"}.`, "success");

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

  setButtonsDisabled([signInButton, signOutButton], true);
  setMessage(signInMessage, "Signing in...");

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  setButtonsDisabled([signInButton, signOutButton], false);

  if (error) {
    setMessage(signInMessage, `Sign in failed: ${error.message}`, "error");
    return;
  }

  currentUser = data.user || null;
  updateAuthUI(currentUser);
  setMessage(signInMessage, "Signed in successfully.", "success");
  await loadJobs();
}

async function signOutUser() {
  setButtonsDisabled([signInButton, signOutButton], true);
  setMessage(signInMessage, "Signing out...");

  const { error } = await supabaseClient.auth.signOut();

  setButtonsDisabled([signInButton, signOutButton], false);

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
  } catch (error) {
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
    setMessage(signInMessage, "Session restored.", "success");
    await loadJobs();
  } else {
    setMessage(signInMessage, "Sign in to access your app workspace.");
  }
}

async function handleJobSubmit(event) {
  event.preventDefault();

  if (!jobForm || !submitButton) {
    return;
  }

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
  if (statusField instanceof HTMLInputElement) {
    statusField.value = "Open";
  }

  setMessage(formMessage, "Job saved successfully.", "success");
  await loadJobs();
}

if (jobForm) {
  jobForm.addEventListener("submit", handleJobSubmit);
}

if (refreshJobsButton) {
  refreshJobsButton.addEventListener("click", loadJobs);
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

if (signUpButton) {
  signUpButton.addEventListener("click", signUpUser);
}

if (copyAccountButton) {
  copyAccountButton.addEventListener("click", copyAccountInfo);
}

if (signInButton) {
  signInButton.addEventListener("click", signInUser);
}

if (signOutButton) {
  signOutButton.addEventListener("click", signOutUser);
}

supabaseClient.auth.onAuthStateChange((_event, session) => {
  currentUser = session?.user || null;
  updateAuthUI(currentUser);

  if (currentUser) {
    loadJobs();
  }
});

updateAuthUI(null);
checkCurrentUser();
