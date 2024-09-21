import { useMemo } from "react";

export function Header() {

  const datetimeFormat = useMemo(() => {
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: '2-digit'
    }).format(new Date());
  }, []);

  return (
    <header>
      <img src="/images/Logo.svg" alt="Logo" />
      <h1>Bem vindo de volta, Marcus</h1>
      <span>{ datetimeFormat.charAt(0).toUpperCase() + datetimeFormat.slice(1) }</span>
    </header>
  );
}