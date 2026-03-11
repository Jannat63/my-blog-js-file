"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const c = canvas;
    const context = ctx;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      depth: number;

      constructor() {
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.depth = Math.random() * 0.6 + 0.4;
      }

      move() {
        this.x += this.vx * this.depth;
        this.y += this.vy * this.depth;

        if (this.x < 0 || this.x > c.width) this.vx *= -1;
        if (this.y < 0 || this.y > c.height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 160 * 160) {
          this.x -= dx * 0.002 * this.depth;
          this.y -= dy * 0.002 * this.depth;
        }
      }

      draw() {
        const glow = context.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          12
        );

        glow.addColorStop(0, "rgba(168,85,247,1)");
        glow.addColorStop(1, "rgba(168,85,247,0)");

        context.beginPath();
        context.arc(this.x, this.y, 2.4 * this.depth, 0, Math.PI * 2);
        context.fillStyle = glow;
        context.fill();
      }
    }

    const particles: Particle[] = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    function connect() {
      const maxConnections = 10;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < Math.min(a + maxConnections, particles.length); b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 150 * 150) {
            const gradient = context.createLinearGradient(
              particles[a].x,
              particles[a].y,
              particles[b].x,
              particles[b].y
            );

            gradient.addColorStop(0, "rgba(168,85,247,0.4)");
            gradient.addColorStop(1, "rgba(59,130,246,0.4)");

            context.strokeStyle = gradient;
            context.lineWidth = 1;

            context.beginPath();
            context.moveTo(particles[a].x, particles[a].y);
            context.lineTo(particles[b].x, particles[b].y);
            context.stroke();
          }
        }
      }
    }

    function animate() {
      context.clearRect(0, 0, c.width, c.height);

      particles.forEach((p) => {
        p.move();
        p.draw();
      });

      connect();

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

export default function LoginPage() {
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: secret,
        token: token,
      }),
    });

    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("Invalid password or authenticator code");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">

      <ParticleBackground />

      <div className="relative z-10 w-full max-w-5xl bg-white/85 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        <div className="relative hidden md:block">

          <img
            src="/login.jpg"
            alt="Login"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute bottom-10 left-8 text-white max-w-xs">

            <p className="text-lg font-semibold">
              “Simply all the tools that I need.”
            </p>

            <p className="text-sm text-gray-200 mt-2">
              Admin Dashboard
            </p>

          </div>

        </div>

        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-sm">

            <h1 className="text-2xl font-bold text-center">
              Admin Login
            </h1>

            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              Access the blog dashboard
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >

              <input
                type="password"
                placeholder="Enter Admin Password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:outline-none focus:border-black transition"
              />

              <input
                type="text"
                placeholder="Authenticator Code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:outline-none focus:border-black transition"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition font-medium disabled:opacity-70 flex items-center justify-center gap-2"
              >

                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}

                {loading ? "Logging in..." : "Login"}

              </button>

            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Ahsan's Blog Admin Panel
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}