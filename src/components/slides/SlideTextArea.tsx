import type { ReactNode } from "react";
import type { SlideContent } from "../../data/slides";

type SlideTextAreaProps = {
  content: SlideContent;
  caption?: string;
  containerClassName?: string;
  textClassName?: string;
  transparentContainer?: boolean;
  children?: ReactNode;
};

const withBreaks = (value?: string) => {
  if (!value) {
    return null;
  }

  const lines = value.split("\n");

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
};

const joinClassNames = (...names: Array<string | undefined>) => names.filter(Boolean).join(" ");

export default function SlideTextArea({
  content,
  caption,
  containerClassName,
  textClassName,
  transparentContainer,
  children,
}: SlideTextAreaProps) {
  const bodyLines = content.body?.split("\n") ?? [];
  const textColorStyle = content.textColor ? { color: content.textColor } : undefined;

  const textBlock = (
    <div className={joinClassNames("slide__text", textClassName)}>
      {content.label ? <p className="slide__label" style={textColorStyle}>{content.label}</p> : null}
      {content.heading ? (
        <h2 className={joinClassNames("slide__heading", content.headingClassName)} style={textColorStyle}>{withBreaks(content.heading)}</h2>
      ) : null}
      {content.nameEn ? <p className="intro__name-en" style={textColorStyle}>{content.nameEn}</p> : null}
      {content.sub ? <p className="slide__sub" style={textColorStyle}>{withBreaks(content.sub)}</p> : null}
      {content.lead ? <p className="message__lead" style={textColorStyle}>{withBreaks(content.lead)}</p> : null}
      {content.author ? <p className="slide__author" style={textColorStyle}>{withBreaks(content.author)}</p> : null}
      {content.layout === "closing" && bodyLines.length > 0 ? (
        <p className="slide__author-end" style={textColorStyle}>
          {bodyLines[0]}
          {bodyLines.length > 1 ? (
            <>
              <br />
              <span>{bodyLines.slice(1).join(" ")}</span>
            </>
          ) : null}
        </p>
      ) : null}
      {content.body ? (
        content.layout === "closing" ? null : (
          <p className={joinClassNames("slide__body", content.bodyClassName)} style={textColorStyle}>{withBreaks(content.body)}</p>
        )
      ) : null}
      {children}
      {caption ? <p className="slide__caption" style={textColorStyle}>{withBreaks(caption)}</p> : null}
    </div>
  );

  if (!containerClassName && !transparentContainer) {
    return textBlock;
  }

  return <div className={containerClassName} style={transparentContainer ? { background: "transparent" } : undefined}>{textBlock}</div>;
}
