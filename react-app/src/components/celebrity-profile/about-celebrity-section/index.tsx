import { FormattedMessage } from "react-intl";
import { CollapsibleText } from "../../../../../desktop-app/components/common/helpers/collapsible-text";

type AboutCelebritySectionProps = {
  className?: string;
  celebrityDescription: string;
  celebrityFullName: string;
};

function AboutCelebritySection({
  className,
  celebrityDescription,
  celebrityFullName,
}: AboutCelebritySectionProps) {
  return (
    <section className={className}>
      <h2>
        <FormattedMessage
          defaultMessage="Acerca de {celebrityFullName}"
          values={{ celebrityFullName }}
        />
      </h2>
      <CollapsibleText>{celebrityDescription}</CollapsibleText>
    </section>
  );
}

export { AboutCelebritySection };
