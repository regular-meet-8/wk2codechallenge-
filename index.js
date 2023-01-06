let content = document.getElementById("content");

let nameElement 
let cardElement
let imgElement
let voteElement 
let buttonElement 

function getNames(){
    fetch("http://localhost:3000/characters")
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(data){
            data.forEach(animal => {
               nameElement = document.createElement("h3")
               cardElement = document.createElement("div")
               imgElement = document.createElement("img")
               voteElement = document.createElement("p")
                content.appendChild(cardElement)
                cardElement.appendChild(nameElement)
                cardElement.setAttribute("onClick", `getAnimalById(${animal.id});`)
                nameElement.innerHTML = animal.name 
                //adding the class name
                cardElement.classList.add("card")
                

               
                
               
                
            });
        })
    }
    const getAnimalById = (id) => {
    
        console.log(window.location.pathname)
        sessionStorage.setItem("id", id);
        window.location.href = `http://127.0.0.1:5500/details.html`;
        }
        console.log(window.location.pathname)
    if(window.location.pathname == "/"){
      getNames()
    }else if(window.location.pathname == "/details.html"){
      let details = document.getElementById("details");
      function getDetails(){
        var id =sessionStorage.getItem("id");
        fetch( `http://localhost:3000/characters/${id}`)
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(data){
            console.log(data)
            nameElement = document.createElement("h3")
            cardElement = document.createElement("div")
            imgElement = document.createElement("img")
            voteElement = document.createElement("p")
            buttonElement = document.createElement("button")
             details.appendChild(cardElement)
             cardElement.appendChild(nameElement)
             cardElement.appendChild(imgElement)
             cardElement.appendChild(voteElement)
             cardElement.appendChild(buttonElement)
             cardElement.setAttribute("onClick", `getAnimalById(${data.id});`)
             nameElement.innerHTML = data.name 
             //adding the class name
             cardElement.classList.add("card")
             imgElement.src = data.image
             voteElement.innerHTML =`Votes: ${data.votes}`
            buttonElement.innerHTML = "Vote";
            buttonElement.setAttribute("onClick", `updateVotes(${data.id},${data.votes});`)
            
          
             
             
        })
    }
    getDetails()
    
    function updateVotes(id, votes){
        var newVote=votes+1
        fetch(`http://localhost:3000/characters/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              votes: votes +1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
          
    }
}