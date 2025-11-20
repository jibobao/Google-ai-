import React from 'react';

export interface Step {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.FC<{ className?: string }>;
}

export enum ModelType {
  FLASH = 'gemini-2.5-flash',
  PRO = 'gemini-3-pro-preview'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}