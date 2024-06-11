
class PaymentMethodStrategy{
    #strategy;
    constructor(strategy){
        this.#strategy = strategy;
    }

    setStrategy(strategy){
        this.#strategy = strategy;
    }

    pay(req, requestJson){
        return this.#strategy.pay(req, requestJson);
    }
}

module.exports = PaymentMethodStrategy;