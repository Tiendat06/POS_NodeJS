const Film = require("../../Film");

class FilmBuilder{
    #id;
    #name;
    #director;
    #cast;
    #gerne;
    #type;
    #runningTime;
    #releaseDate;
    #description;
    #language;
    #rated;
    #photo;
    #trailer;
    #slider;

    setId (id) {
        this.#id = id;
        return this;
    }

    setName (name){
        this.#name = name;
        return this;
    }

    setDirector (director){
        this.#director = director;
        return this;
    }

    setCast (cast) {
        this.#cast = cast;
        return this;
    }

    setGerne (gerne){
        this.#gerne = gerne;
        return this;
    }

    setType (type){
        this.#type = type;
        return this;
    }

    setRunningTime (runningTime){
        this.#runningTime = runningTime;
        return this;
    }

    setReleaseDate (releaseDate) {
        this.#releaseDate = releaseDate;
        return this;
    }

    setDescription (description){
        this.#description = description;
        return this;
    }

    setLanguage (language){
        this.#language = language;
        return this;
    }

    setRated (rated) {
        this.#rated = rated;
        return this;
    }

    setPhoto (photo){
        this.#photo = photo;
        return this;
    }

    setTrailer (trailer){
        this.#trailer = trailer;
        return this;
    }
    
    setSlider (slider){
        this.#slider = slider;
        return this;
    }

    build(){
        return new Film(this.id, this.name, this.director, this.cast, this.gerne, this.runningTime, 
            this.releaseDate, this.description, this.language, this.rated, this.photo, this.trailer, this.slider);
    }
}

module.exports = new FilmBuilder();