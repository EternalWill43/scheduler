export function sanitize(str: string): string {
    return str.replace(/[^\w\s]/gi, '');
}