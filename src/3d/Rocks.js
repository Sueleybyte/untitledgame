import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame, useLoader } from 'react-three-fiber'
import React, { useRef } from 'react'
import useStore from '../store'

export default function Rocks() {
  const gltf = useLoader(GLTFLoader, '/rock.gltf')
  const rocks = useStore(state => state.rocks)
  return rocks.map(data => <Rock data={data} gltf={gltf} key={data.guid} />)
}

const Rock = React.memo(({ gltf, data }) => {
  const ref = useRef()
  const { clock } = useStore(state => state.mutation)
  useFrame(() => {
    const r = Math.cos((clock.getElapsedTime() / 2) * data.speed) * Math.PI
    ref.current.rotation.set(r, r, r)
  })
  return (
    <group position={data.offset} ref={ref} scale={[data.scale, data.scale, data.scale]}>
      <object3D
        position={[-0.016298329457640648, -0.012838120572268963, 0.24073271453380585]}
        rotation={[3.0093872578726644, 0.27444228385461117, -0.22745113653772078]}
        scale={[20, 20, 20]}
      >
        <mesh>
          <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
          <meshStandardMaterial attach="material" {...gltf.__$[7].material} color="white" emissive="black" metalness={1} roughness={1} />
        </mesh>
      </object3D>
    </group>
  )
})
