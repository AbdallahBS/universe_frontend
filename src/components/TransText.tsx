// src/components/TransText.tsx
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const TransText = ({ children, as: Tag = "span", className }: Props) => {
  const { i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  return (
    <Tag
      className={className}
      style={{
        direction: isRTL ? "rtl" : "ltr",
        unicodeBidi: "plaintext"
      }}
    >
      {children}
    </Tag>
  );
};

export default TransText;
