type OccasionDataType = {
  icon: string;
  title: string;
  messages: string[];
};

export type OccasionType = keyof typeof occasions.es;

const portugueseOccasions = {
  BIRTHDAY: {
    icon: "fa-birthday-cake",
    title: "Aniversário",
    messages: [
      "Olá! PLACEHOLDER_FAMOSO_NAME! No dia [DATA] eu completo [IDADE] anos e queria que, por favor, e madasse uma mensagem de parabéns. Sou seu fã e adoraria que fizesse isso.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Estou muito feliz por essa oportunidade. PLACEHOLDER_PARA encontrar [QUANTIDADE] em breve. Eu gostaria que você por favor enviasse um super parabéns especial.",
      "Olá! PLACEHOLDER_FAMOSO_NAME! No dia [DATA] eu completo [IDADE] anos e queria que, por favor, e madasse uma mensagem de parabéns. Sou seu fã e adoraria que fizesse isso.",
    ],
  },
  LOVE: {
    icon: "fa-heart",
    title: "Amor",
    messages: [
      "",
      "Oi PLACEHOLDER_FAMOSO_NAME! Gostaria que dedicasse uma mensagem muito especial aos PLACEHOLDER_PARA para mostrar a ele todo o meu amor.",
      "",
    ],
  },
  SPECIAL_OCCASION: {
    icon: "fa-glass-cheers",
    title: "Ocasiões Especiais",
    messages: [
      "Oi PLACEHOLDER_FAMOSO_NAME! Em breve vou comemorar [OCASIÃO ESPECIAL] e adoraria ter uma mensagem sua me parabenizando.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Eu adoraria fazer uma surpresa PLACEHOLDER_PARA nesta [OCASIÃO ESPECIAL].",
      "Oi PLACEHOLDER_FAMOSO_NAME! Em breve vou comemorar [OCASIÃO ESPECIAL] e adoraria ter uma mensagem sua me parabenizando.",
    ],
  },
  SONG: {
    icon: "fa-music",
    title: "Música",
    messages: [
      "Oi PLACEHOLDER_FAMOSO_NAME! Você poderia cantar para mim um pedaço da música [nome da música]? É um dos meus favoritos! Muito obrigado.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Você poderia cantar para PLACEHOLDER_PARA um pedaço da música [música], ? Muito obrigado.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Você poderia cantar para mim um pedaço da música [nome da música]? É um dos meus favoritos! Muito obrigado.",
    ],
  },
  CHEER_UP: {
    icon: "fa-spa",
    title: "Alegrar",
    messages: [
      "Oi PLACEHOLDER_FAMOSO_NAME! Esses dias eu tenho estado muito baixo astral. Poderia me mandar uma mensagem de encorajamento? Muito obrigado.",
      "Oi PLACEHOLDER_FAMOSO_NAME! PLACEHOLDER_PARA tem estado em baixo astral. Poderia enviar uma mensagem para alegrar-lo? Muito obrigado.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Esses dias eu tenho estado muito baixo astral. Poderia me mandar uma mensagem de encorajamento? Muito obrigado.",
    ],
  },
  MAKE_SMILE: {
    icon: "fa-laugh",
    title: "Sorrir",
    messages: [
      "Oi PLACEHOLDER_FAMOSO_NAME! Eu te admiro muito e gostaria que me mandasse uma mensagem que me faça sorrir.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Eu gostaria que você sorrise por favor PLACEHOLDER_PARA e te desejar um grande dia.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Eu te admiro muito e gostaria que me mandasse uma mensagem que me faça sorrir.",
    ],
  },
  MOTIVATION: {
    icon: "fa-bolt",
    title: "Motivação",
    messages: [
      "Oi PLACEHOLDER_FAMOSO_NAME! Esses dias eu tenho estado muito desmotivado. Pode me mandar uma mensagem que me motive? Muito obrigado.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Por favor, me ajude a PLACEHOLDER_PARA.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Esses dias eu tenho estado muito desmotivado. Pode me mandar uma mensagem que me motive? Muito obrigado.",
    ],
  },
  JOKE: {
    icon: "fa-grin-squint",
    title: "Piada",
    messages: [
      "Oi PLACEHOLDER_FAMOSO_NAME! Sou seu fã e você me faz rir muito. Adoraria que me dissesse algo engraçado. Obrigado!.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Adoraria fazer uma piada sobre PLACEHOLDER_PARA. Faça isso do seu jeito! Obrigado.",
      "Oi PLACEHOLDER_FAMOSO_NAME! Sou seu fã e você me faz rir muito. Adoraria que me dissesse algo engraçado. Obrigado!.",
    ],
  },
  HOPE: {
    icon: "fa-dove",
    title: "Esperança",
    messages: [
      "",
      "Oi PLACEHOLDER_FAMOSO_NAME! Esses meses têm sido difíceis para PLACEHOLDER_PARA. Poderia mandar uma mensagem de esperança?",
      "",
    ],
  },
  ASK_FOR_FORGIVENESS: {
    icon: "fa-hand-holding-heart",
    title: "Desculpas",
    messages: [
      "",
      "Oi PLACEHOLDER_FAMOSO_NAME! Eu gostaria que PLACEHOLDER_PARA me perdoasse por [SITUAÇÃO]. Por favor, me ajude contando esta mensagem. Obrigado.",
      "",
    ],
  },
  OTHER: {
    icon: "fa-paper-plane",
    title: "Other",
    messages: [
      "Oi PLACEHOLDER_FAMOSO_NAME! ",
      "Oi PLACEHOLDER_FAMOSO_NAME! ",
      "Oi PLACEHOLDER_FAMOSO_NAME! ",
    ],
  },
};

