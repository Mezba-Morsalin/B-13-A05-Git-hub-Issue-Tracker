const cardContainer = document.getElementById("card-container");
const issueCount = document.querySelector("h3");

let allIssues = [];

const allCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
        allIssues = data.data;
        issueCount.innerText = `${allIssues.length} Issues`;
        displayAllCards(allIssues);
    })
}

const displayAllCards = (cards) => {

    cardContainer.innerHTML = "";

    cards.forEach(card => {

        const labelsHTML = card.labels.map(label => {

            let labelClass = "bg-green-600 text-white text-[18px] p-4";

            if(label === "bug"){
                labelClass = "bg-red-500 text-white text-[18px] p-4";
            }
            else if(label === "help wanted"){
                labelClass = "bg-yellow-500 text-white text-[18px] p-4";
            }

            return `
            <button class="${labelClass} rounded-full px-3 py-1 text-sm">
            ${label}
            </button>
            `
        }).join("")

        const newElement = document.createElement("div");

        newElement.innerHTML = `
        <div class="issue-cards bg-white p-4 shadow rounded-xl space-y-4 h-full border-t-4 border-green-600">

        <div class="flex justify-between items-center">
          <div>
            <img src="./assets/Open-Status.png" alt="">
          </div>

          <div>
            <p class="bg-red-200 text-red-500 rounded-full btn cursor-none w-24 text-center">
            ${card.priority}
            </p>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-[#1F2937]">
        ${card.title}
        </h3>

        <p class="text-base leading-6 text-[#64748B] line-clamp-2">
        ${card.description}
        </p>

        <div class="flex gap-2 flex-wrap">
        ${labelsHTML}
        </div>

        <p class="text-base leading-6 text-[#64748B]">${card.assignee}</p>

        <p class="text-base leading-6 text-[#64748B]">
        ${new Date(card.createdAt).toLocaleString("en-US")}
        </p>

      </div>
        `
        cardContainer.append(newElement)

    })
}

const showAll = () => {
    issueCount.innerText = `${allIssues.length} Issues`;
    displayAllCards(allIssues);
}

const showOpen = () => {
    const openIssues = allIssues.filter(issue =>
        issue.priority === "high" || issue.priority === "medium"
    )

    issueCount.innerText = `${openIssues.length} Issues`;
    displayAllCards(openIssues);
}

const showClosed = () => {
    const closedIssues = allIssues.filter(issue =>
        issue.priority === "low"
    )

    issueCount.innerText = `${closedIssues.length} Issues`;
    displayAllCards(closedIssues);
}

allCards();

document.getElementById("log-out").addEventListener("click", () => {
    window.location.href ="index.html"
})