export default  class Modal{

    constructor(){
        this.modalState = false
        this.modal = document.querySelector(".modal")
        this.modalContantData = this.modal.querySelector(".content .data")

        this.closeHandler(this.modal)
        this.modal.querySelector(".cls").addEventListener("click", (e)=>{
            this.close()
        })
        
    }
    open(options = {}){
        if(!this.modalState){
            this.setDisplay("flex")
            
            const data = options.data
            this.renderData(data)
            
            this.modalState = true
        }
    }

    renderData(data){
        if(!data){
            this.modalContantData.innerHTML = "<div class='small secondary'>Aucune information pour le moment</div>"
            return
        }
        this.modalContantData.innerHTML = data
    }

    setDisplay(display){
        this.modal.style.display = display
    }

    close(){
        if(this.modalState){
            this.setDisplay("none")
            this.modalState = false
        }
    }
    
    closeHandler(element){
        element.addEventListener("click", (e)=>{
            if(e.target === element){
               this.close()
            }
        })
    }
}