const occasions = {
  es: {
    BIRTHDAY: {
      icon: "fa-birthday-cake",
      title: "Cumpleaños",
      messages: [
        "¡Hola PLACEHOLDER_FAMOSO_NAME! El [FECHA] cumplo [CANTIDAD] años y quisiera que por favor me felicites. Soy tu fan y me encanta lo que haces.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Muchas gracias por esta oportunidad. PLACEHOLDER_PARA cumple [CANTIDAD] años pronto. Quisiera que por favor le envíes una felicitación súper especial.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! El [FECHA] cumplo [CANTIDAD] años y quisiera que por favor me felicites. Soy tu fan y me encanta lo que haces.",
      ],
    },
    LOVE: {
      icon: "fa-heart",
      title: "Amor",
      messages: [
        "",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Me gustaría que le dedicaras un mensaje muy especial a PLACEHOLDER_PARA para demostrarle todo mi amor.",
        "",
      ],
    },
    SPECIAL_OCCASION: {
      icon: "fa-glass-cheers",
      title: "Especial",
      messages: [
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Pronto celebraré [OCASIÓN ESPECIAL] y me encantaría tener un mensaje tuyo felicitándome. ",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Me encantaría sorprender a PLACEHOLDER_PARA en esta [OCASIÓN ESPECIAL].",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Pronto celebraré [OCASIÓN ESPECIAL] y me encantaría tener un mensaje tuyo felicitándome. ",
      ],
    },
    SONG: {
      icon: "fa-music",
      title: "Canción",
      messages: [
        "¡Hola PLACEHOLDER_FAMOSO_NAME! ¿Podrías cantarme un pedazo de la canción [CANCIÓN]? ¡Es una de mis favoritas! Muchas gracias.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! ¿Podrías cantarle a PLACEHOLDER_PARA un pedazo de la canción [CANCIÓN], de mi parte? Muchas gracias.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! ¿Podrías cantarme un pedazo de la canción [CANCIÓN]? ¡Es una de mis favoritas! Muchas gracias.",
      ],
    },
    CHEER_UP: {
      icon: "fa-spa",
      title: "Ánimo",
      messages: [
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Estos días he estado con los ánimos muy bajos. ¿Podrías por favor mandarme un mensaje de ánimo? Muchas gracias.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! PLACEHOLDER_PARA ha estado muy bajo de ánimo. ¿Podrías por favor mandarle un mensaje para animarlo? Muchas gracias.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Estos días he estado con los ánimos muy bajos. ¿Podrías por favor mandarme un mensaje de ánimo? Muchas gracias.",
      ],
    },
    MAKE_SMILE: {
      icon: "fa-laugh",
      title: "Hacer sonreír",
      messages: [
        "",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Quisiera que por favor le saques una sonrisa a PLACEHOLDER_PARA y que le desees un día genial.",
        "",
      ],
    },
    MOTIVATION: {
      icon: "fa-bolt",
      title: "Motivación",
      messages: [
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Estos días he estado muy desmotivado. ¿Me podrías enviar un mensaje que me motive? Muchas gracias.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Por favor ayúdame a motivar a PLACEHOLDER_PARA.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Estos días he estado muy desmotivado. ¿Me podrías enviar un mensaje que me motive? Muchas gracias.",
      ],
    },
    JOKE: {
      icon: "fa-grin-squint",
      title: "Broma",
      messages: [
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Soy tu fan y me haces reír mucho. Me encantaría que me dijeras algo chistoso. ¡Gracias!.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Me encantaría hacerle una broma a PLACEHOLDER_PARA. ¡Hazlo muy a tu estilo! Gracias.",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Soy tu fan y me haces reír mucho. Me encantaría que me dijeras algo chistoso. ¡Gracias!.",
      ],
    },
    HOPE: {
      icon: "fa-dove",
      title: "Esperanza",
      messages: [
        "",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Estos meses han sido difíciles para PLACEHOLDER_PARA. ¿Podrías enviarle un mensaje de esperanza?",
        "",
      ],
    },
    ASK_FOR_FORGIVENESS: {
      icon: "fa-hand-holding-heart",
      title: "Perdón",
      messages: [
        "",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! Quisiera que PLACEHOLDER_PARA me perdone por [SITUACIÓN]. Me ayudas por favor diciéndole este mensaje. Gracias.",
        "",
      ],
    },
    OTHER: {
      icon: "fa-paper-plane",
      title: "Otro",
      messages: [
        "¡Hola PLACEHOLDER_FAMOSO_NAME! ",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! ",
        "¡Hola PLACEHOLDER_FAMOSO_NAME! ",
      ],
    },
  },
  en: {
    BIRTHDAY: {
      icon: "fa-birthday-cake",
      title: "Birthday",
      messages: [
        "Hello PLACEHOLDER_FAMOSO_NAME! On [DATE] is my [NUMBER] birthday and I would like you to please congratulate me. I am your fan and I love what you do.",
        "Hello PLACEHOLDER_FAMOSO_NAME! Thank you very much for this opportunity. PLACEHOLDER_PARA turns [QUANTITY] years soon. I would like you to please send him/her an special congratulation.",
        "Hello PLACEHOLDER_FAMOSO_NAME! On [DATE] is my [NUMBER] birthday and I would like you to please congratulate me. I am your fan and I love what you do.",
      ],
    },
    LOVE: {
      icon: "fa-heart",
      title: "Love",
      messages: [
        "",
        "Hello PLACEHOLDER_FAMOSO_NAME! I would like you to dedicate a very special message to PLACEHOLDER_PARA to show all my love.",
        "",
      ],
    },
    SPECIAL_OCCASION: {
      icon: "fa-glass-cheers",
      title: "Special Occasion",
      messages: [
        "Hello PLACEHOLDER_FAMOSO_NAME! Soon I will celebrate [SPECIAL OCCASION] and I would love to have a message from you congratulating me.",
        "Hello PLACEHOLDER_FAMOSO_NAME! I would love to surprise PLACEHOLDER_PARA on this [SPECIAL OCCASION].",
        "Hello PLACEHOLDER_FAMOSO_NAME! Soon I will celebrate [SPECIAL OCCASION] and I would love to have a message from you congratulating me.",
      ],
    },
    SONG: {
      icon: "fa-music",
      title: "Song",
      messages: [
        "Hello PLACEHOLDER_FAMOSO_NAME! Could you please sing for me a piece of the song [SONG]? It is one of my favorites! Thank you very much.",
        "Hello PLACEHOLDER_FAMOSO_NAME! Could you please sing to PLACEHOLDER_PARA a piece of the song [SONG] from me? Thank you very much.",
        "Hello PLACEHOLDER_FAMOSO_NAME! Could you please sing for me a piece of the song [SONG]? It is one of my favorites! Thank you very much.",
      ],
    },
    CHEER_UP: {
      icon: "fa-spa",
      title: "Cheer up",
      messages: [
        "Hello PLACEHOLDER_FAMOSO_NAME! These days I have been down. Could you please send me a message to cheer up? Thank you very much.",
        "Hello PLACEHOLDER_FAMOSO_NAME! PLACEHOLDER_PARA has been down. Could you please send him/her a message to cheer up? Thank you very much.",
        "Hello PLACEHOLDER_FAMOSO_NAME! These days I have been down. Could you please send me a message to cheer up? Thank you very much.",
      ],
    },
    MAKE_SMILE: {
      icon: "fa-laugh",
      title: "Make Smile",
      messages: [
        "",
        "Hello PLACEHOLDER_FAMOSO_NAME! I would like you to please make PLACEHOLDER_PARA smile and wish him/her a great day.",
        "",
      ],
    },
    MOTIVATION: {
      icon: "fa-bolt",
      title: "Motivation",
      messages: [
        "Hello PLACEHOLDER_FAMOSO_NAME! These days I have been very unmotivated. Could you please send me a message that will motivate me? Thank you very much.",
        "Hello PLACEHOLDER_FAMOSO_NAME! Please help me motivate PLACEHOLDER_PARA.",
        "Hello PLACEHOLDER_FAMOSO_NAME! These days I have been very unmotivated. Could you please send me a message that will motivate me? Thank you very much.",
      ],
    },
    JOKE: {
      icon: "fa-grin-squint",
      title: "Joke",
      messages: [
        "Hello PLACEHOLDER_FAMOSO_NAME! I am your fan and you make me laugh a lot. I would love to hear something funny. Thank you!",
        "Hello PLACEHOLDER_FAMOSO_NAME! I would love to make a joke to PLACEHOLDER_PARA. Do it your own way! Thank you.",
        "Hello PLACEHOLDER_FAMOSO_NAME! I am your fan and you make me laugh a lot. I would love to hear something funny. Thank you!",
      ],
    },
    HOPE: {
      icon: "fa-dove",
      title: "Hope",
      messages: [
        "",
        "Hello PLACEHOLDER_FAMOSO_NAME! These months have been difficult for PLACEHOLDER_PARA. Could you send him/her a message of hope?",
        "",
      ],
    },
    ASK_FOR_FORGIVENESS: {
      icon: "fa-hand-holding-heart",
      title: "Forgiveness",
      messages: [
        "",
        "Hello PLACEHOLDER_FAMOSO_NAME! I would like PLACEHOLDER_PARA to forgive me for [SITUATION]. Please help me by telling him/her this message. Thank you.",
        "",
      ],
    },
    OTHER: {
      icon: "fa-paper-plane",
      title: "Other",
      messages: [
        "¡Hello PLACEHOLDER_FAMOSO_NAME! ",
        "¡Hello PLACEHOLDER_FAMOSO_NAME! ",
        "¡Hello PLACEHOLDER_FAMOSO_NAME! ",
      ],
    },
  },
  pt: portugueseOccasions,
  por: portugueseOccasions,
  "pt-BR": portugueseOccasions,
};

export function getOccasion(occasion: string, locale = "es") {
  const occasionKey = occasions?.[locale]?.hasOwnProperty?.(occasion)
    ? occasion
    : "OTHER";

  const contractOccasion = occasions?.[locale]?.[occasionKey] || {};

  return [occasionKey, contractOccasion] as const;
}

export default occasions;

export function getOccasionMessage(
  locale: string,
  occasionKey: OccasionType,
  contractType: number
): string {
  const localeOccasions = occasions[locale];
  if (!localeOccasions) return "";
  return localeOccasions?.[occasionKey]?.messages?.[contractType - 1] || "";
}
