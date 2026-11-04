"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * app/template.tsx remonta a cada navegação (diferente de layout.tsx),
 * o que dá uma entrada suave (fade + slide) toda vez que o usuário troca
 * de página, ex.: da listagem de clientes para a página de um case.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
