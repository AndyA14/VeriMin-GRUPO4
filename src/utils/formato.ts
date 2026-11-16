
export function nombreDesdeCorreo(correo: string): string {
  const local = correo.trim().split('@')[0] ?? '';
  const primera = local.split(/[._\-+0-9]+/).filter(Boolean)[0] ?? '';
  if (!primera) return 'Carlos';
  return primera.charAt(0).toUpperCase() + primera.slice(1).toLowerCase();
}


export function normalizarUsuario(texto: string): string {
  const limpio = texto.trim().replace(/^@+/, '').replace(/\s+/g, '');
  return limpio ? `@${limpio}` : '@carlospati';
}