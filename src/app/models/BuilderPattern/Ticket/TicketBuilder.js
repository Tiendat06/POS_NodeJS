const Ticket = require('../../Ticket');

class TicketBuilder{
    #ticket_id;
    #account_id;
    #cluster_id;
    #film_id;
    #film_type;
    #sht_id;
    #seat_id;
    #room_id;
    #voucher_id;
    #ticket_price;
    #ticket_date;

    setTicketId(ticket_id){
        this.#ticket_id = ticket_id;
        return this;
    }

    setAccountId(account_id){
        this.#account_id = account_id;
        return this;
    }

    setClusterId(cluster_id){
        this.#cluster_id = cluster_id;
        return this;
    }

    setFilmId(film_id){
        this.#film_id = film_id;
        return this;
    }

    setFilmType(film_type){
        this.#film_type = film_type;
        return this;
    }

    setShtId(sht_id){
        this.#sht_id = sht_id;
        return this;
    }

    setSeatId(seat_id){
        this.#seat_id = seat_id;
        return this;
    }

    setRoomId(room_id){
        this.#room_id = room_id;
        return this;
    }

    setVoucherId(voucher_id){
        this.#voucher_id = voucher_id;
        return this;
    }

    setTicketPrice(ticket_price){
        this.#ticket_price = ticket_price;
        return this;
    }

    setTicketDate(ticket_date){
        this.#ticket_date = ticket_date;
        return this;
    }

    build(){
        return new Ticket(this.#ticket_id, this.#account_id, this.#cluster_id, this.#film_id, this.#film_type, this.#sht_id, 
            this.#seat_id, this.#room_id, this.#voucher_id, this.#ticket_price, this.#ticket_date);
    }
}

module.exports = new TicketBuilder();