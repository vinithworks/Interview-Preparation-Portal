/* =====================================
   INTERVIEW PREPARATION PORTAL
   PART 1
===================================== */

/* ---------- PAGE REFERENCES ---------- */

const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const forgotPage = document.getElementById("forgotPage");
const dashboardPage = document.getElementById("dashboardPage");

/* ---------- LOGIN ---------- */

const loginUsername =
document.getElementById("loginUsername");

const loginPassword =
document.getElementById("loginPassword");

const loginBtn =
document.getElementById("loginBtn");

/* ---------- SIGNUP ---------- */

const signupName =
document.getElementById("signupName");

const signupProfession =
document.getElementById("signupProfession");

const signupUsername =
document.getElementById("signupUsername");

const signupPassword =
document.getElementById("signupPassword");

const registerBtn =
document.getElementById("registerBtn");

/* ---------- FORGOT ---------- */

const forgotUsername =
document.getElementById("forgotUsername");

const recoverBtn =
document.getElementById("recoverBtn");

/* ---------- LINKS ---------- */

const showSignup =
document.getElementById("showSignup");

const showForgotPassword =
document.getElementById("showForgotPassword");

const backToLogin =
document.getElementById("backToLogin");

const forgotBackBtn =
document.getElementById("forgotBackBtn");

/* ---------- DASHBOARD ---------- */

const logoutBtn =
document.getElementById("logoutBtn");

const getStartedBtn =
document.getElementById("getStartedBtn");

/* ---------- PROFILE ---------- */

const profileName =
document.getElementById("profileName");

const profileProfession =
document.getElementById("profileProfession");

const profileUsername =
document.getElementById("profileUsername");

/* ---------- CHANGE PASSWORD ---------- */

const oldPassword =
document.getElementById("oldPassword");

const newPassword =
document.getElementById("newPassword");

const confirmPassword =
document.getElementById("confirmPassword");

const changePasswordBtn =
document.getElementById("changePasswordBtn");

/* ---------- MODAL ---------- */

const messageModal =
document.getElementById("messageModal");

const modalTitle =
document.getElementById("modalTitle");

const modalMessage =
document.getElementById("modalMessage");

const closeModal =
document.getElementById("closeModal");

/* ---------- SECTIONS ---------- */

const homeSection =
document.getElementById("homeSection");

const profileSection =
document.getElementById("profileSection");

const passwordSection =
document.getElementById("passwordSection");

const preparationSection =
document.getElementById("preparationSection");

const taskSection =
document.getElementById("taskSection");

/* =====================================
   COMMON FUNCTIONS
===================================== */

function showModal(title, message){

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    messageModal.classList.remove("hidden");

}

function hideModal(){

    messageModal.classList.add("hidden");

}

closeModal.addEventListener(
    "click",
    hideModal
);

function hideAllPages(){

    loginPage.classList.add("hidden");
    signupPage.classList.add("hidden");
    forgotPage.classList.add("hidden");
    dashboardPage.classList.add("hidden");

}

function hideAllSections(){

    homeSection.classList.add("hidden");
    profileSection.classList.add("hidden");
    passwordSection.classList.add("hidden");
    preparationSection.classList.add("hidden");
    taskSection.classList.add("hidden");

}

/* =====================================
   PAGE NAVIGATION
===================================== */

showSignup.addEventListener(
    "click",
    () => {

        hideAllPages();

        signupPage.classList.remove(
            "hidden"
        );

    }
);

showForgotPassword.addEventListener(
    "click",
    () => {

        hideAllPages();

        forgotPage.classList.remove(
            "hidden"
        );

    }
);

backToLogin.addEventListener(
    "click",
    () => {

        hideAllPages();

        loginPage.classList.remove(
            "hidden"
        );

    }
);

forgotBackBtn.addEventListener(
    "click",
    () => {

        hideAllPages();

        loginPage.classList.remove(
            "hidden"
        );

    }
);

/* =====================================
   SIGNUP
===================================== */

