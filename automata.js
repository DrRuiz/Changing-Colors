class Automata{
    constructor(){
        //Environment dimentions
        this.width = 70;
        this.height = 70;

        //The Environment that contains the plants
        this.environment = null;
        this.newEnvironment();
    }

    /** Creates an empty 2d array that will replace this environment. */
    newEnvironment(){
        this.environment = new Array(this.width);
        for(let i = 0; i < this.width; i++){
            this.environment[i] = new Array(this.height); 
        }
    }

    /** 
     * This creates a new plant in a random spot inside of the environment, 
     * gives it a random hue, and stores it in this environment.
     */
    addNewPlant(){
        let x = randomInt(this.width);
        let y = randomInt(this.height);
        const hue = randomInt(361);
        this.environment[x][y] = new Plant(hue);
    }

    /**
     * This checks every plant in the environment 2d array holding the plants, 
     * checking their maturity, and updating their maturity or reproducing them on the surounding locations. 
     * Lastly checking if they should die or not.
     */
    update(){
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                let plant = this.environment[i][j];
                if(plant != null){
                    if (plant.maturity < 100){
                        this.environment[i][j].update();
                    }
                    if(plant.maturity >= 100){
                        let x = (i + randomInt(3) - 1);
                        let y = (j + randomInt(3) - 1);
                        const [validX, validY] = this.getValidPoint(x, y);
                        if(this.environment[validX][validY] == null){
                            let newHue = ((plant.hue + randomInt(21) - 10) + 360) % 360;
                            this.environment[validX][validY] = new Plant(newHue);
                            this.environment[i][j].maturity -= 100;
                        }
                    } 
                    if (Math.random() <= 0.01){
                        this.environment[i][j] = null;
                    }  
                }
            }
        }
    }

    /**
     * Checks if the given x and y coordinates are within bounds of the environment 2d array and wrapts 
     * them around the environment 2d array. Meaning if any of the coordinates is lower than 0 it will 
     * be added the width of the array to turn it into a positive value. If the coordinate is bigger 
     * than the width of the array it will be modded. 
     * @param {*} x the coordinate that we will check if it is within the width of the environment array.
     * @param {*} y the coordinate that we will check if it is within the height of the environement array.
     * @returns valid x and y coordinates that are within the environemtn 2d array. 
     */
    getValidPoint(x, y){
        let tempX = x;
        let tempY = y;
        if(tempX < 0){
            tempX += this.width;
        } else if(tempX >= this.width){
            tempX %= this.width;
        } 
        if (tempY < 0){
            tempY += this.height;
        } else if (tempY >= this.height){
            tempY %= this.height;
        }
        return [tempX, tempY];
    }

    /**
     * Draws plants in the passed context using the environment 2d array.
     * @param {*} ctx the context that will be used as canvas to draw the plants on.
     */
    draw(ctx){
        let squareSize = 10;
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                if(this.environment[i][j] != null){
                    ctx.fillStyle = "hsl(" + this.environment[i][j].hue + ", " + this.environment[i][j].maturity+ "%, 50%)";
                    ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);    
                    ctx.fillStyle = "black";
                    ctx.strokeRect(i * squareSize, j * squareSize, squareSize, squareSize);
                } 
            }
        }
    }
}