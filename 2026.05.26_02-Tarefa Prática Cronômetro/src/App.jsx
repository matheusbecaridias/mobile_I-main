import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // useRef guarda o timestamp de início e o tempo acumulado antes da pausa
  const rafRef = useRef(null);
  const startTsRef = useRef(null);
  const timeAtStartRef = useRef(0);
  // Guarda o tempo no momento em que a volta começou (para calcular o delta)
  const lapStartRef = useRef(0);

  const formatTime = (cs) => {
    const minutes = Math.floor(cs / 6000);
    const seconds = Math.floor((cs % 6000) / 100);
    const centis = cs % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  };

  // Tick via requestAnimationFrame para não travar a UI
  const tick = useCallback((timestamp) => {
    if (startTsRef.current === null) startTsRef.current = timestamp;
    const elapsed = Math.floor((timestamp - startTsRef.current) / 10);
    setTime(timeAtStartRef.current + elapsed);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startTimer = () => {
    if (rafRef.current) return;
    startTsRef.current = null; // será definido no primeiro tick
    setIsRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  };

  const pauseTimer = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    // Salva o tempo atual para retomar de onde parou
    timeAtStartRef.current = time;
    startTsRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    timeAtStartRef.current = 0;
    startTsRef.current = null;
    lapStartRef.current = 0;
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const lapTimer = () => {
    const lapDelta = time - lapStartRef.current; // CORREÇÃO: tempo da volta, não total
    if (lapDelta === 0) return;
    setLaps((prev) => [
      { lap: prev.length + 1, lapTime: lapDelta, total: time },
      ...prev,
    ]);
    lapStartRef.current = time; // reinicia o ponto de referência da volta
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Identifica a volta mais rápida e mais lenta
  const lapTimes = laps.map((l) => l.lapTime);
  const fastest = lapTimes.length > 1 ? Math.min(...lapTimes) : null;
  const slowest = lapTimes.length > 1 ? Math.max(...lapTimes) : null;

  return (
    <div className="container">
      <header className="app-header">
        <span className="app-label">Cronômetro</span>
        <span className={`status-badge ${isRunning ? 'running' : ''}`}>
          <span className="status-dot" />
          {isRunning ? 'rodando' : time > 0 ? 'pausado' : 'parado'}
        </span>
      </header>

      <div className="timer-section">
        <div className="timer-display">{formatTime(time)}</div>
        <div className="lap-preview">
          {(isRunning || time > 0) && laps.length > 0
            ? `volta atual: ${formatTime(time - lapStartRef.current)}`
            : '\u00a0'}
        </div>
      </div>

      <div className="button-row">
        {!isRunning ? (
          <button onClick={startTimer} className="btn primary-btn">
            {time === 0 ? '▶ Iniciar' : '▶ Continuar'}
          </button>
        ) : (
          <button onClick={pauseTimer} className="btn danger-btn">
            ⏸ Pausar
          </button>
        )}

        <button onClick={lapTimer} className="btn lap-btn" disabled={time === 0 || !isRunning}>
          ⚑ Volta
        </button>

        <button onClick={resetTimer} className="btn reset-btn" disabled={time === 0 && laps.length === 0}>
          ↺ Reset
        </button>
      </div>

      <div className="laps-section">
        <div className="laps-header">
          <span className="laps-title">Voltas</span>
          <span className="laps-count">{laps.length} registrada{laps.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="laps-list">
          {laps.length === 0 ? (
            <div className="laps-empty">Nenhuma volta registrada</div>
          ) : (
            laps.map((item) => {
              const isFastest = item.lapTime === fastest;
              const isSlowest = item.lapTime === slowest;
              return (
                <div key={item.lap} className="lap-row">
                  <span className="lap-num">V{item.lap}</span>
                  <div className="lap-bar-wrap">
                    <div
                      className="lap-bar"
                      style={{ width: `${Math.round((item.lapTime / Math.max(...lapTimes)) * 100)}%` }}
                    />
                  </div>
                  <span className={`lap-time ${isFastest ? 'fastest' : ''} ${isSlowest ? 'slowest' : ''}`}>
                    {formatTime(item.lapTime)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