registerBtn.addEventListener(
    "click",
    () => {

        const name =
        signupName.value.trim();

        const profession =
        signupProfession.value.trim();

        const username =
        signupUsername.value.trim();

        const password =
        signupPassword.value.trim();

        if(
            !name ||
            !profession ||
            !username ||
            !password
        ){

            showModal(
                "Validation",
                "Please fill all fields."
            );

            return;
        }

        let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

        const alreadyExists =
        users.find(
            user =>
            user.username === username
        );

        if(alreadyExists){

            showModal(
                "Error",
                "Username already exists."
            );

            return;
        }

        users.push({

            name,
            profession,
            username,
            password

        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        showModal(
            "Success",
            "Registration Successful"
        );

        signupName.value = "";
        signupProfession.value = "";
        signupUsername.value = "";
        signupPassword.value = "";

    }
);

/* =====================================
   LOGIN
===================================== */

loginBtn.addEventListener(
    "click",
    () => {

        const username =
        loginUsername.value.trim();

        const password =
        loginPassword.value.trim();

        const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

        const user =
        users.find(
            item =>
            item.username === username &&
            item.password === password
        );

        if(!user){

            showModal(
                "Login Failed",
                "Invalid Username or Password"
            );

            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        openDashboard();

    }
);

/* =====================================
   FORGOT PASSWORD
===================================== */

recoverBtn.addEventListener(
    "click",
    () => {

        const username =
        forgotUsername.value.trim();

        const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

        const user =
        users.find(
            item =>
            item.username === username
        );

        if(!user){

            showModal(
                "Error",
                "Username Not Found"
            );

            return;
        }

        showModal(
            "Password Recovery",
            `Your Password is : ${user.password}`
        );

    }
);

/* =====================================
   DASHBOARD
===================================== */

function openDashboard(){

    hideAllPages();

    dashboardPage.classList.remove(
        "hidden"
    );

    hideAllSections();

    homeSection.classList.remove(
        "hidden"
    );

    loadProfile();

}

/* =====================================
   PROFILE
===================================== */

function loadProfile(){

    const currentUser =
    JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

    if(!currentUser) return;

    profileName.textContent =
    currentUser.name;

    profileProfession.textContent =
    currentUser.profession;

    profileUsername.textContent =
    currentUser.username;

}

/* =====================================
   SIDEBAR NAVIGATION
===================================== */

document
.querySelectorAll(
    ".sidebar li[data-page]"
)
.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            hideAllSections();

            document
            .getElementById(
                item.dataset.page
            )
            .classList
            .remove("hidden");

        }
    );

});

/* =====================================
   GET STARTED
===================================== */

getStartedBtn.addEventListener(
    "click",
    () => {

        hideAllSections();

        preparationSection.classList.remove(
            "hidden"
        );

    }
);

/* =====================================
   CHANGE PASSWORD
===================================== */

changePasswordBtn.addEventListener(
    "click",
    () => {

        const oldPass =
        oldPassword.value.trim();

        const newPass =
        newPassword.value.trim();

        const confirmPass =
        confirmPassword.value.trim();

        const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

        if(
            oldPass !== currentUser.password
        ){

            showModal(
                "Error",
                "Old Password Incorrect"
            );

            return;
        }

        if(
            newPass !== confirmPass
        ){

            showModal(
                "Error",
                "Passwords do not match"
            );

            return;
        }

        let users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];

        users =
        users.map(user => {

            if(
                user.username ===
                currentUser.username
            ){

                user.password =
                newPass;

            }

            return user;

        });

        currentUser.password =
        newPass;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

        showModal(
            "Success",
            "Password Updated"
        );

    }
);

/* =====================================
   LOGOUT
===================================== */

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "currentUser"
        );

        hideAllPages();

        loginPage.classList.remove(
            "hidden"
        );

    }
);

/* =====================================
   AUTO LOGIN
===================================== */

window.addEventListener(
    "load",
    () => {

        const currentUser =
        localStorage.getItem(
            "currentUser"
        );

        if(currentUser){

            openDashboard();

        }

    }
);

/* =====================================
   PART 2
   TOPIC MANAGEMENT
===================================== */

const addTopicBtn =
document.getElementById("addTopicBtn");

const topicContainer =
document.getElementById("topicContainer");

const progressBar =
document.getElementById("progressBar");

const progressText =
document.getElementById("progressText");

const completedBtn =
document.getElementById("completedBtn");

const notCompletedBtn =
document.getElementById("notCompletedBtn");

let topicCounter = 0;

/* =====================================
   ADD TOPIC
===================================== */

if(addTopicBtn){

    addTopicBtn.addEventListener(
        "click",
        createTopicCard
    );

}

