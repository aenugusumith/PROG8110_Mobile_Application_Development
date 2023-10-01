const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    MENU: Symbol("menu"),
    SIZE: Symbol("size"),
    TOPPINGS: Symbol("toppings"),
    DESSERT: Symbol("dessert"),
    DRINKS: Symbol("drinks"),
});

module.exports = class ShawarmaOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.selectedDish = "";
        this.sSize = "";
        this.sToppings = "";
        this.selectedDessert = "";
        this.sDrinks = "";
        this.sItems = ["Fries", "Biryani"];
    }

    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.MENU;
                aReturn.push("Welcome to Richard's Restaurant.");
                aReturn.push("Please select a dish");
                aReturn.push("1.Fries");
                aReturn.push("2.Biryani");
                break;
            case OrderState.MENU:
                if (sInput === "1" || sInput.toLowerCase() === "Fries") {
                    this.selectedDish = "Fries";
                    this.stateCur = OrderState.SIZE;
                    aReturn.push("Great choice! What size of Fries would you like?");
                    aReturn.push("Small ($6.99), Medium ($8.99), Large ($10.99)");
                } else if (sInput === "2" || sInput.toLowerCase() === "biryani") {
                    this.selectedDish = "Biryani";
                    this.stateCur = OrderState.SIZE;
                    aReturn.push("Great choice! What size of Biryani would you like?");
                    aReturn.push("Small ($10.99), Medium ($12.99), Large ($15.99)");
                } else {
                    aReturn.push("We are not serving this dish at the moment. Please choose a valid dish");
                }
                break;
            case OrderState.SIZE:
                this.sSize = sInput.toLowerCase();
                if (this.sSize === "small" || this.sSize === "medium" || this.sSize === "large") {
                    this.stateCur = OrderState.TOPPINGS;
                    aReturn.push("What toppings would you like?");
                } else {
                    aReturn.push("Invalid input. Please enter a valid size (Small, Medium, or Large):");
                }
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DESSERT;
                this.sToppings = sInput;
                aReturn.push("Would you like to add dessert to your order?");
                break;

            case OrderState.DESSERT:
                this.selectedDessert=sInput;
                this.stateCur = OrderState.DRINKS;
                aReturn.push("Would you like to add drinks to your order?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                this.sDrinks = sInput;
                aReturn.push("Thank you for your order!");
                aReturn.push(`You ordered: \n  Dish: ${this.selectedDish} \n Size: ${this.sSize}  \n Toppings: ${this.sToppings} \n Dessert: ${this.selectedDessert} \n Drink : ${this.sDrinks}`);
                let tPrice = this.calculatePrice();
                aReturn.push(`Total Combo Price: $${tPrice.toFixed(2)}`);
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    };

    calculatePrice() {
        let basePrice = 0;

        switch (this.selectedDish) {
            case "Fries":
                switch (this.sSize.toLowerCase()) {
                    case "small":
                        basePrice = 6.99;
                        break;
                    case "medium":
                        basePrice = 8.99;
                        break;
                    case "large":
                        basePrice = 10.99;
                        break;
                }
                break;

            case "Biryani":
                switch (this.sSize.toLowerCase()) {
                    case "small":
                        basePrice = 10.99;
                        break;
                    case "medium":
                        basePrice = 12.99;
                        break;
                    case "large":
                        basePrice = 15.99;
                        break;
                }
                break;

            default:
                break;
        }
        let totalPrice = basePrice;
        return totalPrice;
    }
};
