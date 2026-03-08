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
        let borderClass = "border-green-600";

        if(card.status === "closed"){
            borderClass = "border-purple-600";
        }
        let priorityClass = "";

        if (card.priority === "high") {
            priorityClass = "bg-base-300 text-red-500 text-[18px] font-semibold";
        } else if (card.priority === "medium") {
            priorityClass = "bg-base-300 text-orange-400 text-[18px] font-semibold";
        } else if (card.priority === "low") {
            priorityClass = "bg-base-300 text-green-500 text-[18px font-semibold";
        }
        const labelsHTML = card.labels.map(label => {

            let labelClass = "bg-green-100 text-green-500 border border-green-500 text-[18px] p-4";

            if(label === "bug"){
                labelClass = "bg-red-100 text-red-500 border border-red-500 text-[18px] p-4";
            }
            else if(label === "help wanted"){
                labelClass = "bg-yellow-100 text-orange-400 text-[18px] p-4 border border-orange-400";
            }

            return `
            <button class="${labelClass} rounded-full px-3 py-1 text-sm">${label}</button>
            `
        }).join("")

        const newElement = document.createElement("div");

        newElement.innerHTML = `
        <div onclick="showCardModal(${card.id})" class="issue-cards bg-white p-4 shadow rounded-xl space-y-4 h-full border-t-4 border-green-600 ${borderClass}">
        <div class="flex justify-between items-center">
          <div>
            <img src="./assets/Open-Status.png" alt="">
          </div>
          <div>
              <p class="${priorityClass} rounded-full w-24 text-center">${card.priority}</p>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-[#1F2937]">${card.title}</h3>
        <p class="text-base leading-6 text-[#64748B] line-clamp-2">${card.description}</p>
        <div class="flex gap-2 flex-wrap">${labelsHTML}</div>
        <p class="text-base leading-6 text-[#64748B]">${card.assignee}</p>
        <p class="text-base leading-6 text-[#64748B]">${new Date(card.createdAt).toLocaleString("en-US")}</p>
        </div>
        `
        cardContainer.append(newElement)

    })
}

const showAll = () => {
    issueCount.innerText = `${allIssues.length} Issues`;
    displayAllCards(allIssues);
    ActiveButton('all');
}

const showOpen = () => {
    const openIssues = allIssues.filter(issue => 
        issue.status === "open"
    );
    issueCount.innerText = `${openIssues.length} Issues`;
    displayAllCards(openIssues);
    ActiveButton('open');
}

const showClosed = () => {
    const closedIssues = allIssues.filter(issue => 
        issue.status === "closed"
    );
    issueCount.innerText = `${closedIssues.length} Issues`;
    displayAllCards(closedIssues);
    ActiveButton('closed');
}

// Function set active btn
const ActiveButton = (activeBtn) => {

    const buttons = document.querySelectorAll("#btn-container button");

    buttons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });

    if(activeBtn === "all"){

        const allBtn = document.getElementById("all-btn");

        allBtn.classList.add("btn-primary");
        allBtn.classList.remove("btn-outline");
    }

    else if(activeBtn === "open"){

        const openBtn = document.getElementById("open-btn");

        openBtn.classList.add("btn-primary");
        openBtn.classList.remove("btn-outline");
    }

    else if(activeBtn === "closed"){

        const closedBtn = document.getElementById("closed-btn");

        closedBtn.classList.add("btn-primary");
        closedBtn.classList.remove("btn-outline");
    }

}

const showCardModal = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(response => response.json())
    .then(data => {
        displayCardModal(data.data)
    })
}

const displayCardModal = (modals) => {

    const modalContainer = document.getElementById("modal-container");

    let priorityClass = "";

    if (modals.priority === "high") {
        priorityClass = "bg-red-100 text-red-500 border border-red-500";
    } 
    else if (modals.priority === "medium") {
        priorityClass = "bg-orange-100 text-orange-400 border border-orange-400";
    } 
    else if (modals.priority === "low") {
        priorityClass = "bg-green-100 text-green-500 border border-green-500";
    }

    const labelsHTML = modals.labels.map(label => {

        let labelClass = "bg-green-100 text-green-500 border border-green-500";

        if(label === "bug"){
            labelClass = "bg-red-100 text-red-500 border border-red-500";
        }
        else if(label === "help wanted"){
            labelClass = "bg-yellow-100 text-orange-400 border border-orange-400";
        }

        return `
        <button class="${labelClass} rounded-full px-3 py-1 text-sm">${label}</button>
        `
    }).join("");

    let statusClass = "";

    if (modals.status === "open") {
        statusClass = "text-green-500";
    } 
    else if (modals.status === "closed") {
        statusClass = "text-purple-500";
    }

    modalContainer.innerHTML = `
    <div class="p-4 rounded space-y-3">
        <h3 class="text-2xl font-bold text-[#1F2937]">${modals.title}</h3>
        <ul class="flex gap-8 items-center">
            <li class="bg-base-300 ${statusClass} rounded-full list-none px-3">${modals.status}</li>
            <li class="text-[#64748B] text-[14px]">${modals.author}</li>
            <li class="text-[#64748B] text-[14px]">22/02/2026</li>
        </ul>
        <div class="flex gap-4 py-2">${labelsHTML}
        </div>
        <p class="py-4 text-[#64748B]">${modals.description}</p>
        <div class="flex gap-40 items-center bg-base-300 rounded-xl p-4">
            <div class="space-y-2">
                <p class="text-[#64748B]">Assignee:</p>
                <h4 class="text-base font-semibold text-[#1F2937]">${modals.author}</h4>
            </div>
            <div class="space-y-2">
                <p class="text-[#64748B]">Priority:</p>
                <p class="${priorityClass} py-1 px-3 rounded-full text-sm font-semibold">${modals.priority}</p>
            </div>
        </div>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary">Close</button>
            </form>
        </div>
    </div>
    `

    document.getElementById("card_modal").showModal();
}
allCards();

document.getElementById("log-out").addEventListener("click", () => {
    window.location.href ="index.html"
})