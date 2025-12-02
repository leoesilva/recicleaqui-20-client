import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'styled-components/native';

type ToastType = 'success' | 'error' | 'info';

type ToastMessage = {
  id: number;
  type: ToastType;
  text: string;
};

type ToastContextValue = {
  showToast: (type: ToastType, text: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [message, setMessage] = useState<ToastMessage | null>(null);
  const translateY = useRef(new Animated.Value(-80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const showToast = useCallback((type: ToastType, text: string) => {
    const id = Date.now();
    setMessage({ id, type, text });

    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 180, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, { toValue: -80, duration: 180, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 180, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        ]).start(() => setMessage(null));
      }, 2000);
    });
  }, [opacity, translateY]);

  const bgColor = message?.type === 'success'
    ? theme.colors.primary
    : message?.type === 'error'
      ? theme.colors.error
      : theme.colors.icon;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.container,
          {
            transform: [{ translateY }],
            opacity,
            top: Platform.select({ ios: 60, android: 20, default: 20 }),
          },
        ]}
      >
        {message && (
          <View style={[styles.toast, { backgroundColor: bgColor }]}> 
            <Text style={styles.text}>{message.text}</Text>
          </View>
        )}
      </Animated.View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
});

export default ToastProvider;
