const canvas = document.getElementById('canvas')

canvas.width = 1280
canvas.height = 720

const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgb(100, 150, 200)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

class Unit{
    constructor(env, genes, position) {
        this.genes = genes
        this.position = position
        this.fitness = 0
        this.env = env
    }

    calculateFitness(env) {
        const dr = this.genes.r - env.bg.r
        const dg = this.genes.g - env.bg.g
        const db = this.genes.b - env.bg.b

        this.fitness = Math.max(0, 1 - Math.sqrt(dr*dr + dg*dg + db*db) / 441) // ~441 is max distance between two RGB pixels
    }
}

class Enviroment {
    constructor() {
        this.background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    }

    update() {

        this.background.addColorStop(0, "green");
        this.background.addColorStop(0.5, "red");
        this.background.addColorStop(1, "blue");
        ctx.fillStyle = this.background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

}

class Population {
    constructor(env) {
        this.size = 100
        this.generation = 1
        this.units = []
        this.env = env
    }

    initUnits(){
        for(let i = 0; i < this.size; i++){
            this.units[i] = new Unit(this.env, 
            {r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256)}, 
            {x: Math.floor(Math.random() * canvas.width), y: Math.floor(Math.random() * canvas.height)})
        }
    }

}

class Simulation {
    constructor(env, population, ctx) {
        this.env = env
        this.population = population
        this.ctx = ctx
    }

    draw() {
        // env.update()

        this.population.units.forEach((unit, index) => {
            
            this.ctx.beginPath()
            this.ctx.arc(60 + (index * 100), 100, 50, 0, Math.Pi * 2)
            this.ctx.fillStyle = `rgb(${unit.genes.r}, ${unit.genes.g}, ${unit.genes.b})`
            this.ctx.fill()
            // ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            // ctx.stroke()
            console.log(ctx.fillStyle)
            this.ctx.closePath()
        })
    }
}


const env = new Enviroment()

const population = new Population(env)

population.initUnits()

const sim = new Simulation(env, population, ctx)

sim.draw()

