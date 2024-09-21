interface IfProps {
  children: React.ReactNode;
  condition: boolean;
}

export function If({ children, condition }: IfProps) {
  return condition ? children : null;
}