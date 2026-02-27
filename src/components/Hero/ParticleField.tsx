import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleField({ mousePos }: { mousePos: React.MutableRefObject<{ x: number, y: number }> }) {
    const points = useRef<THREE.Points>(null);
    const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
    const linesMaterialRef = useRef<THREE.LineBasicMaterial>(null);
    const { viewport } = useThree();

    const particleCount = 1500; // Less particles, more connections
    const maxConnections = 3000;
    const connectionDistance = 3.5;

    const [positions, colors, velocities] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);
        const vel = new Float32Array(particleCount * 3);

        // Gradient from Green (ML) to Purple/Blue (Web)
        const colorChoices = [
            new THREE.Color('#4ade80'), // Neon green
            new THREE.Color('#a855f7'), // Cyberpunk purple
            new THREE.Color('#3b82f6'), // Electric blue
            new THREE.Color('#ffffff'), // White star
        ];

        for (let i = 0; i < particleCount; i++) {
            // Spread evenly across the visible volume
            pos[i * 3] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;

            // Random drift velocity
            vel[i * 3] = (Math.random() - 0.5) * 0.02;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

            const mixedColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
            col[i * 3] = mixedColor.r;
            col[i * 3 + 1] = mixedColor.g;
            col[i * 3 + 2] = mixedColor.b;
        }
        return [pos, col, vel];
    }, []);

    // Pre-allocate arrays for lines
    const linesPositions = useMemo(() => new Float32Array(maxConnections * 6), []);
    const linesColors = useMemo(() => new Float32Array(maxConnections * 6), []);

    useFrame((state) => {
        if (!points.current || !linesGeometryRef.current || !linesMaterialRef.current) return;

        // Convert 2D mouse ([-1, 1]) to 3D world space loosely
        const mouseX = (mousePos.current.x * viewport.width) / 2;
        const mouseY = -(mousePos.current.y * viewport.height) / 2;

        const positionsAttribute = points.current.geometry.attributes.position;
        let vertexpos = 0;
        let colorpos = 0;
        let numConnected = 0;

        // Update particle positions and check for connections
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Add velocity
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];

            // Bounds checking
            if (Math.abs(positions[i3]) > 20) velocities[i3] *= -1;
            if (Math.abs(positions[i3 + 1]) > 20) velocities[i3 + 1] *= -1;
            if (Math.abs(positions[i3 + 2]) > 20) velocities[i3 + 2] *= -1;

            // Interaction with mouse "Gravity Well"
            const dx = mouseX - positions[i3];
            const dy = mouseY - positions[i3 + 1];
            const distToMouse = Math.sqrt(dx * dx + dy * dy);

            // If close to mouse, get pulled slightly
            if (distToMouse < 8) {
                const force = 0.01 * (1 - distToMouse / 8);
                positions[i3] += dx * force;
                positions[i3 + 1] += dy * force;

                // Turn line material to primary color (Green) if on right, (Purple) if on left
                const colorShift = mousePos.current.x > 0 ? new THREE.Color('#4ade80') : new THREE.Color('#a855f7');
                linesMaterialRef.current.color.lerp(colorShift, 0.05);
            }

            // Check for connections with other particles
            for (let j = i + 1; j < particleCount; j++) {
                const j3 = j * 3;
                const pdx = positions[i3] - positions[j3];
                const pdy = positions[i3 + 1] - positions[j3 + 1];
                const pdz = positions[i3 + 2] - positions[j3 + 2];
                const pDistSq = pdx * pdx + pdy * pdy + pdz * pdz;

                // If close enough and we haven't hit line limit
                if (pDistSq < connectionDistance * connectionDistance && numConnected < maxConnections) {
                    // Alpha based on distance
                    const alpha = 1.0 - Math.sqrt(pDistSq) / connectionDistance;

                    linesPositions[vertexpos++] = positions[i3];
                    linesPositions[vertexpos++] = positions[i3 + 1];
                    linesPositions[vertexpos++] = positions[i3 + 2];

                    linesPositions[vertexpos++] = positions[j3];
                    linesPositions[vertexpos++] = positions[j3 + 1];
                    linesPositions[vertexpos++] = positions[j3 + 2];

                    // Use particle colors for the line gradient
                    linesColors[colorpos++] = colors[i3] * alpha;
                    linesColors[colorpos++] = colors[i3 + 1] * alpha;
                    linesColors[colorpos++] = colors[i3 + 2] * alpha;

                    linesColors[colorpos++] = colors[j3] * alpha;
                    linesColors[colorpos++] = colors[j3 + 1] * alpha;
                    linesColors[colorpos++] = colors[j3 + 2] * alpha;

                    numConnected++;
                }
            }

            positionsAttribute.array[i3] = positions[i3];
            positionsAttribute.array[i3 + 1] = positions[i3 + 1];
            positionsAttribute.array[i3 + 2] = positions[i3 + 2];
        }

        positionsAttribute.needsUpdate = true;

        linesGeometryRef.current.setDrawRange(0, numConnected * 2);
        linesGeometryRef.current.attributes.position.needsUpdate = true;
        linesGeometryRef.current.attributes.color.needsUpdate = true;

        // Slow scene rotation
        points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        // We also want to rotate the lines to match the points
        if (points.current.parent) {
            points.current.parent.rotation.y = state.clock.getElapsedTime() * 0.02;
        }

    });

    return (
        <group>
            <points ref={points}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                        count={colors.length / 3}
                        array={colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.1}
                    vertexColors
                    transparent
                    opacity={0.8}
                    sizeAttenuation={true}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Neural Network Synapse Lines */}
            <lineSegments>
                <bufferGeometry ref={linesGeometryRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linesPositions, 3]}
                        count={linesPositions.length / 3}
                        array={linesPositions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[linesColors, 3]}
                        count={linesColors.length / 3}
                        array={linesColors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial ref={linesMaterialRef} vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
            </lineSegments>
        </group>
    );
}
