const canvas = document.getElementById('canvas')

canvas.width = 1280
canvas.height = 720

const ctx = canvas.getContext('2d')

ctx.fillStyle = 'rgb(100, 150, 200)'
ctx.fillRect(0, 0, canvas.width, canvas.height)

class Unit{
    constructor() {
        genes = {
            r: 0,
            g: 0,
            b: 0
        },
        fitness = 0
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
        background = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    }

    update() {
        
    }

}

class Population {

}

class Simulation {
    constructor() {

    }

    draw(env, population) {

    }
}