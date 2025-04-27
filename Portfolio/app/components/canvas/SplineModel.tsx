'use client';
import React, { useState, useEffect, useRef } from 'react';

// Simple fallback component
const FallbackDisplay = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-[#050816] p-10 text-white">
    <div className="mb-4 text-[#915eff] text-xl font-bold">3D View</div>
    <div className="text-center text-sm">Loading 3D content...</div>
  </div>
);

const SplineModel = () => {
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Set higher quality for desktop
  const modelUrl = "https://my.spline.design/robot4legstooncopy-Hcuwx1nNLlzTGlTUaKgS2XbQ/?embed=true&enableInteraction=true";
  
  // Hide loader after timeout even if iframe doesn't report load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Hide tooltip after 8 seconds
  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 15000);
    
    return () => clearTimeout(tooltipTimer);
  }, []);

  const handleIframeLoad = () => {
    setLoading(false);
    
    try {
      const iframe = iframeRef.current;
      const container = containerRef.current;
      
      if (iframe && container) {
        // Attempt to remove any potential blocking elements
        iframe.style.pointerEvents = 'auto';
        container.style.pointerEvents = 'auto';
        
        // Try to focus and interact with iframe
        iframe.contentWindow?.focus();
        
        // Add event listeners to ensure interaction
        const handleMouseEvent = (e: MouseEvent) => {
          e.stopPropagation();
          
          // Attempt to pass through mouse events
          try {
            const mouseEvent = new MouseEvent(e.type, {
              view: iframe.contentWindow || window,
              bubbles: true,
              cancelable: true,
              clientX: e.clientX,
              clientY: e.clientY
            });
            
            iframe.contentWindow?.dispatchEvent(mouseEvent);
          } catch (err) {
            console.error("Error dispatching mouse event:", err);
          }
        };
        
        // Add multiple event listeners to ensure interaction
        const events = ['mousedown', 'mouseup', 'mousemove', 'click', 'touchstart', 'touchmove', 'touchend'];
        events.forEach(eventName => {
          container.addEventListener(eventName, handleMouseEvent as EventListener, { passive: false });
        });
        
        // Try to inject styles directly into iframe
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (doc) {
            const style = doc.createElement('style');
            style.textContent = `
              * { 
                pointer-events: auto !important; 
                user-select: none !important;
                cursor: grab !important;
              }
              body, html, canvas, #canvas-container { 
                width: 100% !important; 
                height: 100% !important; 
                margin: 0 !important; 
                padding: 0 !important; 
                overflow: hidden !important;
              }
            `;
            doc.head.appendChild(style);
          }
        } catch (e) {
          console.log("Cannot access iframe document:", e);
        }
      }
    } catch (err) {
      console.error("Comprehensive interaction setup failed:", err);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative" 
      style={{ 
        pointerEvents: 'auto',
        userSelect: 'none',
        cursor: 'grab',
        touchAction: 'none'
      }}
    >
      {loading && <FallbackDisplay />}
      
      {/* Interaction tooltip - only shows in desktop for 15 seconds */}
      {showTooltip && (
        <div className="absolute bottom-14 right-6 bg-[#151030] bg-opacity-80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg text-white z-[999] max-w-[280px] hidden sm:block border border-[#915EFF]">
          <div className="flex items-center gap-2 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#915EFF" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span className="font-bold text-sm text-[#915EFF]">Interactive 3D Model</span>
          </div>
          <p className="text-xs">Click and drag near the area above "Built with Spline" to rotate and interact with this 3D robot model</p>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={modelUrl}
        onLoad={handleIframeLoad}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: 'transparent',
          pointerEvents: 'auto',
          display: 'block',
          touchAction: 'none'
        }}
        title="3D Robot Model"
        allow="autoplay; fullscreen; vr; pointer-lock"
      />
      
      <style jsx global>{`
        /* Comprehensive removal of Spline branding and interaction blockers */
        iframe[src*="spline.design"]::after,
        iframe[src*="spline.design"] + div,
        iframe[src*="spline.design"] ~ div,
        div[style*="position: absolute; bottom: 0px; right: 0px"],
        .info-icon, .credits, .logo-wrapper, .overlay-credits {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        
        /* Ensure full interactivity */
        iframe, canvas {
          pointer-events: auto !important;
          user-select: none !important;
          touch-action: none !important;
          cursor: grab !important;
        }
      `}</style>
    </div>
  );
};

export default SplineModel; 