import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";

export default function ParticleBackground() {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      node.dataset.status = "fallback";
      return;
    }
    node.appendChild(renderer.domElement);
    node.dataset.status = "ready";
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      innerWidth / innerHeight,
      0.1,
      300,
    );
    camera.position.z = 75;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    // Screen-composite a black buffer over the exact CSS background color.
    renderer.setClearColor(0x000000, 1);
    const count = 15000,
      positions = new Float32Array(count * 3),
      home = new Float32Array(count * 3),
      colors = new Float32Array(count * 3);
    const base = new THREE.Color(0x001f3f),
      accent = new THREE.Color("#CCFF00");
    for (let i = 0; i < count; i++) {
      const j = i * 3;
      positions[j] = (Math.random() - 0.5) * 220;
      positions[j + 1] = (Math.random() - 0.5) * 140;
      positions[j + 2] = Math.random() * 160 - 140;
      colors[j] = base.r;
      colors[j + 1] = base.g;
      colors[j + 2] = base.b;
    }
    home.set(positions);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage),
    );
    const material = new THREE.PointsMaterial({
      size: 0.5,
      opacity: 0.2,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(geometry, material));
    const lineData = new Float32Array(530 * 6);
    for (let i = 0; i < 530; i++) {
      const j = i * 6;
      lineData[j] = (Math.random() - 0.5) * 200;
      lineData[j + 1] = (Math.random() - 0.5) * 130;
      lineData[j + 2] = -130 + Math.random() * 190;
      lineData[j + 3] = lineData[j];
      lineData[j + 4] = lineData[j + 1];
      lineData[j + 5] = lineData[j + 2] + 2 + Math.random() * 8;
    }
    const lineGeometry = new LineSegmentsGeometry();
    lineGeometry.setPositions(lineData);
    const lineMaterial = new LineMaterial({
      color: 0x88aaff,
      linewidth: 0.005,
      worldUnits: true,
      opacity: 0.2,
      transparent: true,
      dashed: true,
      dashSize: 1,
      gapSize: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new LineSegments2(lineGeometry, lineMaterial);
    lines.computeLineDistances();
    lines.frustumCulled = false;
    scene.add(lines);
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(innerWidth, innerHeight),
      0.8,
      0.1,
      1,
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    const ray = new THREE.Raycaster(),
      pointer = new THREE.Vector2(),
      intersection = new THREE.Vector3(),
      plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let pointerActive = false;
    const move = (event: PointerEvent) => {
      if (reduced || event.pointerType !== "mouse") return;
      const bounds = node.getBoundingClientRect();
      pointerActive =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
      pointer.set(
        (event.clientX / innerWidth) * 2 - 1,
        1 - (event.clientY / innerHeight) * 2,
      );
      ray.setFromCamera(pointer, camera);
      ray.ray.intersectPlane(plane, intersection);
    };
    const leave = () => {
      pointerActive = false;
    };
    let frame = 0,
      last = performance.now(),
      visible = true,
      disposed = false;
    const render = (now: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const step = Math.min((now - last) / 16.667, 2);
      last = now;
      if (!reduced) {
        for (let i = 0; i < count; i++) {
          const j = i * 3,
            dx = positions[j] - intersection.x,
            dy = positions[j + 1] - intersection.y,
            dz = positions[j + 2] - intersection.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz),
            force = pointerActive ? Math.max(0, 1 - distance / 20) : 0;
          for (let axis = 0; axis < 3; axis++) {
            positions[j + axis] +=
              (home[j + axis] - positions[j + axis]) * 0.025 * step;
          }
          if (force) {
            positions[j] += dx * force * 0.04 * step;
            positions[j + 1] += dy * force * 0.04 * step;
            positions[j + 2] += dz * force * 0.04 * step;
          }
          const mix = force * 0.4;
          colors[j] += (base.r + (accent.r - base.r) * mix - colors[j]) * 0.12;
          colors[j + 1] +=
            (base.g + (accent.g - base.g) * mix - colors[j + 1]) * 0.12;
          colors[j + 2] +=
            (base.b + (accent.b - base.b) * mix - colors[j + 2]) * 0.12;
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
        const buffer = (
          lineGeometry.getAttribute(
            "instanceStart",
          ) as THREE.InterleavedBufferAttribute
        ).data;
        for (let i = 0; i < 530; i++) {
          const j = i * 6;
          buffer.array[j + 2] += 0.12 * step;
          buffer.array[j + 5] += 0.12 * step;
          if (buffer.array[j + 2] > 70) {
            buffer.array[j + 2] -= 200;
            buffer.array[j + 5] -= 200;
          }
        }
        buffer.needsUpdate = true;
      }
      composer.render();
      if (!reduced) frame = requestAnimationFrame(render);
    };
    const start = () => {
      if (!frame && !disposed && visible && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      }
    };
    const resize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      composer.setSize(innerWidth, innerHeight);
      lineMaterial.resolution.set(innerWidth, innerHeight);
      start();
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else start();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0 },
    );
    observer.observe(node);
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      document.removeEventListener("visibilitychange", visibility);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      bloom.dispose();
      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [reduced]);
  return <div ref={host} className="particle-background" aria-hidden="true" />;
}
