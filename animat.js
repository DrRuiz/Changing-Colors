class Animat{
    constructor(automata, hue, x, y){
        //The hue of the animat (determines food they want).
        this.hue = hue;
        //The automata containing all the plants and locations
        this.automata = automata;
        //The current location of the animat relative to the automata's environment.
        this.x = x;
        this.y = y;
        //The energy of the animat.
        this.energy = 50;
        //The energy required to reproduce.
        this.energyThreshold = 100;
        //The size of each animat
        this.animatSize = 10;
    }

    /** Will move, make this animat eat, reproduce and die depending on its surroundings and probability. */
    update(){
        this.move();
        this.eat();
        this.reproduce();
        if (this.energy < 1 || Math.random() < 0.01){
            this.die();
        }
    }

    /**
     * Moves to the neighboring box that has a plant with the closest hue value, 
     * and nothing happens when there is no plant or not close hue.
     */
    move(){
        const neighbor = this.getNeighbor();
        if(neighbor.length > 0){
            const [newX, newY] = neighbor;
            this.x = newX;
            this.y = newY;
        }
    }

    /**
     * Checks the plants that are surounding the current animat using the automata, and then returns position 
     * of the plant with the color closest to their own and null if there are no surrounding plants.  
     * @returns The x and y coordinated in an array representing the position of the 
     * neighbor that has the closes hue with the current animat and null if there are no surrounding plants.
     */
    getNeighbor(){
        let bestNeighbor = [];
        let closeness = Infinity;
        for(let i = this.x - 1; i <= this.x + 1; i++){
            const tempX = (i + this.automata.width) % this.automata.width;
            for(let j = this.y - 1; j <= this.y + 1; j++){
                const tempY = (j + this.automata.height) % this.automata.height; 
                //check if the chosen point is null and not the current plant
                let plant = this.automata.environment[tempX][tempY];
                if((i != this.x || j != this.y) && plant != null && Math.abs(this.hue - plant.hue) < closeness){
                    bestNeighbor = [tempX , tempY];
                    closeness = Math.abs(this.hue - plant.hue);
                }
            }
        }
        return bestNeighbor;
    }

    /**
     * Will check if the current location has a plant, if it does then it will remove the plant 
     * from the environment and increase the energy of this animat based on the growth rate. If it doesnt have a 
     * plant, then the energy of the animat will be decreased by 5.
     */
    eat(){
        let growthrate = parseInt(document.getElementById("animatgrowthrate").value, 10);

        const plant = this.automata.environment[this.x][this.y];
        //The plant will give the animat energy if their colors are close, but it will drain energy if their colors are far away.
        if(plant != null && Math.abs(this.hue - plant.hue) < 20){
            const difference = Math.abs(this.hue - plant.hue);
            this.automata.environment[this.x][this.y] = null;
            this.energy += this.energyThreshold / growthrate;
        } else{
            this.energy -= 2;
        }
    }

    /**
     * Will check if the animat has enough energy to reproduce, if it has then it 
     * will take energy from the animat, and will create a new animat in a surounding 
     * location with new hue, which will be close to the hue of this animat.
     */
    reproduce(){
        if(this.energy >= this.energyThreshold){
            this.energy -= this.energyThreshold;
            let tempX = this.x - (randomInt(3)) - 1;
            let tempY = this.y - (randomInt(3)) - 1;
            const [newX, newY] = this.automata.getValidPoint(tempX, tempY);
            let newHue = ((this.hue + randomInt(21) - 10) + 360) % 360;
            gameEngine.addEntity(new Animat(this.automata, newHue, newX, newY));
        }
    }

    /** Kills this current animat.*/
    die(){
        this.removeFromWorld = true;
    }

    /**
     * Will draw the animat using the ctx passed as a canvas.
     * @param {*} ctx the tool that will be used to draw animats on.
     */
    draw(ctx){
        const radius = this.animatSize / 2;
        ctx.beginPath();
        ctx.arc((this.x * this.animatSize) + 5, (this.y * this.animatSize) + 5, radius, 0, 2 * Math.PI); 
        ctx.fillStyle = "hsl(" + this.hue + ", 100%, 50%)";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}