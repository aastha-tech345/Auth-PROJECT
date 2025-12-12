import React, { useState, useEffect } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <h1 className="display-4">{time.toLocaleTimeString()}</h1>
      <p className="text-muted">{time.toLocaleDateString()}</p>
    </div>
  );
}
