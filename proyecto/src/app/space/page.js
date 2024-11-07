"use client";

import SpaceInvadersGame from "./space";

export default function SpacePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <h1 className="text-2xl mb-4">Space Invaders</h1>
      <SpaceInvadersGame />
    </div>
  );
}
