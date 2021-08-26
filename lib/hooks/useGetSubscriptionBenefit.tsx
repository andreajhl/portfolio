import { BenefitType } from "react-app/src/types/subscriptionBenefitType";

const dateFuture = new Date();
dateFuture.setDate(28);

const datePass = new Date();
datePass.setDate(1);

export function useGetSubscriptionBenefit(benefitId: string) {
  return {
    benefit: {
      id: 1,
      title: "Sorteo Videollamada 1:1",
      mediaUrl:
        "https://dqb0851cl2gjs.cloudfront.net/celebrities/864/avatar/famosos-videos-personalizados-marktacher-compressed.jpg",
      publicationDate: datePass,
      expirationDate: dateFuture,
      benefitType: "RAFFLE",
      description: "Una videollamada 1:1 con MarkTacher de 10 min.",
      instructions: "Publicaré el video haciendo el sorteo y ¡al ganador!",
      celebrityId: 864,
    } as BenefitType,
    status: "completed",
  };
}
