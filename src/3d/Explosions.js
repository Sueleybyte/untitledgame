import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import useStore, { audio, playAudio } from '../store'

function make(color, speed) {
  return {
    ref: React.createRef(),
    color,
    data: new Array(20)
      .fill()
      .map(() => [new THREE.Vector3(), new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2).normalize().multiplyScalar(speed * 0.75)])
  }
}

export default function Explosions() {
  const explosions = useStore(state => state.explosions)
  return explosions.map(({ guid, position, scale }) => <Explosion key={guid} position={position} scale={scale * 0.75} />)
}

function Explosion({ position, scale }) {
  const group = useRef()
  const { dummy } = useStore(state => state.mutation)
  const particles = useMemo(() => [make('white', 0.8), make('orange', 0.6)], [])

  useEffect(() => void playAudio(new Audio(audio.mp3.explosion), 0.5), [])

  useFrame(() => {
    particles.forEach(({ data }, type) => {
      const mesh = group.current.children[type]
      data.forEach(([vec, normal], i) => {
        vec.add(normal)
        dummy.position.copy(vec)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })
      mesh.material.opacity -= 0.025
      mesh.instanceMatrix.needsUpdate = true
    })
  })

  return (
    <group position={position} ref={group} scale={[scale, scale, scale]}>
      {particles.map(({ color, data }, index) => (
        <instancedMesh args={[null, null, data.length]} frustumCulled={false} key={index}>
          <dodecahedronBufferGeometry args={[10, 0]} attach="geometry" />
          <meshBasicMaterial attach="material" color={color} fog={false} opacity={1} transparent />
        </instancedMesh>
      ))}
    </group>
  )
}
