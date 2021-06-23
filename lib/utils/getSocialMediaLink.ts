import objectToQueryString from "./objectToQueryString";

export const getWhatsappSharingLink: (message: string) => string = (
  message = ""
) => `https://api.whatsapp.com/send?text=${message}`;

export function getWhatsappMessageToNumberLink(
  number: string | number,
  message?: string
) {
  const baseLink = `https://wa.me/${number}`;
  const messageParam = message ? `?text=${encodeURIComponent(message)}` : "";
  return `${baseLink}${messageParam}`;
}

export function getTwitterSharingLink(
  text: string,
  url?: string,
  via?: string
) {
  const linkParams = {
    text,
    url,
    via,
  };

  return `https://twitter.com/intent/tweet${objectToQueryString(linkParams)}`;
}

export const getFacebookShareLink: (link: string) => string = (
  link = "https://famosos.com"
) => `https://www.facebook.com/sharer/sharer.php?u=${link}`;

export function getMailShareLink(subject?: string, body?: string) {
  const linkParams = { subject, body };
  return `mailto:${objectToQueryString(linkParams)}`;
}
