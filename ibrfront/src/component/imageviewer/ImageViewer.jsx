import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus } from "lucide-react";
import "./imageviewer.css";

const MIN_ZOOM = 1; // 1 = image fits the screen
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export const ImageViewer = ({ imageUrl, isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const stageRef = useRef(null);

  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
  const zoomOut = () => setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM));
  const resetZoom = () => setZoom(1);

  // Every time the viewer opens, start at "fit to screen"
  useEffect(() => {
    if (isOpen) setZoom(1);
  }, [isOpen]);

  // Keyboard: Esc closes, + zooms in, - zooms out
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // After each zoom, scroll to the middle so the image grows from the centre
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
    stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2;
  }, [zoom, isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="image-viewer" role="dialog" aria-modal="true" aria-label="Image viewer">
      <div className="image-viewer-stage" ref={stageRef}>
        <img
          src={imageUrl}
          alt="Image preview"
          className="image-viewer-img"
          style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}
        />
      </div>

      <button className="image-viewer-btn image-viewer-close" onClick={onClose} aria-label="Close viewer" title="Close (Esc)">
        <X size={22} />
      </button>

      <div className="image-viewer-toolbar">
        <button className="image-viewer-btn" onClick={zoomOut} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out" title="Zoom out (-)">
          <Minus size={18} />
        </button>
        <button className="image-viewer-btn image-viewer-level" onClick={resetZoom} aria-label="Reset zoom" title="Reset zoom">
          {Math.round(zoom * 100)}%
        </button>
        <button className="image-viewer-btn" onClick={zoomIn} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in" title="Zoom in (+)">
          <Plus size={18} />
        </button>
      </div>
    </div>,
    document.body
  );
};