export default class FetchData{

    constructor(url){
        this.url = url
    }

    async get(){
        try {
            const r = await fetch(this.url)
            if(!r.ok) throw new Error("Impossible de charger");
            
            return await r.json()
            
        } catch (error) {
           return {
                error : error.message
           }
            
        }
    }

}