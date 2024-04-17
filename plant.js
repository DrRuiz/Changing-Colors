class Plant{
    constructor(hue){
        //Using values from 0 to 100 to represent the opacity (maturity).
        this.maturity = 20;
        //Using values between 0 and 360 to represent the color (gene).
        this.hue = hue;
    }

    /**
     * Updates the maturity of the plant based on the growthrate of the plant.
     */
    update(){
        let growthrate = parseInt(document.getElementById("plantgrowthrate").value, 10);
        this.maturity += 100 / growthrate;
    }
}