function createTopicCard(){

    topicCounter++;

    const topicDiv =
    document.createElement("div");

    topicDiv.className =
    "topic-card status-notdone";

    topicDiv.innerHTML = `

        <div class="topic-number">
            Topic ${topicCounter}
        </div>

        <label>
            Topic Heading
        </label>

        <input
            type="text"
            class="topic-name"
            placeholder="Example : SDLC">

        <label>
            Status
        </label>

        <select class="topic-status">

            <option value="Not Done">
                Not Done
            </option>

            <option value="Hold">
                Hold
            </option>

            <option value="Done">
                Done
            </option>

        </select>

        <label>
            Add Notes
        </label>

        <textarea
            class="topic-notes"
            placeholder="Write notes here...">
        </textarea>

        <button
            class="topic-delete">
            Delete Topic
        </button>

    `;

    topicContainer.appendChild(
        topicDiv
    );

    const statusDropdown =
    topicDiv.querySelector(
        ".topic-status"
    );

    const deleteBtn =
    topicDiv.querySelector(
        ".topic-delete"
    );

    statusDropdown.addEventListener(
        "change",
        () => {

            updateStatusColor(
                topicDiv,
                statusDropdown.value
            );

            updateProgress();

        }
    );

    deleteBtn.addEventListener(
        "click",
        () => {

            topicDiv.remove();

            updateProgress();

        }
    );

    updateProgress();

}

/* =====================================
   STATUS COLOR
===================================== */

function updateStatusColor(
    card,
    status
){

    card.classList.remove(
        "status-notdone",
        "status-hold",
        "status-done"
    );

    if(status === "Not Done"){

        card.classList.add(
            "status-notdone"
        );

    }

    if(status === "Hold"){

        card.classList.add(
            "status-hold"
        );

    }

    if(status === "Done"){

        card.classList.add(
            "status-done"
        );

    }

}

/* =====================================
   PROGRESS TRACKER
===================================== */

function updateProgress(){

    const allTopics =
    document.querySelectorAll(
        ".topic-card"
    );

    const total =
    allTopics.length;

    let completed = 0;
    let hold = 0;
    let pending = 0;

    allTopics.forEach(card => {

        const status =
        card.querySelector(
            ".topic-status"
        ).value;

        if(
            status === "Done"
        ){

            completed++;

        }
        else if(
            status === "Hold"
        ){

            hold++;

        }
        else{

            pending++;

        }

    });

    const percentage =
    total === 0
    ? 0
    : Math.round(
        (completed / total) * 100
    );

    progressBar.style.width =
    percentage + "%";

    progressText.innerHTML = `

        Total Topics : ${total}<br>
        Completed : ${completed}<br>
        Hold : ${hold}<br>
        Pending : ${pending}<br>
        Progress : ${percentage}%

    `;

}

/* =====================================
   GET TOPICS DATA
===================================== */

function getTopicsData(){

    const topics = [];

    document
    .querySelectorAll(
        ".topic-card"
    )
    .forEach(card => {

        topics.push({

            topicName:
            card.querySelector(
                ".topic-name"
            ).value,

            status:
            card.querySelector(
                ".topic-status"
            ).value,

            notes:
            card.querySelector(
                ".topic-notes"
            ).value

        });

    });

    return topics;

}

/* =====================================
   SAVE PREPARATION
===================================== */

function savePreparation(
    completionType
){

    const interviewDate =
    document.getElementById(
        "interviewDate"
    ).value;

    const jobRole =
    document.getElementById(
        "jobRole"
    ).value;

    if(!interviewDate){

        showModal(
            "Validation",
            "Please Select Interview Date"
        );

        return false;

    }

    if(!jobRole){

        showModal(
            "Validation",
            "Please Enter Job Role"
        );

        return false;

    }

    const topics =
    getTopicsData();

    if(
        topics.length === 0
    ){

        showModal(
            "Validation",
            "Please Add Topics"
        );

        return false;

    }

    const history =
    JSON.parse(
        localStorage.getItem(
            "interviewHistory"
        )
    ) || [];

    history.push({

        id:
        Date.now(),

        interviewDate,

        jobRole,

        topics,

        completionType,

        createdAt:
        new Date()
        .toLocaleString()

    });

    localStorage.setItem(

        "interviewHistory",

        JSON.stringify(history)

    );

    return true;

}

/* =====================================
   COMPLETED PREPARATION
===================================== */

completedBtn.addEventListener(
    "click",
    () => {

        const saved =
        savePreparation(
            "Completed"
        );

        if(!saved) return;

        showModal(

            "🎉 Super! Congrats!",

            "You completed all interview preparation successfully. All the Best for Your Interview."

        );

        clearPreparationForm();

    }
);

/* =====================================
   NOT COMPLETED
===================================== */

notCompletedBtn.addEventListener(
    "click",
    () => {

        const saved =
        savePreparation(
            "Not Completed"
        );

        if(!saved) return;

        showModal(

            "😊 Don't Worry",

            "All is Well. Focus on important topics. Give your best. Good Luck."

        );

        clearPreparationForm();

    }
);

/* =====================================
   CLEAR FORM
===================================== */

function clearPreparationForm(){

    document.getElementById(
        "interviewDate"
    ).value = "";

    document.getElementById(
        "jobRole"
    ).value = "";

    topicContainer.innerHTML = "";

    progressBar.style.width =
    "0%";

    progressText.innerHTML =
    "0%";

    topicCounter = 0;

}

