/**
 * Formats a raw price string as Uruguayan pesos.
 * Input: "1500" → Output: "$U 1.500"
 * Input: "1500.50" → Output: "$U 1.500,50"
 */
export function formatPrice(precio: string | null | undefined): string | null {
    if (!precio) return null
    const num = parseFloat(String(precio).replace(/\./g, '').replace(',', '.'))
    if (isNaN(num)) return precio
    const formatted = num.toLocaleString('es-UY', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
    return `$U ${formatted}`
}
