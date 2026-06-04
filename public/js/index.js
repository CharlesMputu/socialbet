import FetchData from "./FetchData.js"
import Modal from "./Modal.js"

const ticketContainer = document.querySelector(".ticket-container")


const now = new Date().toLocaleDateString()
const dataJson = now.replaceAll("/","-") + ".json";


const fetchData = new FetchData(`data/${dataJson}`)


const setBgColor = (color) => color === "W" ? "bg-blue" : "bg-orange"

const totalCote = (ev) => {

    let total = 1

    if(ev.length === 1){
        return parseFloat(ev[0].cote).toFixed(2)
    }
    
    for(let i = 0; i < ev.length ; i++) {
        total *= parseFloat(ev[i].cote);
    }

    return total.toFixed(2)
    
}

const moreButtonController = (buttons) =>{
    
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()

            const btnTarget = e.target
            const matchid =  parseInt(btnTarget.dataset.matchid);

            fetchData.get().then(data => {
                if(data.error){
                    return
                }
                
                if(data[matchid]){
                    const events = data[matchid].events

                    const html = events.map(item => `
                        <div class="ev-item">
                            <div class="ev-h secondary">
                                <div class="sport">
                                    <i class="fas fa-futbol"></i>
                                </div>
                                <div class="small secondary">
                                    <p>${item.cnt} - ${item.chm}</p>
                                    <p>${item.date}(${item.time})</p>
                                </div>
                            </div>
                            <div class="ev-b">
                                <div class="team">
                                    <p class="name">${item.h}</p>
                                    <div class="flag">
                                        <i class="fas fa-flag"></i>
                                    </div>
                                </div>
                                <h3 class="vs">VS</h3>
                                <div class="team">
                                    <div class="flag">
                                        <i class="fas fa-flag"></i>
                                    </div>
                                    <p class="name">${item.a}</p>
                                </div>
                            </div>
                            <div class="ev-f small">
                                <div class="item b-500">
                                    <p>${item.bet}</p>
                                    <p>${item.cote}</p>
                                </div>
                                <div class="item secondary">
                                    <p>Résultat</p>
                                    <p>${item.status}...</p>
                                </div>
                            </div>
                        </div>
                    `).join(" ")

                    
                
                    const modal = new Modal()

                    modal.open({
                        data : 
                        `
                            <div class="events">
                                ${html}
                            </div>
                        `
                    })
                }

            })
            
           
        })
    })

}
const renderData = (data)=>{

    ticketContainer.innerHTML = data.map((tip, matchid) => `
        <article class="ticket">
            <div class="header">
                <div class="first">
                    <div class="status ${setBgColor(tip.bmk.abbr)}">
                        <p class="">${tip.bmk.abbr}</p>
                    </div>
                    <div class="info">
                        <h3 class="bookmaker b-500">${tip.bmk.name}</h3>
                        <p class="type small">${tip.type}</p>
                    </div>
                </div>
                <i class="fas fa-ellipsis more" data-matchid="${matchid}"></i>
            </div>
            <div class="details ">
                <div class="label">
                    <p class="title">Evenements</p>
                    <p class="value">${tip.events.length}</p>
                </div>
                <div class="label">
                    <p class="title">Côtes</p>
                    <p class="value">${totalCote(tip.events)}</p>
                </div>
            
            </div>
        </article>
    `).join(" ")

    const moreButtons = document.querySelectorAll(".ticket .header .more")
    
    moreButtonController(moreButtons)
}

fetchData.get().then(data => {
    if(data.error){
        console.error(data.error);
        return
    }
    
    renderData(data)
    
})