import * as THREE from 'three'

const ShipControls = function(object, mutation) {
  this.object = object
  const scope = this
  this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }

  this.domElement = document

  this.mutation = mutation

  this.update = function() {
    //this.object.translateZ(-0.5)
    this.object.position.copy(new THREE.Vector3(0, 0, 100))

    euler.setFromQuaternion(scope.object.quaternion)

    // if (Math.abs(scope.mutation.mouseRelative.x) > 0.25) {
    //   euler.y -= Math.pow(scope.mutation.mouseRelative.x, -2) * 0.01;
    // }
    // if (Math.abs(scope.mutation.mouseRelative.y) > 0.25) {
    //   euler.x -= scope.mutation.mouseRelative.y * 0.04;
    // }

    euler.y += map(scope.mutation.mouseRelative.x, -0.5, 0.5, 0.03, -0.03)
    euler.x += map(scope.mutation.mouseRelative.y, -0.5, 0.5, 0.03, -0.03)

    euler.x = Math.max(-PI_2, Math.min(PI_2, euler.x))

    //scope.object.quaternion.setFromEuler(euler)
  }

  const euler = new THREE.Euler(0, 0, 0, 'YXZ')

  const PI_2 = Math.PI / 2

  function map(x, inMin, inMax, outMin, outMax) {
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }
}

ShipControls.prototype = Object.create(THREE.EventDispatcher.prototype)
ShipControls.prototype.constructor = ShipControls

Object.defineProperties(ShipControls.prototype, {})
export { ShipControls }
