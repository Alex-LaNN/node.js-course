
let countId = 0;
class Product {
    constructor(ID, name,
        description,
        price,
        brand,
        sizes,
        activeSize,
        quantity) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.brand = brand;
        this.sizes = sizes;
        this.activeSize = activeSize;
        this.quantity = quantity;
        this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
        this.reviews = [];
        this.images = [];

        this.getDate = function() {
            return new Date();
        }
        this.setDate = function() {
            return this.date.setDate// + " " + this.date.setTime;
        }
        this.getID = function() {
            return this.ID;
        }
        this.setID = function(newID) {
            this.ID = newID;
        }
        this.getName = function() {
            return this.name;
        }
        this.setName = function(newName) {
            this.name = newName;
        }
        
    }

    info() {
        console.log(
            "ID: " + 
            this.ID + 
          ", name: " +
            this.name +
            ", description: " +
            this.description +
            ", price: " +
            this.price +
            ", brand: " +
            this.brand +
            ", date: " +
            this.date
        );
    }
}


let auto1 = new Product (1, 'Opel', 'machine', 10000, 'GM');
let auto2 = new Product(2, 'Ford', 'machine', 8000, 'Ford');
let auto3 = new Product(3, 'Mersedes', 'machine', '12000', 'Mersedes')
let auto4 = new Product();

auto1.info();
auto2.info();
auto3.info();
auto4.info();

