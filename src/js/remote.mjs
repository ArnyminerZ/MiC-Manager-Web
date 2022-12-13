/**
 * Fetches the MiC Manager installation meta from the document's head.
 * @author Arnau Mora
 * @since 20221213
 */
export const base = () => document.head.querySelector('meta[name="mic-manager"]').content;
