 export class Place{
    constructor(title, sourceUri ,location, id){
        this.title=title;
        this.sourceUri= sourceUri;
        this.address= location.address;
        this.location= {lat:location.lat,lng:location.lng};
        this.id = id
    }
}