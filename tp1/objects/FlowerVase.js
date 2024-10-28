import * as THREE from 'three'
import {Vase} from './Vase.js'
import {Flower} from './Flower.js'

class FlowerVase {
    constructor(app, vasePosition, flowerPositions) {
        this.app = app
        this.vasePosition = vasePosition
        this.flowerPositions = flowerPositions
        this.vase = null
        this.flowers = []

        this.init()
    }

    init() {
        this.vase = new Vase(this.app, this.vasePosition, true)
        this.flowerPositions.forEach(position => {
            const flower = new Flower(this.app, position, 0.5)
            this.flowers.push(flower)
        })
    }

    draw() {
        this.app.scene.add(this.vase)
        this.flowers.forEach(flower => {
            this.app.scene.add(flower)
        })
    }
}

export { FlowerVase }