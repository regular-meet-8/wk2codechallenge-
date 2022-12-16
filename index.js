function fetchAnimals(){
    fetch(`http://localhost:3000/characters`)
    .then(res => res.json())
    .then(data => renderAnimals(data));
}
function renderAnimals(data){
    const ul = document.getElementById('animals')
    const div = document.getElementById('card')
    data.forEach(animal => {
        const li = document.createElement('li')
        li.innerHTML = animal.name;
        const animalCard = document.createElement('div');
        animalCard.classList.add('animal-card');
        animalCard.innerHTML = `
            <img src="${animal.image}"/>
            <h2>${animal.name}</h2>
        `;
        // Create votes tally element
        const votes = document.createElement('div');
        votes.innerHTML = `Votes: ${animal.votes}`;
        // Append votes to animaCard
        animalCard.appendChild(votes);
        // Create a button for voting 
        const btn = document.createElement('button');
        btn.textContent = "VOTE"
        // Add an event listener to the button to increment number of votes
        btn.addEventListener('click', () => {
            votes.innerText = `Votes: ${parseInt(votes.innerText.split(': ')[1]) + 1}`;
        })
        // Append button to the animalCard
        animalCard.appendChild(btn)
        li.addEventListener('click', () => {
            div.innerText=""
            div.appendChild(animalCard);
             // Check if the animalCard has the "active" class
             if (!animalCard.classList.contains('active')) {
              // If it does not, add the "active" class and append the animalCard to the li element
              animalCard.classList.add('active');  
              div.appendChild(animalCard);
            }
        });
        ul.appendChild(li);
    });  
}
fetchAnimals(); (edited) 