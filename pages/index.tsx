import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

export default function Home() {
  return (
    <main>
      <Canvas style={{ height: "100vh", width: "100vw", background: "#333" }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, -10, 5]} intensity={1.5} castShadow />
        {/* <CustomTorus position={[0, 0, -10]} color="red" /> */}
        <CustomTorusKnot
          sizes={[10, 2, 30]}
          position={[0, 0, -30]}
          color="blue"
        />
        <OrbitControls />
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
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      // Add rotation to the mesh itself
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.3;
      // Optional: add some gentle floating motion
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <>
      <mesh ref={ref} position={position}>
        <torusKnotGeometry args={sizes} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};
