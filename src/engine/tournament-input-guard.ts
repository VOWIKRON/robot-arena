/** NEXT-74: bounded, side-effect-free validation of untrusted tournament JSON trees. */
export function assertSafeTournamentInput(input: unknown): void {
  const stack: Array<{ value: unknown; depth: number }> = [{ value: input, depth: 0 }];
  const visited = new WeakSet<object>();
  let nodes = 0;

  while (stack.length) {
    const { value, depth } = stack.pop()!;
    if (++nodes > 20_000) throw new Error('Turnierimport: zu viele Datenknoten');
    if (typeof value === 'number' && !Number.isFinite(value)) {
      throw new Error('Turnierimport: nicht endliche Zahl');
    }
    if (typeof value === 'string' && value.length > 65_536) {
      throw new Error('Turnierimport: Text zu lang');
    }
    if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'bigint') {
      throw new Error('Turnierimport: unzulässiger Datentyp');
    }
    if (value === null || typeof value !== 'object') continue;
    if (depth > 32) throw new Error('Turnierimport: Verschachtelung zu tief');
    if (visited.has(value)) throw new Error('Turnierimport: zyklische oder mehrfach referenzierte Daten');
    visited.add(value);

    const isArray = Array.isArray(value);
    const prototype = Object.getPrototypeOf(value);
    if (!isArray && prototype !== Object.prototype && prototype !== null) {
      throw new Error('Turnierimport: nur einfache JSON-Objekte erlaubt');
    }
    if (isArray && value.length > 2_048) throw new Error('Turnierimport: Array zu groß');

    const descriptors = Object.getOwnPropertyDescriptors(value);
    const keys = Reflect.ownKeys(descriptors);
    if (keys.length > 2_049) throw new Error('Turnierimport: zu viele Objekteigenschaften');
    for (const key of keys) {
      if (typeof key !== 'string') throw new Error('Turnierimport: Symbolschlüssel unzulässig');
      if (key === '__proto__' || key === 'prototype' || key === 'constructor') {
        throw new Error('Turnierimport: gefährlicher Objektschlüssel');
      }
      if (isArray && key === 'length') continue;
      if (isArray && (!/^(0|[1-9]\d*)$/.test(key) || Number(key) >= value.length)) {
        throw new Error('Turnierimport: unerwartete Array-Eigenschaft');
      }
      const descriptor = descriptors[key]!;
      if (!('value' in descriptor)) throw new Error('Turnierimport: Getter/Setter unzulässig');
      stack.push({ value: descriptor.value, depth: depth + 1 });
    }
    if (isArray && keys.length !== value.length + 1) {
      throw new Error('Turnierimport: unvollständiges Array');
    }
  }
}
