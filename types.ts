
export interface NavItem {
  label: string;
  id: string;
}

export interface ArchitectureNode {
  name: string;
  value: number;
  color: string;
}

// Added Message interface used by UIAssistant component for chat history
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
