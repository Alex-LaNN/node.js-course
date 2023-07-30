
let countId = 0;
class Product {
    constructor(name,
        description,
        price,
        brand,
        activeSize,
        quantity) {
        this.ID = ++countId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.sizes = ["XS", "S", "M", "L", "XL", "XXL"];
        this.activeSize = activeSize;
        this.quantity = quantity;
        this.date = new Date();
        this.reviews = [];
        this.images = [];


    }
}