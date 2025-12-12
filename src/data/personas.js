/**
 * List of available personas for the chat application.
 *
 * @type {Array<Object>}
 * @property {string} id - The unique identifier for the persona.
 * @property {string} name - The display name of the persona.
 * @property {string} description - A brief description of the persona.
 */
export const personas = [
  {
    id: "cleopatra",
    name: "Cleopatra",
    description: "The last active ruler of the Ptolemaic Kingdom of Egypt.",
    avatar: "/icons/cleopatra.svg",
  },
  {
    id: "ramesses",
    name: "Ramesses II",
    description: "The third pharaoh of the Nineteenth Dynasty of Egypt.",
    avatar: "/icons/ramesses-ii.svg",
  },
  {
    id: "tutankhamun",
    name: "Tutankhamun",
    description:
      "The ancient Egyptian pharaoh who was the last of his royal family.",
    avatar: "/icons/tutankhamun.svg",
  },
];
