import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  Text,
  TrackballControls,
  TransformControls,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";

export function Scene() {
  const directionalLightRef = useRef<DirectionalLight>(null);
  useHelper(directionalLightRef, DirectionalLightHelper);
  const { lightColor } = useControls({
    lightColor: "white",
  });
  return (
    <>
      <OrbitControls makeDefault />

      <ambientLight intensity={0.3} />
      <directionalLight
        ref={directionalLightRef}
        position={[0, -10, 5]}
        intensity={1.5}
        color={lightColor}
        castShadow
      />
      {/* <CustomTorus position={[0, 0, -10]} color="red" /> */}
      {/* <TransformControls object={torusRef} /> */}
      {/* <CustomTorusKnot position={[0, 0, -10]} color="red" /> */}
      <CustomTorusKnot sizes={[2, 1, 10]} position={[0, 0, 0]} color="white" />
      {/* <TrackballControls /> */}
      {/* <Text characters="abcdefghijklmnopqrstuvwxyz0123456789!">
          hello world!
        </Text> */}
    </>
  );
}
export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Canvas
        className="w"
        style={{ height: "100%", width: "100%", background: "#333" }}
      >
        <Scene />
      </Canvas>
    </main>
  );
}

const CustomBox = ({
  position,
  sizes = [1, 1, 2],
  color = "red",
}: {
  position: [number, number, number];
  sizes?: [number, number, number];
  color?: string;
}) => {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta * 2;
      ref.current.position.z = Math.cos(state.clock.elapsedTime) * 3;
      console.log(state.clock.elapsedTime, "time");
    }
  });

  return (
    <>
      <mesh ref={ref} position={position}>
        <boxGeometry args={sizes} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

const CustomSphere = ({
  position,
  sizes = [2, 30, 2],
  color = "red",
}: {
  position: [number, number, number];
  sizes?: [number, number, number];
  color?: string;
}) => {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
      // ref.current.position.z = Math.cos(state.clock.elapsedTime) * 3;
      // console.log(state.clock.elapsedTime, "time");
    }
  });

  return (
    <>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={sizes} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

const CustomTorus = ({
  position,
  sizes = [10, 4, 30],
  color = "red",
}: {
  position: [number, number, number];
  sizes?: [number, number, number];
  color?: string;
}) => {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta;
      ref.current.rotation.y += delta;
      // ref.current.position.z = Math.cos(state.clock.elapsedTime) * 3;
      // console.log(state.clock.elapsedTime, "time");
    }
  });

  return (
    <>
      <mesh ref={ref} position={position}>
        <torusGeometry args={sizes} />
        <meshStandardMaterial wireframe={true} color={color} />
      </mesh>
    </>
  );
};

const CustomTorusKnot = ({
  position,
  sizes = [10, 4, 30],
  color = "red",
}: {
  position: [number, number, number];
  sizes?: [number, number, number];
  color?: string;
}) => {
  const ref = useRef(null);
  useFrame((state, delta) => {
    if (ref.current) {
      // Add rotation to the mesh itself
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.3;
      // Optional: add some gentle floating motion
      // ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });
  const { knotColor, knotRadius } = useControls({
    knotColor: "lightblue",
    knotRadius: {
      value: 10,
      min: 0,
      max: 100,
      step: 1,
    },
  });

  return (
    <>
      {ref.current && <TransformControls object={ref.current} mode="rotate" />}
      <mesh ref={ref} position={position}>
        <torusKnotGeometry args={sizes} />
        <meshStandardMaterial color={knotColor} />
        {/* <MeshWobbleMaterial factor={5} color={knotColor} /> */}
        {/* <MeshDistortMaterial factor={5} color={knotColor} /> */}
      </mesh>
    </>
  );
};
