"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FabricBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x1b0b2f, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const getSize = () => {
      const width = window.innerWidth;
      const height = Math.max(
        window.innerHeight,
        document.documentElement.scrollHeight
      );
      return { width, height };
    };
    const initialSize = getSize();
    renderer.setSize(initialSize.width, initialSize.height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.PlaneGeometry(2, 2, 100, 100);

    const texture = new THREE.TextureLoader().load("/PurpleSaree.jpeg");
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const uniforms = {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#2a0b45") },
      uColorB: { value: new THREE.Color("#b957ff") },
      uLightDir: { value: new THREE.Vector3(0.25, 0.7, 1).normalize() },
      uTexture: { value: texture },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vFall;

        vec3 permute(vec3 x) {
          return mod(((x * 34.0) + 1.0) * x, 289.0);
        }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                              -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);

          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;

          i = mod(i, 289.0);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                        + i.x + vec3(0.0, i1.x, 1.0));

          vec3 m = max(0.5 - vec3(dot(x0, x0),
                                  dot(x12.xy, x12.xy),
                                  dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;

          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;

          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.y = a0.y * x12.x + h.y * x12.y;
          g.z = a0.z * x12.z + h.z * x12.w;
          return 130.0 * dot(m, g);
        }

        void main() {
          vUv = uv;
          vNormal = normal;

          float flow = uTime * 0.22;
          vec2 flowUv = vec2(uv.x * 2.2, uv.y * 3.2 - flow);
          float wave = snoise(flowUv);
          float wave2 = snoise(flowUv * 2.0 + vec2(0.0, -flow * 0.7));
          float displacement = (wave * 0.09) + (wave2 * 0.04);

          float centerMask = 1.0 - abs(uv.x - 0.5) * 2.0;
          centerMask = clamp(centerMask, 0.0, 1.0);

          float edgeMask = smoothstep(0.0, 0.18, uv.x) *
                           smoothstep(0.0, 0.18, 1.0 - uv.x);
          float edgeFlutter = (1.0 - edgeMask) * 0.06;

          float sway = sin((uv.y * 3.5 + uTime * 0.6) * 6.2831) * 0.018;
          float flutter = snoise(vec2(uv.y * 3.0, uTime * 0.7)) * edgeFlutter;
          float verticalWobble = snoise(vec2(uv.x * 2.0, uTime * 0.45)) * 0.02;

          float fallRange = 3.2;
          float fallOffset = mod(uTime * 0.12, fallRange);
          vFall = clamp(fallOffset / fallRange, 0.0, 1.0);

          vec3 newPosition = position + normal * displacement;
          newPosition.x += (sway * centerMask) + (flutter * 0.6);
          newPosition.y += verticalWobble;
          newPosition.y -= fallOffset;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uLightDir;
        uniform sampler2D uTexture;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vFall;

        void main() {
          vec2 texUv = vUv;
          vec3 texColor = texture2D(uTexture, texUv).rgb;
          vec3 base = mix(uColorA, uColorB, vUv.y);
          base = mix(base, texColor, 0.55);
          float light = dot(normalize(vNormal), normalize(uLightDir));
          light = clamp(light, 0.0, 1.0);
          float sheen = pow(light, 2.5) * 0.25;
          vec3 color = base + light * 0.18 + vec3(sheen, sheen * 0.8, sheen * 1.1);
          float fadeOut = smoothstep(1.0, 0.85, vFall);
          gl_FragColor = vec4(color, fadeOut);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    const updateScale = (width: number, height: number) => {
      const aspect = width / height;
      const widthFactor = 1.1;
      const heightFactor = 0.22;
      if (aspect >= 1) {
        mesh.scale.set(aspect * widthFactor, heightFactor, 1);
      } else {
        mesh.scale.set(widthFactor, (heightFactor / aspect), 1);
      }
      mesh.position.y = 0.78;
    };
    updateScale(initialSize.width, initialSize.height);
    scene.add(mesh);

    const animate = () => {
      uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
      frameRef.current = window.requestAnimationFrame(animate);
    };
    frameRef.current = window.requestAnimationFrame(animate);

    const handleResize = () => {
      const nextSize = getSize();
      renderer.setSize(nextSize.width, nextSize.height);
      updateScale(nextSize.width, nextSize.height);
    };
    window.addEventListener("resize", handleResize);

    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            const nextSize = getSize();
            renderer.setSize(nextSize.width, nextSize.height);
            updateScale(nextSize.width, nextSize.height);
          })
        : null;
    if (resizeObserver) {
      resizeObserver.observe(document.body);
    }

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      texture.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fabric-bg-canvas" />;
}
