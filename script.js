window.onload = function(){

    let savedEntries = JSON.parse(localStorage.getItem("innerHueEntries")) || [];

    savedEntries.forEach(entry => addEntryToUI(entry));

};

const moods = document.querySelectorAll(".mood");

let selectedMood = "";

moods.forEach(button => {

    button.addEventListener("click", () => {

        // remove previous selection
        moods.forEach(btn => btn.style.opacity = "0.5");

        // highlight clicked one
        button.style.opacity = "1";

        selectedMood = button.dataset.mood;


    });

});

const saveBtn = document.querySelector(".save-btn");
const textarea = document.querySelector("textarea");
const entriesContainer = document.querySelector(".entries");

saveBtn.addEventListener("click", () => {

    if(selectedMood === "" || textarea.value.trim() === ""){
        alert("Please select a mood and write a note 🌸");
        return;
    }

   const entry = {
    mood: selectedMood,
    note: textarea.value,
    date: new Date().toLocaleDateString()
};


    addEntryToUI(entry);

    textarea.value = "";
    selectedMood = "";

});

function addEntryToUI(entry){

    const card = document.createElement("div");
    card.classList.add("entry-card");
    card.classList.add(entry.mood);


   card.innerHTML = `
    <h3>${entry.mood}</h3>
    <small>${entry.date}</small>
    <p>${entry.note}</p>
    <button class="delete-btn">Delete</button>
`;

const deleteBtn = card.querySelector(".delete-btn");

deleteBtn.addEventListener("click", () => {

    card.remove();
    deleteFromLocal(entry);

});


    entriesContainer.prepend(card);
    saveToLocal(entry);

}

function saveToLocal(entry){

    let entries = JSON.parse(localStorage.getItem("innerHueEntries")) || [];

    entries.push(entry);

    localStorage.setItem("innerHueEntries", JSON.stringify(entries));
}

function deleteFromLocal(entry){

    let entries = JSON.parse(localStorage.getItem("innerHueEntries")) || [];

    entries = entries.filter(e => 
        !(e.note === entry.note && e.date === entry.date)
    );

    localStorage.setItem("innerHueEntries", JSON.stringify(entries));
}

