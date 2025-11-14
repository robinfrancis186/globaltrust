/**
 * Performance utility for device detection and optimization flags
 * Helps reduce CPU/memory usage on mobile and low-end devices
 */

export interface PerformanceConfig {
  isMobile: boolean;
  isTablet: boolean;
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
  shouldReduceAnimations: boolean;
  shouldDisableCanvas: boolean;
  particleCountMultiplier: number;
  canvasResolutionMultiplier: number;
}

/**
 * Detect if device is mobile based on user agent and screen size
 */
function detectMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
  
  // Also check screen width as fallback
  const isSmallScreen = window.innerWidth <= 768;
  
  return isMobileUserAgent || isSmallScreen;
}

/**
 * Detect if device is tablet
 */
function detectTablet(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const tabletRegex = /ipad|android(?!.*mobile)|tablet/i;
  const isTabletUserAgent = tabletRegex.test(userAgent.toLowerCase());
  
  // Check screen width for tablets
  const isTabletScreen = window.innerWidth > 768 && window.innerWidth <= 1024;
  
  return isTabletUserAgent || isTabletScreen;
}

/**
 * Detect if device is low-end based on hardware concurrency and device memory
 */
function detectLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  const navigator = window.navigator as any;
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check device memory (if available)
  const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
  
  // Check connection type (if available)
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  // Low-end if: < 4 cores, < 4GB RAM, or slow connection
  return cores < 4 || memory < 4 || isSlowConnection || false;
}

/**
 * Check if user prefers reduced motion
 */
function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get performance configuration based on device capabilities
 */
export function getPerformanceConfig(): PerformanceConfig {
  const isMobile = detectMobile();
  const isTablet = detectTablet();
  const isLowEndDevice = detectLowEndDevice();
  const prefersReducedMotion = checkReducedMotion();
  
  // Determine if we should reduce animations
  const shouldReduceAnimations = isMobile || isTablet || isLowEndDevice || prefersReducedMotion;
  
  // Disable canvas on mobile and low-end devices
  const shouldDisableCanvas = isMobile || isLowEndDevice;
  
  // Particle count multipliers
  // Mobile: 50% reduction (0.5x)
  // Tablet: 25% reduction (0.75x)
  // Desktop: Full (1.0x)
  let particleCountMultiplier = 1.0;
  if (isMobile) {
    particleCountMultiplier = 0.5;
  } else if (isTablet) {
    particleCountMultiplier = 0.75;
  }
  
  // Canvas resolution multipliers
  // Mobile: 50% resolution (0.5x)
  // Tablet: 75% resolution (0.75x)
  // Desktop: Full (1.0x)
  let canvasResolutionMultiplier = 1.0;
  if (isMobile) {
    canvasResolutionMultiplier = 0.5;
  } else if (isTablet) {
    canvasResolutionMultiplier = 0.75;
  }
  
  return {
    isMobile,
    isTablet,
    isLowEndDevice,
    prefersReducedMotion,
    shouldReduceAnimations,
    shouldDisableCanvas,
    particleCountMultiplier,
    canvasResolutionMultiplier,
  };
}

/**
 * Get optimized particle count based on device
 */
export function getOptimizedParticleCount(baseCount: number): number {
  const config = getPerformanceConfig();
  return Math.floor(baseCount * config.particleCountMultiplier);
}

/**
 * Get optimized canvas resolution based on device
 * Also considers devicePixelRatio for high-DPI displays
 */
export function getOptimizedCanvasResolution(baseWidth: number, baseHeight: number): { width: number; height: number; dpr: number } {
  const config = getPerformanceConfig();
  const baseDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  
  // Limit devicePixelRatio on mobile/low-end devices to reduce GPU load
  let optimizedDpr = baseDpr;
  if (config.isMobile || config.isLowEndDevice) {
    optimizedDpr = Math.min(baseDpr, 1.5); // Cap at 1.5x on mobile
  } else if (config.isTablet) {
    optimizedDpr = Math.min(baseDpr, 2); // Cap at 2x on tablets
  } else {
    optimizedDpr = Math.min(baseDpr, 2); // Cap at 2x on desktop for performance
  }
  
  return {
    width: Math.floor(baseWidth * config.canvasResolutionMultiplier * optimizedDpr),
    height: Math.floor(baseHeight * config.canvasResolutionMultiplier * optimizedDpr),
    dpr: optimizedDpr,
  };
}

/**
 * Check if animations should be disabled
 */
export function shouldDisableAnimations(): boolean {
  const config = getPerformanceConfig();
  return config.shouldReduceAnimations;
}

/**
 * Check if canvas effects should be disabled
 */
export function shouldDisableCanvasEffects(): boolean {
  const config = getPerformanceConfig();
  return config.shouldDisableCanvas;
}

