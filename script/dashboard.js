const cardContainer = document.getElementById("card-container");
const allCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(response => response.json())
    .then(data => {
        displayAllCards(data.data);
    })
}
const displayAllCards = (cards) => {
    cardContainer.innerHTML = "",
    cards.forEach(card => {
        const newElement = document.createElement("div");
        newElement.innerHTML = `
    <div class="issue-cards bg-white p-4 shadow rounded-xl space-y-4 h-full border-t-4 border-green-600">
        <div class="flex justify-between items-center">
          <div>
            <img src="./assets/Open-Status.png" alt="">
          </div>
          <div>
            <p class="bg-red-200 text-red-500 rounded-full btn cursor-none w-24 text-center">${card.priority}</p>
          </div>
        </div>
        <h3 class="text-xl font-semibold text-[#1F2937]">${card.title}</h3>
        <p class="text-base leading-6 text-[#64748B] line-clamp-2"></p>
        <div class="flex gap-3">
          <button class="bg-red-200 text-red-500 border border-red-500 rounded-full p-2  inline-flex items-center justify-center gap-1"><i class="fa-solid fa-bug"></i>${card.labels[0]}</button>
          <button class="bg-yellow-100 text-orange-500 border border-yellow-500 btn cursor-none rounded-full p-2 inline-flex items-center justify-center gap-1"><i class="fa-regular fa-life-ring"></i>HELP WANTED</button>
        </div>
        <p class="text-base leading-6 text-[#64748B]">${card.assignee}</p>
        <p class="text-base leading-6 text-[#64748B]">${new Date(card.createdAt).toLocaleString("en-US")}</p>
      </div>
    `
    cardContainer.append(newElement)
    });
}
allCards()