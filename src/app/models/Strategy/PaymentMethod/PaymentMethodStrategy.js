
class PaymentMethodStrategy{
    #strategy;
    constructor(strategy){
        this.#strategy = strategy;
    }

    setStrategy(strategy){
        this.#strategy = strategy;
    }

    pay(req, res){
        return this.#strategy.pay(req, res);
    }
}

module.exports = PaymentMethodStrategy;