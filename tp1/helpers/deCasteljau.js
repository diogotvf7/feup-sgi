import * as THREE from 'three'

/**
 * @class BezierCurve
 * @extends THREE.Curve
 * @description This class overrites the getPoint method of the THREE.Curve class. It calculates the point of the curve at a given t value using the De Casteljau algorithm.
 */
class BezierCurve extends THREE.Curve {
    constructor(points) {
        super()
        this.points = points
    }

    deCasteljau(t, points) {
        while (points.length > 1) {
            const next = []
            for (let i = 0; i < points.length - 1; i++) {
                const p0 = points[i]
                const p1 = points[i + 1]
                next.push(new THREE.Vector3().lerpVectors(p0, p1, t))
            }
            points = next
        }
        return points[0]
    } 

    getPoint(t) {
        return this.deCasteljau(t, this.points)
    }
}

export { BezierCurve }