/* =====================================
   PART 3
   MY TASKS
===================================== */

const taskContainer =
document.getElementById(
    "taskContainer"
);

const searchTask =
document.getElementById(
    "searchTask"
);

const filterTask =
document.getElementById(
    "filterTask"
);

/* =====================================
   LOAD TASKS
===================================== */

function loadTasks(){

    if(!taskContainer) return;

    const history =
    JSON.parse(
        localStorage.getItem(
            "interviewHistory"
        )
    ) || [];

    const searchValue =
    searchTask.value
    .toLowerCase();

    const filterValue =
    filterTask.value;

    let filtered =
    history.filter(task => {

        const matchSearch =

            task.jobRole
            .toLowerCase()
            .includes(
                searchValue
            )

            ||

            task.interviewDate
            .includes(
                searchValue
            );

        const matchFilter =

            filterValue === "all"

            ||

            task.completionType ===
            filterValue;

        return (
            matchSearch &&
            matchFilter
        );

    });

    taskContainer.innerHTML = "";

    if(
        filtered.length === 0
    ){

        taskContainer.innerHTML =

        `
            <h3>
                No Tasks Found
            </h3>
        `;

        return;

    }

    filtered
    .reverse()
    .forEach(task => {

        const card =
        document.createElement(
            "div"
        );

        card.className =
        "task-card";

        card.innerHTML = `

            <h3>
                ${task.jobRole}
            </h3>

            <p>
                Interview Date :
                ${task.interviewDate}
            </p>

            <p>
                Total Topics :
                ${task.topics.length}
            </p>

            <p>
                Status :
                ${task.completionType}
            </p>

            <p>
                Created :
                ${task.createdAt}
            </p>

            <div class="task-buttons">

    <button
        class="view-btn"
        onclick="viewTask(${task.id})">

        View

    </button>

    <button
        class="edit-btn"
        onclick="editTask(${task.id})">

        Edit

    </button>

    <button
        class="delete-btn"
        onclick="deleteTask(${task.id})">

        Delete

    </button>

</div>

        `;

        taskContainer.appendChild(
            card
        );

    });

}

/* =====================================
   VIEW TASK
===================================== */

function viewTask(id){

    const history =
    JSON.parse(
        localStorage.getItem(
            "interviewHistory"
        )
    ) || [];

    const task =
    history.find(
        item =>
        item.id === id
    );

    if(!task) return;

    let topicHTML = "";

    task.topics.forEach(topic => {

        topicHTML += `
Topic : ${topic.topicName}
| Status : ${topic.status}
| Notes : ${topic.notes}

`;

    });

    showModal(

        task.jobRole,

        `
Interview Date :
${task.interviewDate}

----------------------------

${topicHTML}

----------------------------

Status :
${task.completionType}

----------------------------

Interview Questions / Points :

${task.interviewDonePoints || "No Data"}

----------------------------

Interview Experience :

${task.interviewExperience || "No Data"}
`

    );

}

/* =====================================
   SEARCH
===================================== */

if(searchTask){

    searchTask.addEventListener(

        "keyup",

        loadTasks

    );

}

/* =====================================
   FILTER
===================================== */

if(filterTask){

    filterTask.addEventListener(

        "change",

        loadTasks

    );

}

/* =====================================
   SIDEBAR TASK CLICK
===================================== */

document
.querySelectorAll(
    ".sidebar li"
)
.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            if(
                item.dataset.page ===
                "taskSection"
            ){

                loadTasks();

            }

        }
    );

});

/* =====================================
   AUTO LOAD
===================================== */

window.addEventListener(

    "load",

    () => {

        loadTasks();

    }

);

/* =====================================
   EDIT TASK
===================================== */

function editTask(id){

    const history =
    JSON.parse(
        localStorage.getItem(
            "interviewHistory"
        )
    ) || [];

    const task =
    history.find(
        item => item.id === id
    );

    if(!task){
        return;
    }

    const interviewPoints =
    prompt(
        "Interview Done Points / Questions Asked",
        task.interviewDonePoints || ""
    );

    if(interviewPoints === null){
        return;
    }

    const experience =
    prompt(
        "How was your interview?\n\nAwesome\nGood\nAverage\nBad",
        task.interviewExperience || ""
    );

    if(experience === null){
        return;
    }

    task.interviewDonePoints =
    interviewPoints;

    task.interviewExperience =
    experience;

    localStorage.setItem(
        "interviewHistory",
        JSON.stringify(history)
    );

    showModal(
        "Success",
        "Interview Details Saved Successfully"
    );

    loadTasks();

}