"use client";
import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function AnimatedBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
    // you can add custom shapes or plugins here
  }, []);

  return (
    <div className="animated-bg">
      {/* your gradient & orb styles */}
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 50, density: { enable: true, area: 900 } },
            color: { value: ["#00f0ff", "#8b5cff"] },
            links: { enable: true, distance: 130, color: "#8b5cff", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 0.8, outModes: "bounce" },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.5 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 120, duration: 0.4 } },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
