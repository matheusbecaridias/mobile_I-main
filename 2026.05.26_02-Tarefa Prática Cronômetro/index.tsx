// index.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<{ lap: number; time: number }[]>([]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (centiseconds: number): string => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (intervalRef.current) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 10);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    pauseTimer();
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (time === 0) return;
    setLaps((prev) => [...prev, { lap: prev.length + 1, time }]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={styles.phoneContainer}>
      {/* Simulação da Tela do Celular com borda de 6px */}
      <View style={styles.phoneFrame}>
        {/* Notch */}
        <View style={styles.notch}>
          <View style={styles.notchInner} />
        </View>

        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>09:41</Text>
          <Text style={styles.statusIcons}>100% 🔋</Text>
        </View>

        {/* Conteúdo do App */}
        <View style={styles.appContainer}>
          <Text style={styles.title}>Cronômetro</Text>

          {/* Display Principal */}
          <View style={styles.display}>
            <Text style={styles.time}>{formatTime(time)}</Text>
          </View>

          {/* Botões */}
          <View style={styles.buttonsContainer}>
            {!isRunning ? (
              <TouchableOpacity
                style={[styles.button, styles.startButton]}
                onPress={startTimer}
              >
                <Text style={styles.buttonText}>
                  {time === 0 ? 'INICIAR' : 'CONTINUAR'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.pauseButton]}
                onPress={pauseTimer}
              >
                <Text style={styles.buttonText}>PAUSAR</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.lapButton]}
              onPress={addLap}
              disabled={!isRunning}
            >
              <Text style={[styles.buttonText, !isRunning && styles.disabledText]}>
                VOLTA
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetTimer}
            >
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Voltas */}
          <View style={styles.lapsHeader}>
            <Text style={styles.lapsTitle}>Voltas</Text>
            <Text style={styles.lapsCount}>{laps.length} registradas</Text>
          </View>

          <ScrollView style={styles.lapsContainer} showsVerticalScrollIndicator={false}>
            {laps.length === 0 ? (
              <Text style={styles.noLaps}>Nenhuma volta registrada ainda.</Text>
            ) : (
              laps.map((item, index) => (
                <View key={index} style={styles.lapRow}>
                  <Text style={styles.lapNumber}>Volta {item.lap}</Text>
                  <Text style={styles.lapTime}>{formatTime(item.time)}</Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* Home Indicator */}
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  phoneContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneFrame: {
    width: 375,           // Largura padrão iPhone
    height: 780,
    backgroundColor: '#000',
    borderRadius: 58,
    borderWidth: 6,       // ← Borda de 6px conforme solicitado
    borderColor: '#222222',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 25,
  },
  notch: {
    height: 28,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notchInner: {
    width: 120,
    height: 24,
    backgroundColor: '#111',
    borderRadius: 20,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  statusTime: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  statusIcons: {
    color: 'white',
    fontSize: 14,
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    paddingTop: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 25,
  },
  display: {
    backgroundColor: '#1e2937',
    width: 255,
    height: 125,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    borderWidth: 4,
    borderColor: '#334155',
  },
  time: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'monospace',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 92,
    alignItems: 'center',
  },
  startButton: { backgroundColor: '#22c55e' },
  pauseButton: { backgroundColor: '#ef4444' },
  lapButton: { backgroundColor: '#3b82f6' },
  resetButton: { backgroundColor: '#64748b' },
  buttonText: {
    color: 'white',
    fontSize: 15.5,
    fontWeight: '600',
  },
  disabledText: { opacity: 0.6 },
  lapsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '82%',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  lapsTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1e2937',
  },
  lapsCount: {
    fontSize: 15,
    color: '#64748b',
  },
  lapsContainer: {
    width: '82%',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lapNumber: {
    fontSize: 16.5,
    color: '#334155',
  },
  lapTime: {
    fontSize: 16.5,
    fontWeight: '600',
    color: '#1e40af',
    fontFamily: 'monospace',
  },
  noLaps: {
    textAlign: 'center',
    marginTop: 45,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  homeIndicator: {
    width: 115,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
});