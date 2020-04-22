const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        products.push(this);      // 'this' represents the object created by above constructor function.
    }

    static fetchAll() {         // static method allows to call the function on class itself instead of instantiated object.
        return products;
    }
}