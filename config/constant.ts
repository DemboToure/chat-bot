export const Constant = {
  API_PATH: process.env.NEXT_PUBLIC_API_URL,
  INDEX_NAME: process.env.NEXT_PUBLIC_INDEX,
  INDEX_QUESTIONS: {
    playbook_ocs_features: [
      "Mettre en place un programme d'incubation à impact", // title
      "Comment définir les modalités de sélection ?",
      "Comment définir un plan de formation ?",
      "Comment assurer le suivi des entrepreneurs ?",
      "Comment garantir un accès au financement ?",
    ],
    guideline_features: [
      "Le guide du financement pour les entrepreneurs",
      "Quel type de financement puis je avoir ?",
      "Quel sont les programmes disponibles ?",
      "Comment soumettre sa candidature ?",
      "Quelles sont les programmes ouverts aux femmes ?",
    ],
  } as { [key: string]: string[] },
};
